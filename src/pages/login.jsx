import React, { useRef, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/auth"

const Login = () => {
  const emailRef = useRef()
  const passwordRef = useRef()

  const { user } = useAuth()

  const { logIn } = useAuth()

  let [errorLogin, seterrorLogin] = useState("")

  async function handleLogIn(e) {
    e.preventDefault()

    const email = emailRef.current.value
    const password = passwordRef.current.value

    const { error } = await logIn({ email, password })

    if (error) {
      console.log(error)
      seterrorLogin(error)
    } else {
      seterrorLogin("")
      console.log("Called 3")
      window.location.reload(false)
    }
  }

  return (
    <form
      className="flex flex-col mx-auto mt-5 md:mt-28 p-4 pb-7 md:px-8 bg-primary-default w-11/12 md:w-2/3 lg:w-1/2 rounded-br-3xl "
      onSubmit={handleLogIn}
    >
      <h1 className="font-serif mb-0 text-center text-2xl font-bold text-secondary-focus md:mb-4 lg:text-3xl">
        Login
      </h1>
      <div className="flex flex-col gap-4">
        <div>
          <div className="mt-5 text-md text-alert-dark">
            {errorLogin.message}
          </div>
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
          Log in
        </button>
      </div>
      <div className="mt-11 border-xs text-light-highlight opacity-25"></div>
      <div className="mt-11 text-center text-xl text-secondary-focus">
        Don't have an account?
      </div>
      <div className="mt-7 text-center text-secondary-focus font-serif text-xl">
        <Link
          className="text-lg cursor-pointer bg-primary-default px-11 py-3 border-sm border-secondary-focus rounded-br-lg hover:underline hover:bg-secondary-focus hover:text-primary-focus transition-all duration-300"
          to="/"
        >
          Sign up
        </Link>
      </div>
    </form>
  )
}

export default Login
