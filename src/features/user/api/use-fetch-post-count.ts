import { useQuery } from "@tanstack/react-query";

const fetchPostCount = async (userId: number) => {
    const response = await fetch(`http://localhost:3000/post-count?userId=${userId}`);

    if (!response.ok) {
        throw new Error(response.statusText);
    }
    const data  = await response.json();

    return data;
}

export const useFetchPostCount = (id: number) => (
     useQuery({
        queryFn: () => fetchPostCount(id),
        refetchOnWindowFocus: false,
        queryKey: ["postCount"],
    })
)