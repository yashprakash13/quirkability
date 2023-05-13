import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid"
import React from "react"
import MadeByFooter from "../../components/MadeByFooter"

const PaymentAfter = () => {
  return (
    <div className="mb-2">
      <div className="flex flex-col container mx-auto mt-11">
        <div className="flex flex-col gap-5 justify-center items-center">
          <div className="font-thin text-2xl text-center">You bought:</div>
          <div className="font-medium text-2xl md:text-3xl font-serif text-center">
            Marketing specialization mini-course
          </div>
          <div className="font-thin text-2xl text-center">from</div>
          <div className="font-medium text-2xl md:text-3xl gap-3 font-serif cursor-pointer text-center">
            <div className="inline-flex items-center gap-3 hover:underline">
              <span>Danielle Murphy</span>
              <ArrowTopRightOnSquareIcon className="h-5 w-5 md:h-7 md:w-7" />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center border-sm border-secondary-focus mt-20 mx-1 p-5 md:p-10">
          <div className="text-2xl md:text-3xl font-medium font-serif text-center">
            Here is the link to download your product:
          </div>
          <div className="mt-11 w-full flex flex-col md:flex-row gap-5">
            <input
              className="text-xl font-serif p-4 border-sm border-secondary-focus rounded-br-lg md:basis-3/4"
              value="https://some_long_long_long_long_long_long_long_link.com"
            />
            <div className="md:basis-1/4 inline-flex items-center gap-2 justify-center text-center text-xl font-serif text-primary-default bg-secondary-focus px-5 py-3 rounded-br-lg cursor-pointer hover:bg-primary-default hover:text-secondary-focus transition-all duration-300 hover:border-sm hover:border-secondary-focus">
              Go to Product <ArrowTopRightOnSquareIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="gap-2 text-lg text-center mt-7 font-serif text-secondary-focus">
            A confirmation email is also on its way to you.
          </div>
        </div>
      </div>
      <div className="mt-40">
        <MadeByFooter />
      </div>
    </div>
  )
}

export default PaymentAfter
