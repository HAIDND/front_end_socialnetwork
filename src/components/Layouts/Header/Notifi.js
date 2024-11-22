import React, { useEffect, useState, useRef } from "react";
import { Box, Typography, Paper, Slide, IconButton, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getNotifi, readNotifi } from "~/services/notifiServices/notifiService";

const NotificationPanel = ({ open, close }) => {
    const [notifilist, setNotifiList] = useState([]);
    const panelRef = useRef(null);
    const theme = useTheme(); // Lấy theme hiện tại từ context MUI

    useEffect(() => {
        const fetchNotifi = async () => {
            const data = await getNotifi();
            if (data) {
                setNotifiList(data);
            }
        };

        fetchNotifi();
        const interval = setInterval(fetchNotifi, 10000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (panelRef.current && !panelRef.current.contains(event.target)) {
                close();
            }
        };

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [close]);

    const handleReadNotifi = (id) => {
        readNotifi(id);
    };

    return (
        <Slide direction="left" in={open} mountOnEnter unmountOnExit>
            <Box
                ref={panelRef}
                sx={{
                    position: "fixed",
                    top: 100,
                    right: 16,
                    width: 300,
                    maxHeight: "80vh",
                    overflowY: "auto",
                    zIndex: 11,
                    backgroundColor: theme.palette.background.paper, // Sử dụng màu nền từ theme
                    borderRadius: 2,
                    boxShadow: 6,
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
                    <IconButton onClick={close} size="small" color="inherit">
                        <CloseIcon />
                    </IconButton>
                </Box>

                {notifilist.length > 0 ? (
                    notifilist.map((notification, index) => (
                        <Paper
                            key={index}
                            sx={{
                                mb: 1,
                                p: 2,
                                borderLeft: `4px solid ${getBorderColor(notification.type, theme)}`, // Dynamic border color
                                backgroundColor: notification?.isRead
                                    ? theme.palette.background.paper
                                    : theme.palette.warning.light,
                                boxShadow: 3,
                                "&:hover": { boxShadow: 6 },
                                cursor: "pointer",
                            }}
                            onClick={() => handleReadNotifi(notification?._id)}
                        >
                            <Typography variant="body1" fontWeight="bold">
                                {notification.type}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {notification.message + " " + new Date(notification.createdAt).toLocaleString()}
                            </Typography>
                        </Paper>
                    ))
                ) : (
                    <Typography variant="body2" sx={{ p: 2, textAlign: "center" }}>
                        No notifications
                    </Typography>
                )}
            </Box>
        </Slide>
    );
};

// Hàm xác định màu sắc dựa trên type và theme
const getBorderColor = (type, theme) => {
    switch (type) {
        case "new_message":
            return theme.palette.success.main; // Xanh lá từ theme
        case "new_post":
            return theme.palette.error.main; // Đỏ từ theme
        case "warning":
            return theme.palette.warning.main; // Cam từ theme
        default:
            return theme.palette.info.main; // Xanh dương mặc định từ theme
    }
};

export default NotificationPanel;
