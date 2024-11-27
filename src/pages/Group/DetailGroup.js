import React, { useContext, useEffect, useState } from "react";
import { Avatar, Box, Typography, Button, Chip } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import PublicIcon from "@mui/icons-material/Public";
import LockIcon from "@mui/icons-material/Lock";

import { useLocation, useParams } from "react-router-dom";
import { PostInGroup } from "./CRUDPostGroup";
import CreatePostInGroup from "./createPost";
import { CurentUser } from "~/MainRoutes";
import { addMemberToGroup, joinToGroup, leaveGroup, listGroupAll } from "~/services/groupServices/groupService";

const DetailGroup = () => {
    //lấy id
    const { id } = useParams();
    // alert(id);
    const location = useLocation();
    const [groupData, setGroupData] = useState(location.state?.groupData || null);

    // const groupData = location.state?.groupData;
    //check user curent is login
    const { curentUserID } = useContext(CurentUser);
    const [isJoin, setJoin] = useState([]);
    useEffect(() => {
        const listGroup = listGroupAll().then((data) => {
            console.log(data.filter((item) => item._id === id));
            setJoin(data.filter((item) => item._id === id).includes(curentUserID));
            setGroupData(data.filter((item) => item._id === id));
        });
        //
        // return .find((item) => item._id == id)
        // setJoin(groupData?.members.includes(curentUserID));
        console.log("render");
        console.log(listGroup);
        return setGroupData([]);
    }, []);

    //handle join gruop
    const handleJoinGroup = async () => {
        try {
            const response = await joinToGroup(id).then((data) => {
                if (data) {
                    console.log(data);
                }
            });
        } catch (error) {
            alert(error);
        }
    };
    //handle leave group
    const handleLeaveGroup = async () => {
        try {
            const response = await leaveGroup(id).then((data) => {
                if (data) {
                    console.log(data?.message);
                } else alert("Error");
            });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <Box
                sx={{
                    maxWidth: 600,
                    mx: "auto",
                    my: 12,
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
                <Avatar
                    sx={{ width: 80, height: 80 }}
                    src={groupData?.avatar || "/default-avatar.png"}
                    alt={groupData?.name}
                >
                    <GroupIcon fontSize="large" />
                </Avatar>

                {/* Thông tin chi tiết của group */}
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" fontWeight="bold">
                        {groupData?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <GroupIcon sx={{ fontSize: 16, verticalAlign: "middle", mr: 0.5 }} />
                        {groupData?.members?.length} members
                    </Typography>
                    <Chip
                        sx={{ mt: 1 }}
                        label={groupData?.privacy === "public" ? "Public Group" : "Private Group"}
                        color={groupData?.privacy === "public" ? "success" : "warning"}
                        icon={groupData?.privacy === "public" ? <PublicIcon /> : <LockIcon />}
                    />
                </Box>

                {/* Button tham gia group */}
                {!isJoin ? (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            handleJoinGroup();
                        }}
                    >
                        Join Group
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            handleLeaveGroup();
                            setJoin(false);
                        }}
                    >
                        Leave group
                    </Button>
                )}
            </Box>
            <CreatePostInGroup groupID={id} />
            <PostInGroup groupID={id} />
        </>
    );
};

export default DetailGroup;
