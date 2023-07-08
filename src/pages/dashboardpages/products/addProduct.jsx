import { useEffect, useState } from "react"
import Editor from "../../../components/inputs/Editor"
import FileDropper from "../../../components/inputs/FileDropper"
import Toggle from "../../../components/inputs/Toggle"
import * as yup from "yup"
import {
  checkFileSize,
  getCurrencyAsStripeExpects,
  isValidHttpsUrl,
} from "../../../utils"
import { priceCurrency } from "../../../utils/constants"
import { ClimbingBoxLoader } from "react-spinners"
import { useNavigate } from "react-router-dom"
import {
  insertIntoProductArtifactStorage,
  insertIntoProductImagesStorage,
  insertIntoProductTable,
} from "../../../services/supabaseHelpers"
import { useAuth } from "../../../context/auth"
import { createStripeProduct } from "../../../services/backendCalls"
import usePayment from "../../../hooks/use-payment"
import { toast } from "react-toastify"

const AddProduct = () => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [priceType, setPriceType] = useState(0)
  const [productImages, setProductImages] = useState([])
  const [productArtifact, setProductArtifact] = useState([])
  const [productArtifactURL, setProductArtifactURL] = useState("")
  const [allowCopies, setAllowCopies] = useState(false)
  const [displaySales, setDisplaySales] = useState(false)
  const [shortDesc, setShortDesc] = useState("")
  const [callToAction, setCallToAction] = useState("")

  const [inputErrors, setInputErrors] = useState(null)
  const [errorProductImages, setErrorProductImages] = useState("")
  const [errorProductArtifact, setErrorProductArtifact] = useState("")

  const [showProductArtifactOverURL, setShowProductArtifactOverURL] =
    useState(true)

  const [loading, setLoading] = useState([false, "Just a moment..."])
  const [mounted, setMounted] = useState(true) // this is needed so that we know when we initially load the form, the loading spinner is not shown. Instead, it is only shown when we submit the form and set `mounted` to false.

  const navigate = useNavigate()

  const { user } = useAuth()

  // this hook and subsequent useEffect makes sure to load stripe id before the user can make a new product
  const { stripeId, loadingStripeData } = usePayment(user)
  useEffect(() => {
    if (stripeId && !loadingStripeData) {
      setLoading([false, "Just a moment..."])
    } else if (!stripeId && !loadingStripeData) {
      setLoading([true, "Loading..."])
      toast.warning(
        "Please connect your Stripe account before making a product.",
        {
          toastId: "alert1", // this id field is necessary because it helps make the toast show only once.
          position: "top-right",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      )
      setTimeout(() => {
        navigate("/dashboard/settings")
      }, 2000)
    }
  }, [loadingStripeData])

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
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ]

  useEffect(() => {
    if (showProductArtifactOverURL) {
      //erase the url
      setProductArtifactURL("")
    } else {
      //erase the artifact
      setProductArtifact([])
    }
  }, [showProductArtifactOverURL])

  async function handleSubmit() {
    let schemaVal = {
      name: name,
      description: description,
      priceType: priceType,
      price: price,
      productImages: productImages,
      productArtifact: productArtifact,
      productArtifactURL: productArtifactURL,
      allowCopies: allowCopies,
      displaySales: displaySales,
      shortDesc: shortDesc,
      callToAction: callToAction,
    }
    let schema = yup.object({
      name: yup
        .string()
        .trim()
        .min(3, "Name of the product should be between 3 and 200 characters.")
        .max(200, "Name of the product should be between 3 and 200 characters.")
        .required("Name of the product is required."),
      description: yup
        .string()
        .trim()
        .min(100, "Please provide at least a 100 character description. ")
        .required("Description of the product is required."),
      price: yup
        .number()
        .min(
          0,
          "Price of the product must be exactly 0 or greater than or equal to 1."
        )
        .required("Price of the product is required."),
      shortDesc: yup
        .string()
        .trim()
        .max(200, "This short description can be a maximum of 200 characters.")
        .matches(
          /^[a-zA-Z0-9_ ]*$/,
          "This short description should only contain alphabets, numbers, and spaces."
        ),
      callToAction: yup
        .string()
        .trim()
        .max(30, "Call to action can be a maximum of 30 characters.")
        .matches(
          /^[a-zA-Z0-9_ ]*$/,
          "The call to action should only contain alphabets, numbers, and spaces."
        ),
    })
    console.log("Onsubmit: ", schemaVal)
    try {
      // validate the productImages
      if (!productImages || productImages.length === 0) {
        setErrorProductImages("At least one product image is required.")
      } else {
        for (let i = 0; i < productImages.length; i++) {
          if (!checkFileSize(productImages[i], 10)) {
            setErrorProductImages("Images need to be <= 10MB in size.")
          } else if (!fileTypesProductImages.includes(productImages[i].type)) {
            setErrorProductImages(
              "Images need to be of type .png or .jpeg only."
            )
          } else {
            setErrorProductImages("")
          }
        }
      }
      // validate the product Artifact or URL
      if (
        productArtifactURL.trim() === "" &&
        (!productArtifact || productArtifact.length === 0)
      ) {
        // if both are null -> show an error
        console.log("if both are null -> show an error")
        setErrorProductArtifact(
          "Please upload a product or provide a redirect URL."
        )
      } else if (showProductArtifactOverURL) {
        // URL is none but artifact should have something
        console.log("URL is none but artifact should have something")
        if (!productArtifact || productArtifact.length === 0) {
          // if no product uploaded
          console.log("if no product uploaded")
          setErrorProductArtifact(
            "Please upload a product or provide a redirect URL."
          )
        } else if (fileTypesProductArtifact.includes(productArtifact[0])) {
          // product artifact is present but if an invalid file type uploaded
          console.log(
            "product artifact is present but if an invalid file type uploaded"
          )
          setErrorProductArtifact("This product file type is not supported.")
        } else {
          console.log("No error.")
          setErrorProductArtifact("")
        }
      } else {
        // artifact can be null but gotta have a URL
        console.log("artifact can be null but gotta have a URL")
        if (
          productArtifactURL.trim() === "" ||
          !isValidHttpsUrl(productArtifactURL.trim())
        ) {
          console.log("checking for valid URL")
          setErrorProductArtifact("Please enter a valid redirect URL")
        } else {
          console.log("No error.")
          setErrorProductArtifact("")
        }
      }
      await schema.validate(schemaVal, {
        abortEarly: false,
      })
      setInputErrors(null)
      // check if all validation is successful
      console.log("At the final check.")
      console.log(
        "The errors: ",
        inputErrors,
        errorProductImages,
        errorProductArtifact
      )
      //insert into DB
      setMounted(false)
    } catch (err) {
      let errors = {}
      err.inner.forEach((e) => {
        errors[e.path] = e.message
      })
      if (price > 0 && price < 1)
        // special check for price because stripe needs it
        errors["price"] =
          "Price of the product must be exactly 0 or greater than or equal to 1."
      console.log("Errors in form=>", errors)
      setInputErrors(errors)
    }
  }

  async function insertIntoDB(isPublished = true) {
    // validation is successful is this happens
    console.log("Validation successful, congrats!")
    // TODO insert into db
    const productToCreate = {
      name: name,
      description: description,
      price: price,
      priceType: priceType,
      allowCopies: allowCopies,
      displaySales: displaySales,
      shortDesc: shortDesc,
      callToAction: callToAction,
    }
    const product_id = await insertIntoProductTable(
      user.id,
      productToCreate,
      productArtifactURL,
      isPublished
    )
    if (product_id) {
      await createStripeProduct(
        product_id,
        name,
        price,
        getCurrencyAsStripeExpects(parseInt(priceType)),
        stripeId
      )
      await insertIntoProductImagesStorage(user.id, productImages, product_id)
      // try to upload an artifact only if an artifact is provided
      if (productArtifact.length > 0) {
        await insertIntoProductArtifactStorage(
          user.id,
          productArtifact,
          product_id
        )
      }
      // work done, product created -> navigate to products page
      navigate("/dashboard/products")
    } else {
      // work not done, something is wrong...
      console.log("Something went wrong. ")
      setMounted(true)
    }
  }

  useEffect(() => {
    if (
      !mounted &&
      !errorProductArtifact &&
      !errorProductImages &&
      !inputErrors
    ) {
      console.log("Here in the useeffect.")
      setLoading([true, "Publishing..."])
      insertIntoDB(true)
    } else if (mounted) {
      // if form submission has errored out, show something went wrong message
      setLoading([false, "Just a moment..."])
    }
  }, [mounted, inputErrors, errorProductImages, errorProductArtifact])

  async function saveProductToDrafts() {
    setLoading([true, "Saving..."])
    insertIntoDB(false)
  }

  return loading[0] ? (
    <div className="container bg-primary-focus z-50 flex flex-col gap-5 h-screen justify-center items-center mx-auto p-3 ">
      <div className="text-xl">{loading[1]}...</div>
      <ClimbingBoxLoader color="#434746" />
    </div>
  ) : (
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
          {inputErrors && inputErrors.name && (
            <div className="text-alert-dark text-lg">{inputErrors.name}</div>
          )}
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
          {inputErrors && inputErrors.price && (
            <div className="text-alert-dark text-lg">{inputErrors.price}</div>
          )}
          <div className="flex gap-4 w-full">
            <select
              value={priceType}
              onChange={(e) => {
                setPriceType(e.target.value)
              }}
              className="shadow-sm rounded-br-2xl border-sm border-secondary-focus bg-primary-default w-20 h-12 py-2 px-4 focus:outline-none"
            >
              {priceCurrency.map((currency) => {
                const keyC = Object.keys(currency)[0]
                const valC = currency[keyC]
                return <option value={keyC}>{valC}</option>
              })}
            </select>
            <input
              className="shadow-sm border-sm rounded-br-2xl border-secondary-focus bg-primary-default w-80 md:w-[540px] h-12 px-3 focus:outline-none cursor-pointer"
              type="number"
              placeholder="Price of the product"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value)
              }}
            />
          </div>
        </div>
        {/* description */}
        <div className="flex flex-col gap-6">
          <div className="text-2xl">Description</div>
          {inputErrors && inputErrors.description && (
            <div className="text-alert-dark text-lg">
              {inputErrors.description}
            </div>
          )}
          <div className="w-full md:w-[636px] max-h-64 mb-11">
            <Editor desc={description} setDesc={setDescription} />
          </div>
        </div>
        {/* product images */}
        <div className="flex flex-col gap-6">
          <div className="text-2xl">Images</div>
          {errorProductImages && (
            <div className="text-alert-dark text-lg">{errorProductImages}</div>
          )}
          <FileDropper
            text="Upload up to 3 product images here"
            extratext="Images can be either JPG or PNG and need to be square and at least 500 x 500 pixels in dimension and <=10 MB in size."
            value={productImages}
            onFileChange={setProductImages}
            maxFiles={3}
            typeOfFiles={fileTypesProductImages}
            numInitFiles={0}
          />
        </div>
        {/* product artifact */}
        <div className="flex flex-col gap-6 ">
          <div className="text-2xl">Product</div>
          {errorProductArtifact && (
            <div className="text-alert-dark text-lg">
              {errorProductArtifact}
            </div>
          )}
          {showProductArtifactOverURL ? (
            <FileDropper
              kind="artifact"
              text="Upload your product here"
              extratext="Product can be: a .zip, .7z, .pdf, .docx, .txt., .xlsx, .pptx, .mp3, .mp4, .epub, .rar, .csv"
              value={productArtifact}
              onFileChange={setProductArtifact}
              maxFiles={1}
              typeOfFiles={fileTypesProductArtifact}
              numInitFiles={0}
            />
          ) : (
            <input
              className={`border-sm shadow-sm rounded-br-2xl border-secondary-focus bg-primary-default w-full md:w-[636px] h-12 px-3 focus:outline-none ${
                showProductArtifactOverURL ? "hidden" : "block"
              }`}
              placeholder="Redirect URL"
              type="text"
              maxLength="500"
              value={productArtifactURL}
              onChange={(e) => {
                setProductArtifactURL(e.target.value)
              }}
            />
          )}
          <div
            className="text-xl flex justify-center w-full md:w-[636px]
              showProductArtifactOverURL underline cursor-pointer"
            onClick={() => {
              setShowProductArtifactOverURL(!showProductArtifactOverURL)
            }}
          >
            {showProductArtifactOverURL
              ? "OR redirect to a URL"
              : "OR upload a Product"}
          </div>
        </div>
        {/* Short desc */}
        <div className="flex flex-col gap-6">
          <div className="text-2xl">What the customer gets on purchase</div>
          {inputErrors && inputErrors.shortDesc && (
            <div className="text-alert-dark text-lg">
              {inputErrors.shortDesc}
            </div>
          )}
          <input
            className="border-sm shadow-sm rounded-br-2xl border-secondary-focus bg-primary-default w-full md:w-[636px] h-10 md:h-12 px-3 focus:outline-none"
            type="text"
            maxLength="200"
            placeholder="Optional"
            value={shortDesc}
            onChange={(e) => {
              setShortDesc(e.target.value)
            }}
          />
        </div>
        {/* call to action */}
        <div className="flex flex-col gap-6">
          <div className="text-2xl">Call to action</div>
          {inputErrors && inputErrors.callToAction && (
            <div className="text-alert-dark text-lg">
              {inputErrors.callToAction}
            </div>
          )}
          <input
            className="border-sm shadow-sm rounded-br-2xl border-secondary-focus bg-primary-default w-full md:w-[636px] h-10 md:h-12 px-3 focus:outline-none"
            placeholder="Get"
            type="text"
            maxLength="30"
            value={callToAction}
            onChange={(e) => {
              setCallToAction(e.target.value)
            }}
          />
        </div>
        {/* some extra info for the product */}
        <div className="flex flex-col gap-6 w-full md:w-[636px]">
          <div className="text-2xl">Extra Information</div>
          <div className="flex flex-col gap-10 md:gap-3">
            {/* <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center gap-3">
              <div className="text-lg">
                Allow customers to choose number of copies to purchase
              </div>
              <Toggle enabled={allowCopies} setEnabled={setAllowCopies} />
            </div> */}
            <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center gap-3 w-full">
              <div className="text-lg">
                Display number of sales of this product publicly
              </div>
              <Toggle enabled={displaySales} setEnabled={setDisplaySales} />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center w-full md:w-[636px] my-11 gap-5 md:gap-8">
          <button
            type="submit"
            className="text-lg md:text-xl font-bold flex justify-center items-center border-sm rounded-br-2xl w-40 md:w-52 h-14 bg-primary-default shadow-sm cursor-pointer hover:bg-primary-focus hover:shadow-none transition-all duration-300"
          >
            Publish Product
          </button>
          <button
            className="text-lg md:text-xl font-bold flex justify-center items-center border-sm rounded-br-2xl w-40 md:w-52 h-14 bg-secondary-default text-primary-focus cursor-pointer hover:bg-primary-default hover:text-secondary-focus hover:shadow-sm transition-all duration-300"
            onClick={saveProductToDrafts}
          >
            Save as Draft
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddProduct
