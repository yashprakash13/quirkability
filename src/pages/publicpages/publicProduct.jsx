import { useParams } from "react-router-dom"

const PublicProduct = () => {
  const { productId } = useParams()

  return <div>PublicProduct: {productId}</div>
}

export default PublicProduct
