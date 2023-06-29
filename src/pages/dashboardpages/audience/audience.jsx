import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline"
import AudienceTable from "./audienceTable"
import { useAuth } from "../../../context/auth"
import { useEffect, useMemo, useState } from "react"
import { getAllSalesEmails } from "../../../services/supabaseHelpers"
import { CSVDownload, CSVLink } from "react-csv"

const Audience = () => {
  const { user } = useAuth()
  const [emails, setEmails] = useState([])

  async function fetchSalesEmails() {
    const emails = await getAllSalesEmails(user.id)
    console.log("Emails=> ", emails)
    setEmails(emails)
  }

  useEffect(() => {
    if (emails.length === 0) {
      fetchSalesEmails()
    }
  }, [])

  function getUniqueEmailData() {
    const uniqueEmails = []
    const seenEmails = new Set()

    emails.forEach((item) => {
      const email = item.email
      if (!seenEmails.has(email)) {
        seenEmails.add(email)
        uniqueEmails.push(item)
      }
    })
    return uniqueEmails
  }

  const emailData = useMemo(() => getUniqueEmailData(), [emails])

  const csvData = [["Email"], ...emailData.map(({ email }) => [email])]

  async function exportEmailsAsCSV() {
    console.log("Exporting csv...")
  }

  return (
    <div className="container flex flex-col mx-auto p-3">
      <div className="flex flex-col md:flex-row gap-11 justify-start md:justify-between md:items-center my-11 md:my-20 md:mx-32 mx-auto">
        <div className="flex flex-col gap-5 justify-center font-serif items-center">
          <div className="text-5xl">{emailData.length}</div>
          <div className="text-2xl">Total Fans</div>
        </div>
        <CSVLink
          className="font-serif text-xl text-primary-focus bg-secondary-focus py-3 px-6 rounded-br-lg inline-flex justify-center items-start gap-3 border-sm border-secondary-focus hover:text-secondary-focus hover:bg-primary-focus hover:border-sm transition-all duration-300 cursor-pointer group"
          filename="audience.csv"
          data={csvData}
        >
          <span className="group-hover:text-secondary-focus">Export CSV</span>
          <ArrowUpOnSquareIcon className="w-6 h-6 text-primary-focus group-hover:text-secondary-focus" />
          <CSVLink className="" filename="audience.csv" data={csvData} />
        </CSVLink>
      </div>
      <div className="md:my-20 md:mx-32 ">
        <AudienceTable emailData={emailData} />
      </div>
    </div>
  )
}

export default Audience
