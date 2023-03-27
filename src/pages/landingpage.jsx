import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
// import { useAuth } from "../contexts/auth"
// import { checkUsernameAvailability } from "../services/supabaseHelpers"

const LandingPage = () => {
  //   const { user } = useAuth()
  const navigate = useNavigate()

  const usernameRef = useRef()

  const [error, setError] = useState(null)

  //   useEffect(() => {
  //     if (user) {
  //       navigate("/dashboard")
  //     }
  //   }, [user])

  //   async function handleUsername() {
  //     let username = usernameRef.current.value
  //     let result = await checkUsernameAvailability(username)
  //     if (result) {
  //       setError("That username is taken, sorry!")
  //     } else {
  //       navigate("/signup", {
  //         state: {
  //           username: username,
  //         },
  //       })
  //       setError(null)
  //     }
  //   }

  return (
    <div className="flex flex-col gap-4 ">
      <div className="tex-lg px-2 py-4">I am the LandingPage.</div>
      <div className="flex flex-col md:flex-row gap-3">
        <input
          type="text"
          className="text-lg px-2 py-2 w-96 border-2 border-gray-600 focus:outline-success-dark focus:rounded-none"
          placeholder="BruceWayne"
          name="username"
          ref={usernameRef}
          onChange={() => {
            setError(null)
          }}
        />
        <div
          className="text-lg border-2 border-secondary-focus px-4 py-2 cursor-pointer bg-white shadow-sm rounded-br-2xl hover:shadow-none transition-all duration-300"
          //   onClick={handleUsername}
        >
          Create your store
        </div>
      </div>
      {error && <div className="text-lg text-red-500">{error}</div>}
    </div>
  )
}

export default LandingPage
