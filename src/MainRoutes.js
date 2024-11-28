import { Navigate, Route, Routes } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { getInfo, readUser, saveInfo } from "./services/userServices/userService";
import ThemeSettings from "./Theme";
import auth from "./services/authService/authHelper";
import HomePage from "./pages/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import SearchComponent from "./components/Layouts/Header/SearchComponent";

import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "./ProtectedRoute";

import Newsfeed from "~/pages/NewFeed";

import Profile from "~/pages/ProfileUsers";
import SettingsPage from "~/pages/SettingsPage";
import FriendPage from "~/pages/Friends/FriendPage";
import PageNotFound from "~/pages/Pagenotfound";
import GroupPage from "~/pages/Group/GroupPage";
import CreateGroup from "~/pages/Group/CreateGroup";
import ListGroup from "~/pages/Group/ListGroup";
import DeleteAccountDialog from "~/pages/SettingsPage/DeleteAccount";
import ChatList from "~/pages/Chatting/ChatList";
import ListGroupAll from "~/pages/Group/ListGroupAll";
import EditProfile from "~/pages/ProfileUsers/EditProfile";
import DetailGroup from "~/pages/Group/DetailGroup";
import FormEditGroup from "~/pages/Group/FormEditGroup";
import FriendList from "~/pages/Friends/FriendList";
import FriendRequest from "~/pages/Friends/FriendRequest";
import FriendSend from "~/pages/Friends/ExploreFriend";
import { Home } from "@mui/icons-material";
import DefaultLayout from "./components/Layouts/DefaultLayout";
const useAuthLogger = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(auth.isAuthenticated());
    useEffect(() => {
        // Log giá trị hiện tại của isAuthenticated
        console.log("Authentication status changed:", isAuthenticated);
        // Hàm kiểm tra giá trị xác thực mỗi khi có sự thay đổi
        const checkAuth = () => {
            const currentAuthStatus = auth.isAuthenticated();
            if (currentAuthStatus !== isAuthenticated) {
                setIsAuthenticated(currentAuthStatus);
            }
        };
        // Thiết lập interval để kiểm tra giá trị
        const intervalId = setInterval(checkAuth, 1000); // Kiểm tra mỗi giây
        // Dọn dẹp interval khi component unmount
        return () => clearInterval(intervalId);
    }, [isAuthenticated]); // Chạy lại khi isAuthenticated thay đổi

    return isAuthenticated;
};

export const CurentUser = createContext();
function MainRoutes() {
    const [curentUser, setCurrentUser] = useState();
    const [curentUserProfile, setCurrentUserProfile] = useState();
    const curentUserID = auth.isAuthenticated().userId;
    const curentUserToken = auth.isAuthenticated().token;
    useEffect(() => {
        // const curentUserID = auth.isAuthenticated().userId;

        readUser(curentUserID).then((data) => {
            if (data) {
                // Chỉ đặt error khi có lỗi từ server, không hiển thị mật khẩu
                setCurrentUserProfile(data);
            } else {
                alert("No profile !");
            }
        });
    }, [curentUserID]);

    ///theme
    const [themeColor, setThemeColor] = useState(localStorage.getItem("themeColor") || "#2196f3");
    const [themeSecondary, setThemeSecondary] = useState(localStorage.getItem("themeSecondary") || "#FFB347");
    const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
    const theme = createTheme({
        palette: {
            mode: darkMode ? "dark" : "light", // Dark hoặc Light mode
            primary: {
                main: themeColor, // Áp dụng màu chính
            },
            secondary: {
                main: themeSecondary, // Thay đổi mã màu này theo ý bạn
            },
        },
    });
    //effect
    useEffect(() => {
        localStorage.setItem("themeColor", themeColor);
        localStorage.setItem("themeSecondary", themeSecondary);
        localStorage.setItem("darkMode", darkMode);
    }, [themeColor, themeSecondary, darkMode]);

    return (
        <>
            <ThemeProvider theme={theme}>
                {" "}
                <CurentUser.Provider
                    value={{
                        curentUser,
                        setCurrentUser,
                        curentUserProfile,
                        setCurrentUserProfile,
                        curentUserID,
                        curentUserToken,
                        themeColor,
                        setThemeColor,
                        darkMode,
                        setDarkMode,
                        themeSecondary,
                        setThemeSecondary,
                    }}
                >
                    {/* <HomePage /> */}
                    {/* <DefaultLayout /> */}
                    {!auth.isAuthenticated() && <HomePage />}
                    {auth.isAuthenticated() && <DefaultLayout />}
                    <Routes>
                        <Route path="/admin" element={<AdminPage />} />
                        {/* {!auth.isAuthenticated() && <Route path="*" element={<HomePage />} />} */}
                        {/* <Route path="/register" element={<Login />} />
                        <Route path="/login" element={<Login />} /> */}
                        {/* admin route */}
                        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                            <Route path="/admin" element={<AdminPage />} />
                        </Route>
                        {/* Route dành cho user bình thường */}
                        <Route element={<ProtectedRoute allowedRoles={["user", "admin"]} />}>
                            <Route path="/home" element={<Newsfeed />} />

                            {/* <Route path="/" element={<Test />} /> */}
                            <Route path="/home" element={<Newsfeed />} />
                            <Route path="/" element={<Newsfeed />} />
                            <Route path="/newsfeed" element={<Newsfeed />} />
                            <Route path="/profile/:userId" element={<Profile />} />
                            <Route path="/friends" element={<FriendPage />} />
                            <Route path="/settings/editprofile" element={<EditProfile />} />
                            <Route path="/settings/deleteaccount" element={<DeleteAccountDialog />} />
                            <Route path="/groups/create" element={<CreateGroup />} />
                            <Route path="/groups/mygroup" element={<ListGroup />} />
                            <Route path="/groups/explore" element={<ListGroupAll />} />
                            <Route path="/groups/update" element={<FormEditGroup />} />
                            <Route path="/groups/:id" element={<DetailGroup />} />
                            <Route path="/groups" element={<GroupPage />} />
                            <Route path="/settings" element={<SettingsPage />} />
                        </Route>
                    </Routes>
                </CurentUser.Provider>
            </ThemeProvider>
        </>
    );
}

export default MainRoutes;
