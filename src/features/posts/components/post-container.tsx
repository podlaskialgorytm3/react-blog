import { PostResponse } from "../../../shared/types/post-response"
import { PostCard } from "./post-card"
import { Loading } from "../../../shared/components/loading"
import Swal from "sweetalert2"
import { useFetchPosts } from "../api/use-fetch-posts"
import { useFetchPostCount } from "../api/use-fetch-post-count"
import Pagination from "@mui/material/Pagination"
import { useState } from "react"

export const PostContainer = () => {
    const [ currentPage, setCurrentPage ] = useState<number>(1);
    const { data, isLoading, isError, error, refetch } = useFetchPosts(currentPage)
    const { data: postCount } = useFetchPostCount()

    let pageConut = 0;

    if(isError){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
            confirmButtonText: "Ok"
        })
    }
    if(!isLoading && data.length === 0){
        Swal.fire({
            icon: "info",
            title: "Oops...",
            text: "No posts on the database",
            confirmButtonText: "Ok"
        })
    }
    if(postCount){
        console.log(postCount)
        pageConut = Math.ceil(postCount / 4)
    }

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        event.preventDefault()
        setCurrentPage(page)
        refetch()
    }

    return (
        <div className="w-[1200px] flex flex-wrap justify-center">
            {isLoading && <Loading  size={100}/>}
            {data && data.map((post: PostResponse) => <PostCard key={post.post_id} post={post} />)}
            {!isLoading && <Pagination 
                count={pageConut} 
                page={currentPage}
                onChange={(event: React.ChangeEvent<unknown>, page: number) => handlePageChange(event, page)}
                sx={{
                display: "flex",
                justifyContent: "center",
                margin: "20px 0"
            }}/>}
        </div>
    )
}