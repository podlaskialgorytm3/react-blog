import { useQuery } from "@tanstack/react-query";

const fetchTag = async (tag_id: number) => {
    const response = await fetch(`http://localhost:3000/fetch-tag/${tag_id}`);

    if (!response.ok) {
        throw new Error("Something went wrong");
    }

    const data = await response.json();

    return data;
}

export const useFetchTag = (tag_id: number) => (
    useQuery({
        queryKey: ["tag", tag_id],
        queryFn: () => fetchTag(tag_id),
    })
)