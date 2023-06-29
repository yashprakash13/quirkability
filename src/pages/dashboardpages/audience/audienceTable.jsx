import React, { useEffect } from "react"
import { useAuth } from "../../../context/auth"
import { getAllSalesEmails } from "../../../services/supabaseHelpers"

const AudienceTable = () => {
  const { user } = useAuth()

  async function fetchSalesEmails() {
    const emails = await getAllSalesEmails(user.id)
    console.log("Emails=> ", emails)
  }
  useEffect(() => {
    fetchSalesEmails()
  }, [])
  return <div>AudienceTable</div>
}

export default AudienceTable
