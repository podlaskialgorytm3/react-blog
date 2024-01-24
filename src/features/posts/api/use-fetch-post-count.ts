import { useQuery } from '@tanstack/react-query';

const fetchPostCount = async () => {
    const repsone = await fetch(`http://localhost:3000/full-post-count`);

    if(!repsone.ok) {
        throw new Error(repsone.statusText);
    }

    const postCount = await repsone.json();

    return postCount.postCount;
}

export const useFetchPostCount = () => {
    return useQuery({
        queryKey: ["postCount"],
        queryFn: fetchPostCount,
    })
}