import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline"
import AudienceTable from "./audienceTable"

const Audience = () => {
  return (
    <div className="container flex flex-col mx-auto p-3">
      <div className="flex flex-col md:flex-row gap-11 justify-start md:justify-between md:items-center my-11 md:my-20 md:mx-32 mx-auto">
        <div className="flex flex-col gap-5 justify-center font-serif items-center">
          <div className="text-5xl">142</div>
          <div className="text-2xl">Total Fans</div>
        </div>
        <div className="font-serif text-xl text-primary-focus bg-secondary-focus py-3 px-6 rounded-br-lg inline-flex justify-center items-start gap-3 border-sm border-secondary-focus hover:text-secondary-focus hover:bg-primary-focus hover:border-sm transition-all duration-300 cursor-pointer group">
          <span className="group-hover:text-secondary-focus">Export CSV</span>
          <ArrowUpOnSquareIcon className="w-6 h-6 text-primary-focus group-hover:text-secondary-focus" />
        </div>
      </div>
      <div className="md:my-20 md:mx-32 mx-auto container">
        <AudienceTable />
      </div>
    </div>
  )
}

export default Audience
