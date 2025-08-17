'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { XMarkIcon, ArrowTopRightOnSquareIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

interface MaltPopupProps {
  delay?: number
}

export default function MaltPopup({ delay = 0 }: MaltPopupProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const isPopupClosed = document.cookie
      .split('; ')
      .find(row => row.startsWith('malt-popup-closed='))

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
    document.cookie = `malt-popup-closed=true; expires=${expires.toUTCString()}; path=/`
    setIsVisible(false)
  }

  const handleOpenMalt = () => {
    window.open('https://www.malt.fr/profile/louislanganay', '_blank')
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
          <Card className='group max-w-md shadow-lg shadow-[#fc5757]/5'>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <CardTitle className='text-lg font-bold'>
                    Je suis disponible sur
                  </CardTitle>
                  <Image
                    src='/malt.png'
                    alt='Malt'
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
                Louis Langanay est actuellement en <div className='size-2 ml-1 bg-green-500 rounded-full inline-block relative'><div className='size-2 bg-green-500 rounded-full absolute animate-ping'></div></div> ligne, envoyez-lui un message pour discuter de votre projet !
              </CardDescription>
              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-gray-500 dark:text-gray-400'>TJM moyen</span>
                  <span className='font-semibold text-[#fc5757]'>~300€</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-gray-500 dark:text-gray-400'>Response time</span>
                  <span className='font-semibold text-green-600 dark:text-green-400'>~1h</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleOpenMalt}
                className='w-full group/cta font-light rounded-full bg-[#fc5757] hover:bg-[#fc5757]/80 text-white border-[#fc5757] hover:border-[#fc5757]/80'
                size='md'
              >
                Proposer une mission
                <ArrowRightIcon className='w-4 h-4 ml-2 group-hover/cta:translate-x-1 transition-transform duration-150' />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
