import { useEffect, useState } from "react"
import Editor from "../../../components/inputs/Editor"
import FileDropper from "../../../components/inputs/FileDropper"
import Toggle from "../../../components/inputs/Toggle"

const AddProduct = () => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [productImages, setProductImages] = useState([])
  const [productArtifact, setProductArtifact] = useState([])
  const [allowCopies, setAllowCopies] = useState(false)
  const [displaySales, setDisplaySales] = useState(false)

  const [errorName, setErrorName] = useState("")
  const [errorDescription, setErrorDescription] = useState("")
  const [errorprice, setErrorPrice] = useState("")
  const [errorProductImages, setErrorProductImages] = useState("")
  const [errorProductArtifact, setErrorProductArtifact] = useState("")
  const [errorAllowCopies, setErrorAllowCopies] = useState("")
  const [errorDisplaySales, setErrorDisplaySales] = useState("")

  const fileTypesProductImages = ["image/png", "image/jpeg"]
  const fileTypesProductArtifact = [
    "application/zip",
    "application/x-7z-compressed",
    "text/plain",
    "application/vnd.rar",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/pdf",
    "video/mp4",
    "audio/mpeg",
    "application/epub+zip",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/csv",
  ]

  useEffect(() => {
    console.log(description)
  }, [description])

  function handleSubmit(e) {
    console.log(
      name,
      description,
      price,
      productImages,
      productArtifact,
      allowCopies,
      displaySales
    )
  }

  return (
    <div className="container flex flex-col mx-auto p-3">
      <div className="text-3xl font-medium mt-10">New Product</div>
      <form
        className="flex flex-col gap-12 my-4 md:my-12 overflow-y-visible"
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        {/* name */}
        <div className="flex flex-col gap-6">
          <div className="text-2xl">Name</div>
          <input
            className="border-sm shadow-sm rounded-br-2xl border-secondary-focus bg-primary-default w-full md:w-[636px] h-10 md:h-12 px-3 focus:outline-none"
            placeholder="Name of the product"
            type="text"
            maxLength="256"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
        </div>
        {/* price */}
        <div className="flex flex-col gap-6 ">
          <div className="text-2xl">Price</div>
          <div className="flex gap-4 w-full">
            <select
              value={price}
              onChange={(e) => {
                setPrice(e.target.value)
              }}
              className="shadow-sm rounded-br-2xl border-sm border-secondary-focus bg-primary-default w-20 h-12 py-2 px-4 focus:outline-none"
            >
              <option value="0">$</option>
              <option value="1">&pound;</option>
              <option value="2">&euro;</option>
            </select>
            <input
              className="shadow-sm border-sm rounded-br-2xl border-secondary-focus bg-primary-default w-80 md:w-[540px] h-12 px-3 focus:outline-none cursor-pointer"
              type="number"
              placeholder="Price of the product"
              name="price"
            />
          </div>
        </div>
        {/* description */}
        <div className="flex flex-col gap-6">
          <div className="text-2xl">Description</div>
          <div className="w-full md:w-[636px] max-h-64 mb-11">
            <Editor desc={description} setDesc={setDescription} />
          </div>
        </div>
        {/* product images */}
        <div className="flex flex-col gap-6">
          <div className="text-2xl">Images</div>
          <FileDropper
            text="Upload up to 3 product images here"
            extratext="Images can be either JPG or PNG and need to be square and at least 500 x 500 pixels in dimension. "
            value={productImages}
            onFileChange={setProductImages}
            maxFiles={3}
            typeOfFiles={fileTypesProductImages}
          />
        </div>
        {/* product artifact */}
        <div className="flex flex-col gap-6 w-[420px] md:w-[636px]">
          <div className="text-2xl">Upload Product</div>
          <FileDropper
            kind="artifact"
            text="Upload your product here"
            extratext="Product can be: a .zip, .7z, .pdf, .docx, .txt., .xlsx, .pptx, .mp3, .mp4, .epub, .rar, .csv"
            value={productArtifact}
            onFileChange={setProductArtifact}
            maxFiles={1}
            typeOfFiles={fileTypesProductArtifact}
          />
          <div className="text-xl flex justify-center">
            OR redirect to a URL
          </div>
          <input
            className="border-sm shadow-sm rounded-br-2xl border-secondary-focus bg-primary-default w-[420px] md:w-[636px] h-12 px-3 focus:outline-none"
            placeholder="Redirect URL"
            type="text"
            maxLength="200"
          />
        </div>
        {/* some extra info for the product */}
        <div className="flex flex-col gap-6 w-[420px] md:w-[636px]">
          <div className="text-2xl">Extra Information</div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div className="text-lg">
                Allow customers to choose number of copies to purchase
              </div>
              <Toggle />
            </div>
            <div className="flex justify-between">
              <div className="text-lg">
                Display number of sales of this product publicly
              </div>
              <Toggle />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center w-full md:w-[636px] my-11">
          <button
            type="submit"
            className="text-lg md:text-xl font-bold flex justify-center items-center border-sm rounded-br-2xl w-40 md:w-52 h-14 bg-primary-default shadow-sm cursor-pointer hover:bg-primary-focus hover:shadow-none transition-all duration-300"
          >
            Publish Product
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddProduct
