import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { UserLabel } from "./user-label";
import { defaultPostImage } from "../../../shared/constants/data";
export const PostCard = ({ post }) => {
    return (_jsxs("div", { className: "w=[300px] h-[275px] m-8 md:w-[500px] md:h-[450px] md:m-5", children: [_jsx(UserLabel, { user: post.user }), _jsx(Link, { to: `/post/${post.post_id}`, children: _jsxs("div", { children: [_jsx("img", { src: post.image ? post.image : defaultPostImage, alt: "post", className: "w-full md:h-[250px] h-[200px] object-cover rounded-[50px]" }), _jsx("h1", { className: "md:text-[24px] font-bold text-center mt-6", children: post.title })] }) })] }));
};
