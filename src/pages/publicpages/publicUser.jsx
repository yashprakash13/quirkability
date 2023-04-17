import { useParams } from "react-router-dom"
import UserHeader from "../../components/UserHeader"
import UserProductSingle from "../../components/UserProductSingle"

const PublicUser = () => {
  const { username } = useParams()

  return (
    <div className="container flex flex-col mx-auto p-3 gap-14">
      <UserHeader
        name={"Danille Murphy"}
        bio={
          "Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
        }
      />
      <div className="flex flex-col md:flex-row  flex-wrap gap-7 items-center justify-center">
        <UserProductSingle name={"Marketing Specialization Mini-Course"} />
      </div>
    </div>
  )
}

export default PublicUser
