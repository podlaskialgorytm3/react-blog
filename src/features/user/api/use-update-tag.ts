import { useMutation } from "@tanstack/react-query";
import { TagDispatch } from "../types/tag-dispatch";
import { queryClient } from "../../../api/query-client";
import Swal from "sweetalert2";

const updateTag = async (tag: TagDispatch) => {
    const response = await fetch(`http://localhost:3000/update-tag`, {
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
}

export const useUpdateTag = () => (
    useMutation({
        mutationFn: updateTag,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["tags"]});
            Swal.fire({
                title: 'Success!',
                text: 'Your tag has been updated.',
                icon: 'success',
                confirmButtonText: 'Okay',
              });
        }
    })
)