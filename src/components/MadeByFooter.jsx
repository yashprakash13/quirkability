import { HeartIcon } from "@heroicons/react/24/solid"
const MadeByFooter = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex gap-1">
        <div className="text-md font-extralight font- font-serif italic">
          made with
        </div>
        <HeartIcon className="w-5 h-5 text-secondary-focus" />
        <div className="text-md font-extralight font-serif italic">and</div>
      </div>
      <div className="text-2xl font-bold font-serif text-secondary-focus">
        quirkability
      </div>
    </div>
  )
}

export default MadeByFooter
