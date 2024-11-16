import React, { useContext, useState } from "react";
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
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { CurentUser } from "~/MainRoutes";
import { createPost } from "~/services/postServices/postService";
// Import hàm createPost

const NewPost = ({ addUpdate }) => {
    const { curentUser, setCurrentUser, curentUserProfile, setCurrentUserProfile, curentUserID, curentUserToken } =
        useContext(CurentUser);

    const [postContent, setPostContent] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isPublic, setIsPublic] = useState(true);
    const [isToggleOpen, setIsToggleOpen] = useState(false);

    // Hàm xử lý file ảnh
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const isImage = file.type.startsWith("image/");
            const isVideo = file.type.startsWith("video/");
            if (isImage) {
                setSelectedImage(file);
                console.log(file);
            }
            if (isVideo) setSelectedVideo(file);
        }
    };

    const handlePostChange = (event) => {
        setPostContent(event.target.value);
    };

    const handleToggleChange = () => {
        setIsToggleOpen(!isToggleOpen);
    };

    const handleVisibilityChange = (event) => {
        setIsPublic(event.target.checked);
    };

    // Hàm submit bài viết
    const handleSubmit = async () => {
        if (postContent.trim() || selectedImage || selectedVideo) {
            const visibility = isPublic ? "public" : "private";
            const response = await createPost(postContent, selectedImage, selectedVideo, visibility);

            if (response?.success) {
                addUpdate(response.data);
                setPostContent("");
                setSelectedImage(null);
                setSelectedVideo(null);
            } else {
                console.error("Failed to create post:", response?.error);
            }
        }
    };

    const handleClose = () => {
        setIsToggleOpen(false);
    };

    return (
        <Box sx={{ padding: 2, border: "1px solid #ccc", borderRadius: 2, backgroundColor: "white" }}>
            <Box display="flex" alignItems="center" mb={2}>
                <Avatar alt={curentUserProfile?.username} src={curentUserProfile?.avatar} />
                <Typography variant="h6" sx={{ marginLeft: 2, textAlign: "center" }}>
                    {curentUserProfile?.username}
                </Typography>
            </Box>
            <TextField
                fullWidth
                multiline
                rows={2}
                variant="outlined"
                placeholder="What's on your mind?"
                value={postContent}
                onChange={handlePostChange}
                sx={{ marginBottom: 0 }}
            />
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                    <input
                        accept="image/*,video/*"
                        id="file-input"
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                    <Tooltip title="Add Photo/Video">
                        <label htmlFor="file-input">
                            <IconButton color="primary" component="span">
                                <AddPhotoAlternateIcon />
                            </IconButton>
                        </label>
                    </Tooltip>
                    <Tooltip title="More Options">
                        <IconButton color="primary" onClick={handleToggleChange}>
                            <MoreHorizIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Drawer anchor="right" open={isToggleOpen} onClose={handleClose}>
                    <Box sx={{ width: 250, padding: 2 }}>
                        <FormControlLabel
                            control={<Switch checked={isPublic} onChange={handleVisibilityChange} />}
                            label="Chia sẻ công khai"
                        />
                    </Box>
                </Drawer>
            </Box>
            <Button variant="contained" color="primary" sx={{ marginTop: 0 }} onClick={handleSubmit}>
                Post
            </Button>
        </Box>
    );
};

export default NewPost;
