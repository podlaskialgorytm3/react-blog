import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { UserLabel } from "./user-label";
import { TagLabel } from "../../../shared/components/tag";
import { useFetchTagToPost } from "../../../api/use-fetch-tag-to-post";
import DOMPurify from 'dompurify';
export const PostPage = ({ post }) => {
    const { data: tags } = useFetchTagToPost(post.post_id);
    const sanitizedHTML = DOMPurify.sanitize(post.description);
    return (_jsxs("div", { className: "md:w-[1000px] flex flex-col items-center mt-10", children: [_jsx(UserLabel, { user: post.user }), _jsx("h1", { className: "text-[36px]", children: post.title }), _jsx("div", { className: "md:w-[1000px] w-[350px] overflow-hidden", dangerouslySetInnerHTML: { __html: sanitizedHTML } }), _jsx("div", { className: "flex mt-20 flex-wrap", children: tags?.map((tag) => _jsx(TagLabel, { name: tag.name, color: tag.color }, tag.tag_id)) })] }));
};
