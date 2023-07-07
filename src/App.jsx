import { createBrowserRouter, RouterProvider } from "react-router-dom"

// layout
import Main from "./layout/main"
import Protect from "./layout/protect"

// pages
import Error from "./pages/error"
import LandingPage from "./pages/landingpage"
import Login from "./pages/login"
import Signup from "./pages/signUp"
import Dashboard from "./pages/dashboard"
import Products from "./pages/dashboardpages/products/products"
import Audience from "./pages/dashboardpages/audience/audience"
import Settings from "./pages/dashboardpages/settings"
import AddProduct from "./pages/dashboardpages/products/addProduct"
import PublicUser from "./pages/publicpages/publicUser"
import PublicProduct from "./pages/publicpages/publicProduct"
import EditProduct from "./pages/dashboardpages/products/editProduct"
import PaymentAfter from "./pages/publicpages/paymentAfter"
import PaymentAfterProductInfo from "./pages/publicpages/paymentAfterProductInfo"
import Maintenance from "./pages/maintenance"

//services
import { AuthProvider } from "./context/auth"
import { useEffect, useRef, useState } from "react"
import { perform_server_health_check } from "./services/backendCalls"

function App() {
  const [serverHealthOK, setServerHealthOK] = useState(true)

  const ref = useRef(null)

  if (import.meta.env.VITE_APP_MODE === import.meta.env.VITE_ENV_PROD_KEYWORD) {
    const NO_OP = function () {}
    console.log = NO_OP
    console.warn = NO_OP
    console.error = NO_OP
    console.info = NO_OP
    console.debug = NO_OP
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <LandingPage />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
      ],
    },
    {
      path: "/dashboard",
      errorElement: <Error />,
      element: <Protect />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "products",
          children: [
            {
              index: true,
              element: <Products />,
            },
            {
              path: "add",
              element: <AddProduct />,
            },
            {
              path: ":productId",
              element: <EditProduct />,
            },
          ],
        },
        {
          path: "audience",
          children: [
            {
              index: true,
              element: <Audience />,
            },
          ],
        },
        {
          path: "settings",
          element: <Settings />,
        },
      ],
    },
    {
      path: "/:username",
      children: [
        {
          index: true,
          element: <PublicUser />,
        },
        {
          path: ":productId",
          element: <PublicProduct />,
        },
      ],
    },
    {
      path: "/order",
      element: <PaymentAfter />,
      children: [
        {
          path: "success",
          element: <PaymentAfterProductInfo />,
        },
        // {
        //   path: "cancel",
        //   element: <PaymentCancel />,
        // },
      ],
    },
  ])

  async function performHealthCheck() {
    const maintenanceOrNot = await perform_server_health_check()
    setServerHealthOK(true ? maintenanceOrNot : false)
  }

  const handleWindowError = (message, source, line, column, error) => {
    // Handle the error here, e.g., send an error report to a server
    // TODO
    // Prevent the error from being logged to the console
    return true
  }

  useEffect(() => {
    ref.current = setInterval(performHealthCheck, 60 * 1000)
    window.onerror = handleWindowError
    return () => {
      if (ref.current) {
        clearInterval(ref.current)
      }
      window.onerror = null
    }
  }, [])

  return (
    <div className="container lg:max-w-screenwidth-lg md:max-w-screenwidth-md mx-auto py-4 h-screen">
      {serverHealthOK ? (
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      ) : (
        <Maintenance />
      )}
    </div>
  )
}

export default App
