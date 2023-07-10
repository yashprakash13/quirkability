import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import * as Sentry from "@sentry/react"
import { HelmetProvider } from "react-helmet-async"

Sentry.init({
  dsn: "https://38ed4e701c844a8b994d74b738ca6ef9@o4505474010644480.ingest.sentry.io/4505474011824128",
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
      <ToastContainer />
    </HelmetProvider>
  </React.StrictMode>
)
