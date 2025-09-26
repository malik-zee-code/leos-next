"use client"
import { jwtDecode } from "jwt-decode"
import React, { createContext, useContext, useEffect, useState } from "react"

type User = {
  // Adjust these fields to match your JWT payload
  email?: string
  firstName?: string
  lastName?: string
  [key: string]: any
}

type AuthContextType = {
  user: User | null
  accessToken: string | null
  setAccessToken: (token: string | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessTokenState] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)

  const setAccessToken = (token: string | null) => {
    setAccessTokenState(token)
    if (token) {
      localStorage.setItem("accessToken", token)
    } else {
      localStorage.removeItem("accessToken")
    }
  }

  // Load initial token from localStorage
  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    setAccessTokenState(token)
  }, [])

  // Decode user data whenever accessToken changes
  useEffect(() => {
    if (accessToken) {
      try {
        setUser(jwtDecode<User>(accessToken))
      } catch {
        setUser(null)
      }
    } else {
      setUser(null)
    }
  }, [accessToken])

  return (
    <AuthContext.Provider value={{ user, accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}
