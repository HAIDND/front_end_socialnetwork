import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Avatar, Grid, Paper } from "@mui/material";

import Sidebar from "~/components/Layouts/Sidebar";
import Post from "~/components/Elements/Post_MUI/post";
import { getInfo, readUser, saveInfo } from "~/services/userServices/userService";
import auth from "~/services/authService/authHelper";
import { CurentUser } from "~/MainRoutes";
const Profile = ({ profileData }) => {
    const { curentUserID } = useContext(CurentUser);
    console.log("user prodile id is");
    console.log(curentUserID);
    //colect id userid in jwt
    //sate to load profile
    const [profile, setProfile] = useState([]);

    // Fetch user profile data from API
    const setData = (data) => {
        saveInfo(data);
    };

    useEffect(() => {
        readUser(curentUserID).then((data) => {
            if (data.message) {
                // Chỉ đặt error khi có lỗi từ server, không hiển thị mật khẩu
                setData({ error: data.message });
            } else {
                setData(data);
                setProfile(() => getInfo());
            }
        });
    }, []);
    return (
        <Grid container>
            <Grid item flex={2} sx={{ overflow: "auto" }} display={{ xs: "none", md: "block" }}>
                <Sidebar />
            </Grid>
            <Grid item flex={5} sx={{ mt: 12, height: "100%", overflow: "auto", borderLeft: "1px solid lightgrey" }}>
                <Box
                    component={Paper}
                    className="mt-4"
                    sx={{
                        maxWidth: 800,
                        margin: "0 auto",
                        padding: 4,
                        borderRadius: 2,
                        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                        backgroundColor: "#ffffff",
                    }}
                >
                    <Grid container spacing={2} alignItems="center">
                        {/* Avatar */}
                        <Grid item xs={12} sx={{ textAlign: "center" }}>
                            <Avatar
                                src={profile?.avatar}
                                alt={`${profile?.userId} ${profile?.lastName}`}
                                sx={{ width: 100, height: 100, margin: "0 auto" }}
                            />
                        </Grid>

                        {/* Name */}
                        <Grid item xs={12} sx={{ textAlign: "center" }}>
                            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                                {profile?.username}
                            </Typography>
                        </Grid>

                        {/* Other Details */}
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                <strong>Ngày Sinh:</strong> {profile?.dateOfBirth || ""}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                <strong>Email:</strong> {profile?.email}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                <strong>Số Điện Thoại:</strong> {profile?.phone}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                <strong>Giới Tính:</strong> {profile?.gender}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                <strong>Địa Chỉ:</strong> {profile?.address}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Profile;
