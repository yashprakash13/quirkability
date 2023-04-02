import { Link } from "react-router-dom"

const DashboardNav = () => {
  return (
    <div className="flex justify-center items-center border-md rounded-br-xl p-3 border-secondary-focus space-x-5 w-[300px] md:w-[350px]">
      <Link
        to="/dashboard/products"
        className="text-lg md:text-xl hover:text-warning-dark"
      >
        Products
      </Link>
      <Link
        to="/dashboard/audience"
        className="text-lg md:text-xl hover:text-warning-dark"
      >
        Audience
      </Link>
      <Link
        to="/dashboard/settings"
        className="text-lg md:text-xl hover:text-warning-dark"
      >
        Settings
      </Link>
    </div>
  )
}

export default DashboardNav
