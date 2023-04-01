import { Link } from "react-router-dom"

const Products = () => {
  return (
    <div>
      Products
      <Link to="/dashboard/products/add">Add Product</Link>
    </div>
  )
}

export default Products
