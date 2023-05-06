import { useParams } from "react-router-dom"
import {
  BanknotesIcon,
  CurrencyDollarIcon,
  DeviceTabletIcon,
  StarIcon,
} from "@heroicons/react/24/solid"
import UserHeader from "../../components/UserHeader"
import { useEffect, useState } from "react"
import { getProductDetailsFromId } from "../../services/supabaseHelpers"

import parse from "html-react-parser"
import { getCurrency } from "../../utils"
import ImageCarousel from "../../components/ImageCarousel"
import MadeByFooter from "../../components/MadeByFooter"

const PublicProduct = () => {
  const { productId } = useParams()
  console.log("Received product id=> ", productId)

  const [productDetails, setProductDetails] = useState(null)

  // useEffect(() => {
  //   async function getProductDetails(productId) {
  //     const product = await getProductDetailsFromId(productId)
  //     setProductDetails(product)
  //     console.log("Set product details now => ", product)
  //   }
  //   if (productId) {
  //     getProductDetails(productId)
  //   }
  // }, [])
  // const images = [
  //   "https://source.unsplash.com/0V7_N62zZcU",
  //   "https://source.unsplash.com/9zsHNt5OpqE",
  // ]
  return (
    <div className="container mx-auto p-3">
      <div className="flex flex-col border-sm border-secondary-focus">
        <div className="text-2xl font-bold p-2">
          {/* name */}
          Marketing specialization mini-course
        </div>
        <img
          src="https://source.unsplash.com/0V7_N62zZcU"
          className="w-full max-h-[450px] border-secondary-focus border-sm mt-3"
        />
        <div className="text-lg text-secondary-focus mt-5 p-2">
          Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque
          quam a convallis. Sed ut vulputate nisi. Integer in felis sed leo
          vestibulum venenatis. Suspendisse quis arcu sem. Aenean feugiat ex eu
          vestibulum vestibulum. Morbi a eleifend magna. Nam metus lacus,
          porttitor eu mauris a, blandit ultrices nibh. Curabitur tempor quis
          eros tempus lacinia. Nam bibendum pellentesque quam a convallis. Sed
          ut vulputate nisi. Integer in felis sed leo vestibulum venenatis.
          Suspendisse quis arcu sem. Aenean feugiat ex eu vestibulum vestibulum.
          Morbi a eleifend magna. Nam metus lacus, porttitor eu mauris a,
          blandit ultrices nibh. Curabitur tempor quis eros tempus lacinia. Nam
          bibendum pellentesque quam a convallis. Sed ut vulputate nisi. Integer
          in felis sed leo vestibulum venenatis. Suspendisse quis arcu sem.
          Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend magna.
          Nam metus lacus, porttitor eu mauris a, blandit ultrices nibh.
        </div>
        <div className="flex flex-col gap-2 mt-5 p-2">
          <div className="flex gap-2 items-center">
            <div className="text-xl text-light-highlight">Price</div>
            <BanknotesIcon className="text-light-highlight h-5 w-5" />
          </div>
          <div className="text-2xl text-secondary-focus font-serif">$450</div>
        </div>
        <div className="flex flex-col gap-2 mt-5 p-2">
          <div className="flex gap-2 items-center">
            <div className="text-xl text-light-highlight">Rating</div>
            <StarIcon className="text-light-highlight h-5 w-5" />
          </div>
          <div className="text-2xl text-secondary-focus font-serif">
            4.6 (186 ratings)
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-5 p-2">
          <div className="flex gap-2 items-center">
            <div className="text-xl text-light-highlight">Number of sales</div>
            <StarIcon className="text-light-highlight h-5 w-5" />
          </div>
          <div className="text-2xl text-secondary-focus font-serif">71</div>
        </div>
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
        <div className="flex flex-col gap-2 mt-5 p-2">
          <div className="mt-5 mb-14 p-2 text-primary-default text-xl bg-secondary-focus w-full text-center border-sm rounded-br-xl hover:text-secondary-focus hover:bg-primary-default transition-all duration-300 hover:border-sm cursor-pointer">
            Get!
          </div>
        </div>
      </div>
      <div className="mt-5 mb-14">
        <UserHeader
          name={"Danielle Murphy"}
          bio={
            "Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
          }
        />
      </div>
      <MadeByFooter />
    </div>
  )
}

export default PublicProduct

