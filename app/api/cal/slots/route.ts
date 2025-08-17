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
        { error: 'Missing parameters' },
        { status: 400 }
      )
    }

    const calApiKey = process.env.CAL_API_KEY

    if (!calApiKey) {
      return NextResponse.json(
        { error: 'Missing API configuration - CAL_API_KEY not defined' },
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
          throw new Error('Invalid Cal.com data format')
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
    console.error('💥 Cal.com API Error:', error)
    return NextResponse.json(
      {
        error: 'Error while fetching available slots',
        details: error instanceof Error ? error.message : 'Unknown error'
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

// Function to select the best slots
function selectBestSlots(allSlots: Array<{date: string, time: string, hour: number}>) {
  const selected: Array<{date: string, time: string, hour: number}> = []
  const dates = Array.from(new Set(allSlots.map(s => s.date))).sort()

  // Strategy: 2-3 slots per day, at varied hours
  dates.forEach((date: string) => {
    const daySlots = allSlots.filter(s => s.date === date)

    // Select slots at different hours
    const morningSlots = daySlots.filter(s => s.hour >= 9 && s.hour <= 11)
    const afternoonSlots = daySlots.filter(s => s.hour >= 14 && s.hour <= 16)
    const lateSlots = daySlots.filter(s => s.hour >= 17 && s.hour <= 18)

    // Take 1 morning slot, 1 afternoon slot, and 1 late slot if available
    if (morningSlots.length > 0) {
      selected.push(morningSlots[Math.floor(morningSlots.length / 2)]) // Mid-morning
    }

    if (afternoonSlots.length > 0) {
      selected.push(afternoonSlots[Math.floor(afternoonSlots.length / 2)]) // Mid-afternoon
    }

    if (lateSlots.length > 0 && selected.length < 2) {
      selected.push(lateSlots[0]) // First late slot
    }

    // Limit to 3 slots per day maximum
    if (selected.filter(s => s.date === date).length >= 3) {
      return
    }
  })
  // Limit total to 8 slots maximum
  return selected.slice(0, 8)
}
