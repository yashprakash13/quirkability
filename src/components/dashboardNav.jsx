import { useState } from "react"
import { Link } from "react-router-dom"

const DashboardNav = () => {
  // 0, 1, and 2 for Products, Audience, and Settings routes respectively.
  let [activeRoute, setActiveRoute] = useState(4) // this can just be a random number which makes sure that as soon as we go away from this component, to, for eg. the Dashboard, it resets to 4 and none of the links looks active anymore.

  return (
    <div className="flex justify-center items-center border-md rounded-br-xl p-3 border-secondary-focus space-x-5 w-[300px] md:w-[350px]">
      <Link
        to="/dashboard/products"
        onClick={() => setActiveRoute(0)}
        className={
          activeRoute === 0
            ? "text-lg md:text-xl text-warning-dark"
            : "text-lg md:text-xl text-secondary-focus hover:text-warning-dark"
        }
      >
        Products
      </Link>
      <Link
        to="/dashboard/audience"
        onClick={() => setActiveRoute(1)}
        className={
          activeRoute === 1
            ? "text-lg md:text-xl text-warning-dark"
            : "text-lg md:text-xl text-secondary-focus hover:text-warning-dark"
        }
      >
        Audience
      </Link>
      <Link
        to="/dashboard/settings"
        onClick={() => setActiveRoute(2)}
        className={
          activeRoute === 2
            ? "text-lg md:text-xl text-warning-dark"
            : "text-lg md:text-xl text-secondary-focus hover:text-warning-dark"
        }
      >
        Settings
      </Link>
    </div>
  )
}

export default DashboardNav
