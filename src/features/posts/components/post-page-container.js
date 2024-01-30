import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams } from "react-router-dom";
import { PostPage } from "./post-page";
import { Loading } from "../../../shared/components/loading";
import Swal from "sweetalert2";
import { useFetchPost } from "../../../api/use-fetch-post";
export const PostPageContainer = () => {
    const { id } = useParams();
    const { data: post, isLoading, isError, error } = useFetchPost(id || "");
    if (isError) {
        Swal.fire({
            title: "Error",
            text: error?.message,
            icon: "error",
            confirmButtonText: "Ok"
        });
    }
    return (_jsxs(_Fragment, { children: [isLoading && _jsx(Loading, { size: 100 }), (!isLoading || post) && _jsx(PostPage, { post: post })] }));
};
