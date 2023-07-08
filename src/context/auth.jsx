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
    async function newSession() {
      let gotSession = readFromCache(
        import.meta.env.VITE_STRIPE_USER_SESSION_KEY_FOR_STORAGE
      )
      if (gotSession) {
        console.log("Retrieved: ", gotSession)
        console.log("Trying to refresh session...")
        const access_token = gotSession.access_token
        const refresh_token = gotSession.refresh_token
        console.log("Tokens are=> ", access_token, refresh_token)
        const { data, error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        })
        console.log(data, error)
        if (error) {
          setSession(null)
          setUser(null)
        } else {
          setSession(data)
          setUser(data.user)
        }
      }
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
    newSession()
  }, [])
  useEffect(() => {
    if (user) {
      setLoading(false)
    }
  }, [user])

  const value = {
    signUp: (data) => supabase.auth.signUp(data),
    logIn: (data) => supabase.auth.signInWithPassword(data),
    signOut: () => {
      supabase.auth.signOut()
    },
    user,
    setSession,
    setUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
