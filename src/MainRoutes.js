import GlobalStyles from "~/components/GlobalStyles";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect, createContext } from "react";

import auth from "./services/authService/authHelper";
import HomePage from "./pages/Home";
import Newsfeed from "./pages/NewFeed";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import DefaultLayout from "./components/Layouts/DefaultLayout";
import Profile from "./pages/ProfileUsers";
import SettingsPage from "./pages/SettingsPage";
import FriendPage from "./pages/Friends/FriendPage";
import EditProfile from "./components/Elements/SettingsPage/EditProfile";
import PageNotFound from "./pages/Pagenotfound";
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
    const [curentUser, setCurrentUser] = useState({});
    const curentUserID = auth.isAuthenticated().userId;
    const curentUserToken = auth.isAuthenticated().token;
    console.log("is usserid  " + curentUserID);
    // let curentUser;
    return (
        <>
            <CurentUser.Provider value={{ curentUser, setCurrentUser, curentUserID, curentUserToken }}>
                <HomePage />
                {/* <DefaultLayout /> */}
                <Routes>
                    {!auth.isAuthenticated() && <Route path="/" element={<Login />} />}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    {/* <Route path="*" element={<PageNotFound />} /> */}
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
            </CurentUser.Provider>
        </>
    );
}

export default MainRoutes;