import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

function Editor({ desc, setDesc }) {
  const MODULES = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      ["blockquote", "link"],
    ],
  }
  return (
    <ReactQuill
      theme="snow"
      value={desc}
      onChange={setDesc}
      modules={MODULES}
    />
  )
}
export default Editor
