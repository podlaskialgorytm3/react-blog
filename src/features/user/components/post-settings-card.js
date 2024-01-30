import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { defaultPostImage } from "../../../shared/constants/data";
import { Link } from "react-router-dom";
export const PostSettingsCard = ({ post, handleDeletePost }) => {
    return (_jsxs("div", { className: `md:w-[600px] md:h-[100px] w-[300px] flex items-center justify-between flex-row m-5`, children: [_jsxs("div", { className: "flex items-center", children: [_jsx("img", { src: post.image ? post.image : defaultPostImage, alt: post.title, className: "w-[100px] h-[100px] object-cover" }), _jsx("h1", { className: "text-[16px] md:text-[20px] ml-5 w-[250px]", children: post.title })] }), _jsxs("div", { children: [_jsx(Link, { to: `/user/post-settings/edit/${post.post_id}`, children: _jsx(EditIcon, { sx: { width: '45px', height: "45px" } }) }), _jsx(DeleteIcon, { sx: { width: '45px', height: "45px", cursor: "pointer" }, onClick: () => handleDeletePost(post.post_id) })] })] }));
};
