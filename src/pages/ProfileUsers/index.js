import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Avatar, Grid, Paper, Button, useTheme } from "@mui/material";

import Sidebar from "~/components/Layouts/Sidebar";
import { getInfo, readUser, saveInfo } from "~/services/userServices/userService";
import { CurentUser } from "~/MainRoutes";
import { useParams } from "react-router-dom";

const Profile = () => {
    const { curentUserID } = useContext(CurentUser);
    const { userId } = useParams();
    const [profile, setProfile] = useState({});

    // Lấy theme hiện tại
    const theme = useTheme();

    // Fetch user profile data from API
    useEffect(() => {
        readUser(userId).then((data) => {
            if (data) {
                setProfile(data);
            } else {
                alert("No profile");
            }
        });
    }, [userId]);

    return (
        <Grid container>
            <Grid item flex={2} sx={{ overflow: "auto" }} display={{ xs: "none", md: "block" }}>
                <Sidebar />
            </Grid>
            <Grid
                item
                flex={5}
                sx={{ mt: 12, height: "100%", overflow: "auto", borderLeft: `1px solid ${theme.palette.divider}` }}
            >
                <Box
                    component={Paper}
                    sx={{
                        maxWidth: 800,
                        margin: "0 auto",
                        padding: 4,
                        borderRadius: 2,
                        boxShadow: theme.shadows[5],
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
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
                            <Typography variant="h5" sx={{ fontWeight: "bold", color: theme.palette.primary.main }}>
                                {profile?.username}
                            </Typography>
                        </Grid>

                        {/* Buttons */}
                        {curentUserID !== userId && (
                            <>
                                <Button variant="contained" color="secondary" sx={{ mr: 1 }}>
                                    Add Friend
                                </Button>
                                <Button variant="outlined" color="primary">
                                    Chat
                                </Button>
                            </>
                        )}

                        {/* Other Details */}
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
                                <strong>Ngày Sinh:</strong> {profile?.dateOfBirth || ""}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                <strong>Giới Tính:</strong> {profile?.gender}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Profile;
