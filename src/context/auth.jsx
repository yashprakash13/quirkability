import { createContext, useContext, useState, useEffect } from "react"
import { supabase } from "../services/supabase"

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState()
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let gotSession = localStorage.getItem("authSession")
    if (gotSession) {
      console.log("Retrieved: ", gotSession)
      setSession(JSON.parse(gotSession))
      setUser(JSON.parse(gotSession).user)
    }
    async function getSession() {
      const { subscription } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (session) {
            console.log("New session: ", session)
            setUser(session.user)
            localStorage.setItem("authSession", JSON.stringify(session))
            setSession(session)
          } else {
            localStorage.removeItem("authSession")
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
