import React from "react"
import { Link } from "react-router-dom"

const Error = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen">
      <div className="text-3xl font-bold">Uh oh! We’ve got a problem</div>
      <div className="text-lg">The page you're looking for doesn't exist.</div>
      <Link
        to="/"
        className="text-lg border-2  bg-red-500 text-indigo-100 py-2 px-4 cursor-pointer hover:border-3 hover:border-orange-400 transition-all duration-300"
      >
        Go back
      </Link>
    </div>
  )
}

export default Error
