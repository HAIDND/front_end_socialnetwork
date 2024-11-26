import FiendRequest from "~/components/Elements/Friend/Request";

import { useState } from "react";
import { Grid } from "@mui/material";
import Sidebar from "~/components/Layouts/Sidebar";
import NewsfeedContent from "./newfeed.midle";
import NewPost from "./newPost";
function Newsfeed() {
    return (
        <Grid container>
            <Grid item flex={2} sx={{ overflow: "auto" }} display={{ xs: "none", md: "block" }}>
                <Sidebar />
            </Grid>
            <Grid item flex={3} sx={{ mt: 12, height: "100%", overflow: "auto" }}>
                <NewPost />
                <NewsfeedContent />
                {/* <Post />{" "} */}
            </Grid>
            <Grid item flex={2} sx={{ mt: 12, height: "100%", overflow: "auto" }}>
                <FiendRequest />
            </Grid>
        </Grid>
    );
}

export default Newsfeed;
