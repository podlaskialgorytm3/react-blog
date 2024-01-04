import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { Root } from "./pages/root/root";
import { SignIn } from "./pages/auth/sign-in"
import { SignUp } from "./pages/auth/sign-up"
import { Home } from "./pages/home/home"


const route = createBrowserRouter([
  {
    path: '/', 
    element: <Root />,
    children: [
      {path: '/', element: <Home />},
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
