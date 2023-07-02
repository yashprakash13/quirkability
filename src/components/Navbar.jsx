import React from "react"
import Logo from "./Logo"
import { Link, useNavigate } from "react-router-dom"
import { ChevronDownIcon } from "@heroicons/react/24/outline"

import { useAuth } from "../context/auth"
import DropdownMenu from "./DropdownMenu"

const Navbar = ({ onScrollToFeatures, onScrollToPricing }) => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    let data = signOut()
    if (data.error) {
      console.log("Error signing out user.", error)
    } else {
      navigate("/")
    }
  }

  return (
    <div className="container mx-auto flex justify-between items-center space-x-3 mb-6 p-3">
      {user ? (
        <Logo />
      ) : (
        <div className="flex flex-col md:w-fit w-full ">
          <div className="flex space-x-5 justify-between items-center md:hidden">
            <div
              className="text-sm font-bold text-secondary-default font-sans cursor-pointer hover:underline transition-all duration-300"
              onClick={onScrollToFeatures && onScrollToFeatures}
            >
              FEATURES
            </div>
            <div
              className="text-sm font-bold text-secondary-default font-sans cursor-pointer hover:underline transition-all duration-300"
              onClick={onScrollToPricing && onScrollToPricing}
            >
              PRICING
            </div>
            <Link
              className="text-lg font-bold text-secondary-default font-sans cursor-pointer hover:underline transition-all duration-300"
              to="/login"
            >
              Login
            </Link>
          </div>
          <hr className="h-px mt-2 mb-4 w-full bg-slate-bars opacity-25 border-0 dark:bg-secondary-focus md:hidden"></hr>
          <Logo />
        </div>
      )}
      {!user ? (
        <>
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
        </>
      ) : (
        <div className="hidden md:flex justify-around items-center space-x-12">
          {/* <div
            className="text-lg font-bold text-secondary-default font-sans cursor-pointer hover:underline transition-all duration-300"
            onClick={handleSignOut}
          >
            SIGNOUT
          </div> */}
        </div>
      )}
      {user && (
        <div className="font-serif text-xl text-secondary-focus cursor-pointer inline-flex items-center gap-2">
          <DropdownMenu
            dropdownText={user.user_metadata.username}
            icon={<ChevronDownIcon className="h-4 w-4 text-secondary-focus" />}
            options={[{ text: "Sign Out", onClick: signOut }]}
          />
        </div>
      )}
    </div>
  )
}

export default Navbar