// productDetails && (
//   <div className="container mx-auto flex flex-col gap-16 mt-5 md:mt-20 p-5 border-sm border-secondary-focus rounded-br-xl bg-primary-default">
//     {/* main product details (down) */}
//     <div className="flex flex-col-reverse lg:flex-row w-full gap-11 ">
//       {/* the left hand side (down) */}
//       <div className="w-full lg:w-1/2 flex flex-col md:flex-col gap-5 md:gap-11 justify-start items-center">
//         <ImageCarousel
//           images={productDetails.images}
//           className="hidden lg:block lg:w-full lg:h-[450px] border-xs border-secondary-focus mt-3"
//         />
//         <div className="flex flex-col justify-start gap-11 mx-4 w-full">
//           {/* everything that is below the image goes here in this flex box. That includes the metadata of the product, quantity selector and the Get button. */}
//           <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-11">
//             {/* <div className="flex flex-col gap-2"> // commented because I want to have a complete review system later on.
//               <div className="flex gap-2 items-center">
//                 <div className="text-lg text-light-highlight">Rating</div>
//                 <StarIcon className="text-light-highlight h-5 w-5" />
//               </div>
//               <div className="text-2xl text-secondary-focus font-serif">
//                 4.6 (186 ratings)
//               </div>
//             </div> */}
//             <div className="flex flex-col gap-2">
//               <div className="flex gap-2 items-center">
//                 <div className="text-lg text-light-highlight">Price</div>
//                 <BanknotesIcon className="text-light-highlight h-5 w-5" />
//               </div>
//               <div className="text-2xl text-secondary-focus font-serif">
//                 {`${getCurrency(productDetails.price_type)}${
//                   productDetails.price
//                 }`}
//               </div>
//             </div>
//           </div>
//           {productDetails.display_sales && (
//             <div className="flex justify-between items-start">
//               <div className="flex flex-col gap-2">
//                 <div className="flex gap-2 items-center">
//                   <div className="text-lg text-light-highlight">
//                     Number of sales
//                   </div>
//                   <CurrencyDollarIcon className="text-light-highlight h-5 w-5" />
//                 </div>
//                 <div className="text-2xl text-secondary-focus font-serif">
//                   71
//                 </div>
//               </div>
//             </div>
//           )}
//           {productDetails.allow_copies && (
//             <div className="flex justify-between items-start">
//               <select className="w-full md:w-2/3 shadow-sm rounded-br-lg border-sm border-secondary-focus text-secondary-focus bg-primary-default h-12 py-2 px-4 focus:outline-none cursor-pointer">
//                 <option value="0">Choose quantity</option>
//                 <option value="1">1</option>
//                 <option value="2">2</option>
//                 <option value="3">3</option>
//                 <option value="4">4</option>
//                 <option value="5">5</option>
//                 <option value="6">6</option>
//                 <option value="7">7</option>
//                 <option value="8">8</option>
//                 <option value="9">9</option>
//                 <option value="10">10</option>
//               </select>
//             </div>
//           )}
//           <div className="flex justify-between items-start">
//             <div className="flex flex-col gap-2">
//               <div className="flex gap-2 items-center">
//                 <div className="text-lg text-light-highlight">
//                   You'll get
//                 </div>
//                 <DeviceTabletIcon className="text-light-highlight h-5 w-5" />
//               </div>
//               <div className="text-2xl text-secondary-focus font-serif">
//                 a link to the product!
//               </div>
//             </div>
//           </div>
//           <div className="text-primary-default text-xl bg-secondary-focus px-7 py-3 w-full text-center border-sm rounded-br-xl hover:text-secondary-focus hover:bg-primary-default transition-all duration-300 hover:border-sm cursor-pointer">
//             Get!
//           </div>
//         </div>
//       </div>
//       {/* the right hand side */}
//       <div className="w-full lg:w-1/2 flex flex-col gap-5">
//         <div className="text-2xl md:text-4xl font-serif font-bold text-secondary-focus text-center">
//           {productDetails.name}
//         </div>
//         <div className="flex justify-center">
//           <ImageCarousel
//             images={productDetails.images}
//             className="w-[300px] h-[300px] lg:hidden border-xs border-secondary-focus mt-3"
//           />
//         </div>
//         <div className="text-lg text-secondary-focus mt-5">
//           {parse(productDetails.description)}
//         </div>
//       </div>
//     </div>
//     {/* about the author at the bottom */}
//     <div className="flex flex-col gap-7 my-14">
//       <div className="text-2xl font-semibold text-secondary-focus font-serif">
//         About the Creator
//       </div>
//       <UserHeader
//         name={"Danielle Murphy"}
//         bio={
//           "Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
//         }
//       />
//     </div>
//   </div>
// )
