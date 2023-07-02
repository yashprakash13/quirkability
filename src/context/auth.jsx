import { createContext, useContext, useState, useEffect } from "react"
import { supabase } from "../services/supabase"
import { deleteFromCache, readFromCache, writeToCache } from "../utils"

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState()
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let gotSession = readFromCache(
      import.meta.env.VITE_STRIPE_USER_SESSION_KEY_FOR_STORAGE
    )
    if (gotSession) {
      console.log("Retrieved: ", gotSession)
      setSession(gotSession)
      setUser(gotSession.user)
    }
    async function getSession() {
      const { subscription } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (session) {
            console.log("New session: ", session)
            setUser(session.user)
            writeToCache(
              import.meta.env.VITE_STRIPE_USER_SESSION_KEY_FOR_STORAGE,
              session
            )
            setSession(session)
          } else {
            deleteFromCache(
              import.meta.env.VITE_STRIPE_USER_SESSION_KEY_FOR_STORAGE
            )
            deleteFromCache(
              import.meta.env.VITE_STRIPE_USER_ACCOUNT_KEY_FOR_STORAGE
            )
            setSession(null)
            setUser(null)
            setLoading(false)
          }
        }
      )
      return () => {
        subscription?.unsubscribe()
      }
    }
    getSession()
  }, [])
  useEffect(() => {
    if (user) {
      setLoading(false)
    }
  }, [user])

  const value = {
    signUp: (data) => supabase.auth.signUp(data),
    logIn: (data) => supabase.auth.signInWithPassword(data),
    signOut: () => supabase.auth.signOut(),
    user,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
