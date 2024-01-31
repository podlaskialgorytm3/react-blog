import { createBrowserRouter } from "react-router-dom"

import { ErrorPage } from "../pages/error/error-page"
import { Root } from "../pages/root/Root";
import { SignIn } from "../pages/auth/sign-in"
import { SignUp } from "../pages/auth/sign-up"
import { Home } from "../pages/home/home"
import { ResetPassword } from "../pages/auth/reset-password";
import { NewPassword } from "../pages/auth/new-password";
import { UserDashboardLayout } from "../pages/user/user-dashboard-layout.tsx";
import { Profile } from "../pages/user/profile";
import { Settings } from "../pages/user/settings";
import { PostSettings } from "../pages/user/post-settings";
import { AddPost } from "../pages/user/add-post";
import { Post } from "../pages/user/post";
import { EditPost } from "../pages/user/edit-post";
import { AddTag } from "../pages/user/add-tag";
import { TagSettings } from "../pages/user/tag-settings";
import { EditTag } from "../pages/user/edit-tag";

export const routes = createBrowserRouter([
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
          {path: '/user/post-settings/edit/:id',element: <EditPost />},
          {path: '/user/post-settings/tag-settings',element: <TagSettings />},
          {path: '/user/post-settings/tag-settings/edit/:id',element: <EditTag />}
        ]},
        {path: '/post/:id',element: <Post />},
        {path: '/add-post',element: <AddPost />},
        {path: '/add-tag',element: <AddTag />},
      ]
    }, 
  ])