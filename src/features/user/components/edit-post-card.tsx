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
    const { tagsId, handleTagClick } = useAddTagPost()
    const { handleSubmit, handleContentChange, handleImageChange , post, isLoadingPost, error} = useEditPostCard(tagsId)

    return(
        <div className="flex flex-col items-center">
            <h1 className="text-[36px] text-center mb-5">Editing Post 📄✏️</h1>
            {isLoadingPost && <Loading size={100} />}
            {!isLoadingPost && post && (
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '1200px',
                    "@media (max-width: 768px)": { width: '350px' }
                }}
                noValidate
                autoComplete="off"
            >
                <TextField 
                    id="standard-basic" 
                    label="Title" 
                    variant="standard" 
                    name="post-title" 
                    defaultValue={post.title}
                    sx={{width: '50%',margin: '30px', "@media (max-width: 768px)": { width: '70%' }}}
                    error={error.title ? true : false}
                    helperText={error.title}
                />
                <Editor
                    apiKey={ApiKeyTinyMMC}
                    onChange={handleContentChange}
                    init={EDITOR_INIT}
                    initialValue={post.description}
                />
                <p className="text-red-500">{error.content}</p> 
                <div className='bg-main box-border rounded-lg relative mt-5'>
                    <h1 className='absolute top-[20%] left-[33%] font-bold text-center'>Upload Image</h1>
                    <TextField 
                        id="standard-basic" 
                        label="Image" 
                        variant="standard" 
                        name="post-image" 
                        sx={{width: '100%', height: '100%', opacity: '0', textAlign: 'center', cursor: 'pointer'}}
                        type='file'
                        inputProps={{ accept: 'image/*' }} 
                        onChange={handleImageChange}
                    />
                </div>
                <div className='md:w-[1000px] w-[350px] flex flex-wrap justify-center'>
                {isLoadingTags && <Loading size={75} />}
                {!isLoadingTags && tags && tags.map((tag: any) => 
                <TagLabel 
                    key={tag.tag_id} 
                    color={tag.color} 
                    name={tag.name}
                    id={tag.tag_id}
                    handleTagClick={handleTagClick}
                    tagsId={tagsId}
                    />)}
                </div>
                <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 , bgcolor: '#41c48b', color: '#fff', width: '500px','&:hover': {
                    backgroundColor: '#328a63',
                    opacity: [0.9, 0.8, 0.7],
                    },
                    "@media (max-width: 768px)": { width: '300px' }
                    }}
                >Edit post
                </Button>
            </Box>
            )}
        </div>
    )
}
