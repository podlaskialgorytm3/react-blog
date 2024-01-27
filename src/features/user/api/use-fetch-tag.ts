import { useQuery } from "@tanstack/react-query";

const fetchTag = async (tag_id: string) => {
    const response = await fetch(`http://localhost:3000/fetch-tag/${tag_id}`);

    if (!response.ok) {
        throw new Error("Something went wrong");
    }

    const data = await response.json();

    return data[0];
}

export const useFetchTag = (tag_id: string) => (
    useQuery({
        queryKey: ["tag", tag_id],
        queryFn: () => fetchTag(tag_id),
    })
)