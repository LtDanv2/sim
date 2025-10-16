'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Nav from '@/app/(landing)/components/nav/nav'
import { inter } from '@/app/fonts/inter'
import AuthBackground from './components/auth-background'

// Helper to detect if a color is dark
function isColorDark(hexColor: string): boolean {
  const hex = hexColor.replace('#', '')
  const r = Number.parseInt(hex.substr(0, 2), 16)
  const g = Number.parseInt(hex.substr(2, 2), 16)
  const b = Number.parseInt(hex.substr(4, 2), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance < 0.5
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Check if brand background is dark and add class accordingly
    const rootStyle = getComputedStyle(document.documentElement)
    const brandBackground = rootStyle.getPropertyValue('--brand-background-hex').trim()

    if (brandBackground && isColorDark(brandBackground)) {
      document.body.classList.add('auth-dark-bg')
    } else {
      document.body.classList.remove('auth-dark-bg')
    }
  }, [])
  return (
    <AuthBackground>
      <main className='relative flex min-h-screen flex-col font-geist-sans text-foreground'>
        {/* Header - Nav handles all conditional logic */}
        <Nav hideAuthButtons={true} variant='auth' />

        {/* Content */}
        <div className='relative z-30 flex flex-1 items-center justify-center px-4 pb-24'>
          <div className='w-full max-w-lg'>
            <div className='relative rounded-[24px] bg-white px-8 py-12 shadow-xl sm:px-12'>
              {children}
            </div>
          </div>
        </div>

        {/* Terms and Privacy - Fixed at bottom */}
        <div
          className={`${inter.className} absolute right-0 bottom-0 left-0 z-40 px-8 pb-8 text-center font-[340] text-[13px] text-white leading-relaxed sm:px-8 md:px-[44px]`}
        >
          By signing in, you agree to our{' '}
          <Link
            href='/terms'
            target='_blank'
            rel='noopener noreferrer'
            className='text-white underline-offset-4 transition hover:underline hover:opacity-80'
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href='/privacy'
            target='_blank'
            rel='noopener noreferrer'
            className='text-white underline-offset-4 transition hover:underline hover:opacity-80'
          >
            Privacy Policy
          </Link>
        </div>
      </main>
    </AuthBackground>
  )
}
