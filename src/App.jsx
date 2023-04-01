import { createBrowserRouter, RouterProvider } from "react-router-dom"

// layout
import Main from "./layout/main"

// pages
import Error from "./pages/error"
import LandingPage from "./pages/landingpage"
import Login from "./pages/login"
import Signup from "./pages/signUp"
import Dashboard from "./pages/dashboard"

//services
import { AuthProvider } from "./context/auth"
import Protect from "./layout/protect"

function App() {
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
      ],
    },
  ])
  return (
    <div className="container lg:max-w-screenwidth-lg md:max-w-screenwidth-md mx-auto py-4 h-screen">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  )
}

export default App
