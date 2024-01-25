import { useState } from "react";

export const useAddTagToPostForm = () => {
    const [tagsId, setTagsId] = useState<number[]>([]);

    const handleAddTag = (tagId: number) => {
        if(tagsId.includes(tagId)){
            setTagsId(tagsId.filter((id) => id !== tagId))
        }else{
            setTagsId([...tagsId, tagId])
        }
    }

    return {handleAddTag, tagsId}
    
}