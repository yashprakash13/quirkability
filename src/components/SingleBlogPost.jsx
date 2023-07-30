import React from "react"
import { Link } from "react-router-dom"

const SingleBlogPost = ({ name, onelinerdesc, link }) => {
  return (
    <div className="flex flex-col w-full h-52 md:w-80 md:h-96 gap-7 border-sm shadow-sm border-secondary-focus font-serif p-5 rounded-br-2xl ">
      <Link
        className="text-xl md:text-2xl lg:text-3xl hover:underline "
        to={link}
      >
        {name}
      </Link>
      <div className="text-md md:text-lg lg:text-xl">{onelinerdesc}</div>
    </div>
  )
}

export default SingleBlogPost
