import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../api/query-client";
import { URL } from "../../../shared/config/confidential-data";
import Swal from "sweetalert2";
const updateTag = async (tag) => {
    const response = await fetch(`${URL}/tags`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tag),
    });
    if (!response.ok) {
        throw new Error("Something went wrong");
    }
    const data = await response.json();
    return data;
};
export const useUpdateTag = () => (useMutation({
    mutationFn: updateTag,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["tags"] });
        Swal.fire({
            title: 'Success!',
            text: 'Your tag has been updated.',
            icon: 'success',
            confirmButtonText: 'Okay',
        });
    }
}));
