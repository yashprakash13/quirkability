import { useEffect, useState } from "react"
import { getStripeId } from "../services/supabaseHelpers"
import { readFromCache, writeToCache } from "../utils"

const usePayment = (user) => {
  const [stripeId, setStripeId] = useState(null)
  const [loadingStripeData, setLoadingData] = useState(true)
  useEffect(() => {
    async function fetchData() {
      if (user) {
        setLoadingData(true)
        console.log("Fetching stripe id from db.")
        const stripe_connect_id = await getStripeId(user.id)
        setStripeId(stripe_connect_id)
      }
      setLoadingData(false)
    }
    fetchData()
  }, [user])

  return { stripeId, setStripeId, loadingStripeData }
}

export default usePayment
