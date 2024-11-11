import React from "react";
import PropTypes from "prop-types";
import Post from "./Post";
import { Box, Grid } from "@mui/material";

export default function PostList(props) {
    return (
        <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                {props.posts.map((item, i) => (
                    <Grid item xs={12} key={i}>
                        <Post post={item} onRemove={props.removeUpdate} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

PostList.propTypes = {
    posts: PropTypes.array.isRequired,
    removeUpdate: PropTypes.func.isRequired,
};
