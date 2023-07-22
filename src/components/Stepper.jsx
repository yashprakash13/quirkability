import { ArrowDownIcon } from "@heroicons/react/24/outline"
import React from "react"

const Stepper = () => {
  return (
    <div>
      {/* mobile/tab screens only */}
      <ol class="lg:hidden relative text-secondary-focus border-l-sm border-light-highlight font-serif ">
        <li class="mb-7 ml-6">
          <span class="absolute flex items-center justify-center w-8 h-8 bg-primary-default rounded-full -left-4 ring-4 ring-warning-dark dark:ring-gray-900 dark:bg-green-900">
            <div className="text-xl">1</div>
          </span>
          <h3 class="ml-2 font-medium leading-tight text-2xl">
            Make your store
          </h3>
          <p class=" ml-2 text-md">Sign up and create your store.</p>
        </li>
        <li class="mb-7 ml-6">
          <span class="absolute flex items-center justify-center w-8 h-8 bg-gray-100 bg-primary-default rounded-full -left-4 ring-4 ring-warning-dark dark:ring-gray-900 dark:bg-gray-700">
            <div className="text-xl">2</div>
          </span>
          <h3 class=" ml-2 font-medium leading-tight text-2xl">
            List your products
          </h3>
          <p class="ml-2  text-md">
            Connect your Stripe Account and list your products in your store.
          </p>
        </li>
        <li class="ml-6">
          <span class="absolute flex items-center justify-center w-8 h-8 bg-gray-100 bg-primary-default rounded-full -left-4 ring-4 ring-warning-dark dark:ring-gray-900 dark:bg-gray-700">
            <div className="text-xl">3</div>
          </span>
          <h3 class="ml-2 font-medium leading-tight text-2xl">
            Start earning!
          </h3>
          <p class="ml-2 text-md">Start selling to your audience!</p>
        </li>
      </ol>

      {/* ---large screens only------------------------------------------------------------------------------------------------ */}

      <ol className="hidden lg:flex items-center font-serif w-full">
        <li className="relative mb-6">
          <div className="flex items-center">
            <div className="z-10 flex items-center justify-center w-10 h-10 bg-primary-default rounded-full ring-4 ring-warning-dark  shrink-0">
              <div className="text-xl">1</div>
            </div>
            <div className="flex w-full bg-secondary-focus h-0.5" />
          </div>
          <div className="mt-5 pr-8">
            <h3 className="text-2xl font-semibold text-secondary-focus">
              Make your store
            </h3>
            <p className="mt-1 text-base font-normal text-secondary-focus">
              Sign up and create your store.
            </p>
          </div>
        </li>
        <li className="relative mb-6">
          <div className="flex items-center">
            <div className="z-10 flex items-center justify-center w-10 h-10 bg-primary-default rounded-full ring-4 ring-warning-dark  shrink-0">
              <div className="text-xl">2</div>
            </div>
            <div className="flex w-full bg-secondary-focus h-0.5" />
          </div>
          <div className="mt-5 pr-8">
            <h3 className="text-2xl font-semibold text-secondary-focus">
              List your products
            </h3>
            <p className="mt-1 text-base font-normal text-secondary-focus">
              Connect your Stripe Account and list your products in your store.
            </p>
          </div>
        </li>
        <li className="relative mb-6">
          <div className="flex items-center">
            <div className="z-10 flex items-center justify-center w-10 h-10 bg-primary-default rounded-full ring-4 ring-warning-dark  shrink-0">
              <div className="text-xl">3</div>
            </div>
            <div className="flex w-full bg-secondary-focus h-0.5" />
          </div>
          <div className="mt-5 sm:pr-8">
            <h3 className="text-2xl font-semibold text-secondary-focus">
              Start earning!
            </h3>
            <p className="mt-1 text-base font-normal text-secondary-focus">
              Start selling to your audience!
            </p>
          </div>
        </li>
      </ol>
    </div>
  )
}

export default Stepper
