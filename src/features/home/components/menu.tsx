import { Button } from "@mui/material"
import { Link  } from "react-router-dom"

export const Menu = () => {
    
    return(
    <div className="w-[100%]">
        <Link to='/add-post'>
            <Button
                variant="contained"
                sx={{ mt: 3, mb: 2 , bgcolor: '#41c48b', color: '#fff' ,width: '100%','&:hover': {
                backgroundColor: '#328a63',
                opacity: [0.9, 0.8, 0.7],
                } }}
            >Add post
            </Button>
        </Link>
    </div>
    )
}