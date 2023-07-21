import React from "react"
import { Link } from "react-router-dom"

const MadeByFooterPublic = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex gap-1">
        <div className="text-xs font-extralight font- font-serif italic">
          made with
        </div>
      </div>
      <Link
        className="text-md font-bold font-serif text-secondary-focus hover:underline"
        to="/"
        target="_blank"
      >
        Quirkability
      </Link>
    </div>
  )
}

export default MadeByFooterPublic
