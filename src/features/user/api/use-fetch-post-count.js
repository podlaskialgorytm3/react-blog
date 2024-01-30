import { useQuery } from "@tanstack/react-query";
import { URL } from "../../../shared/config/confidential-data";
const fetchPostCount = async (userId) => {
    const response = await fetch(`${URL}/posts/count?userId=${userId}`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
};
export const useFetchPostCount = (id) => (useQuery({
    queryFn: () => fetchPostCount(id),
    refetchOnWindowFocus: false,
    queryKey: ["postCount"],
}));
