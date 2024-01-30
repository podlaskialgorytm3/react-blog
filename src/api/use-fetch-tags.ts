import { useQuery } from "@tanstack/react-query";

const fetchTags = async () => {
    const response = await fetch(`http://localhost:3000/tags`);
    
    if(!response.ok){
        throw new Error('Something went wrong');
    }

    const tags = await response.json();

    return tags;
}

export const useFetchTags = () => (
        useQuery({
        queryKey: ['tags'],
        queryFn: fetchTags,
        staleTime: 1000 * 60 * 5,
    })
)