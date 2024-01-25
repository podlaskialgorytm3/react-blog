import { useParams } from "react-router-dom";
import { useFetchPost } from "../../../api/use-fetch-post";
import { Box, Button, TextField } from "@mui/material";
import { ApiKeyTinyMMC } from "../../../shared/config/confidential-data";
import { EDITOR_INIT } from "../../../shared/constants/editor-props";
import { Editor } from '@tinymce/tinymce-react';
import { Loading } from "../../../shared/components/loading";
import { uploadImage } from "../../../api/upload-post-image";
import { useEffect, useState } from "react";
import { DEFAULT_POST_ERRORS } from "../../../shared/constants/post-content";
import { PostContent } from "../../../shared/types/post-content";
import { postContentEditSchema } from "../../../shared/utils/validate-post";
import { fromZodError } from "zod-validation-error";
import { useUpdatePost } from "../api/use-update-post";
import { EditPostContent } from "../types/edit-post-content";
import { TagLabel } from "../../../shared/components/interactive-tag";
import { useFetchTags } from "../../../api/use-fetch-tags";
import { useFetchTagPostId } from "../api/use-fetch-tag-post-id";

import { useAddTagToPost } from "../../../api/use-add-tag-to-post";
import { useDeleteTagPost } from "../api/use-delete-tag-post";

export const EditPostCard = () => {
    const [content, setContent] = useState<string>('');
    const [image, setImage] = useState<any>(null);
    const [error, setError] = useState<PostContent>(DEFAULT_POST_ERRORS);
    const {id} = useParams<{id: string | undefined}>()
    const {data, isLoading} = useFetchPost(id || "")
    const [tagsId, setTagsId] = useState<number[]>([]);

    const { data: postTagIds } = useFetchTagPostId(id || "");

    const { mutate : addTagToPost} = useAddTagToPost();
    const { mutate : deleteTagPost } = useDeleteTagPost();

    useEffect(() => {
        if(postTagIds){
            setTagsId(postTagIds.tag_ids)
        }
    },[postTagIds])

    const {mutate,isPending} = useUpdatePost();

    const { data: tags, isLoading: isLoadingTags } = useFetchTags();

    const handleTagClick = (tagId: number) => {
        if(tagsId.includes(tagId)){
            setTagsId(tagsId.filter((id) => id !== tagId))
        }else{
            setTagsId([...tagsId, tagId])
        }
    }
    
    const handleContentChange = (e: React.FormEvent<HTMLFormElement> | any) => setContent(e.target.getContent());
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files) {
            setImage(e.target.files[0])
        }
    }  

    const updateTags = ({ postId, tagsId }: { postId: number, tagsId: number[] }) => {
        deleteTagPost(postId);
        setTimeout(() => {tagsId.forEach(tagId => addTagToPost({ postId, tagId }));}, 1000) 
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const postContent: EditPostContent = {
            post_id: data.post_id,
            title: e.currentTarget['post-title'].value,
            content: content
        }
        setError(DEFAULT_POST_ERRORS);
        try{
            const postContentCorrectData = postContentEditSchema.parse(postContent);
            setError(DEFAULT_POST_ERRORS);
            const sendData: EditPostContent = {
                title: postContentCorrectData.title,
                content: postContentCorrectData.content,
                post_id: postContent.post_id
            }
            if(image){
                uploadImage(image,data.post_id);
            }
            mutate(sendData)
            updateTags({postId: data.post_id, tagsId: tagsId});            
        }
        catch(errorInfo: any){
            const validationError = fromZodError(errorInfo);
            validationError.details.forEach((item: any) => {
              setError((prevState) => ({
                ...prevState,
                [item.path[0]]: item.message,
              }));
            })
        }
    }

    useEffect(() => {
        if(data){
            setContent(data.description)
        }
    },[data])

    return(
        <div className="flex flex-col items-center">
            <h1 className="text-[36px] text-center mb-5">Editing Post 📄✏️</h1>
            {isLoading && <Loading size={100} />}
            {isPending && <Loading size={100} />}
            {!isLoading && data && (
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& > :not(style)': { m: 1, width: '50ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField 
                    id="standard-basic" 
                    label="Title" 
                    variant="standard" 
                    name="post-title" 
                    defaultValue={data.title}
                    sx={{width: '100%'}}
                    error={error.title ? true : false}
                    helperText={error.title}
                />
                <Editor
                    apiKey={ApiKeyTinyMMC}
                    onChange={handleContentChange}
                    init={EDITOR_INIT}
                    initialValue={data.description}
                />
                <p className="text-red-500">{error.content}</p> 
                <div className='bg-main box-border rounded-lg relative'>
                    <h1 className='absolute top-[20%] left-[40%] font-bold'>Change Image</h1>
                    <TextField 
                        id="standard-basic" 
                        label="Image" 
                        variant="standard" 
                        name="post-image" 
                        sx={{width: '100%', height: '100%', opacity: '0'}}
                        type='file'
                        inputProps={{ accept: 'image/*' }} 
                        onChange={handleImageChange}
                    />
                </div>
                <div className='w-[1000px] flex flex-wrap'>
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
                sx={{ mt: 3, mb: 2 , bgcolor: '#41c48b', color: '#fff', width: '300px','&:hover': {
                backgroundColor: '#328a63',
                opacity: [0.9, 0.8, 0.7],
                } }}
                >Edit post
                </Button>
            </Box>
            )}
        </div>
    )
}
