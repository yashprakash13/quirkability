import React from "react"

const UserProductSingle = ({ id, name, pic_url, onClick }) => {
  return (
    <div className="flex flex-row md:flex-col justify-start items-center p-5 md:p-11 gap-5 border-xs bg-primary-default border-secondary-focus rounded-br-xl w-full h-32 md:w-[350px] md:h-[450px]">
      <img
        src={pic_url}
        className="h-24 w-24 md:w-72 md:h-72 border-xs border-secondary-focus"
      />
      <div
        className="text-lg md:text-2xl font-medium cursor-pointer hover:underline"
        onClick={() => {
          onClick(id)
        }}
      >
        {name}
      </div>
    </div>
  )
}

export default UserProductSingle
