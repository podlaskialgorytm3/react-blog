import { useQuery } from '@tanstack/react-query';

const fetchPostCount = async () => {
    const respsone = await fetch(`http://localhost:3000/full-post-count`);

    if(!respsone.ok) {
        throw new Error(respsone.statusText);
    }

    const postCount = await respsone.json();

    return postCount.postCount;
}

export const useFetchPostCount = () => {
    return useQuery({
        queryKey: ["postCount"],
        queryFn: fetchPostCount,
    })
}