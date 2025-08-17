'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { XMarkIcon, CalendarIcon, ArrowRightIcon, ClockIcon } from '@heroicons/react/24/outline'
import { useCalSlots } from '@/lib/hooks/useCalSlots'
import { CAL_API_CONFIG, getCalUrl } from '@/lib/config/cal-api'

interface AvailabilityPopupProps {
  delay?: number
}

export default function AvailabilityPopup({ delay = 0 }: AvailabilityPopupProps) {
  const [isVisible, setIsVisible] = useState(false)

  const {
    slots,
    nextAvailableSlot,
    availableSlotsCount,
    isLoading,
    formatSlotTime
  } = useCalSlots({
    username: CAL_API_CONFIG.username,
    eventTypeSlug: CAL_API_CONFIG.eventTypeSlug,
    daysAhead: CAL_API_CONFIG.defaultDaysAhead
  })

  useEffect(() => {
    const isPopupClosed = document.cookie
      .split('; ')
      .find(row => row.startsWith('availability-popup-closed='))

    if (isPopupClosed) {
      return
    }

    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  const handleClose = () => {
    const expires = new Date()
    expires.setTime(expires.getTime() + (60 * 60 * 1000)) // 1 heure
    document.cookie = `availability-popup-closed=true; expires=${expires.toUTCString()}; path=/`
    setIsVisible(false)
  }

  const handleOpenCal = () => {
    window.open(getCalUrl(), '_blank')
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className='fixed bottom-2 md:bottom-6 right-2 md:right-6 z-50 pl-2'
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
            duration: 0.3
          }}
        >
          <Card className='group max-w-md shadow-lg shadow-[#10b981]/10'>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-lg font-bold text-white'>
                  Want to discuss your project?
                </CardTitle>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={handleClose}
                  className='absolute top-2 right-2 md:opacity-0 group-hover:opacity-100 transition-opacity duration-150'
                >
                  <XMarkIcon className='h-4 w-4' />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className='text-sm text-gray-600 dark:text-gray-300 mb-4'>
                        I am currently available to start new projects.
        Book your slot and let's get started right now!
              </CardDescription>
              {slots.length > 0 && !isLoading && (
                <div className='space-y-3 mb-4'>
                  <div className='flex items-center gap-2 mb-3'>
                    <ClockIcon className='size-4 text-[#059669]' />
                    <span className='text-sm font-medium text-[#047857] dark:text-[#6ee7b7]'>
                      Next available slots
                    </span>
                  </div>
                  <div className='space-y-2 max-h-32 overflow-y-auto'>
                    {slots.slice(0, 5).map((slot, index) => (
                      <div key={index} className='flex items-center justify-between p-2 bg-card rounded-lg border border-border'>
                        <div className='flex items-center gap-2'>
                          <div className='size-2 bg-[#059669] rounded-full'></div>
                          <span className='text-xs text-card-foreground'>
                            {formatSlotTime(slot)}
                          </span>
                        </div>
                      </div>
                    ))}
                    {slots.length > 5 && (
                      <div className='text-xs text-gray-400 text-center'>
                        +{slots.length - 5} other slots available
                      </div>
                    )}
                  </div>
                  <div className='flex flex-row flex-wrap md:flex-nowrap gap-2 text-xs'>
                    <div className='flex items-center gap-2 flex-nowrap text-nowrap'>
                      <span className='text-gray-400 text-nowrap'>Response time</span>
                      <span className='font-semibold text-white text-nowrap'>~30 min</span>
                    </div>
                    <div className='flex items-center gap-2 flex-nowrap text-nowrap'>
                      <span className='text-gray-400 text-nowrap'>Available slots</span>
                      <span className='font-semibold text-white text-nowrap'>
                        {availableSlotsCount} this week
                      </span>
                    </div>
                  </div>
                </div>
              )}
              {isLoading && (
                <div className='flex items-center justify-center p-4'>
                  <div className='size-6 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                  <span className='ml-2 text-sm text-white'>Checking availability...</span>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleOpenCal}
                className='w-full group/cta'
                size='md'
                variant='primary'
                shiny
              >
                Book now
                <ArrowRightIcon className='w-4 h-4 ml-2 group-hover/cta:translate-x-1 transition-transform duration-150' />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
