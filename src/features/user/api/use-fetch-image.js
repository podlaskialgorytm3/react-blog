import { useQuery } from "@tanstack/react-query";
import { fetchUserImage } from "../../../api/fetch-user-image";
export const useFetchImage = (id) => (useQuery({
    queryFn: () => fetchUserImage(id),
    refetchOnWindowFocus: false,
    queryKey: ["uploads"],
}));
