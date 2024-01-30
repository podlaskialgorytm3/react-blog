import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuth } from "../../../shared/hooks/useAuth";
import { PostSettingsCard } from "./post-settings-card";
import { Loading } from "../../../shared/components/loading";
import Swal from "sweetalert2";
import { useFetchUserPost } from "../api/use-fetch-user-post";
import { useDeletePost } from "../api/use-delete-post";
import { useState } from "react";
import { Link } from "react-router-dom";
export const PostSettingsContainer = () => {
    const { userData } = useAuth();
    const { data, isLoading, isError, error } = useFetchUserPost(userData.user_id);
    const { mutate } = useDeletePost();
    const [deletePostId, setDeletePostId] = useState([]);
    if (isError) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
            confirmButtonText: "Ok"
        });
    }
    const handleDeletePost = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Are you sure you want to delete this post?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                mutate(id);
                setDeletePostId((prev) => [...prev, id]);
            }
        });
    };
    const updatedData = data?.filter((post) => !deletePostId.includes(post.post_id));
    return (_jsxs("div", { className: `w-[500px] h-[auto] flex flex-col items-center relative`, children: [_jsx("h1", { className: "text-[36px] mb-5", children: "Post Settings \uD83D\uDD27\uD83D\uDDC2\uFE0F" }), _jsxs("p", { className: "text-lg", children: ["Go to ", _jsx(Link, { to: "/user/post-settings/tag-settings", className: "text-main font-bold", children: "Tag Settings" })] }), isLoading && _jsx(Loading, { size: 100 }), updatedData &&
                updatedData.map((post) => (_jsx(PostSettingsCard, { post: post, handleDeletePost: handleDeletePost }, post.post_id)))] }));
};
