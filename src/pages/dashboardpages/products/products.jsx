import { Link } from "react-router-dom"
import { FolderPlusIcon } from "@heroicons/react/24/outline"
import { useEffect } from "react"
import { getAllProducts } from "../../../services/supabaseHelpers"
import { useAuth } from "../../../context/auth"
import ProductsTable from "./productsTable"

const Products = () => {
  const { user } = useAuth()

  return (
    <div className="container flex flex-col mx-auto p-3">
      <div className="flex flex-col mt-10">
        <div className="text-3xl font-medium mt-10">Published Products</div>
        <ProductsTable />
      </div>
      <div className="flex flex-col mt-10">
        <div className="text-3xl font-medium ">Drafts</div>
        <div className="flex space-x-7 mt-8">
          {/* new product button */}
          <Link
            className="w-72 h-64 border-md border-secondary-focus rounded-br-2xl shadow-xl flex flex-col gap-3 justify-center items-center cursor-pointer hover:shadow-none transition-all duration-300"
            to="/dashboard/products/add"
          >
            <FolderPlusIcon className="w-10 h-10" />
            <div className="text-2xl">New Product</div>
          </Link>
          {/* all draft products go here */}
        </div>
      </div>
    </div>
  )
}

export default Products
