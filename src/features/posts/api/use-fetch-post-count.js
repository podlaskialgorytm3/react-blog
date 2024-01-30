import { useQuery } from '@tanstack/react-query';
import { URL } from '../../../shared/config/confidential-data';
const fetchPostCount = async () => {
    const respsone = await fetch(`${URL}/posts/count/all`);
    if (!respsone.ok) {
        throw new Error(respsone.statusText);
    }
    const postCount = await respsone.json();
    return postCount.postCount;
};
export const useFetchPostCount = () => {
    return useQuery({
        queryKey: ["postCount"],
        queryFn: fetchPostCount,
    });
};
