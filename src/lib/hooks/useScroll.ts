'use client'

import { useState, useEffect } from 'react'



export function useScroll( Scrolled : number) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > Scrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [Scrolled])

  return isScrolled
}