import { useParams } from "react-router-dom"
import { StarIcon } from "@heroicons/react/24/solid"
import UserHeader from "../../components/UserHeader"

const PublicProduct = () => {
  const { productId } = useParams()

  return (
    <div className="container flex flex-col mx-auto p-3 md:p-14 gap-14 border-sm border-secondary-focus rounded-br-xl bg-primary-default">
      <div className="flex flex-col-reverse lg:flex-row w-full gap-11 justify-center items-start">
        <div className="w-full lg:w-1/2 flex flex-col md:flex-col gap-7 md:gap-11 justify-center items-center">
          <img
            src="https://source.unsplash.com/p0OlRAAYXLY/2000x2000"
            className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] border-xs border-secondary-focus mt-3"
          />
          <div className="flex flex-col justify-center items-center gap-11 mx-4 mt-7 md:mt-0">
            <div className="flex gap-7 justify-center items-center w-[450px]">
              <StarIcon className="h-10 text-secondary-focus" />
              <div className=" text-xl text-secondary-focus font-serif">
                4.6 ( 186 ratings )
              </div>
            </div>
            <div className="flex gap-7 justify-center items-center w-64 md:w-[440px] mt-5">
              <div className="text-2xl font-serif w-1/4 md:w-1/3 text-center text-secondary-focus">
                $249
              </div>
              <select className="w-3/4 md:w-2/3 shadow-sm rounded-br-lg border-sm border-secondary-focus text-secondary-focus bg-primary-default h-12 py-2 px-4 focus:outline-none cursor-pointer">
                <option value="Something">1</option>
                <option value="Something">2</option>
                <option value="Something">3</option>
              </select>
            </div>
            <div className="text-primary-default text-xl bg-secondary-focus px-7 py-3 w-72 md:w-[450px] text-center mt-5 border-sm rounded-br-xl hover:text-secondary-focus hover:bg-primary-default transition-all duration-300 hover:border-sm cursor-pointer">
              Get!
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col gap-5">
          <div className="text-4xl font-serif font-bold text-secondary-focus">
            Marketing specialization mini-course
          </div>
          <div className="text-lg text-secondary-focus">
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
      <div className="flex flex-col gap-7">
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
