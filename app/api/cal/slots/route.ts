import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl || new URL(request.url)
    const username = searchParams.get('username')
    const eventTypeSlug = searchParams.get('eventTypeSlug')
    const start = searchParams.get('start')
    const end = searchParams.get('end')
    const timezone = searchParams.get('timezone') || 'Europe/Paris'

    if (!username || !eventTypeSlug || !start || !end) {
      return NextResponse.json(
        { error: 'Paramètres manquants' },
        { status: 400 }
      )
    }

    const calApiKey = process.env.CAL_API_KEY

    if (!calApiKey) {
      return NextResponse.json(
        { error: 'Configuration API manquante - CAL_API_KEY non définie' },
        { status: 500 }
      )
    }

    let availableSlots: Array<{
      time: string
      users: Array<{
        id: number
        name: string
        username: string
        email: string
        timeZone: string
      }>
    }> = []
    let busyTimes: any[] = []

    try {
      const apiUrl = `https://api.cal.com/v2/slots?start=${start}&end=${end}&username=${username}&eventTypeSlug=${eventTypeSlug}`

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${calApiKey}`,
          'cal-api-version': '2024-09-04'
        }
      })

      if (response.ok) {
        const data = await response.json()

        if (data.data && data.status === 'success') {
          availableSlots = processCalComSlots(data.data, timezone)
        } else {
          throw new Error('Format de données Cal.com invalide')
        }
      } else {
        const errorText = await response.text()
        console.error('❌ Erreur Cal.com API v2/slots:', response.status, errorText)
        throw new Error(`API v2/slots non disponible: ${response.status} - ${errorText}`)
      }

    } catch (apiError) {
      busyTimes = []
      availableSlots = []
    }

    return NextResponse.json({
      slots: availableSlots,
      success: true,
      busyTimes: busyTimes,
      fallback: availableSlots.length > 0 && busyTimes.length === 0
    })

  } catch (error) {
    console.error('💥 Erreur API Cal.com:', error)
    return NextResponse.json(
      {
        error: 'Erreur lors de la récupération des créneaux',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    )
  }
}

function processCalComSlots(calData: any, timezone: string) {
  const slots: Array<{
    time: string
    users: Array<{
      id: number
      name: string
      username: string
      email: string
      timeZone: string
    }>
  }> = []
  const allSlots: Array<{date: string, time: string, hour: number}> = []

  Object.entries(calData).forEach(([date, timeSlots]: [string, any]) => {
    timeSlots.forEach((slot: any) => {
      const slotTime = new Date(slot.start)
      const hour = slotTime.getHours()
      allSlots.push({
        date,
        time: slot.start,
        hour
      })
    })
  })

  allSlots.sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date)
    return a.hour - b.hour
  })
  const selectedSlots = selectBestSlots(allSlots)

  selectedSlots.forEach(slot => {
    slots.push({
      time: slot.time,
      users: [{
        id: 1,
        name: 'Louis Langanay',
        username: 'louislanganay',
        email: 'louis@example.com',
        timeZone: timezone
      }]
    })
  })

  return slots
}

// Fonction pour sélectionner les meilleurs créneaux
function selectBestSlots(allSlots: Array<{date: string, time: string, hour: number}>) {
  const selected: Array<{date: string, time: string, hour: number}> = []
  const dates = Array.from(new Set(allSlots.map(s => s.date))).sort()

  // Stratégie : 2-3 créneaux par jour, à des heures variées
  dates.forEach((date: string) => {
    const daySlots = allSlots.filter(s => s.date === date)

    // Sélectionner des créneaux à des heures différentes
    const morningSlots = daySlots.filter(s => s.hour >= 9 && s.hour <= 11)
    const afternoonSlots = daySlots.filter(s => s.hour >= 14 && s.hour <= 16)
    const lateSlots = daySlots.filter(s => s.hour >= 17 && s.hour <= 18)

    // Prendre 1 créneau du matin, 1 de l'après-midi, et 1 en fin de journée si disponible
    if (morningSlots.length > 0) {
      selected.push(morningSlots[Math.floor(morningSlots.length / 2)]) // Milieu de la matinée
    }

    if (afternoonSlots.length > 0) {
      selected.push(afternoonSlots[Math.floor(afternoonSlots.length / 2)]) // Milieu de l'après-midi
    }

    if (lateSlots.length > 0 && selected.length < 2) {
      selected.push(lateSlots[0]) // Premier créneau de fin de journée
    }

    // Limiter à 3 créneaux par jour maximum
    if (selected.filter(s => s.date === date).length >= 3) {
      return
    }
  })
  // Limiter le total à 8 créneaux maximum
  return selected.slice(0, 8)
}
