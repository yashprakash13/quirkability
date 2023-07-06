import React from "react"

const Maintenance = () => {
  return (
    <div className="container flex flex-col mx-auto p-3">
      <div className="text-2xl font-bold font-serif text-secondary-focus cursor-pointer">
        quirkability
      </div>
      <div className="text-2xl font-serif text-secondary-focus mt-12">
        We're currently under maintenance. Get more information and support on{" "}
        <a
          href="https://twitter.com/csandyash"
          target="_blank"
          className="text-light-highlight underline"
        >
          Twitter
        </a>
        .
      </div>
    </div>
  )
}

export default Maintenance
