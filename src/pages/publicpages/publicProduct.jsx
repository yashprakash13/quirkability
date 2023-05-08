import { useParams } from "react-router-dom"
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
} from "../../services/supabaseHelpers"

import parse from "html-react-parser"
import { getCurrency } from "../../utils"
import ImageCarousel from "../../components/ImageCarousel"
import MadeByFooter from "../../components/MadeByFooter"

const PublicProduct = () => {
  const { productId } = useParams()
  console.log("Received product id=> ", productId)

  const [productDetails, setProductDetails] = useState(null)
  const [userDetails, setUserDetails] = useState(null)

  useEffect(() => {
    async function getProductDetails(productId) {
      const product = await getProductDetailsFromId(productId)
      setProductDetails(product)
      console.log("Set product details now => ", product)
      setUserDetails(
        await getUserDetailsFromId(product.user_id, "username, bio")
      )
    }
    if (productId) {
      getProductDetails(productId)
    }
  }, [])

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
                  {productDetails.avg_rating
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
              {productDetails.call_to_action && (
                <div className="flex flex-col gap-2 mt-5 p-2">
                  <div className="flex gap-2 items-center">
                    <div className="text-xl text-light-highlight">
                      You'll get
                    </div>
                    <DeviceTabletIcon className="text-light-highlight h-5 w-5" />
                  </div>
                  <div className="text-2xl text-secondary-focus font-serif">
                    {productDetails.call_to_action}
                  </div>
                </div>
              )}
              {productDetails.allow_copies && (
                <div className="flex justify-between items-start p-2 mt-5">
                  <select className="w-full shadow-sm rounded-br-lg border-sm border-secondary-focus text-secondary-focus bg-primary-default h-12 py-2 px-2 focus:outline-none cursor-pointer">
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
                </div>
              )}
              <div className="flex flex-col gap-2 mt-5 p-2">
                <div className="mt-5 mb-14 p-2 text-primary-default text-xl bg-secondary-focus w-full text-center border-sm rounded-br-xl hover:text-secondary-focus hover:bg-primary-default transition-all duration-300 hover:border-sm cursor-pointer">
                  Get!
                </div>
              </div>
            </div>
          </div>
        </div>
        {userDetails && (
          <div className="mt-5 mb-14">
            <UserHeader name={userDetails.username} bio={userDetails.bio} />
          </div>
        )}
        <MadeByFooter />
      </div>
    )
  )
}

export default PublicProduct
