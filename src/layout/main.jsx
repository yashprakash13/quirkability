import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useAuth } from "../context/auth"
import { useEffect } from "react"

const Main = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate("/dashboard")
    }
  }, [])

  const handleScrollToFeatures = () => {
    const featuresSection = document.getElementById("features")
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
