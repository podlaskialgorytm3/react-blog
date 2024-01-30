import { useState, useEffect } from "react";
import { useFetchTagPostId } from "../api/use-fetch-tag-post-id";
import { useParams } from "react-router-dom";
export const useAddTagPost = () => {
    const [tagsId, setTagsId] = useState([]);
    const { id } = useParams();
    const { data: postTagIds } = useFetchTagPostId(id || "");
    const handleTagClick = (tagId) => {
        if (tagsId.includes(tagId)) {
            setTagsId(tagsId.filter((id) => id !== tagId));
        }
        else {
            setTagsId([...tagsId, tagId]);
        }
    };
    useEffect(() => {
        if (postTagIds) {
            setTagsId(postTagIds.tag_ids);
        }
    }, [postTagIds]);
    return { handleTagClick, tagsId };
};
