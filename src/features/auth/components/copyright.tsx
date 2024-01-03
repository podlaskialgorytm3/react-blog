import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export function Copyright(props: any) {
    return (
      <Typography margin="30px" variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <NavLink to='/' className="text-main font-bold">
          michael-react-blog
        </NavLink>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }