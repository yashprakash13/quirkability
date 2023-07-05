import { useLocation, useNavigate, useParams } from "react-router-dom"
import {
  BanknotesIcon,
  CurrencyDollarIcon,
  DeviceTabletIcon,
  StarIcon,
} from "@heroicons/react/24/solid"
import UserHeader from "../../components/UserHeader"
import { useEffect, useState } from "react"
import {
  getProductDetailsFromId,
  getUserDetailsFromId,
  getUserIdFromUsername,
} from "../../services/supabaseHelpers"

import parse from "html-react-parser"
import { getCurrency } from "../../utils"
import ImageCarousel from "../../components/ImageCarousel"
import MadeByFooter from "../../components/MadeByFooter"
import * as yup from "yup"
import {
  makePayment,
  makePaymentFreeProduct,
} from "../../services/backendCalls"
import { toast } from "react-toastify"

const PublicProduct = () => {
  const { productId } = useParams()
  console.log("Received product id=> ", productId)
  const userStuff = useLocation()
  const [productDetails, setProductDetails] = useState(null)
  const [userDetails, setUserDetails] = useState(null)

  const navigate = useNavigate()
  const location = useLocation()

  const [quantity, setQuantity] = useState(0)
  const [customerEmail, setCustomerEmail] = useState(null)
  const [inputErrors, setInputErrors] = useState(null)

  async function getProductDetails(productId) {
    const product = await getProductDetailsFromId(productId)
    if (product) {
      setProductDetails(product)
    } else {
      toast.error("The product doesn't exist!", {
        toastId: "error2", // this id field is necessary because it helps make the toast show only once.
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      setTimeout(() => {
        navigate(-1)
      }, 2000)
    }
    console.log("Set product details now => ", product)
    if (!product.allow_copies) {
      setQuantity(1)
    }
    try {
      setUserDetails(userStuff.state.userDetails)
    } catch {
      const currentURL = location.pathname
      const [_, username, __] = currentURL.split("/")
      const userId = await getUserIdFromUsername(username)
      setUserDetails(
        await getUserDetailsFromId(
          userId.id,
          "username, bio, profile_pic_url, stripe_connect_id"
        )
      )
    }
  }

  useEffect(() => {
    if (productId) {
      getProductDetails(productId)
    }
  }, [])

  async function startPaymentProcess() {
    // validate the quantity of the order and the email here and proceed to payment
    let schemaVal = {
      quantity: quantity,
      customerEmail: customerEmail,
    }
    let schema = yup.object({
      quantity: yup
        .number("Please choose a quantity.")
        .min(1, "Please choose a quantity.")
        .required("Please choose a quantity."),
      customerEmail: yup
        .string()
        .trim()
        .email("Please enter a valid email.")
        .required("Please enter a valid email."),
    })
    try {
      await schema.validate(schemaVal, {
        abortEarly: false,
      })
      setInputErrors(null)
      // check if all validation is successful
      console.log("No errors yet.")
      if (productDetails.price !== 0) {
        // call the backend payment function
        let redirectUrl = await makePayment(
          productDetails.id,
          productDetails.stripe_price_id,
          userDetails.stripe_connect_id,
          customerEmail.trim(),
          productDetails.price,
          quantity
        )
        if (redirectUrl) {
          window.open(redirectUrl)
        }
      } else {
        // it's a free product
        // so automatically update database with a new sale
        await makePaymentFreeProduct(
          productDetails.id,
          customerEmail.trim(),
          quantity
        )
        navigate(`/order/success`, { state: { userDetails, productDetails } })
      }
    } catch (err) {
      let errors = {}
      err.inner.forEach((e) => {
        errors[e.path] = e.message
      })
      console.log("Errors upon validation =>", errors)
      setInputErrors(errors)
    }
  }

  return (
    productDetails && (
      <div className="container mx-auto p-3">
        <div className="flex flex-col border-sm border-secondary-focus">
          <div className="text-2xl lg:text-5xl font-bold p-2 lg:px-7 lg:py-7">
            {productDetails.name}
          </div>
          <div className="flex flex-col justify-center items-center border-b-sm border-t-sm border-secondary-focus">
            <ImageCarousel
              images={productDetails.images}
              className="hidden lg:block lg:w-full lg:h-[450px] mt-3"
            />
          </div>
          <div className="flex flex-col lg:flex-row">
            <div className="basis-2/3 text-lg text-secondary-focus p-2 lg:border-secondary-focus lg:border-r-sm lg:px-7 lg:pt-7">
              {parse(productDetails.description)}
            </div>
            <div className="basis-1/3 flex flex-col lg:px-7 lg:pt-7">
              <div className="flex flex-col gap-2 p-2 lg:py-0 lg:px-2">
                <div className="flex gap-2 items-center">
                  <div className="text-xl text-light-highlight">Price</div>
                  <BanknotesIcon className="text-light-highlight h-5 w-5" />
                </div>
                <div className="text-2xl text-secondary-focus font-serif">
                  {`${getCurrency(productDetails.price_type)}${
                    productDetails.price
                  }`}
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-5 p-2">
                <div className="flex gap-2 items-center">
                  <div className="text-xl text-light-highlight">Rating</div>
                  <StarIcon className="text-light-highlight h-5 w-5" />
                </div>
                <div className="text-2xl text-secondary-focus font-serif">
                  {productDetails.num_ratings
                    ? `${productDetails.avg_rating}${" "}(${
                        productDetails.num_ratings
                      } ${
                        productDetails.num_ratings === 1 ? "rating" : "ratings"
                      } )`
                    : `-`}
                </div>
              </div>
              {productDetails.display_sales && (
                <div className="flex flex-col gap-2 mt-5 p-2">
                  <div className="flex gap-2 items-center">
                    <div className="text-xl text-light-highlight">
                      Number of sales
                    </div>
                    <CurrencyDollarIcon className="text-light-highlight h-5 w-5" />
                  </div>
                  <div className="text-2xl text-secondary-focus font-serif">
                    {productDetails.num_sales === 0
                      ? "-"
                      : productDetails.num_sales}
                  </div>
                </div>
              )}
              {productDetails.short_desc && (
                <div className="flex flex-col gap-2 mt-5 p-2">
                  <div className="flex gap-2 items-center">
                    <div className="text-xl text-light-highlight">
                      You'll get
                    </div>
                    <DeviceTabletIcon className="text-light-highlight h-5 w-5" />
                  </div>
                  <div className="text-2xl text-secondary-focus font-serif">
                    {productDetails.short_desc}
                  </div>
                </div>
              )}
              {productDetails.allow_copies && (
                <div className="flex flex-col gap-2 justify-between items-start p-2 mt-5">
                  <select
                    className="w-full shadow-sm rounded-br-lg border-sm border-secondary-focus text-secondary-focus bg-primary-default h-12 py-2 px-2 focus:outline-none cursor-pointer"
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(e.target.value)
                    }}
                  >
                    <option value="0">Choose quantity</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                  {inputErrors && inputErrors.quantity && (
                    <div className="text-alert-dark text-lg">
                      {inputErrors.quantity}
                    </div>
                  )}
                </div>
              )}
              <div className="flex flex-col gap-2 mt-5 p-2">
                <input
                  type="text"
                  className="w-full shadow-sm rounded-br-lg border-sm border-secondary-focus bg-primary-default h-12 py-2 px-2 focus:outline-none"
                  placeholder="Your email please"
                  value={customerEmail}
                  onChange={(e) => {
                    setCustomerEmail(e.target.value)
                  }}
                />
                {inputErrors && inputErrors.customerEmail && (
                  <div className="text-alert-dark text-lg">
                    {inputErrors.customerEmail}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2 mt-5 p-2">
                <div
                  className="mb-14 p-2 text-primary-default text-xl bg-secondary-focus w-full text-center border-sm rounded-br-xl hover:text-secondary-focus hover:bg-primary-default transition-all duration-300 hover:border-sm cursor-pointer"
                  onClick={startPaymentProcess}
                >
                  {productDetails.call_to_action
                    ? `${productDetails.call_to_action}`
                    : "Get"}
                </div>
              </div>
            </div>
          </div>
        </div>
        {userDetails && (
          <div className="mt-5 mb-14">
            <UserHeader
              name={userDetails.username}
              bio={userDetails.bio}
              pic_url={userDetails.profile_pic_url}
            />
          </div>
        )}
        <MadeByFooter />
      </div>
    )
  )
}

export default PublicProduct
