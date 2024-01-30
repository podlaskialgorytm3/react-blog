import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { useAuth } from "../../../shared/hooks/useAuth";
import { Loading } from "../../../shared/components/loading";
import { useFetchTagUser } from "../api/use-fetch-tag-user";
import Swal from "sweetalert2";
import { TagSettingsCard } from "./tag-settings-card";
import { useDeleteTag } from "../api/use-delete-tag";
import { useState } from "react";
export const TagSettingsContainer = () => {
    const [deleteTagId, setDeleteTagId] = useState([]);
    const { userData } = useAuth();
    const { data, isLoading, isError, error } = useFetchTagUser(userData.user_id);
    const { mutate: deleteMutation } = useDeleteTag();
    const handleDelete = (tagId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Are you sure you want to delete this tag?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation(tagId);
                setDeleteTagId((prev) => [...prev, tagId]);
            }
        });
    };
    if (isError) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
            confirmButtonText: "Ok"
        });
    }
    const updatedData = data?.filter((tag) => !deleteTagId.includes(tag.tag_id));
    return (_jsxs("div", { className: `w-[500px] h-[auto] flex flex-col items-center relative`, children: [_jsx("h1", { className: "text-[36px] mb-5", children: "Tag Settings \uD83D\uDD27\uD83D\uDDC2\uFE0F" }), _jsxs("p", { className: "text-lg", children: ["Go to ", _jsx(Link, { to: "/user/post-settings", className: "text-main font-bold", children: "Post Settings" })] }), isLoading && _jsx(Loading, { size: 100 }), !isLoading && updatedData && updatedData.map((tag) => _jsx(TagSettingsCard, { tag: tag, handleDelete: handleDelete }, tag.tag_id))] }));
};
