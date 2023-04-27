import React, { useEffect } from "react"
import usePayment from "../../hooks/use-payment"
import { useAuth } from "../../context/auth"
import { createStripeConnectAccount } from "../../services/backendCalls"

const Settings = () => {
  const { user } = useAuth()
  const { stripeId, setStripeId } = usePayment(user)
  console.log("StripeId = ", stripeId)
  async function handleStripeConnect() {
    if (!stripeId) {
      // start connect to stripe workflow
      const [connected_account_id, redirect_url] =
        await createStripeConnectAccount(user.id, user.email)
      if (connected_account_id && redirect_url) {
        setStripeId(connected_account_id)
        window.open(redirect_url, "_blank")
      }
    }
  }

  return (
    <div className="container mx-auto flex flex-col p-3 gap-11 mt-11">
      <div className="flex flex-col gap-3">
        <div className="text-2xl font-medium">Bio</div>
        <textarea
          className="border-sm rounded-br-2xl border-secondary-focus bg-primary-default w-full h-40 md:h-48 px-3 py-3 focus:outline-none"
          placeholder="A brief bio (maximum 300 characters)"
          maxLength={300}
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-2xl font-medium">Payment Methods</div>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center justify-start gap-5">
          <div className="text-xl">Connect your Stripe Account</div>
          <div
            className="text-lg md:text-xl font-bold flex justify-center items-center border-sm rounded-br-2xl w-32 md:w-40 h-12 md:h-14 text-primary-default bg-secondary-focus cursor-pointer hover:bg-primary-default hover:text-secondary-focus  transition-all duration-300"
            onClick={handleStripeConnect}
          >
            {!stripeId ? "Connect" : "Connected"}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
