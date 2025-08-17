'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { XMarkIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

interface LinkedInPopupProps {
  delay?: number
}

export default function LinkedInPopup({ delay = 0 }: LinkedInPopupProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const isPopupClosed = document.cookie
      .split('; ')
      .find(row => row.startsWith('linkedin-popup-closed='))

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
    expires.setTime(expires.getTime() + (60 * 60 * 1000))
    document.cookie = `linkedin-popup-closed=true; expires=${expires.toUTCString()}; path=/`
    setIsVisible(false)
  }

  const handleOpenLinkedIn = () => {
    window.open('https://www.linkedin.com/in/louis-langanay', '_blank')
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className='fixed bottom-2 md:bottom-6 right-2 pl-2 md:right-6 z-50'
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
          <Card className='group max-w-md shadow-lg shadow-[#0a66c2]/5'>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <CardTitle className='text-lg font-bold'>
                    Connectons-nous sur
                  </CardTitle>
                  <Image
                    src='/linkedin.svg'
                    alt='LinkedIn'
                    width={80}
                    height={80}
                  />
                </div>
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
                Your project has been dragging on for 3 months? I've delivered several projects this year. All my clients are satisfied. Do you want to finally move forward or continue procrastinating? 💪
              </CardDescription>
              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                                      <span className='text-sm text-gray-400'>Experience</span>
                  <span className='font-semibold text-[#0a66c2]'>+3 ans</span>
                </div>
                <div className='flex items-center justify-between'>
                                      <span className='text-sm text-gray-400'>Followers</span>
                  <span className='font-semibold text-[#0a66c2]'>+610</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleOpenLinkedIn}
                className='w-full group/cta font-semibold rounded-full bg-[#0a66c2] hover:bg-[#0a66c2]/80 text-white border-[#0a66c2] hover:border-[#0a66c2]/80'
                size='md'
              >
                Se connecter
                <ArrowRightIcon className='w-4 h-4 ml-2 group-hover/cta:translate-x-1 transition-transform duration-150' />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
