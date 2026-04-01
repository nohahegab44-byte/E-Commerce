"use client"
import { SessionProvider } from 'next-auth/react'
import React from 'react'

interface MySessionProviderProps {
  children: React.ReactNode
}

export default function MySessionProvider({ children }: MySessionProviderProps) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}