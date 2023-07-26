import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useAuth } from "../context/auth"
import { useEffect } from "react"

const Main = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      console.log("Called 9")
      navigate("/dashboard")
    }
    // else { // this isn't needed as when signout is clicked, we're not on the main layout, but on the protect layout.
    //   console.log("Called 10")
    //   navigate("/")
    // }
  }, [])

  const handleScrollToFeatures = () => {
    const featuresSection = document.getElementById("how-it-works")
    featuresSection.scrollIntoView({ behavior: "smooth" })
  }

  const handleScrollToPricing = () => {
    const pricingSection = document.getElementById("pricing")
    pricingSection.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div>
      <Navbar
        onScrollToFeatures={handleScrollToFeatures}
        onScrollToPricing={handleScrollToPricing}
      />
      <div>{!user && <Outlet />}</div>
    </div>
  )
}

export default Main
