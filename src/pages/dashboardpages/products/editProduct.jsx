import { useParams } from "react-router-dom"

const EditProduct = () => {
  const { productId } = useParams()
  return (
    <div className="flex">
      {productId ? (
        <div className="text-lg">ID gotten: {productId}</div>
      ) : (
        "No productId gotten."
      )}
    </div>
  )
}

export default EditProduct
