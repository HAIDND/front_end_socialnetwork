import React, { useContext, useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Box, Menu, Avatar, useTheme } from "@mui/material";
import {
    Search as SearchIcon,
    Home as HomeIcon,
    Notifications as NotificationsIcon,
    Message as MessageIcon,
    Settings as SettingsIcon,
    Logout as LogoutIcon,
} from "@mui/icons-material";

import { logout } from "~/services/authService/authService";
import auth from "~/services/authService/authHelper";
import { CurentUser } from "~/MainRoutes";
import SearchComponent from "./SearchComponent";
import NotificationPanel from "./Notifi";
import ChatList from "~/pages/Chatting/ChatList";
import ThemeSettings from "~/Theme";

const NavHeader = () => {
    const { curentUserProfile, setThemeColor, darkMode, setDarkMode, themeSecondary, setThemeSecondary } =
        useContext(CurentUser);

    const [anchorEl, setAnchorEl] = useState(null);
    const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);
    const [chatList, setChatList] = useState(false);
    const [notifi, setNotifi] = useState(false);
    const [isLogout, setIsLogout] = useState(false);

    const navigate = useNavigate();
    const theme = useTheme(); // Lấy theme hiện tại

    // Xử lý sự kiện logout
    useEffect(() => {
        if (isLogout) {
            logout();
            localStorage.removeItem("darkMode");
            localStorage.removeItem("themeColor");
            localStorage.removeItem("themeSecondary");
            navigate("/login");
        }
    }, [isLogout, navigate]);

    // Mở/đóng menu
    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleSettingsMenuOpen = (event) => setSettingsAnchorEl(event.currentTarget);
    const handleClose = () => {
        setAnchorEl(null);
        setSettingsAnchorEl(null);
    };

    // Xử lý toggle thông báo và chat
    const handleNotifi = () => setNotifi(!notifi);
    const enableChatList = () => setChatList(!chatList);

    return (
        <AppBar
            position="fixed"
            color="inherit"
            elevation={1}
            sx={{
                padding: 1,
                backgroundColor: theme.palette.background.paper,
                borderBottom: `1px solid ${theme.palette.divider}`,
            }}
        >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                {/* Logo */}
                <Link to="/home" style={{ textDecoration: "none" }}>
                    <Typography
                        variant="h5"
                        color={theme.palette.primary.main}
                        sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}
                    >
                        <IconButton edge="start" color="primary" sx={{ fontSize: 30 }}>
                            <HomeIcon fontSize="large" />
                        </IconButton>
                        Sociala
                    </Typography>
                </Link>

                {/* Search Component */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <SearchComponent />
                </Box>

                {/* Icon Section */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <IconButton color="inherit" sx={{ fontSize: 30 }} onClick={enableChatList}>
                        <MessageIcon fontSize="large" />
                    </IconButton>

                    <IconButton color="inherit" onClick={handleNotifi} sx={{ fontSize: 30 }}>
                        <NotificationsIcon fontSize="large" />
                    </IconButton>

                    <NotificationPanel open={notifi} close={handleNotifi} />

                    <IconButton color="inherit" onClick={handleSettingsMenuOpen} sx={{ fontSize: 30 }}>
                        <SettingsIcon fontSize="large" />
                    </IconButton>

                    {/* Settings Menu */}
                    <Menu
                        anchorEl={settingsAnchorEl}
                        open={Boolean(settingsAnchorEl)}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                        sx={{
                            mt: 6,
                            "& .MuiMenu-paper": {
                                backgroundColor: theme.palette.background.paper,
                                boxShadow: 6,
                            },
                        }}
                    >
                        <ThemeSettings
                            themeColor={theme.palette.primary.main}
                            setThemeColor={setThemeColor}
                            darkMode={darkMode}
                            setDarkMode={setDarkMode}
                            themeSecondary={themeSecondary}
                            setThemeSecondary={setThemeSecondary}
                        />
                    </Menu>

                    {/* Profile Avatar */}
                    <IconButton color="inherit" sx={{ fontSize: 30 }}>
                        <Avatar src={curentUserProfile?.avatar} />
                    </IconButton>
                    <IconButton color="inherit" sx={{ fontSize: 30 }} onClick={() => setIsLogout(true)}>
                        <LogoutIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Toolbar>

            {chatList && <ChatList />}
        </AppBar>
    );
};

export default NavHeader;
