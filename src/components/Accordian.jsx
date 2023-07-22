import React, { useState } from "react"

const Accordian = ({ data }) => {
  const [hide, setHidden] = useState(true)
  return (
    <div className="font-serif">
      {data &&
        data.map((item, index) => (
          <div key={index}>
            <h2
              onClick={() => {
                setHidden(!hide)
              }}
            >
              <button
                type="button"
                className=" text-2xl md:text-3xl flex items-center justify-between w-full font-medium text-left text-secondary-focus border border-b-0 border-gray-200 rounded-t-xl"
              >
                <span>{item.heading}</span>
                <svg
                  className="w-6 h-6 rotate-180 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </h2>
            <div className={`mt-7 mb-14 ${hide ? "hidden" : ""}`}>
              <div className="border border-b-0 border-slate-bars ">
                <p className="mb-2 text-secondary-default text-lg md:text-xl lg:text-2xl">
                  {item.body}
                </p>
              </div>
            </div>
            <hr className="h-px mt-7 mb-14 w-full bg-slate-bars opacity-25 border-0 dark:bg-secondary-focus"></hr>
          </div>
        ))}
    </div>
  )
}

export default Accordian
