import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Button, TextField } from "@mui/material";
import { ApiKeyTinyMMC } from "../../../shared/config/confidential-data";
import { EDITOR_INIT } from "../../../shared/constants/editor-props";
import { Editor } from '@tinymce/tinymce-react';
import { Loading } from "../../../shared/components/loading";
import { TagLabel } from "../../../shared/components/interactive-tag";
import { useFetchTags } from "../../../api/use-fetch-tags";
import { useEditPostCard } from "../hooks/use-edit-post-card";
import { useAddTagPost } from "../hooks/use-add-tag-post";
export const EditPostCard = () => {
    const { data: tags, isLoading: isLoadingTags } = useFetchTags();
    const { tagsId, handleTagClick } = useAddTagPost();
    const { handleSubmit, handleContentChange, handleImageChange, post, isLoadingPost, error } = useEditPostCard(tagsId);
    return (_jsxs("div", { className: "flex flex-col items-center", children: [_jsx("h1", { className: "text-[36px] text-center mb-5", children: "Editing Post \uD83D\uDCC4\u270F\uFE0F" }), isLoadingPost && _jsx(Loading, { size: 100 }), !isLoadingPost && post && (_jsxs(Box, { component: "form", onSubmit: handleSubmit, sx: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '1200px',
                    "@media (max-width: 768px)": { width: '350px' }
                }, noValidate: true, autoComplete: "off", children: [_jsx(TextField, { id: "standard-basic", label: "Title", variant: "standard", name: "post-title", defaultValue: post.title, sx: { width: '50%', margin: '30px', "@media (max-width: 768px)": { width: '70%' } }, error: error.title ? true : false, helperText: error.title }), _jsx(Editor, { apiKey: ApiKeyTinyMMC, onChange: handleContentChange, init: EDITOR_INIT, initialValue: post.description }), _jsx("p", { className: "text-red-500", children: error.content }), _jsxs("div", { className: 'bg-main box-border rounded-lg relative mt-5', children: [_jsx("h1", { className: 'absolute top-[20%] left-[33%] font-bold text-center', children: "Upload Image" }), _jsx(TextField, { id: "standard-basic", label: "Image", variant: "standard", name: "post-image", sx: { width: '100%', height: '100%', opacity: '0', textAlign: 'center', cursor: 'pointer' }, type: 'file', inputProps: { accept: 'image/*' }, onChange: handleImageChange })] }), _jsxs("div", { className: 'md:w-[1000px] w-[350px] flex flex-wrap justify-center', children: [isLoadingTags && _jsx(Loading, { size: 75 }), !isLoadingTags && tags && tags.map((tag) => _jsx(TagLabel, { color: tag.color, name: tag.name, id: tag.tag_id, handleTagClick: handleTagClick, tagsId: tagsId }, tag.tag_id))] }), _jsx(Button, { type: "submit", variant: "contained", sx: { mt: 3, mb: 2, bgcolor: '#41c48b', color: '#fff', width: '500px', '&:hover': {
                                backgroundColor: '#328a63',
                                opacity: [0.9, 0.8, 0.7],
                            },
                            "@media (max-width: 768px)": { width: '300px' }
                        }, children: "Edit post" })] }))] }));
};
