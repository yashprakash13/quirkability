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
    const { products } = await getAllProducts(user.id, false)
    console.log("Products => ", products)
    if (products) {
      setProducts(products)
    } else {
      console.log("Can't load products.")
    }
  }

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        minWidth: 300,
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
        accessor: "sales",
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
    fetchProducts()
  }, [])

  const isEven = (idx) => idx % 2 === 0

  return (
    <table
      {...getTableBodyProps()}
      className="table-fixed text-secondary-focus border-sm mt-8 text-lg"
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
                  className={`border-sm p-5 border-secondary-default ${
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
  )
}

export default ProductsTable
