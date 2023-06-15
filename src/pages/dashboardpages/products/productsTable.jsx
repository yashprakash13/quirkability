import { useState, useMemo, useEffect } from "react"
import { getAllProducts } from "../../../services/supabaseHelpers"
import { useTable } from "react-table"
import { useAuth } from "../../../context/auth"
import { getCurrency } from "../../../utils"
import { useNavigate } from "react-router-dom"

const ProductsTable = () => {
  const [products, setProducts] = useState([])
  const { user } = useAuth()
  const navigate = useNavigate()

  async function fetchProducts() {
    const { products: allProducts } = await getAllProducts(
      user.id,
      false,
      "id, name, price, price_type"
    )
    console.log("Products => ", allProducts)
    if (allProducts) {
      setProducts(allProducts)
    } else {
      console.log("Can't load products, and products is: ", products)
    }
  }

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        width: 300,
      },
      {
        Header: "Price",
        accessor: "price",
        Cell: ({ row }) =>
          row.original
            ? `${getCurrency(row.original.price_type)} ${row.original.price}`
            : row.groupByVal,
      },
      {
        Header: "Sales",
        accessor: "num_sales",
      },
      {
        Header: "Avg. rating",
        accessor: "rating",
      },
      {
        Header: "Revenue",
        accessor: "revenue",
      },
    ],
    []
  )

  const productsData = useMemo(() => [...products], [products])

  const tableInstance = useTable({
    columns: columns,
    data: productsData,
  })

  const { getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts()
    }
  }, [])

  const isEven = (idx) => idx % 2 === 0

  return (
    <div className="max-w-full block overflow-x-auto overflow-y-hidden">
      <table
        {...getTableBodyProps()}
        className="table-fixed text-secondary-focus border-sm mt-8 text-lg min-w-full"
      >
        <thead className="p-2">
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className="border-sm border-secondary-default"
            >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="border-sm border-secondary-default p-2 font-medium"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, idx) => {
            prepareRow(row)

            return (
              <tr
                {...row.getRowProps()}
                className={
                  isEven(idx)
                    ? "bg-primary-default bg-opacity-80 border-xs border-secondary-default"
                    : "border-xs border-secondary-default"
                }
              >
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className={`border-sm p-5 border-secondary-default whitespace-nowrap overflow-hidden ${
                      cell.column.Header === "Name"
                        ? "text-left cursor-pointer hover:underline"
                        : "text-center"
                    }`}
                    onClick={() => {
                      if (cell.column.Header === "Name") {
                        navigate(`/dashboard/products/${cell.row.original.id}`)
                      }
                    }}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ProductsTable
