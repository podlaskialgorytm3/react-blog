import { Button } from "@mui/material"
import { Link  } from "react-router-dom"

export const Menu = () => {
    
    return(
    <div className="w-[100%] flex justify-center items-center">
        <Link to='/add-post'>
            <Button
                variant="contained"
                sx={{ mt: 3, mb: 2 , bgcolor: '#41c48b', color: '#fff' ,width: '200px','&:hover': {
                backgroundColor: '#328a63',
                opacity: [0.9, 0.8, 0.7],
                } }}
            >Add post
            </Button>
        </Link>
        <Link to='/add-tag'>
            <Button
                variant="contained"
                sx={{ mt: 3, mb: 2,ml: 10 , bgcolor: '#41c48b', color: '#fff' ,width: '200px','&:hover': {
                backgroundColor: '#328a63',
                opacity: [0.9, 0.8, 0.7],
                } }}
            >Add Tag
            </Button>
        </Link>
    </div>
    )
}