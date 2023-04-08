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
