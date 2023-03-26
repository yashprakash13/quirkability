import React, { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
// import Navbar from "../components/Navbar"
// import { useAuth } from "../contexts/auth"

const Main = () => {
  // const { user } = useAuth()
  const navigate = useNavigate()

  //   useEffect(() => {
  //     if (!user) {
  //       navigate("/")
  //     }
  //   }, [user])

  return (
    <div>
      {/* <Navbar /> */}
      <div className="flex justify-center items-center h-screen">
        <Outlet />
      </div>
    </div>
  )
}

export default Main
