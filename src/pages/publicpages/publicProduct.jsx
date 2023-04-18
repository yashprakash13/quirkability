import { useParams } from "react-router-dom"
import {
  BanknotesIcon,
  CurrencyDollarIcon,
  StarIcon,
} from "@heroicons/react/24/solid"
import UserHeader from "../../components/UserHeader"

const PublicProduct = () => {
  const { productId } = useParams()

  return (
    <div className="container mx-auto flex flex-col gap-16 mt-5 md:mt-20 p-5 border-sm border-secondary-focus rounded-br-xl bg-primary-default">
      {/* main product details (down) */}
      <div className="flex flex-col-reverse lg:flex-row w-full gap-11 ">
        {/* the left hand side (down) */}
        <div className="w-full lg:w-1/2 flex flex-col md:flex-col gap-5 md:gap-11 justify-start items-center">
          <img
            src="https://source.unsplash.com/p0OlRAAYXLY/2000x2000"
            className="hidden lg:block lg:w-full lg:h-[450px] border-xs border-secondary-focus mt-3"
          />
          <div className="flex flex-col justify-start gap-11 mx-4 w-full">
            {/* everything that is below the image goes here in this flex box. That includes the metadata of the product, quantity selector and the Get button. */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-11">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <div className="text-lg text-light-highlight">Rating</div>
                  <StarIcon className="text-light-highlight h-5 w-5" />
                </div>
                <div className="text-2xl text-secondary-focus font-serif">
                  4.6 (186 ratings)
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <div className="text-lg text-light-highlight">Price</div>
                  <BanknotesIcon className="text-light-highlight h-5 w-5" />
                </div>
                <div className="text-2xl text-secondary-focus font-serif">
                  $450
                </div>
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <div className="text-lg text-light-highlight">
                    Number of sales
                  </div>
                  <CurrencyDollarIcon className="text-light-highlight h-5 w-5" />
                </div>
                <div className="text-2xl text-secondary-focus font-serif">
                  71
                </div>
              </div>
            </div>
            <div className="flex justify-between items-start">
              <select className="w-full md:w-2/3 shadow-sm rounded-br-lg border-sm border-secondary-focus text-secondary-focus bg-primary-default h-12 py-2 px-4 focus:outline-none cursor-pointer">
                <option value="Choose">Choose quantity</option>
                <option value="Something">1</option>
                <option value="Something">2</option>
                <option value="Something">3</option>
              </select>
            </div>
            <div className="text-primary-default text-xl bg-secondary-focus px-7 py-3 w-full text-center border-sm rounded-br-xl hover:text-secondary-focus hover:bg-primary-default transition-all duration-300 hover:border-sm cursor-pointer">
              Get!
            </div>
          </div>
        </div>
        {/* the right hand side */}
        <div className="w-full lg:w-1/2 flex flex-col gap-5">
          <div className="text-2xl md:text-4xl font-serif font-bold text-secondary-focus text-center">
            Marketing specialization mini-course
          </div>
          <div className="flex justify-center">
            <img
              src="https://source.unsplash.com/p0OlRAAYXLY/2000x2000"
              className="w-[300px] h-[300px] lg:hidden border-xs border-secondary-focus mt-3"
            />
          </div>
          <div className="text-lg text-secondary-focus mt-5">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum
            quisquam eligendi nemo sunt repellat culpa quo perferendis sapiente
            voluptates architecto error, in eius impedit eaque omnis ratione
            quia rem cum labore hic! Assumenda asperiores earum soluta amet? At
            expedita assumenda eaque debitis, enim dolores dolor dolorem aut
            dicta sint quisquam! Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Adipisci delectus distinctio quam illo soluta
            voluptatem omnis! Inventore, similique, nam illo fugiat fugit
            quaerat aliquam ut delectus doloribus omnis sunt eum reiciendis. Ut
            natus cum error fugiat eligendi culpa rerum repellendus ex quidem
            deleniti vero aliquid corrupti tempora recusandae doloremque
            repudiandae eaque, excepturi cumque aspernatur hic distinctio at
            optio ratione! Reprehenderit saepe sed porro! Fugiat accusamus porro
            nobis nostrum, laudantium at vero, ipsa quia qui voluptatibus
            similique! Blanditiis ea aliquid distinctio facilis, eos, eligendi
            qui hic, dignissimos excepturi aperiam voluptatem id cumque! Maxime
            error quas facere, nihil architecto ratione?
          </div>
          <div className="text-lg text-secondary-focus">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam
            optio voluptates blanditiis velit suscipit voluptatibus beatae
            quaerat aliquid, laudantium, saepe similique laborum est eos maxime,
            consequatur fugiat voluptatem nihil autem! Lorem ipsum dolor sit
            amet consectetur, adipisicing elit. Tenetur nam saepe consectetur,
            minima et libero placeat ut distinctio. Unde placeat dolorum minima,
            quaerat nam cum, nulla quod quo quis debitis assumenda, quisquam
            ipsum sed!
          </div>
        </div>
      </div>
      {/* about the author at the bottom */}
      <div className="flex flex-col gap-7 my-14">
        <div className="text-2xl font-semibold text-secondary-focus font-serif">
          About the Creator
        </div>
        <UserHeader
          name={"Danielle Murphy"}
          bio={
            "Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
          }
        />
      </div>
    </div>
  )
}

export default PublicProduct
