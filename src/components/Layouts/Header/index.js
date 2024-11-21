import React, { useContext, useEffect } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    InputBase,
    Menu,
    MenuItem,
    Avatar,
    Grid,
    Box,
    Switch,
    List,
    ListItem,
    ListItemText,
    Radio,
    RadioGroup,
    FormControlLabel,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import {
    Search as SearchIcon,
    Home as HomeIcon,
    Videocam as VideoIcon,
    Group as GroupIcon,
    ShoppingBag as ShoppingBagIcon,
    Notifications as NotificationsIcon,
    Message as MessageIcon,
    Settings as SettingsIcon,
} from "@mui/icons-material";

import styles from "./Header.module.scss";
import ChatWindow from "./ChatWindow";
import ChatList from "./ChatList";
import { logout } from "~/services/authService/authService";
import auth from "~/services/authService/authHelper";
import { CurentUser } from "~/MainRoutes";
const NavHeader = () => {
    const { curentUser, setCurrentUser, curentUserProfile, setCurrentUserProfile, curentUserID, curentUserToken } =
        useContext(CurentUser);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [settingsAnchorEl, setSettingsAnchorEl] = React.useState(null);
    const navigate = useNavigate();
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSettingsMenuOpen = (event) => {
        setSettingsAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSettingsAnchorEl(null);
    };

    const [chatList, setChatList] = useState(false);
    const enableChatList = () => setChatList(!chatList);
    console.log(chatList);

    ///handle logout
    const [isLogout, setIsLogout] = useState(false);
    const handleToggleLogout = () => {
        setIsLogout(!isLogout);
    };
    useEffect(() => {
        if (isLogout) {
            logout();
            navigate("/login");
        }
    }, [isLogout]);
    const handleLogout = () => {
        auth.clearJWT(() => {
            console.log("logged out");
        });
        redirect("/");
    };

    //hanlde change data
    const [keyword, setKeyWord] = useState([]);
    const handleChange = (e) => {
        setKeyWord(e.target.value);
        console.log(keyword);
    };
    // const handleLogout = (isLogout) => {isLogout :}
    return (
        <AppBar position="fixed" color="inherit" elevation={1} sx={{ padding: 1 }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                {/* Logo */}
                <Typography
                    variant="h5"
                    color="primary"
                    sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}
                >
                    <IconButton edge="start" color="success" sx={{ fontSize: 30 }}>
                        <HomeIcon fontSize="large" />
                    </IconButton>
                    Sociala
                </Typography>
                {/* Search Bar */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "left",

                        borderRadius: 50,
                        border: 1,
                    }}
                >
                    <SearchIcon sx={{ mr: 1, color: "grey.500", fontSize: 30 }} />
                    <InputBase
                        placeholder="Start typing to search.."
                        sx={{ width: "70%" }}
                        value={() => handleChange()}
                    />
                </Box>
                {/* Center Icons */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Link to={"/home"}>
                        <IconButton color="inherit" sx={{ fontSize: 30 }}>
                            <HomeIcon fontSize="large" />
                        </IconButton>
                    </Link>
                    {/* <IconButton color="inherit" sx={{ fontSize: 30 }}>
                        <VideoIcon fontSize="large" />
                    </IconButton>
                    <IconButton color="inherit" sx={{ fontSize: 30 }}>
                        <GroupIcon fontSize="large" />
                    </IconButton>
                    <IconButton color="inherit" sx={{ fontSize: 30 }}>
                        <ShoppingBagIcon fontSize="large" />
                    </IconButton> */}
                </Box>

                {/* Right Icons */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Link to={"/chat"}>
                        <IconButton color="inherit" sx={{ fontSize: 30 }} onClick={enableChatList}>
                            <MessageIcon fontSize="large" />
                        </IconButton>
                    </Link>
                    <IconButton color="inherit" onClick={handleMenuOpen} sx={{ fontSize: 30 }}>
                        <NotificationsIcon fontSize="large" />
                    </IconButton>

                    {/* Notification Menu */}
                    <Menu
                        sx={{ marginTop: 10 }}
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                        <MenuItem>
                            <Avatar src={curentUserProfile?.avatar} />
                            <ListItemText primary="Hendrix Stamp" secondary="There are many variations of pass.." />
                        </MenuItem>
                        <MenuItem>
                            <Avatar src="images/user-4.png" />
                            <ListItemText primary="Goria Coast" secondary="Mobile Apps UI Designer is require.." />
                        </MenuItem>
                    </Menu>
                    {/* {chatList && <ChatList />} */}
                    {/* Settings Icon */}
                    <IconButton color="inherit" onClick={handleSettingsMenuOpen} sx={{ fontSize: 30 }}>
                        <SettingsIcon fontSize="large" />
                    </IconButton>

                    {/* Settings Menu */}
                    <Menu
                        sx={{ marginTop: 10 }}
                        anchorEl={settingsAnchorEl}
                        open={Boolean(settingsAnchorEl)}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                        <Typography variant="h6">Settings</Typography>
                        <Box sx={{ p: 2 }}>
                            <Typography variant="body2">Choose Color Theme</Typography>
                            <RadioGroup>
                                <FormControlLabel value="red" control={<Radio />} label="Red" />
                                <FormControlLabel value="green" control={<Radio />} label="Green" />
                                <FormControlLabel value="blue" control={<Radio />} label="Blue" />
                                <FormControlLabel value="yellow" control={<Radio />} label="Yellow" />
                            </RadioGroup>

                            <List>
                                <ListItem>
                                    <Typography variant="body2">Header Background</Typography>
                                    <Switch />
                                </ListItem>
                                <ListItem>
                                    <Typography variant="body2">Menu Position</Typography>
                                    <Switch />
                                </ListItem>
                                <ListItem>
                                    <Typography variant="body2">Dark Mode</Typography>
                                    <Switch />
                                </ListItem>
                            </List>
                        </Box>
                    </Menu>

                    {/* Profile Avatar */}
                    <IconButton color="inherit" sx={{ fontSize: 30 }}>
                        <Avatar src={curentUserProfile?.avatar} />
                    </IconButton>
                    <IconButton color="inherit" sx={{ fontSize: 30 }} onClick={handleToggleLogout}>
                        <LogoutIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavHeader;
