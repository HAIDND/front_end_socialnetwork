import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Button, Avatar, Grid } from "@mui/material";

import Sidebar from "~/components/Layouts/Sidebar";
import { CurentUser } from "~/MainRoutes";
import { getListFriend, removeFriend } from "~/services/friendServices/friendService";

const FriendRequestCard = ({ request, onDelete }) => {
    const handleDeleteFriend = async (userId) => {
        try {
            const response = await removeFriend(userId).then((data) => {
                alert(data?.message);
            });
        } catch (error) {
            console.log(error);
        }
    };
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
                <Avatar src={request.avatar} alt={request.name} sx={{ width: 80, height: 80, margin: "0 auto" }} />
                <Typography variant="body1" fontWeight="600" mt={1}>
                    {request.username}
                </Typography>
                {request.mutualFriends && (
                    <Typography variant="caption" color="textSecondary">
                        {request.mutualFriends} bạn chung
                    </Typography>
                )}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDeleteFriend(request?._id)}
                    sx={{ textTransform: "none" }}
                >
                    Delete
                </Button>
            </Box>
        </Box>
    );
};

const FriendRequestList = ({ requests, handldDelete }) => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="600" mb={2}>
                List Friends
            </Typography>
            <Grid container spacing={2}>
                {requests.map((request) => (
                    <Grid item key={request.id}>
                        <FriendRequestCard request={request} onDelete={handldDelete} />
                    </Grid>
                ))}
            </Grid>
            <Typography
                variant="body2"
                color="primary"
                sx={{ cursor: "pointer", mt: 2 }}
                onClick={() => console.log("View all clicked")}
            >
                {requests.leght ? "See all Friends" : "Have 0 friends"}
            </Typography>
        </Box>
    );
};
// Component chính
const FriendList = () => {
    const deleleFriend = (id) => {
        console.log(`Accepted friend request with id: ${id}`);
        // Thêm logic xử lý xác nhận lời mời ở đây
    };

    //caall api getList
    const [data, setData] = useState([]);
    const { curentUserID } = useContext(CurentUser);
    useEffect(() => {
        try {
            getListFriend(curentUserID).then((result) => {
                console.log(result);
                console.log("result friend list");
                setData(result);
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <Grid container>
            {/* {data.lenght ? (
                <FriendRequestList requests={data} handleDelete={deleleFriend} />
            ) : (
                <FriendRequestList requests={data} handleDelete={deleleFriend} />
            )} */}
            <FriendRequestList requests={data} handleDelete={deleleFriend} />
        </Grid>
    );
};

export default FriendList;
