import { useQuery } from "@tanstack/react-query";

const fetchTagUser = async  (userId: number) => {
    const response = await fetch(`http://localhost:3000/tags/${userId}`);

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