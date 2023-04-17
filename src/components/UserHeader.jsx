import React from "react"

const UserHeader = ({ name, bio, pic_url }) => {
  return (
    <div className="bg-primary-default border-sm border-secondary-focus shadow-sm flex rounded-br-lg flex-col md:flex-row justify-center items-center px-7 py-3 gap-7">
      <img
        src="https://source.unsplash.com/00ByEXKcSkA/2000x2000"
        className="rounded-full w-32 h-32 md:w-32 md:h-32"
      />
      <div className="flex flex-col justify-center items-center md:items-start gap-4">
        <div className="text-2xl font-medium font-serif">{name}</div>
        <div className="text-lg text-center md:text-left">{bio}</div>
      </div>
    </div>
  )
}

export default UserHeader
