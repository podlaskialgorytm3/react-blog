import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClientProvider } from '@tanstack/react-query';

import { ErrorPage } from "./pages/error/error-page"
import { Root } from "./pages/root/root";
import { SignIn } from "./pages/auth/sign-in"
import { SignUp } from "./pages/auth/sign-up"
import { Home } from "./pages/home/home"
import { ResetPassword } from "./pages/auth/reset-password";
import { NewPassword } from "./pages/auth/new-password";


import { queryClient } from "./features/auth/utils/fetch-data"

const route = createBrowserRouter([
  {
    path: '/', 
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {path: '/', element: <Home />},
      {path: '/signin', element: <SignIn />},
      {path: '/signup', element: <SignUp />},
      {
        path: '/reset-password',
        element: <ResetPassword />,
        children: [
          {path: '/reset-password/new-password/:token', element: <NewPassword />}
        ]
      }
    ]
  }, 
])

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={route}/>
    </QueryClientProvider>
    
  )
}

export default App
