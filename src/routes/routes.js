import { jsx as _jsx } from "react/jsx-runtime";
import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "../pages/error/error-page.tsx";
import { Root } from "../pages/root/root.tsx";
import { SignIn } from "../pages/auth/sign-in.tsx";
import { SignUp } from "../pages/auth/sign-up.tsx";
import { Home } from "../pages/home/home.tsx";
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
        element: _jsx(Root, {}),
        errorElement: _jsx(ErrorPage, {}),
        children: [
            { path: '/', element: _jsx(Home, {}) },
            { path: '/signin', element: _jsx(SignIn, {}) },
            { path: '/signup', element: _jsx(SignUp, {}) },
            { path: '/reset-password', element: _jsx(ResetPassword, {}) },
            { path: '/new-password/:token', element: _jsx(NewPassword, {}) },
            { path: '/user', element: _jsx(UserDashboardLayout, {}), children: [
                    { path: '/user/profile', element: _jsx(Profile, {}) },
                    { path: '/user/settings', element: _jsx(Settings, {}) },
                    { path: '/user/post-settings', element: _jsx(PostSettings, {}) },
                    { path: '/user/post-settings/edit/:id', element: _jsx(EditPost, {}) },
                    { path: '/user/post-settings/tag-settings', element: _jsx(TagSettings, {}) },
                    { path: '/user/post-settings/tag-settings/edit/:id', element: _jsx(EditTag, {}) }
                ] },
            { path: '/post/:id', element: _jsx(Post, {}) },
            { path: '/add-post', element: _jsx(AddPost, {}) },
            { path: '/add-tag', element: _jsx(AddTag, {}) },
        ]
    },
]);
