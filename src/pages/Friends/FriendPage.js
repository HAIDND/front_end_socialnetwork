import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Avatar, Grid } from "@mui/material";

import Sidebar from "~/components/Layouts/Sidebar";
import FriendRequest from "./FriendRequest";
import FriendList from "./FriendList";
import FriendSend from "./FriendSend";

// Component chính
const FriendPage = () => {
    const handleAccept = (id) => {
        console.log(`Accepted friend request with id: ${id}`);
        // Thêm logic xử lý xác nhận lời mời ở đây
    };

    const handleDeny = (id) => {
        console.log(`Denied friend request with id: ${id}`);
        // Thêm logic xử lý từ chối lời mời ở đây
    };
    // const [data, setData] = useState([]);
    // useEffect(() => {
    //     fetch(`http://localhost:4000/api/users`)
    //         .then((response) => response.json())
    //         .then((json) => {
    //             setData(json);
    //             console.log(json);
    //         });
    // }, []);

    return (
        <Grid container>
            <Grid item flex={2} sx={{ overflow: "auto" }} display={{ xs: "none", md: "block" }}>
                <Sidebar />
            </Grid>
            <Grid item flex={5} sx={{ mt: 12, height: "100%", overflow: "auto", borderLeft: "1px solid lightgrey" }}>
                <FriendSend />
                <FriendList />
                <FriendRequest />
            </Grid>
        </Grid>
    );
};

export default FriendPage;
