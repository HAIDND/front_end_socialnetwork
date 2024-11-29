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

const HomePage = ({ login }) => {
    const [isLogin, setIsLogin] = useState(login);

    return (
        <>
            <>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2 }}>
                    <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: "left" }}>
                        Welcome to Our Site
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Button variant="contained" color="primary" onClick={() => setIsLogin(true)} sx={{ px: 4 }}>
                            Login
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={() => setIsLogin(false)} sx={{ px: 4 }}>
                            Register
                        </Button>
                    </Box>
                </Box>
                {isLogin ? <Login /> : <Register />}
            </>
        </>
    );
};

export default HomePage;
