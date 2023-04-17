import React from "react"

const UserProductSingle = ({ name, pic_url }) => {
  return (
    <div className="flex flex-row md:flex-col justify-start items-center p-5 md:p-11 gap-5 border-lg shadow-sm bg-primary-default border-secondary-focus rounded-br-xl w-full h-32 md:w-[350px] md:h-[450px]">
      <img
        src="https://source.unsplash.com/p0OlRAAYXLY/1000x1000"
        className="h-24 w-24 md:w-72 md:h-72 border-xs border-secondary-focus"
      />
      <div className="text-lg md:text-2xl font-medium cursor-pointer hover:underline">
        {name}
      </div>
    </div>
  )
}

export default UserProductSingle
