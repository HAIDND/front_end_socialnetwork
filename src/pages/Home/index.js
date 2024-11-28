import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Link, Typography } from "@mui/material";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { CurentUser } from "~/MainRoutes";
import auth from "~/services/authService/authHelper"; // giả sử đây là file chứa hàm auth.isAuthenticated()
import DefaultLayout from "~/components/Layouts/DefaultLayout/index";

import Newsfeed from "~/pages/NewFeed";
import Login from "~/pages/Login/Login";
import Register from "~/pages/Register/Register";
import Profile from "~/pages/ProfileUsers";
import SettingsPage from "~/pages/SettingsPage";
import FriendPage from "~/pages/Friends/FriendPage";
import PageNotFound from "~/pages/Pagenotfound";
import GroupPage from "../Group/GroupPage";
import CreateGroup from "../Group/CreateGroup";
import ListGroup from "../Group/ListGroup";
import DeleteAccountDialog from "../SettingsPage/DeleteAccount";
import ChatList from "../Chatting/ChatList";
import ListGroupAll from "../Group/ListGroupAll";
import EditProfile from "../ProfileUsers/EditProfile";
import DetailGroup from "../Group/DetailGroup";
import FormEditGroup from "../Group/FormEditGroup";
import FriendList from "../Friends/FriendList";
import FriendRequest from "../Friends/FriendRequest";
import FriendSend from "../Friends/ExploreFriend";
///context user

const HomePage = () => {
    ///useContexrt tp save info user
    const { curentUser, curentUserProfile } = useContext(CurentUser);

    const [defaultPage, setDefaultPage] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Kiểm tra trạng thái xác thực và cập nhật defaultPage
        setDefaultPage(auth.isAuthenticated());
    }, [location]);

    const handleLogin = () => {
        navigate("/login");
    };

    const handleRegister = () => {
        navigate("/register");
    };
    console.log(curentUserProfile);
    return (
        <>
            <>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2 }}>
                    <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: "left" }}>
                        Welcome to Our Site
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Button variant="contained" color="primary" onClick={handleLogin} sx={{ px: 4 }}>
                            Login
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleRegister} sx={{ px: 4 }}>
                            Register
                        </Button>
                    </Box>
                </Box>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </>
        </>
    );
};

export default HomePage;
