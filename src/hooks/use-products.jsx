import React, { useEffect, useState } from "react"

const useProducts = (user) => {
  const [products, setProducts] = useState(null)

  useEffect(() => {}, [user?.id])

  return { products }
}

export default useProducts
