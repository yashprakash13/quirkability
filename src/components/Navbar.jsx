import React from "react"
import Logo from "./Logo"
import { Link } from "react-router-dom"
import { Bars3Icon } from "@heroicons/react/24/outline"

const Navbar = () => {
  return (
    <div className="container mx-auto flex justify-between items-center space-x-3 mb-6 p-3">
      <Logo />
      <div className="hidden md:flex justify-around items-center space-x-3">
        <div className="text-lg font-bold text-secondary-default font-sans cursor-pointer hover:underline transition-all duration-300">
          FEATURES
        </div>
        <div className="text-lg font-bold text-secondary-default font-sans cursor-pointer hover:underline transition-all duration-300">
          PRICING
        </div>
      </div>
      <Link
        to="/login"
        className="hidden md:block bg-primary-default text-secondary-default font-bold text-lg border-sm border-secondary-focus py-1 px-6 cursor-pointer rounded-br-xl hover:bg-primary-focus transition-all duration-300"
      >
        Login
      </Link>
      <Bars3Icon className="h-7 w-7 md:hidden cursor-pointer" />
    </div>
  )
}

export default Navbar
