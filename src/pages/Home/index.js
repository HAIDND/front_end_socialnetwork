import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Link, Typography } from "@mui/material";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import auth from "~/services/authService/authHelper"; // giả sử đây là file chứa hàm auth.isAuthenticated()
import DefaultLayout from "~/components/Layouts/DefaultLayout/index";

import Newsfeed from "~/pages/NewFeed";
import Login from "~/pages/Login/Login";
import Register from "~/pages/Register/Register";
import Profile from "~/pages/ProfileUsers";
import SettingsPage from "~/pages/SettingsPage";
import FriendPage from "~/pages/Friends/FriendPage";

import { CurentUser } from "~/MainRoutes";
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
///context user

const HomePage = () => {
    ///useContexrt tp save info user
    const { curentUser } = useContext(CurentUser);
    console.log("curent user");
    console.log(curentUser);

    const [defaultPage, setDefaultPage] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Kiểm tra trạng thái xác thực và cập nhật defaultPage
        setDefaultPage(auth.isAuthenticated());
    }, [location]);

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

    return (
        <>
            {defaultPage ? (
                <>
                    <DefaultLayout />
                    <Routes>
                        {/* <Route path="/" element={<Test />} /> */}
                        <Route path="/home" element={<Newsfeed />} />
                        <Route path="/" element={<Newsfeed />} />
                        <Route path="/newsfeed" element={<Newsfeed />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/friends" element={<FriendPage />} />
                        <Route path="/settings/editprofile" element={<EditProfile />} />
                        <Route path="/settings/deleteaccount" element={<DeleteAccountDialog />} />
                        <Route path="/groups/create" element={<CreateGroup />} />
                        <Route path="/groups/mygroup" element={<ListGroup />} />
                        <Route path="/groups/explore" element={<ListGroupAll />} />
                        <Route path="/groups/update" element={<FormEditGroup />} />
                        <Route path="/groups/:id" element={<DetailGroup />} />
                        <Route path="/chat" element={<ChatList />} />
                        <Route path="/groups" element={<GroupPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="/test" element={<Newsfeed />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        {/* <Route exact path="*" element={<PageNotFound />} /> */}
                        {/* <Route
                    path="/chat"
                    element={
                        <PrivateRoute>
                            <Chat />
                        </PrivateRoute>
                    }
                /> */}
                    </Routes>
                </>
            ) : (
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", p: 4 }}>
                    <Typography
                        variant="h2"
                        component="h1"
                        gutterBottom
                        sx={{ display: "flex", flexDirection: "column", alignItems: "center", paddingRight: 60 }}
                    >
                        Welcome to Our Site
                    </Typography>
                    <Box>
                        <Button variant="contained" color="primary" onClick={handleLogin} sx={{ mr: 1 }}>
                            Đăng Nhập
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleRegister}>
                            Đăng ký
                        </Button>
                    </Box>
                </Box>
            )}
        </>
    );
};

export default HomePage;
