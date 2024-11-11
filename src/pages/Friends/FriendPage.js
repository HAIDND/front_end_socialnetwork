import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Avatar, Grid } from "@mui/material";

import Sidebar from "~/components/Layouts/Sidebar";

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
                    variant="contained"
                    color="primary"
                    onClick={() => onAccept(request.id)}
                    sx={{ textTransform: "none" }}
                >
                    Xác nhận
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => onDeny(request.id)}
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
                Lời mời kết bạn
            </Typography>
            <Grid container spacing={2}>
                {requests.map((request) => (
                    <Grid item key={request.id}>
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
                Xem tất cả
            </Typography>
        </Box>
    );
};

// Dữ liệu mẫu
const sampleRequests = [
    { id: 1, name: "Đức Phan", avatar: "https://example.com/avatar1.jpg", mutualFriends: "1" },
    { id: 2, name: "Hoàng Ngọc Dung", avatar: "", mutualFriends: "" },
    { id: 3, name: "Thiên Phương", avatar: "https://example.com/avatar2.jpg", mutualFriends: "1" },
    { id: 4, name: "Hcmute Lib", avatar: "https://example.com/avatar3.jpg", mutualFriends: "1" },
    { id: 5, name: "Nguyễn Ánh Hân", avatar: "https://example.com/avatar4.jpg", mutualFriends: "1" },
];
//call api lấy list bạn

// Component chính
const FiendPage = () => {
    const handleAccept = (id) => {
        console.log(`Accepted friend request with id: ${id}`);
        // Thêm logic xử lý xác nhận lời mời ở đây
    };

    const handleDeny = (id) => {
        console.log(`Denied friend request with id: ${id}`);
        // Thêm logic xử lý từ chối lời mời ở đây
    };
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:4000/api/users`)
            .then((response) => response.json())
            .then((json) => {
                setData(json);
                console.log(json);
            });
    }, []);

    return (
        <Grid container>
            <Grid item flex={2} sx={{ overflow: "auto" }} display={{ xs: "none", md: "block" }}>
                <Sidebar />
            </Grid>
            <Grid item flex={5} sx={{ mt: 12, height: "100%", overflow: "auto", borderLeft: "1px solid lightgrey" }}>
                <FriendRequestList requests={data} handleAccept={handleAccept} handleDeny={handleDeny} />;
            </Grid>
        </Grid>
    );
};

export default FiendPage;
