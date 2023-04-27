import { useNavigate, useParams } from "react-router-dom"
import UserHeader from "../../components/UserHeader"
import UserProductSingle from "../../components/UserProductSingle"
import { useEffect } from "react"
import { checkUsernameAvailability } from "../../services/supabaseHelpers"
import { toast } from "react-toastify"

const PublicUser = () => {
  const { username } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    console.log("Got username => ", username)
    async function checkUsername() {
      const result = await checkUsernameAvailability(username)
      if (!result) {
        console.log("Checked for username => ", username, ". Not present.")
        // if username isn't present => user doesn't exist, go back to homepage
        navigate("/")
        toast.error("The user doesn't exist!", {
          toastId: "error1", // this id field is necessary because it helps make the toast show only once.
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      } else {
        // get user's products + bio
      }
    }
    checkUsername()
  }, [])

  return (
    <div className="container flex flex-col mx-auto p-3 gap-14">
      <UserHeader
        name={"Danielle Murphy"}
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
