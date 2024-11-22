import GlobalStyles from "~/components/GlobalStyles";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect, createContext } from "react";

import auth from "./services/authService/authHelper";
import HomePage from "./pages/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import PageNotFound from "./pages/Pagenotfound";
import { getInfo, readUser, saveInfo } from "./services/userServices/userService";
import SearchComponent from "./components/Layouts/Header/SearchComponent";
import ThemeSettings from "./Theme";
import { createTheme, ThemeProvider } from "@mui/material";
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
    const [themeSecondary, setThemeSecondary] = useState(localStorage.getItem("themeSecondary"));
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
                    <HomePage />
                    {/* <DefaultLayout /> */}
                    <Routes>
                        {!auth.isAuthenticated() && <Route path="/" element={<Login />} />}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />{" "}
                        <Route path="theme" element={<ThemeSettings />} />
                    </Routes>
                </CurentUser.Provider>
            </ThemeProvider>
        </>
    );
}

export default MainRoutes;
