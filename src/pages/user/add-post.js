import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useAuth } from "../../shared/hooks/useAuth";
import { Error } from "../../shared/components/error";
import { AddPostForm } from "../../features/posts/components/add-post-form";
export const AddPost = () => {
    const { auth } = useAuth();
    return (_jsx(_Fragment, { children: auth ? _jsx(AddPostForm, {}) : _jsx(Error, {}) }));
};
