import React, { useRef, useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
// import { useAuth } from "../contexts/auth"
// import { insertIntoUserprofileTable } from "../services/supabaseHelpers"

const Signup = () => {
  const emailRef = useRef()
  const passwordRef = useRef()

  //   const { user } = useAuth()

  //   const { signUp } = useAuth()
  //   const navigate = useNavigate()

  //   const location = useLocation()

  let [errorSignup, seterrorSignup] = useState("")

  //   async function handleSignup(e) {
  //     e.preventDefault()

  //     const email = emailRef.current.value
  //     const password = passwordRef.current.value

  //     // const { data, error } = await signUp({ email, password })

  //     if (error) {
  //       console.log(error)
  //       seterrorSignup(error)
  //     } else {
  //       seterrorSignup("")
  //       console.log("Inserting username...")
  //       insertIntoUserprofileTable(data.user.id, location.state.username)
  //       console.log("Done.")
  //       navigate("/dashboard")
  //     }
  //   }

  //   useEffect(() => {
  //     if (user) {
  //       navigate("/dashboard")
  //     }
  //   }, [user])

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <form
        className="mx-auto max-w-screen-2xl px-4 md:px-8"
        // onSubmit={handleSignup}
      >
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">
          Hello <span className="font-thin">{location.state.username}</span>,
          signup here!
        </h2>

        <div className="mx-auto max-w-lg rounded-lg border">
          <div className="flex flex-col gap-4 p-4 md:p-8">
            <div>
              <div className="text-md text-red-600">{errorSignup.message}</div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
              >
                Email
              </label>
              <input
                name="email"
                type="email"
                ref={emailRef}
                onChange={() => seterrorSignup("")}
                required
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
              >
                Password
              </label>
              <input
                name="password"
                ref={passwordRef}
                type="password"
                onChange={() => seterrorSignup("")}
                required
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              />
            </div>

            <button
              type="submit"
              className="block rounded-lg bg-gray-800 mt-5 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base"
            >
              Sign up
            </button>
          </div>

          <div className="flex items-center justify-center bg-gray-100 p-4">
            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Signup
