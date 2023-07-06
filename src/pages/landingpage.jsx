import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowRightIcon } from "@heroicons/react/24/outline"
import { useAuth } from "../context/auth"
import { checkUsernameAvailability } from "../services/supabaseHelpers"
import LandingPageScreenshot from "../assets/landingPageScreenshot"
import Accordian from "../components/Accordian"
import MadeByFooter from "../components/MadeByFooter"

const LandingPage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [username, setUsername] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (user) {
      navigate("/dashboard")
    }
  }, [user])

  useEffect(() => {
    document.title =
      "Quirkability | Sell digital products and services at low fees"
  }, [])

  function handleInputChange(e) {
    setUsername(e.target.value)
  }

  async function handleUsername() {
    console.log("Got username=> ", username)
    if (username === "") {
      setError("Please select a username of 3 letters or more.")
      return
    } else if (username.length < 3) {
      setError("Your username needs to be at least 3 letters or more.")
      return
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError("Username can only contain alphabets, numbers, or underscores")
    }
    let result = await checkUsernameAvailability(username)
    if (result) {
      setError("This username is taken, sorry!")
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
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-5 mt-7">
        <div className="flex flex-col md:flex-row gap-5 md:items-center w-full basis-4/5">
          <div className="flex-auto text-lg md:text-2xl font-serif">
            quirkability.xyz /
          </div>
          <input
            type="text"
            className="flex-auto text-md md:text-lg px-2 py-2 basis-3/4 border-md border-secondary-focus focus:outline-warning-dark focus:rounded-none"
            placeholder="BruceWayne"
            name="username"
            onChange={(e) => {
              setError(null)
              handleInputChange(e)
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
      {error && <div className="text-lg text-alert-dark">{error}</div>}
      <div
        className="mt-16 text-2xl font-serif md:text-3xl lg:text-5xl py-4 leading-normal w-full"
        id="features"
      >
        Sell your{" "}
        <span className="font-serif font-thin text-warning-dark">
          courses, eBooks, audiobooks, links, templates, art, courses and more!
        </span>
      </div>
      <div className="">
        <LandingPageScreenshot />
      </div>
      <div className="mt-16" id="pricing">
        <Accordian
          data={[
            {
              heading: "We'll only take 3% fees.",
              body: "Total fees you'll pay on every sale is 3% to us + Stripe fees.",
            },
            {
              heading: "How do I get paid?",
              body: "You'll be able to connect your Stripe account to get payments directly into your Stripe account.",
            },
          ]}
        />
      </div>

      <div className="flex flex-col gap-11 w-full mb-36">
        <div className="text-2xl font-serif md:text-3xl lg:text-5xl font-medium">
          Start selling{" "}
          <span className="font-serif text-warning-dark"> today</span>
        </div>
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 ">
          <div className="flex flex-col md:flex-row gap-4 md:items-center w-full basis-4/5">
            <div className="flex-auto text-lg md:text-2xl font-serif">
              quirkability.xyz /
            </div>
            <input
              type="text"
              className="flex-auto text-md md:text-lg px-2 py-2 basis-3/4 border-md border-secondary-focus focus:outline-warning-dark focus:rounded-none"
              placeholder="BruceWayne"
              name="username"
              onChange={(e) => {
                setError(null)
                handleInputChange(e)
              }}
            />
          </div>
          <div
            className="inline-flex basis-1/6 gap-2 items-center text-lg font-bold px-6 py-2 cursor-pointer bg-secondary-default text-white  border-secondary-focus rounded-br-2xl hover:text-secondary-default hover:bg-primary-default hover:border-md hover:border-secondary-focus transition-all duration-300 sm:mt-4 lg:mt-0"
            onClick={handleUsername}
          >
            Get started
            <ArrowRightIcon className="h-5 w-5 font-bold" />
          </div>
        </div>
        {error && <div className="text-lg text-alert-dark">{error}</div>}
      </div>
      <MadeByFooter />
    </div>
  )
}

export default LandingPage
