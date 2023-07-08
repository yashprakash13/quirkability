import { useEffect, useState } from "react"
import { getStripeId } from "../services/supabaseHelpers"
import { readFromCache, writeToCache } from "../utils"

const usePayment = (user) => {
  const [stripeId, setStripeId] = useState(null)

  useEffect(() => {
    async function fetchData() {
      if (user) {
        console.log("Fetching stripe id from db.")
        const stripe_connect_id = await getStripeId(user.id)
        setStripeId(stripe_connect_id)
        writeToCache(
          import.meta.env.VITE_STRIPE_USER_ACCOUNT_KEY_FOR_STORAGE,
          stripe_connect_id
        )
      }
    }
    fetchData()
  }, [user])

  return { stripeId, setStripeId }
}

export default usePayment
