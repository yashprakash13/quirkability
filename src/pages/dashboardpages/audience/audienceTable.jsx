import React, { useEffect, useMemo, useState } from "react"
import { useAuth } from "../../../context/auth"
import { getAllSalesEmails } from "../../../services/supabaseHelpers"
import { useTable } from "react-table"

const AudienceTable = () => {
  const { user } = useAuth()
  const [emails, setEmails] = useState([])

  async function fetchSalesEmails() {
    const emails = await getAllSalesEmails(user.id)
    console.log("Emails=> ", emails)
    setEmails(emails)
  }

  const columns = useMemo(
    () => [
      {
        Header: "Email",
        accessor: "email",
        width: 300,
      },
    ],
    []
  )

  const emailData = useMemo(() => [...emails], [emails])

  const tableInstance = useTable({
    columns: columns,
    data: emailData,
  })

  const { getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance

  useEffect(() => {
    if (emails.length === 0) {
      fetchSalesEmails()
    }
  }, [])

  const isEven = (idx) => idx % 2 === 0

  return (
    <div className="overflow-y-hidden">
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
                    className={`border-sm p-5 border-secondary-default whitespace-nowrap overflow-hidden 
                    
                      text-left hover:underline
                    `}
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

export default AudienceTable
