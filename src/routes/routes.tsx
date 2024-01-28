import { createBrowserRouter } from "react-router-dom"

import { ErrorPage } from "../pages/error/error-page.tsx"
import { Root } from "../pages/root/root.tsx";
import { SignIn } from "../pages/auth/sign-in.tsx"
import { SignUp } from "../pages/auth/sign-up.tsx"
import { Home } from "../pages/home/home.tsx"
import { ResetPassword } from "../pages/auth/reset-password.tsx";
import { NewPassword } from "../pages/auth/new-password.tsx";
import { UserDashboardLayout } from "../pages/user/user-dashboard-layout.tsx.tsx";
import { Profile } from "../pages/user/profile.tsx";
import { Settings } from "../pages/user/settings.tsx";
import { PostSettings } from "../pages/user/post-settings.tsx";
import { AddPost } from "../pages/user/add-post.tsx";
import { Post } from "../pages/user/post.tsx";
import { EditPost } from "../pages/user/edit-post.tsx";
import { AddTag } from "../pages/user/add-tag.tsx";
import { TagSettings } from "../pages/user/tag-settings.tsx";
import { EditTag } from "../pages/user/edit-tag.tsx";

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