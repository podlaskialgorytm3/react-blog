import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { Root } from "./pages/root/Root"
import { SignIn } from "./pages/auth/SignIn"
import { SignUp } from "./pages/auth/SignUp"


const route = createBrowserRouter([
  {path: '/', element: <Root />},
  {path: '/signin', element: <SignIn />},
  {path: '/signup', element: <SignUp />},
])

function App() {

  return (
    <RouterProvider router={route}/>
  )
}

export default App
