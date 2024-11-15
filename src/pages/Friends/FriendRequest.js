import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Button, Avatar, Grid } from "@mui/material";

import Sidebar from "~/components/Layouts/Sidebar";
import { CurentUser } from "~/MainRoutes";
import { acceptFriendRequest, getListFriend, getListFriendRequest } from "~/services/friendServices/friendService";

const FriendRequestCard = ({ request, onAccept, onDeny }) => {
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
                <Avatar src={request.avatar} alt={request?.username} sx={{ width: 80, height: 80, margin: "0 auto" }} />
                <Typography variant="body1" fontWeight="600" mt={1}>
                    {request?.requester}
                </Typography>
                {request?.status && (
                    <Typography variant="caption" color="textSecondary">
                        {request?.status}
                    </Typography>
                )}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onAccept(request?.requester)}
                    sx={{ textTransform: "none" }}
                >
                    Xác nhận
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => onDeny(request?.requester)}
                    sx={{ textTransform: "none" }}
                >
                    Xóa
                </Button>
            </Box>
        </Box>
    );
};

const FriendRequestList = ({ requests, handleAccept, handleDeny }) => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="600" mb={2}>
                List Request
            </Typography>
            <Grid container spacing={2}>
                {requests.map((request) => (
                    <Grid item key={request._id}>
                        <FriendRequestCard request={request} onAccept={handleAccept} onDeny={handleDeny} />
                    </Grid>
                ))}
            </Grid>
            <Typography
                variant="body2"
                color="primary"
                sx={{ cursor: "pointer", mt: 2 }}
                onClick={() => console.log("View all clicked")}
            >
                See all
            </Typography>
        </Box>
    );
};

// Component chính
const FriendRequest = () => {
    const handleAccept = (id) => {
        try {
            acceptFriendRequest(id).then((result) => {
                if (result) {
                    alert(result.message);
                } else {
                    alert(result.message);
                }
            });
        } catch (err) {
            console.log(err);
        }
    };

    const handleDeny = (id) => {
        console.log(`Denied friend request with id: ${id}`);
        // Thêm logic xử lý từ chối lời mời ở đây
    };

    //caall api getList
    const [data, setData] = useState([]);
    const { curentUserID } = useContext(CurentUser);
    useEffect(() => {
        try {
            getListFriendRequest().then((result) => {
                console.log(result);
                console.log("result request  list");
                setData(result);
            });
        } catch (error) {
            console.log(error);
        }
    }, []);
    return (
        <Grid container>
            <FriendRequestList requests={data} handleAccept={handleAccept} handleDeny={handleDeny} />
        </Grid>
    );
};

export default FriendRequest;
