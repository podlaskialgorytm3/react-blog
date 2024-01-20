import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClientProvider } from '@tanstack/react-query';

import { ErrorPage } from "./pages/error/error-page"
import { Root } from "./pages/root/root";
import { SignIn } from "./pages/auth/sign-in"
import { SignUp } from "./pages/auth/sign-up"
import { Home } from "./pages/home/home"
import { ResetPassword } from "./pages/auth/reset-password";
import { NewPassword } from "./pages/auth/new-password";

import { UserDashboardLayout } from "./pages/user/user-dashboard-layout.tsx";
import { Profile } from "./pages/user/profile";
import { Settings } from "./pages/user/settings";
import { PostSettings } from "./pages/user/post-settings";
import { AddPost } from "./pages/user/add-post";
import { Post } from "./pages/user/post";

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
      {path: '/reset-password',element: <ResetPassword />},
      {path: '/new-password/:token', element: <NewPassword />},
      {path: '/user', element: <UserDashboardLayout />, children: [
        {path: '/user/profile', element: <Profile/>},
        {path: '/user/settings',element: <Settings/>},
        {path: '/user/post-settings',element: <PostSettings/>},
      ]},
      {path: '/post/:id',element: <Post />},
      {path: '/add-post',element: <AddPost />},
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
