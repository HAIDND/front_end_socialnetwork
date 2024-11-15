import React, { createContext, useContext, useEffect, useState } from "react";
import { Box, Typography, Button, Avatar, Grid } from "@mui/material";

import Sidebar from "~/components/Layouts/Sidebar";
import { CurentUser } from "~/MainRoutes";
import { addFriend, addFriendAPI, getListFriend } from "~/services/friendServices/friendService";
import { listUser, readUser } from "~/services/userServices/userService";

const FriendRequestCard = ({ request, onAdd }) => {
    return (
        <Box
            sx={{
                width: 200,
                minHeight: 225, // Đặt chiều cao tối thiểu để đồng nhất
                border: "1px solid #ddd",
                borderRadius: 2,
                boxShadow: 1,
                p: 2,
                textAlign: "center",
                mb: 2,
                mt: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between", // Đẩy các nút xuống cuối thẻ
            }}
        >
            <Box>
                <Avatar src={request.avatar} alt={request.username} sx={{ width: 80, height: 80, margin: "0 auto" }} />
                <Typography variant="body1" fontWeight="600" mt={1}>
                    {request.username}
                </Typography>
                {request?.following && (
                    <Typography variant="caption" color="textSecondary">
                        {request?.following.lenght || 0} Friends
                    </Typography>
                )}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                        console.log(request._id);
                        onAdd(request._id);
                    }}
                    sx={{ textTransform: "none" }}
                >
                    Add friend
                </Button>
            </Box>
        </Box>
    );
};

const FriendRequestList = ({ list, handleAdd }) => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="600" mb={2}>
                List User
            </Typography>
            <Grid container spacing={2}>
                {list.map((request) => (
                    <Grid item key={request._id}>
                        <FriendRequestCard request={request} onAdd={handleAdd} />
                    </Grid>
                ))}
            </Grid>
            <Typography
                variant="body2"
                color="primary"
                sx={{ cursor: "pointer", mt: 2 }}
                onClick={() => console.log("View all clicked")}
            >
                See all user
            </Typography>
        </Box>
    );
};
// Component chính
const FriendSend = () => {
    //value
    const { curentUserID } = useContext(CurentUser);

    const addFriend = (recipientID) => {
        try {
            addFriendAPI(recipientID).then((response) => {
                if (response) {
                    console.log("addFriendAPI");
                    console.log(response);
                    alert(response.message);
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    //caall api getList
    const [data, setData] = useState([]);

    useEffect(() => {
        try {
            listUser().then((result) => {
                console.log(result);
                console.log("result api list");
                setData(result);
            });
        } catch (error) {
            console.log(error);
        }
    }, []);
    return (
        <Grid container>
            <FriendRequestList list={data} handleAdd={addFriend} />
        </Grid>
    );
};

export default FriendSend;
