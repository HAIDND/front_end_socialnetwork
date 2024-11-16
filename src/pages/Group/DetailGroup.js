import React from "react";
import { Avatar, Box, Typography, Button, Chip } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import PublicIcon from "@mui/icons-material/Public";
import LockIcon from "@mui/icons-material/Lock";

const DetailGroup = ({ group, data }) => {
    // Mẫu dữ liệu group mặc định
    const defaultGroup = {
        name: "React Devs Vietnam",
        avatar: "",
        members: 1500,
        status: "Public", // Hoặc "Private"
    };

    // Sử dụng dữ liệu từ props hoặc mặc định
    const groupData = data || defaultGroup;

    return (
        <Box
            sx={{
                maxWidth: 600,
                mx: "auto",
                my: 4,
                p: 3,
                boxShadow: 2,
                borderRadius: 2,
                bgcolor: "background.paper",
                display: "flex",
                alignItems: "center",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
            }}
        >
            {/* Avatar của group */}
            <Avatar sx={{ width: 80, height: 80 }} src={groupData.avatar || "/default-avatar.png"} alt={groupData.name}>
                <GroupIcon fontSize="large" />
            </Avatar>

            {/* Thông tin chi tiết của group */}
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h5" fontWeight="bold">
                    {groupData.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <GroupIcon sx={{ fontSize: 16, verticalAlign: "middle", mr: 0.5 }} />
                    {groupData.members} members
                </Typography>
                <Chip
                    sx={{ mt: 1 }}
                    label={groupData.status === "Public" ? "Public Group" : "Private Group"}
                    color={groupData.status === "Public" ? "success" : "warning"}
                    icon={groupData.status === "Public" ? <PublicIcon /> : <LockIcon />}
                />
            </Box>

            {/* Button tham gia group */}
            <Button variant="contained" color="primary">
                Join Group
            </Button>
        </Box>
    );
};

export default DetailGroup;
