const MadeByFooter = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex gap-1">
        <div className="text-md font-extralight font- font-serif italic">
          made by
        </div>
      </div>
      <a
        className="text-xl font-bold font-serif text-secondary-focus hover:underline"
        href="https://twitter.com/csandyash"
        target="_blank"
      >
        Yash Prakash
      </a>
    </div>
  )
}

export default MadeByFooter
