"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { getSession, logout as logoutUser, type AuthSession } from "./auth"

interface AuthContextType {
  session: AuthSession | null
  user: AuthSession["user"] | null // Added user property for easier access
  isLoading: boolean
  logout: () => void
  refreshSession: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshSession = () => {
    const currentSession = getSession()
    setSession(currentSession)
  }

  useEffect(() => {
    refreshSession()
    setIsLoading(false)
  }, [])

  const logout = () => {
    logoutUser()
    setSession(null)
  }

  return (
    <AuthContext.Provider value={{ session, user: session?.user || null, isLoading, logout, refreshSession }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
