import usePayment from "../../hooks/use-payment"
import { useAuth } from "../../context/auth"
import { createStripeConnectAccount } from "../../services/backendCalls"
import { useEffect, useState } from "react"
import {
  getUserDetailsFromId,
  updateUserprofileTable,
} from "../../services/supabaseHelpers"
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { toast } from "react-toastify"
import { ClipLoader } from "react-spinners"

const Settings = () => {
  const { user } = useAuth()
  const { stripeId, setStripeId } = usePayment(user)
  console.log("StripeId = ", stripeId)

  const [bioTextAreaActivated, setBioTextAreaActivated] = useState(false)
  const [bio, setBio] = useState(null)
  const [bioTextArea, setBioTextArea] = useState(null)
  const [loading, setLoading] = useState(false)

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

  async function getBio() {
    const bioText = await getUserDetailsFromId(user.id, "bio")
    setBio(bioText.bio)
    setBioTextArea(bioText.bio)
  }

  useEffect(() => {
    if (user) {
      getBio()
    }
  }, [])

  const handleBioChange = async () => {
    // insert updated Bio
    setLoading(true)
    const result = await updateUserprofileTable(user.id, {
      bio: bioTextArea.trim(),
    })
    console.log(result)
    if (result) {
      toast.success("Bio was updated successfully!", {
        toastId: "success1", // this id field is necessary because it helps make the toast show only once.
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    } else {
      toast.error("Something went wrong. Couldn't update your bio.", {
        toastId: "error1", // this id field is necessary because it helps make the toast show only once.
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
    setLoading(false)
    setBioTextAreaActivated(false)
    getBio()
  }

  return (
    <div className="container mx-auto flex flex-col p-3 gap-11 mt-11">
      <div className="flex flex-col justify-start gap-7 md:gap-11">
        <div className="text-2xl font-medium">Profile Picture</div>
        <div className="flex flex-col md:flex-row justify-start md:justify-between md:items-center gap-5">
          <div className="flex flex-col md:flex-row gap-7 md:items-center">
            <img
              src="https://source.unsplash.com/Ud4bLEy4gC0"
              className="rounded-full w-36 h-36"
            />
            <div className="text-md md:text-lg font-serif w-full md:w-3/5">
              Your photo will appear on your store and in all your products. It
              should be at least 200px x 200px in size and can be in JPG or PNG
              formats.
            </div>
          </div>
          <div
            className="w-2/3 md:w-1/3 lg:w-1/5 text-lg md:text-xl font-bold flex justify-center items-center border-sm rounded-br-2xl px-7 py-2 text-primary-default bg-secondary-focus cursor-pointer hover:bg-primary-default hover:text-secondary-focus transition-all duration-300"
            //
          >
            Change
          </div>
        </div>
      </div>
      <div className="w-full border-t-sm border-light-highlight opacity-25"></div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between">
          <div className="text-2xl font-medium">Bio</div>
          <div
            className="flex flex-row gap-1 items-center hover:cursor-pointer"
            onClick={() => setBioTextAreaActivated(!bioTextAreaActivated)}
          >
            {bioTextAreaActivated ? (
              <div className="flex">
                <XMarkIcon className="h-5 w-5 text-light-highlight" />
              </div>
            ) : (
              <>
                <div className="text-xl text-light-highlight hover:text-secondary-focus">
                  Edit
                </div>
                <PencilIcon className="text-light-highlight h-4 w-4" />
              </>
            )}
          </div>
        </div>
        {!bioTextAreaActivated ? (
          <div className="text-xl">{bio}</div>
        ) : (
          <div className="flex flex-col gap-3">
            <textarea
              className="border-sm rounded-br-2xl border-secondary-focus bg-primary-default w-full h-40 md:h-48 px-3 py-3 focus:outline-none"
              placeholder="A brief bio (maximum 300 characters)"
              maxLength={300}
              value={bioTextArea}
              onChange={(e) => setBioTextArea(e.target.value)}
            />
            <div
              className="w-2/3 md:w-1/3 lg:w-1/4 text-secondary-focus bg-primary-default px-4 py-2 border-sm border-secondary-focus font-serif text-center rounded-br-2xl shadow-sm hover:shadow-none hover:text-primary-default hover:bg-secondary-focus transition-all duration-300 hover:cursor-pointer"
              onClick={handleBioChange}
            >
              {loading ? (
                <ClipLoader color="#EFEDE4" loading={true} size={20} />
              ) : (
                "Confirm"
              )}
            </div>
          </div>
        )}
      </div>
      <div className="w-full border-t-sm border-light-highlight opacity-25"></div>
      <div className="flex flex-col gap-3">
        <div className="text-2xl font-medium">Payment Methods</div>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center justify-start gap-5">
          <div className="text-xl">Connect your Stripe Account</div>
          <div
            className="w-2/3 md:w-1/3 lg:w-1/6 text-lg md:text-xl font-bold flex justify-center items-center border-sm rounded-br-2xl px-7 py-2 text-primary-default bg-secondary-focus cursor-pointer hover:bg-primary-default hover:text-secondary-focus  transition-all duration-300"
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
