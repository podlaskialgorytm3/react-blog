import { PostResponse } from "../../../shared/types/post-response"
import { PostCard } from "./post-card"
import { Loading } from "../../../shared/components/loading"
import Swal from "sweetalert2"
import { useFetchPosts } from "../api/use-fetch-posts"
import { useFetchPostCount } from "../api/use-fetch-post-count"
import Pagination from "@mui/material/Pagination"
import { useState } from "react"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const PostContainer = () => {
    const [ currentPage, setCurrentPage ] = useState<number>(1);
    const [ postCountOnPage, setPostCountOnPage ] = useState<number>(4);
    const { data, isLoading, isError, error, refetch } = useFetchPosts(currentPage, postCountOnPage)
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
        pageConut = Math.ceil(postCount / postCountOnPage)
    }

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        event.preventDefault()
        setCurrentPage(page)
        refetch()
    }

    const handlePostCountChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setPostCountOnPage(event.target.value as number);
        setCurrentPage(1)
        refetch()
    }

    return (
        <div className="w-[1200px] flex flex-col items-center">
            <div className="w-full flex justify-end">
            {data && (
                <Box sx={{ minWidth: 150, marginTop: "50px", marginRight: "100px" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Post Count</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    label="Post Count"
                    value={postCountOnPage}
                    onChange={(event: any) => handlePostCountChange(event)}
                  >
                    {
                        [2,4,6,8,10].map((count) => (
                            <MenuItem value={count} key={count}>{count}</MenuItem>
                        ))
                    }
                  </Select>
                </FormControl>
              </Box>
            )}
            </div>
            <div className="w-[1200px] flex flex-wrap justify-center">
            {isLoading && <Loading  size={100}/>}
            {data && data.map((post: PostResponse) => <PostCard key={post.post_id} post={post} />)}
            </div>
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