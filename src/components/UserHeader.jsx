import React from "react"
import { Link } from "react-router-dom"
import { getSupabaseProfilePicURL } from "../utils"
import DefaultProfilePic from "../assets/defaultProfilePic"

const UserHeader = ({ name, bio, pic_url }) => {
  return (
    <div className="bg-primary-default border-sm border-secondary-focus shadow-sm flex rounded-br-lg flex-col md:flex-row justify-center items-center px-7 py-3 gap-7">
      {pic_url ? (
        <img
          src={getSupabaseProfilePicURL(pic_url)}
          className="rounded-full w-32 h-32 md:w-32 md:h-32"
        />
      ) : (
        <DefaultProfilePic
          classStyles={
            "w-28 h-28 rounded-full border-sm border-secondary-focus"
          }
        />
      )}
      <div className="flex flex-col justify-center items-center md:items-start gap-4">
        <Link
          className="text-2xl font-medium font-serif cursor-pointer hover:underline"
          to={`/${name}`}
          target="_blank"
        >
          {name}
        </Link>
        <div className="text-lg text-center md:text-left">{bio}</div>
      </div>
    </div>
  )
}

export default UserHeader
