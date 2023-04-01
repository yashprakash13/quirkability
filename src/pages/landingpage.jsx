import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowRightIcon } from "@heroicons/react/24/outline"
import { useAuth } from "../context/auth"
import { checkUsernameAvailability } from "../services/supabaseHelpers"

const LandingPage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const usernameRef = useRef()

  const [error, setError] = useState(null)

  useEffect(() => {
    if (user) {
      navigate("/dashboard")
    }
  }, [user])

  useEffect(() => {
    document.title = "Quirkability"
  }, [])

  async function handleUsername() {
    let username = usernameRef.current.value
    if (username === "") {
      setError("Please select a username of 3 letters or more for yourself.")
      return
    } else if (username.length <= 3) {
      setError("Your username needs to be 3 letters or more.")
      return
    }
    let result = await checkUsernameAvailability(username)
    if (result) {
      setError("That username is taken, sorry!")
    } else {
      navigate("/signup", {
        state: {
          username: username,
        },
      })
      setError(null)
    }
  }

  return (
    <div className="container mx-auto flex flex-col gap-4 mt-5 md:mt-20 p-3">
      <div className="font-serif text-4xl md:text-5xl lg:text-7xl py-4 leading-normal w-full">
        Sell your digital products at <br />
        <span className="font-serif italic text-warning-dark"> very</span> low
        fees
      </div>
      <div className="text-2xl font-sans lg:w-4/5">
        Use <span className="font-bold">quirkability</span> to quickly spin up a
        store and sell digital downloads and courses to your audience.{" "}
      </div>
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3 mt-7">
        <div className="flex flex-col md:flex-row gap-2 md:items-center w-full basis-4/5">
          <div className="flex-auto text-md md:text-2xl font-sans">
            quirkability.com /
          </div>
          <input
            type="text"
            className="flex-auto text-md md:text-lg px-2 py-2 basis-3/4 border-md border-secondary-focus focus:outline-warning-dark focus:rounded-none"
            placeholder="BruceWayne"
            name="username"
            ref={usernameRef}
            onChange={() => {
              setError(null)
            }}
          />
        </div>
        <div
          className="inline-flex basis-1/5 gap-2 items-center text-lg font-bold px-6 py-2 cursor-pointer bg-secondary-default text-white  border-secondary-focus rounded-br-2xl hover:text-secondary-default hover:bg-primary-default hover:border-md hover:border-secondary-focus transition-all duration-300 sm:mt-4 lg:mt-0"
          onClick={handleUsername}
        >
          Make your store
          <ArrowRightIcon className="h-5 w-5 font-bold" />
        </div>
      </div>
      {error && <div className="text-lg text-red-500">{error}</div>}
    </div>
  )
}

export default LandingPage
