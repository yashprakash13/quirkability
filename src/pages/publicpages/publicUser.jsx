import { useParams } from "react-router-dom"
import UserHeader from "../../components/UserHeader"

const PublicUser = () => {
  const { username } = useParams()

  return (
    <div className="container flex flex-col mx-auto p-3">
      <UserHeader
        name={"Danille Murphy"}
        bio={
          "Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
        }
      />
    </div>
  )
}

export default PublicUser
