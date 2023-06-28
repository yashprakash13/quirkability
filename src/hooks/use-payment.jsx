import { useEffect, useState } from "react"
import { getStripeId } from "../services/supabaseHelpers"
import { readFromCache, writeToCache } from "../utils"

const usePayment = (user) => {
  const [stripeId, setStripeId] = useState(null)

  useEffect(() => {
    async function fetchData() {
      if (user) {
        if (readFromCache("sub_account_id")) {
          console.log("Read stripe id from cache.")
          setStripeId(readFromCache("sub_account_id"))
        } else {
          console.log("Fetching stripe id from db.")
          const stripe_connect_id = await getStripeId(user.id)
          setStripeId(stripe_connect_id)
          writeToCache("sub_account_id", stripe_connect_id)
        }
      }
    }
    fetchData()
  }, [user])

  return { stripeId, setStripeId }
}

export default usePayment
