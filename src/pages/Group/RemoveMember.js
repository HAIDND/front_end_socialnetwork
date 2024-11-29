import React, { useContext, useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Card,
    CardHeader,
    CardActions,
    Avatar,
    Button,
    Box,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getListFriend } from "~/services/friendServices/friendService";
import { CurentUser } from "~/MainRoutes";
import { addMemberToGroup, removeMemberToGroup } from "~/services/groupServices/groupService";

const RemoveMember = ({ open, close, group, onAdd, members }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    // Lọc danh sách người dùng dựa trên từ khóa tìm kiếm
    // const filteredUsers = users.filter((user) => user.username.toLowerCase().includes(searchTerm.toLowerCase()));
    const filteredUsers = () => {
        alert("check");
    };

    //call api list friend
    //caall api getList
    const [users, setData] = useState([]);
    const { curentUserID } = useContext(CurentUser);
    useEffect(() => {
        try {
            getListFriend(curentUserID).then((result) => {
                setData(members);
            });
        } catch (error) {
            console.log(error);
        }
    }, []);
    return (
        <Dialog open={open} onClose={close} fullWidth maxWidth="sm" onClick={(event) => event.stopPropagation()}>
            <DialogTitle>
                <Typography variant="h6">Add Users to Group</Typography>
                <Button sx={{ justifyItems: "flex-end" }} onClick={close}>
                    Close
                </Button>
            </DialogTitle>

            <DialogContent>
                {/* Thanh tìm kiếm */}
                <Box sx={{ mb: 2 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search by username..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Box>

                {/* Danh sách người dùng */}
                <Box>
                    {users
                        .filter((item) => item !== group?.creator)
                        .map((user) => (
                            <Card
                                key={user.id}
                                sx={{
                                    mb: 2,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: 1,
                                }}
                            >
                                <CardHeader
                                    avatar={<Avatar src={user.avatar} alt={user.username} />}
                                    title={user}
                                    titleTypographyProps={{ variant: "subtitle1" }}
                                />
                                <CardActions>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => removeMemberToGroup(group?._id, user)}
                                    >
                                        Remove to Group
                                    </Button>
                                </CardActions>
                            </Card>
                        ))}

                    {/* Hiển thị khi không tìm thấy kết quả */}
                    {filteredUsers.length === 0 && (
                        <Typography variant="body2" color="textSecondary" align="center">
                            No users found.
                        </Typography>
                    )}
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default RemoveMember;
