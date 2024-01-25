import { useState } from "react";

export const useAddTagPost = () => {
    const [tagsId, setTagsId] = useState<number[]>([]);

    const handleTagClick = (tagId: number) => {
        if(tagsId.includes(tagId)){
            setTagsId(tagsId.filter((id) => id !== tagId))
        }else{
            setTagsId([...tagsId, tagId])
        }
    }

    return {handleTagClick, tagsId}
    
}