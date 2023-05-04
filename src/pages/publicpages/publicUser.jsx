import { useNavigate, useParams } from "react-router-dom"
import UserHeader from "../../components/UserHeader"
import UserProductSingle from "../../components/UserProductSingle"
import { useEffect, useState } from "react"
import {
  checkUsernameAvailability,
  populatePublicProducts,
} from "../../services/supabaseHelpers"
import { toast } from "react-toastify"
import { getSupabaseImageStorageURL } from "../../utils"

const PublicUser = () => {
  const { username } = useParams()
  const navigate = useNavigate()

  const [products, setProducts] = useState([])

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
        setProducts(await populatePublicProducts(username, "id, name"))
      }
    }
    checkUsername()
  }, [])

  function navigateToPublicProductPage(productId) {
    navigate(`/${username}/${productId}`)
  }

  return (
    <div className="container flex flex-col mx-auto p-3 gap-14">
      <UserHeader
        name={"Danielle Murphy"}
        bio={
          "Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
        }
      />
      <div className="flex flex-col md:flex-row  flex-wrap gap-7 items-center justify-center">
        {products &&
          products.products &&
          products.images &&
          products.products.map((product, index) => (
            <UserProductSingle
              key={product.id}
              id={product.id}
              name={product.name}
              pic_url={getSupabaseImageStorageURL(
                products.images[index].images[0]
              )}
              onClick={navigateToPublicProductPage}
            />
          ))}
      </div>
    </div>
  )
}

export default PublicUser
