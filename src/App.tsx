import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { Root } from "./pages/root/Root";
import { SignIn } from "./pages/auth/sign-in"
import { SignUp } from "./pages/auth/sign-up"


const route = createBrowserRouter([
  {
    path: '/', 
    element: <Root />,
    children: [
      {path: '/signin', element: <SignIn />},
      {path: '/signup', element: <SignUp />},
    ]
  }, 
])

function App() {

  return (
    <RouterProvider router={route}/>
  )
}

export default App
