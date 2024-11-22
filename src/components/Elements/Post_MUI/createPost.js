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
    Radio,
    Drawer,
    useTheme,
    RadioGroup,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { CurentUser } from "~/MainRoutes";
import { createPost } from "~/services/postServices/postService"; // Import the createPost function

const NewPost = ({ addUpdate }) => {
    const { curentUserProfile } = useContext(CurentUser);
    const theme = useTheme(); // Using MUI theme
    const [postContent, setPostContent] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isvisibility, setisvisibility] = useState();
    const [isToggleOpen, setIsToggleOpen] = useState(false);

    // Handle file change for images or videos
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const isImage = file.type.startsWith("image/");
            const isVideo = file.type.startsWith("video/");
            if (isImage) {
                setSelectedImage(URL.createObjectURL(file)); // Create a preview for the image
            }
            if (isVideo) {
                setSelectedVideo(URL.createObjectURL(file)); // Create a preview for the video
            }
        }
    };

    const handlePostChange = (event) => {
        setPostContent(event.target.value);
    };

    const handleToggleChange = () => {
        setIsToggleOpen(!isToggleOpen);
    };

    const handleVisibilityChange = (event) => {
        setisvisibility(event.target.value);
    };

    // Handle post submission
    const handleSubmit = async () => {
        if (postContent.trim() || selectedImage || selectedVideo) {
            const visibility = isvisibility;
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
        <Box
            sx={{
                padding: 2,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
                backgroundColor: theme.palette.background.paper,
            }}
        >
            <Box display="flex" alignItems="center" mb={2}>
                <Avatar alt={curentUserProfile?.username} src={curentUserProfile?.avatar} />
                <Typography variant="h6" sx={{ marginLeft: 2 }} color="primary">
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
                sx={{ marginBottom: 2 }}
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
                    <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={handleSubmit}>
                        Post
                    </Button>
                </Box>
                <Drawer anchor="right" open={isToggleOpen} onClose={handleClose}>
                    <Box sx={{ width: 250, padding: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Post Visibility
                        </Typography>

                        <RadioGroup value={isvisibility} onChange={handleVisibilityChange}>
                            <FormControlLabel value="public" control={<Radio />} label="Public" />
                            <FormControlLabel value="private" control={<Radio />} label="Private" />
                            <FormControlLabel value="friends" control={<Radio />} label="Friends" />
                        </RadioGroup>
                    </Box>
                </Drawer>
            </Box>

            {/* Display preview for selected image */}
            {selectedImage && (
                <Box sx={{ mt: 2 }}>
                    <img
                        src={selectedImage}
                        alt="Selected"
                        style={{ width: "100%", maxHeight: "300px", objectFit: "cover", borderRadius: "8px" }}
                    />
                </Box>
            )}

            {/* Display preview for selected video */}
            {selectedVideo && (
                <Box sx={{ mt: 2 }}>
                    <video
                        src={selectedVideo}
                        controls
                        style={{ width: "100%", maxHeight: "300px", borderRadius: "8px" }}
                    />
                </Box>
            )}
        </Box>
    );
};

export default NewPost;
