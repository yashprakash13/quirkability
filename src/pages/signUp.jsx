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

  const location = useLocation()

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
    <form
      className="flex flex-col mx-auto mt-5 md:mt-28 p-4 md:px-8 bg-primary-default w-11/12 md:w-2/3 lg:w-1/2 rounded-br-3xl "
      // onSubmit={handleLogIn}
    >
      <h2 className="font-serif mb-0 text-center text-2xl font-bold text-secondary-focus md:mb-4 lg:text-3xl">
        Signup
      </h2>
      <div className="flex flex-col gap-4">
        <div>
          <div className="text-md text-red-600">{errorSignup.message}</div>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="mb-2 inline-block text-md text-secondary-focus"
          >
            Email
          </label>
          <input
            name="email"
            type="email"
            ref={emailRef}
            required
            className="w-full text-lg rounded border bg-white px-3 py-2 text-secondary-focus outline-none transition duration-100 focus:outline-warning-dark"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="mb-2 text-md text-secondary-focus"
          >
            Password
          </label>
          <input
            name="password"
            ref={passwordRef}
            type="password"
            required
            className="w-full text-lg rounded border bg-white px-3 py-2 text-secondary-focus outline-none transition duration-100 focus:outline-warning-dark"
          />
        </div>

        <button
          type="submit"
          className="block rounded-br-lg bg-secondary-focus mt-5 px-8 py-3 text-center text-xl font-semibold text-white outline-none ring-gray-300 transition duration-200 hover:bg-secondary-default focus-visible:ring active:bg-secondary-default"
        >
          Sign up
        </button>
      </div>

      <div className="flex items-center justify-center bg-gray-100 mt-7">
        <p className="text-center text-lg text-secondary-focus">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </p>
      </div>
    </form>
  )
}

export default Signup
