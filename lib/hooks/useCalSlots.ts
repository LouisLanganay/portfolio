import React, { useState, useEffect } from 'react'

interface CalSlot {
  time: string
  users: Array<{
    id: number
    name: string
    username: string
    email: string
    timeZone: string
  }>
}

interface UseCalSlotsProps {
  username: string
  eventTypeSlug: string
  daysAhead?: number
}

export function useCalSlots({
  username,
  eventTypeSlug,
  daysAhead = 7
}: UseCalSlotsProps) {
  const [slots, setSlots] = useState<CalSlot[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchSlots = React.useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const startDate = new Date()
      const endDate = new Date()
      endDate.setDate(endDate.getDate() + daysAhead)

      const start = startDate.toISOString().split('T')[0]
      const end = endDate.toISOString().split('T')[0]

      const response = await fetch(
        `/api/cal/slots?username=${username}&eventTypeSlug=${eventTypeSlug}&start=${start}&end=${end}&timezone=Europe/Paris`
      )

      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setSlots(data.slots || [])

    } catch (err) {
      setError('Erreur lors de la récupération des créneaux')
      console.error('Erreur récupération créneaux:', err)
    } finally {
      setIsLoading(false)
    }
  }, [username, eventTypeSlug, daysAhead])

  const getNextAvailableSlot = (): CalSlot | null => {
    return slots.length > 0 ? slots[0] : null
  }

  const getAvailableSlotsCount = (): number => {
    return slots.length
  }

  const formatSlotTime = (slot: CalSlot): string => {
    const date = new Date(slot.time)
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  useEffect(() => {
    fetchSlots()
  }, [username, eventTypeSlug, daysAhead])

  return {
    slots,
    nextAvailableSlot: getNextAvailableSlot(),
    availableSlotsCount: getAvailableSlotsCount(),
    isLoading,
    error,
    refetch: fetchSlots,
    formatSlotTime
  }
}
