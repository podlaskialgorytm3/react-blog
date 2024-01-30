import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PostCard } from "./post-card";
import { Loading } from "../../../shared/components/loading";
import Swal from "sweetalert2";
import { useFetchPosts } from "../api/use-fetch-posts";
import { useFetchPostCount } from "../api/use-fetch-post-count";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const numberPostOnPage = [2, 4, 6, 8, 10];
export const PostContainer = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [postCountOnPage, setPostCountOnPage] = useState(4);
    const { data, isLoading, isError, error, refetch } = useFetchPosts(currentPage, postCountOnPage);
    const { data: postCount } = useFetchPostCount();
    let pageConut = 0;
    if (isError) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
            confirmButtonText: "Ok"
        });
    }
    if (!isLoading && data.length === 0) {
        Swal.fire({
            icon: "info",
            title: "Oops...",
            text: "No posts on the database",
            confirmButtonText: "Ok"
        });
    }
    if (postCount) {
        pageConut = Math.ceil(postCount / postCountOnPage);
    }
    const handlePageChange = (event, page) => {
        event.preventDefault();
        setCurrentPage(page);
        refetch();
    };
    const handlePostCountChange = (event) => {
        setPostCountOnPage(event.target.value);
        setCurrentPage(1);
        refetch();
    };
    return (_jsxs("div", { className: "md:w-[1200px] w-[350px] flex flex-col items-center", children: [_jsx("div", { className: "w-full flex justify-end", children: data && (_jsx(Box, { sx: { minWidth: 150, marginTop: "50px", marginRight: "100px" }, children: _jsxs(FormControl, { fullWidth: true, children: [_jsx(InputLabel, { id: "demo-simple-select-label", children: "Post Count" }), _jsx(Select, { labelId: "demo-simple-select-label", label: "Post Count", value: postCountOnPage, onChange: (event) => handlePostCountChange(event), children: numberPostOnPage.map((count) => (_jsx(MenuItem, { value: count, children: count }, count))) })] }) })) }), _jsxs("div", { className: "md:w-[1200px] w-[350px] flex flex-wrap justify-center", children: [isLoading && _jsx(Loading, { size: 100 }), data && data.map((post) => _jsx(PostCard, { post: post }, post.post_id))] }), !isLoading && _jsx(Pagination, { count: pageConut, page: currentPage, onChange: (event, page) => handlePageChange(event, page), sx: {
                    display: "flex",
                    justifyContent: "center",
                    margin: "20px 0"
                } })] }));
};
