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

async function compressImage(image) {
  // return an image compressed to <= 1.5 MB in size
  const options = {
    maxSizeMB: 1,
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
