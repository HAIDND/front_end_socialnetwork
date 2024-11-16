import React from "react";
import { Link, Route, Router } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import { Grid, Box, Typography, List, ListItem, ListItemText, Card, CardContent, Button, Avatar } from "@mui/material";
import Sidebar from "~/components/Layouts/Sidebar";
import { Padding } from "@mui/icons-material";
import CreateGroup from "./CreateGroup";
import axios from "axios";
import { listGroupAll, listGroupJoin } from "~/services/groupServices/groupService";
const GroupCard = ({ group, onJoin }) => {
    return (
        <Card sx={{ maxWidth: 345, margin: "0 auto", boxShadow: 2 }}>
            <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Avatar
                    alt={group.name}
                    src={group.avatar || "/default-avatar.png"}
                    sx={{ width: 80, height: 80, mb: 2 }}
                />
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                    {group.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {group?.members.length} Members
                </Typography>
                <Typography
                    variant="body2"
                    color={group.privacy === "public" ? "primary" : "secondary"}
                    sx={{ fontStyle: "italic", mb: 2 }}
                >
                    {group.privacy === "public" ? "Public Group" : "Private Group"}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onJoin(group._id)}
                    sx={{ textTransform: "none" }}
                >
                    Join Group
                </Button>
            </CardContent>
        </Card>
    );
};
function ListGroupAll() {
    const cardItems = [
        { id: 1, name: "Create Group", icon: <AddIcon />, path: "/group/create" },
        { id: 2, name: "My Group", icon: <GroupsIcon />, path: "/group/mygroup" },
        { id: 3, name: "Explore Group", icon: <SearchIcon />, path: "/group/explore" },
        { id: 4, name: "Chat Group", icon: <ChatIcon />, path: "/group/chat" },
    ];

    const navigate = useNavigate();

    const handleCardClick = (path) => {
        navigate(path);
    };
    ////calll api

    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    // Gọi API lấy danh sách group
    const fetchGroups = async () => {
        try {
            listGroupAll().then((groups) => {
                if (groups) {
                    setGroups(groups);
                    console.log("listGroupJoin");
                    console.log(groups);
                }
            });
        } catch (error) {
            console.log("Error fetching groups:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    const handleJoinGroup = async (groupId) => {
        try {
            if (true) {
                alert("Joined group successfully!");
            }
        } catch (error) {
            console.error("Error joining group:", error);
            alert("Failed to join group.");
        }
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }
    return (
        <>
            <Grid container>
                <Grid item flex={2} sx={{ overflow: "auto" }} display={{ xs: "none", md: "block" }}>
                    <Sidebar />
                </Grid>
                <Grid item flex={5} sx={{ mt: 2, padding: 10, mr: 5 }} container spacing={3} justifyContent="center">
                    <Box sx={{ padding: 4 }}>
                        <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
                            Explore Groups
                        </Typography>
                        <Grid container spacing={3}>
                            {groups.map((group) => (
                                <Grid
                                    sx={{ minWidth: 300, maxWidth: 500 }}
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    lg={3}
                                    key={group._id}
                                >
                                    <GroupCard group={group} onJoin={handleJoinGroup} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default ListGroupAll;
