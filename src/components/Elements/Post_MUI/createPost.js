import React, { useState } from "react";
import {
    Box,
    Avatar,
    Typography,
    TextField,
    Button,
    IconButton,
    FormControlLabel,
    Switch,
    Tooltip,
    Drawer,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const NewPost = ({ addUpdate }) => {
    const [postContent, setPostContent] = useState("");
    const [isToggleOpen, setIsToggleOpen] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Xử lý tệp ở đây (ví dụ: hiển thị ảnh hoặc tải lên server)
            console.log("Selected file:", file);
        }
    };

    const handlePostChange = (event) => {
        setPostContent(event.target.value);
    };

    const handleToggleChange = () => {
        setIsToggleOpen(!isToggleOpen);
    };

    const handleSubmit = () => {
        // Logic to handle post submission
        if (postContent.trim()) {
            addUpdate({ content: postContent }); // Pass the post content to the parent
            setPostContent(""); // Clear the text field after submission
        }
    };
    const handleClose = () => {
        setIsToggleOpen(false);
    };

    return (
        <Box
            sx={{
                padding: 2,
                border: "1px solid #ccc",
                borderRadius: 1,
                boxShadow: 1,
                backgroundColor: "white",
            }}
        >
            <Box display="flex" alignItems="center" mb={2}>
                <Avatar
                    alt="User Name"
                    src="https://tse3.mm.bing.net/th?id=OIP.XKQRTYDnmhtXu-36EacQmAHaEK&pid=Api&P=0&h=180"
                />
                <Typography variant="h6" sx={{ marginLeft: 2, textAlign: "center", color: "#000000" }}>
                    Jony
                </Typography>
            </Box>
            <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                placeholder="What's on your mind?"
                value={postContent}
                onChange={handlePostChange}
                sx={{ marginBottom: 2 }}
            />
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                    <input
                        accept="image/*"
                        id="file-input"
                        type="file"
                        style={{ display: "none" }} // Ẩn input file
                        onChange={handleFileChange}
                    />
                    <Tooltip title="Add Photo/Video">
                        <label htmlFor="file-input">
                            <IconButton color="primary" aria-label="add photo/video" component="span">
                                <AddPhotoAlternateIcon />
                            </IconButton>
                        </label>
                    </Tooltip>
                    {/* <Tooltip title="Add Video">
                        <IconButton color="primary" aria-label="add video">
                            <VideoCameraFrontIcon />
                        </IconButton>
                    </Tooltip> */}
                    <Tooltip title="More Options">
                        <IconButton color="primary" onClick={handleToggleChange}>
                            <MoreHorizIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Drawer anchor="right" open={isToggleOpen} onClose={handleClose}>
                    <Box
                        sx={{
                            width: 250,
                            padding: 2,
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <FormControlLabel control={<Switch />} label="Chia sẻ công khai" />
                        <FormControlLabel control={<Switch />} label="Đăng ẩn danh" />
                        <FormControlLabel control={<Switch />} label="Chia sẻ vị trí" />
                    </Box>
                </Drawer>
            </Box>
            <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={handleSubmit}>
                Post
            </Button>
        </Box>
    );
};

export default NewPost;
