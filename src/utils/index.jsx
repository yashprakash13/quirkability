import imageCompression from "browser-image-compression"

function isValidHttpsUrl(string) {
  // check if a given url is valid
  let url
  try {
    url = new URL(string)
    console.log("url formed index.js: ", url)
  } catch (_) {
    return false
  }
  return url.protocol === "https:"
}

export { isValidHttpsUrl }

function checkFileSize(file, size) {
  // check file size in MB `size`
  const fileSizeInMB = file.size / (1024 * 1024)
  if (fileSizeInMB > size) {
    return false // File size is greater than 10MB
  }
  return true // File size is less than or equal to 10MB
}
export { checkFileSize }

function getTimestampedName(name) {
  // return a new name with the current timestamp
  const lastDotIndex = name.lastIndexOf(".")
  if (lastDotIndex === -1) {
    console.log("Couldn't read the file extension for: ", name)
    return
  }
  const extension = name.substring(lastDotIndex + 1)
  const newFilename = `${Date.now()}.${extension}`
  return newFilename
}
export { getTimestampedName }

async function compressImage(image, size = 0.5) {
  // return an image compressed to <= 500 KB in size
  const options = {
    maxSizeMB: size,
    maxWidthOrHeight: 1000,
    useWebWorker: true,
  }
  const compressedFile = await imageCompression(image, options)
  return compressedFile
}
export { compressImage }

function getCurrency(index) {
  // return the currency from index value // referenced in the order defined in ./constants.jsx
  switch (index) {
    case 0:
      return "$"
    case 1:
      return "\u00A3"
    case 2:
      return "\u20AC"
    default:
      return "$"
  }
}
export { getCurrency }

function getCurrencyAsStripeExpects(index) {
  // return the currency from index value // referenced in the order defined in ./constants.jsx
  switch (index) {
    case 0:
      return "USD"
    case 1:
      return "GBP"
    case 2:
      return "EUR"
    default:
      return "USD"
  }
}
export { getCurrencyAsStripeExpects }

/*
 * read, write, and delete from, to, and from cache
 */

const writeToCache = (key, data) =>
  localStorage.setItem(key, JSON.stringify(data))

const readFromCache = (key) => JSON.parse(localStorage.getItem(key)) || null

const deleteFromCache = (key) => localStorage.removeItem(key)

export { readFromCache, writeToCache, deleteFromCache }

function getSupabaseImageStorageURL(image) {
  // function to get a stored product image's complete URL from supabase storage
  const URL = `${
    import.meta.env.VITE_PROJECT_URL_SUPABASE
  }/storage/v1/object/public/${
    import.meta.env.VITE_SUPABASE_PRODUCT_IMAGES_STORAGE_BUCKET_NAME
  }/${image}`
  return URL
}
export { getSupabaseImageStorageURL }

function getSupabaseProfilePicURL(image) {
  // function to get image url and return complete display url from storage
  const URL = `${
    import.meta.env.VITE_PROJECT_URL_SUPABASE
  }/storage/v1/object/public/${
    import.meta.env.VITE_SUPABASE_USER_PROFILE_PIC_BUCKET_NAME
  }/${image}`
  return URL
}
export { getSupabaseProfilePicURL }
