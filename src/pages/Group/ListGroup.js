import React from "react";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import { Grid, Box, Typography, Card, CardContent, Button, Avatar } from "@mui/material";
import Sidebar from "~/components/Layouts/Sidebar";
import { listGroupJoin } from "~/services/groupServices/groupService";

import AddMember from "./AddMember";
import RemoveMember from "./RemoveMember";
const GroupCard = ({ group, onJoin }) => {
    const [dataGroup, setDataGroup] = useState(group);
    const navigate = useNavigate();
    //open add member
    const [isOpenAddMember, setOpenAddMember] = useState(null);
    const openAddMember = () => {
        setOpenAddMember(true);
    };
    const closeAddMember = () => {
        setOpenAddMember(false);
    };
    //remove member
    const [isOpenRemoveMember, setOpenRemoveMember] = useState(null);
    const openRemoveMember = () => {
        setOpenRemoveMember(true);
    };
    const closeRemoveMember = () => {
        setOpenRemoveMember(false);
    };

    return (
        <Card
            sx={{ maxWidth: 345, margin: "0 auto", boxShadow: 2 }}
            onClick={() =>
                navigate(`/groups/${group?._id}`, {
                    state: { groupData: group },
                })
            }
        >
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
                    color="secondary"
                    onClick={(event) => {
                        event.stopPropagation();
                        navigate(`/groups/update`, {
                            state: { groupData: group },
                        });
                    }}
                    sx={{ textTransform: "none" }}
                >
                    Update Group
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{ textTransform: "none" }}
                    onClick={(event) => {
                        event.stopPropagation();
                        openAddMember();
                    }}
                >
                    Add member
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{ textTransform: "none" }}
                    onClick={(event) => {
                        event.stopPropagation();
                        openRemoveMember();
                    }}
                >
                    Remove member
                </Button>
            </CardContent>
            <RemoveMember open={isOpenRemoveMember} members={group?.members} group={group} close={closeRemoveMember} />
            <AddMember open={isOpenAddMember} users={group?.members} group={group} close={closeAddMember} />
        </Card>
    );
};
function ListGroup() {
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
            listGroupJoin().then((groups) => {
                setGroups(groups);
                // if (groups) {
                //     if (Array.isArray(groups)) setGroups(groups);
                //     else {
                //         setGroups([]);
                //         alert("You have 0 group!");
                //     }
                // }
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
                            My Groups
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
                                    {/* <DetailGroup /> */}
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                    {/* <FormEditGroup /> */}
                </Grid>
            </Grid>
        </>
    );
}

export default ListGroup;
