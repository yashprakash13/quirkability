import { Link } from "react-router-dom"

const Error = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen">
      <div className="text-3xl font-bold">Uh oh! We’ve got a problem</div>
      <h1 className="text-lg">
        404 - Not found! The page you're looking for doesn't exist.
      </h1>
      <Link
        to="/"
        className="text-lg border-2  bg-alert-dark text-white py-2 px-4 cursor-pointer rounded-br-lg hover:border-3 hover:border-orange-400 transition-all duration-300"
      >
        Go back
      </Link>
    </div>
  )
}

export default Error
