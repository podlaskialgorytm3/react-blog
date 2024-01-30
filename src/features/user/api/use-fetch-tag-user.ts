import { useQuery } from "@tanstack/react-query";
import { URL } from "../../../shared/config/confidential-data";

const fetchTagUser = async  (userId: number) => {
    const response = await fetch(`${URL}/tags/${userId}`);

    if(!response.ok){
        throw new Error("Something went wrong");
    }

    const data = await response.json();

    return data;
}

export const useFetchTagUser = (userId: number) => (
    useQuery({
        queryKey: ["tags", userId],
        queryFn: () => fetchTagUser(userId)
    })
)