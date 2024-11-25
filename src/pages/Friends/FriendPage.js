import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Avatar, Grid } from "@mui/material";

import Sidebar from "~/components/Layouts/Sidebar";
import FriendRequest from "./FriendRequest";
import FriendList from "./FriendList";
import FriendSend from "./FriendSend";

// Component chính
const FriendPage = () => {
    return (
        <Grid container>
            <Grid item flex={2} sx={{ overflow: "auto" }} display={{ xs: "none", md: "block" }}>
                <Sidebar />
            </Grid>
            <Grid item flex={5} sx={{ mt: 12, height: "100%", overflow: "auto" }}>
                <FriendSend />
                <FriendList />
                <FriendRequest />
            </Grid>
        </Grid>
    );
};

export default FriendPage;
