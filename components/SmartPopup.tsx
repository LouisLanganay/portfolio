'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import MaltPopup from './MaltPopup'
import LinkedInPopup from './LinkedInPopup'
import AvailabilityPopup from './AvailabilityPopup'

interface SmartPopupProps {
  delay?: number
}

const POPUPS_ENABLED = false

export default function SmartPopup({ delay = 0 }: SmartPopupProps) {
  const searchParams = useSearchParams()
  if (!POPUPS_ENABLED) return null

  const source = searchParams.get('source')

  if (source === 'linkedin') {
    return <MaltPopup delay={delay} />
  }

  const now = new Date()
  const hour = now.getHours()
  const day = now.getDay()

  if (day >= 1 && day <= 5 && hour >= 9 && hour <= 18) {
    return <AvailabilityPopup delay={delay} />
  }

  return <LinkedInPopup delay={delay} />
}
