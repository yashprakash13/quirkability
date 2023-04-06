import { useEffect, useState } from "react"
import Editor from "../../../components/inputs/Editor"

const AddProduct = () => {
  let [description, setDescription] = useState("")

  useEffect(() => {
    console.log(description)
  }, [description])

  return (
    <div className="container flex flex-col mx-auto p-3">
      <div className="text-3xl font-medium mt-10">New Product</div>
      <form className="flex flex-col gap-12 my-4 md:my-12 overflow-y-visible">
        <div className="flex flex-col gap-6">
          <div className="text-2xl">Name</div>
          <input
            className="border-sm shadow-sm rounded-br-2xl border-secondary-focus bg-primary-default w-full md:w-[636px] h-10 md:h-12 px-3 focus:outline-none"
            placeholder="Name of the product"
            type="text"
            maxLength="200"
            name="name"
          />
        </div>
        <div className="flex flex-col gap-6 ">
          <div className="text-2xl">Price</div>
          <div className="flex gap-4 w-full">
            <select
              name="price_currency"
              className="shadow-sm rounded-br-2xl border-sm border-secondary-focus bg-primary-default w-20 h-12 py-2 px-4 focus:outline-none"
            >
              <option value="0">$</option>
              <option value="1">&euro;</option>
              <option value="2">&pound;</option>
            </select>
            <input
              className="shadow-sm border-sm rounded-br-2xl border-secondary-focus bg-primary-default w-80 md:w-[540px] h-12 px-3 focus:outline-none cursor-pointer"
              type="number"
              placeholder="Price of the product"
              name="price"
            />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="text-2xl">Description</div>
          {/* <textarea
            className="shadow-sm rounded-br-2xl border-sm border-secondary-focus bg-primary-default w-full md:w-[636px] h-48 px-3 py-3 focus:outline-none"
            placeholder="Description of the product - max. 2000 characters"
            maxLength="2000"
            name="desc"
          /> */}
          <div className="w-full md:w-[636px] max-h-64 mb-11">
            <Editor desc={description} setDesc={setDescription} />
          </div>
        </div>
        {/* <div className="text-2xl">
        <div className="text-2xl">Images</div>
        {formik.errors.product_images ? (
          <div className="text-xl text-[#dc2626]">gwgwr</div>
        ) : (
          ""
        )}
        <FileDropper
          kind="product_images"
          text="Upload up to 3 product images here"
          extratext="Images can be either JPG or PNG and need to be square and at least 500 x 500 pixels in dimension. "
          onFileChange={(files) => onFileChange(files)}
          maxFiles={3}
          typeFiles={"image"}
          name="product_images"
          onChange={formik.handleChange}
          value="product_images"
        />
      </div> */}
        {/* <div className="flex flex-col gap-6 w-[420px] md:w-[636px]">
        <div className="text-2xl">Extra Information</div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="text-lg font-thin">
              Allow customers to choose number of copies to purchase
            </div>
            <Toggle />
          </div>
          <div className="flex justify-between">
            <div className="text-lg font-thin">
              Allow customers to choose number of copies to purchase
            </div>
            <Toggle />
          </div>
        </div>
      </div> */}
        {/* <div className="flex flex-col gap-6 w-[420px] md:w-[636px]">
        <div className="text-2xl">Upload Product</div>
        <FileDropper
          kind="artifact"
          text="Upload your product here"
          extratext="Product can be a .pdf, .docx, .txt., .xlsx, .pptx, .zip, .mp3, .mp4"
          onFileChange={(files) => onFileChange(files)}
          maxFiles={3}
          name="artifact"
          onChange={formik.handleChange}
          value="artifact"
        />
        <div className="text-xl flex justify-center">OR redirect to a URL</div>
        <input
          className="border-2 shadow-sm rounded-br-2xl border-secondary-focus bg-primary-default w-[420px] md:w-[636px] h-12 px-3 focus:outline-none"
          placeholder="Redirect URL"
          type="text"
          maxLength="200"
        />
      </div> */}

        {/* {productImagesError && (
        <div className="text-xl text-[#dc2626]">
          At least 1 product image is required.
        </div>
      )}
      {artifactError && (
        <div className="text-xl text-[#dc2626]">
          You forgot to upload the product.
        </div>
      )} */}
        <div className="flex justify-center items-center w-full md:w-[636px] ">
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
