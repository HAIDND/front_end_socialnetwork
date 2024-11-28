import RightRequest from "~/components/Elements/Friend/RightRequest";

import { useState } from "react";
import { Grid } from "@mui/material";
import Sidebar from "~/components/Layouts/Sidebar";
import NewsfeedContent from "./newfeed.midle";
import NewPost from "./newPost";
import RightListFriend from "~/components/Elements/Friend/RightListFriend";
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
                <RightRequest />
                <RightListFriend />
            </Grid>
        </Grid>
    );
}

export default Newsfeed;
