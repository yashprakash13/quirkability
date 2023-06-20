import { Link, useNavigate } from "react-router-dom"
import { FolderPlusIcon } from "@heroicons/react/24/outline"
import { useAuth } from "../../../context/auth"
import ProductsTable from "./productsTable"
import { useEffect, useState } from "react"
import { getAllDraftProducts } from "../../../services/supabaseHelpers"

const Products = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [allDraftProducts, setAllDraftProducts] = useState([])

  useEffect(() => {
    async function getAndSetDrafts() {
      setAllDraftProducts(await getAllDraftProducts(user.id))
    }
    getAndSetDrafts()
  }, [])

  return (
    <div className="container flex flex-col mx-auto p-3">
      <div className="flex flex-col mt-10">
        <div className="text-3xl font-medium mt-10">Published Products</div>
        <ProductsTable />
      </div>
      <div className="flex flex-col mt-10">
        <div className="text-3xl font-medium ">Drafts</div>
        <div className="flex flex-col md:flex-row flex-wrap gap-7 mt-8">
          {/* new product button */}
          <Link
            className="w-full h-28 md:w-64 md:h-52 border-md border-secondary-focus rounded-br-2xl shadow-xl flex flex-col gap-3 justify-center items-center cursor-pointer hover:shadow-none transition-all duration-300"
            to="/dashboard/products/add"
          >
            <FolderPlusIcon className="w-8 h-8 md:w-10 md:h-10" />
            <div className="text-lg md:text-2xl">New Product</div>
          </Link>

          {/* all draft products go here, upon clicking on one, go Edit it */}
          {allDraftProducts.map((item, index) => (
            <div
              className="w-full h-28 md:w-64 md:h-52 border-md border-secondary-focus rounded-br-xl shadow-lg flex flex-col gap-3 justify-start items-start cursor-pointer hover:shadow-none transition-all duration-300"
              key={index}
              onClick={() => navigate(`/dashboard/products/${item.id}`)}
            >
              <div className="text-lg md:text-2xl m-5">
                {item.name ? item.name : "Untitled Product"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Products
