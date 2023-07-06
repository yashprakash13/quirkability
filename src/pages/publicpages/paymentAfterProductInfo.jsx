import React, { useEffect, useState } from "react"
import MadeByFooter from "../../components/MadeByFooter"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid"
import { Link, useLocation, useSearchParams } from "react-router-dom"
import { getSession } from "../../services/backendCalls"
import { ClockLoader } from "react-spinners"
import {
  getDownloadURLForArtifact,
  getProductIdFromSale,
  getSpecificProductDetailsFromId,
  getSpecificProductURLOrArtifactDetailsFromId,
  getUserDetailsFromId,
} from "../../services/supabaseHelpers"

const PaymentAfterProductInfo = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [sessionId, setSessionID] = useState(null)
  const [orderProduct, setOrderProduct] = useState(null)
  const location = useLocation()

  console.log(
    "Received param in payment after=> ",
    searchParams.get("session_id")
  )
  useEffect(() => {
    async function getAndSetPaymentResult() {
      if (searchParams.get("session_id")) {
        const resultOfPayment = await getSession(searchParams.get("session_id"))
        if (resultOfPayment) {
          setSessionID(searchParams.get("session_id"))
          setLoading(false)
        }
      } else {
        // free product success page
        setSessionID("free_product")
        setLoading(false)
      }
    }
    if (loading) {
      getAndSetPaymentResult()
    }
  }, [])

  useEffect(() => {
    async function getDetailsFromSale() {
      if (sessionId !== "free_product") {
        const productIdOfSale = await getProductIdFromSale(sessionId)
        if (!productIdOfSale) {
          console.log("Couldn't get sale details.")
        }
        // productId sold gotten, now get product details
        const productDetails = await getSpecificProductDetailsFromId(
          productIdOfSale,
          "name, user_id"
        )
        const userDetails = await getUserDetailsFromId(
          productDetails.user_id,
          "username"
        )
        const productUrlsDetails =
          await getSpecificProductURLOrArtifactDetailsFromId(
            productIdOfSale,
            "redirect_url, product_artifact_path"
          )
        if (!productDetails || !userDetails || !productUrlsDetails) {
          console.log(
            "Error in getting productDetails and urls and user details."
          )
        }
        const orderProductDetails = {
          ...productDetails,
          ...userDetails,
          ...productUrlsDetails,
        }
        setOrderProduct(orderProductDetails)
      } else {
        //if it's a free product
        const productDetails = location.state.productDetails
        const userDetails = location.state.userDetails
        const productUrlsDetails =
          await getSpecificProductURLOrArtifactDetailsFromId(
            productDetails.id,
            "redirect_url, product_artifact_path"
          )
        if (!productDetails || !userDetails || !productUrlsDetails) {
          console.log(
            "Error in getting productDetails and urls and user details."
          )
        }
        const orderProductDetails = {
          ...productDetails,
          ...userDetails,
          ...productUrlsDetails,
        }
        setOrderProduct(orderProductDetails)
      }
      console.log("Fetched and set everything.")
    }
    if (sessionId) {
      getDetailsFromSale()
    }
  }, [sessionId])

  async function startDownload() {
    // to download artifact
    const blob = await getDownloadURLForArtifact(
      orderProduct.product_artifact_path
    )
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", orderProduct.name)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="relative h-screen mb-2">
      {loading
        ? orderProduct && (
            <div className="flex flex-col container mx-auto mt-11">
              <div className="flex flex-col gap-5 justify-center items-center h-screen">
                <div className="font-thin text-2xl text-center">
                  {" "}
                  <ClockLoader className="text-secondary-focus" />{" "}
                </div>
                <div className="font-thin text-2xl text-center">
                  {" "}
                  <div className="text-secondary-focus">
                    Processing your order for
                  </div>{" "}
                </div>
                <div className="font-medium text-2xl md:text-3xl font-serif text-center">
                  {orderProduct.name}
                </div>
                <div className="font-thin text-2xl text-center">from</div>
                <div className="font-medium text-2xl md:text-3xl gap-3 font-serif cursor-pointer text-center">
                  <Link
                    className="inline-flex items-center gap-3 hover:underline"
                    target="_blank"
                    to={`/${orderProduct.username}`}
                  >
                    <span>{orderProduct.username}</span>
                    <ArrowTopRightOnSquareIcon className="h-5 w-5 md:h-7 md:w-7" />
                  </Link>
                </div>
              </div>
            </div>
          )
        : orderProduct && (
            <div className="flex flex-col container mx-auto mt-11">
              <div className="flex flex-col gap-5 justify-center items-center">
                <div className="font-thin text-2xl text-center">
                  You bought:
                </div>
                <div className="font-medium text-2xl md:text-3xl font-serif text-center">
                  {orderProduct.name}
                </div>
                <div className="font-thin text-2xl text-center">from</div>
                <div className="font-medium text-2xl md:text-3xl gap-3 font-serif cursor-pointer text-center">
                  <Link
                    className="inline-flex items-center gap-3 hover:underline"
                    target="_blank"
                    to={`/${orderProduct.username}`}
                  >
                    <span>{orderProduct.username}</span>
                    <ArrowTopRightOnSquareIcon className="h-5 w-5 md:h-7 md:w-7" />
                  </Link>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center border-sm border-secondary-focus mt-20 mx-1 p-5 md:p-10">
                <div className="text-2xl md:text-3xl font-medium font-serif text-center">
                  Here is the link to your purchase:
                </div>
                <div className="mt-11 w-full flex flex-col md:flex-row gap-5 md:items-center md:justify-center">
                  {orderProduct.redirect_url && (
                    <input
                      className="text-xl font-serif p-4 border-sm border-secondary-focus rounded-br-lg md:basis-3/4"
                      value={
                        orderProduct.redirect_url && orderProduct.redirect_url
                      }
                      readOnly
                    />
                  )}
                  {orderProduct.redirect_url ? (
                    <Link
                      className="md:basis-1/4 inline-flex items-center gap-2 justify-center text-center text-xl font-serif text-primary-default bg-secondary-focus px-5 py-3 rounded-br-lg cursor-pointer hover:bg-primary-default hover:text-secondary-focus transition-all duration-300 hover:border-sm hover:border-secondary-focus"
                      to={orderProduct.redirect_url}
                      target="_blank"
                    >
                      Go to Link{" "}
                      <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                    </Link>
                  ) : (
                    <a
                      className="md:basis-1/4 inline-flex items-center gap-2 justify-center text-center text-xl font-serif text-primary-default bg-secondary-focus px-5 py-3 rounded-br-lg cursor-pointer hover:bg-primary-default hover:text-secondary-focus transition-all duration-300 hover:border-sm hover:border-secondary-focus"
                      onClick={startDownload}
                      target="_blank"
                    >
                      Download <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                    </a>
                  )}
                </div>
                {/* <div className="gap-2 text-lg text-center mt-7 font-serif text-secondary-focus">
                  A confirmation email is also on its way to you.
                </div> */}
              </div>
            </div>
          )}
      <div className="absolute inset-x-0 bottom-0">
        <MadeByFooter />
      </div>
    </div>
  )
}

export default PaymentAfterProductInfo
