import { useQuery } from "@tanstack/react-query";
import { fetchPostCount } from "../api/fetch-post-count";

export const useFetchPostCount = (id: number) => {

    const fetchPostCountQuery = useQuery({
        queryFn: () => fetchPostCount(id),
        refetchOnWindowFocus: false,
        queryKey: ["postCount"],
    });

    return fetchPostCountQuery;
}