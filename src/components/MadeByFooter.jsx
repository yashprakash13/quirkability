const MadeByFooter = () => {
  return (
    <div className="flex gap-11 justify-center items-center">
      <div className="flex gap-3 justify-center items-center bg-primary-default px-4 py-2 rounded-full">
        <div className="flex gap-1">
          <div className="text-sm font-extralight font- font-serif italic">
            © 2023
          </div>
        </div>
        <a
          className="text-md font-bold font-serif text-light-highlight hover:text-secondary-focus hover:underline"
          href="https://twitter.com/csandyash"
          target="_blank"
        >
          Yash Prakash{" "}
        </a>
        <div className="font-thin text-xs">(all rights reserved.)</div>
      </div>
    </div>
  )
}

export default MadeByFooter
