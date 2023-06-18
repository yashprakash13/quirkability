import { useEffect, useRef, useState } from "react"
import {
  ArrowUpOnSquareIcon,
  DocumentIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"

const FileDropper = ({
  text,
  extratext,
  onFileChange,
  maxFiles,
  typeOfFiles,
  numInitFiles,
}) => {
  const wrapperRef = useRef(null)

  const [fileList, setFileList] = useState([])
  const [disable, setDisable] = useState(false)
  const [previewURLsList, setPreviewURLsList] = useState([])

  const onDragEnter = () => wrapperRef.current.classList.add("dragover")
  const onDragLeave = () => wrapperRef.current.classList.remove("dragover")
  const onDrop = () => wrapperRef.current.classList.remove("dragover")

  const onFileDrop = (e) => {
    if (fileList.length + numInitFiles + 1 === maxFiles) {
      setDisable(true)
    } else {
      setDisable(false)
    }
    for (let i = 0; i < e.target.files.length; i++) {
      const newFile = e.target.files[i]
      if (newFile && typeOfFiles.includes(newFile.type)) {
        console.log("Good type.")
        const updatedList = [...fileList, newFile]
        setFileList(updatedList)
        onFileChange(updatedList)
        // add the preview also
        const objectUrl = URL.createObjectURL(newFile)
        const oldPreviewsURLsList = [...previewURLsList]
        oldPreviewsURLsList.push(objectUrl)
        setPreviewURLsList(oldPreviewsURLsList)
      }
    }
    console.log("Called onFileDrop, num files now: ", fileList.length, disable)
  }

  const fileRemove = (filePreview) => {
    if (fileList.length + numInitFiles - 1 === maxFiles) {
      setDisable(true)
    } else {
      setDisable(false)
    }
    // remove the preview
    const updatedPreviewURLsList = [...previewURLsList]
    const indexToDelete = previewURLsList.indexOf(filePreview)
    updatedPreviewURLsList.splice(indexToDelete, 1)
    setPreviewURLsList(updatedPreviewURLsList)

    const updatedList = [...fileList]
    updatedList.splice(indexToDelete, 1)
    setFileList(updatedList)
    onFileChange(updatedList)
    console.log("Called fileRemove, num files now: ", fileList.length, disable)
  }

  return (
    <>
      <div
        className={`w-full md:w-[636px] h-[200px] shadow-sm border-sm rounded-br-2xl border-secondary-focus bg-primary-default px-3 py-3 flex justify-center items-center hover:opacity-60 focus:opacity-60 ${
          disable ? "hidden" : "relative"
        }`}
        ref={wrapperRef}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="flex flex-col justify-center items-center gap-4 p-2">
          <ArrowUpOnSquareIcon className="w-11" />
          <p className="text-lg">{text}</p>
        </div>
        <input
          type="file"
          value=""
          onChange={onFileDrop}
          className={`opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer `}
          accept={typeOfFiles}
        />
      </div>
      {fileList.length > 0 ? (
        <div className={`${disable ? "mt-0" : "mt-5"}`}>
          <p className="mb-5 text-lg">Selected:</p>
          {!typeOfFiles.some((item) =>
            ["image/png", "image/jpeg"].includes(item)
          ) ? (
            fileList.map((item, index) => (
              <div
                key={index}
                className="relative flex mb-2 p-4 rounded w-full md:w-[636px] bg-primary-default justify-start items-center border-sm border-secondary-focus rounded-br-2xl gap-3"
              >
                <DocumentIcon className="w-12 mr-5" />
                <div className="flex flex-col justify-between">
                  <p className="text-md">{item.name}</p>
                  <p>{(item.size / 1000000).toFixed(2)} MB</p>
                </div>
                <TrashIcon
                  className="w-6 h-6 rounded-[50%] absolute items-center right-[10px] cursor-pointer text-secondary-focus hover:text-alert-dark"
                  onClick={() => fileRemove(item)}
                />
              </div>
            ))
          ) : (
            <div className="flex flex-col md:flex-row gap-16 mt-6">
              {previewURLsList.map((src, index) => (
                <div
                  className="relative flex w-52 h-52 bg-primary-default justify-start items-end "
                  key={index}
                >
                  <img
                    src={src && src}
                    className="absolute w-52 h-52 border-sm border-secondary-focus"
                  />
                  <TrashIcon
                    className="w-11 h-11 m-2 p-2 rounded-[50%] absolute  cursor-pointer bg-primary-focus text-secondary-focus hover:text-alert-dark"
                    onClick={() => fileRemove(src)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}
      <div className="font-thin text-lg w-full md:w-[636px]">{extratext}</div>
    </>
  )
}

export default FileDropper
