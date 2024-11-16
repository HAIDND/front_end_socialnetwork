import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Typography, Input } from "@mui/material";
import { createPost, updatePost } from "~/services/postServices/postService"; // Giả sử bạn có một hàm updatePost

const EditPostDialog = ({ open, onClose, postContent, postImage, postId }) => {
    const [content, setContent] = useState(postContent);
    const [image, setImage] = useState(postImage);

    // Cập nhật lại content và image khi postContent hoặc postImage thay đổi
    // useEffect(() => {
    //     setContent(postContent);
    //     setImage(postImage);
    // }, [postContent, postImage]);

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file); // Nếu bạn muốn xem trước hình ảnh
        }
    };

    const handleCompleteClick = () => {
        if (image !== postImage) {
            updatePost(postId, content, image);
        } else {
            updatePost(postId, content, postImage);
        }
        onClose();
        // updatePost(postId, content, image);
        // onClose(); // Đóng dialog sau khi cập nhật
    };
    // ///new
    // const { curentUserID, curentUserInfo } = useContext(CurentUser);

    // const [postContent, setPostContent] = useState("");
    // const [selectedImage, setSelectedImage] = useState(null);
    // const [selectedVideo, setSelectedVideo] = useState(null);
    // const [isPublic, setIsPublic] = useState(true);
    // const [isToggleOpen, setIsToggleOpen] = useState(false);

    // // Hàm xử lý file ảnh
    // const handleFileChange = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         const isImage = file.type.startsWith("image/");
    //         const isVideo = file.type.startsWith("video/");
    //         if (isImage) {
    //             setSelectedImage(file);
    //             console.log(file);
    //         }
    //         if (isVideo) setSelectedVideo(file);
    //     }
    // };

    // const handlePostChange = (event) => {
    //     setPostContent(event.target.value);
    // };

    // const handleToggleChange = () => {
    //     setIsToggleOpen(!isToggleOpen);
    // };

    // const handleVisibilityChange = (event) => {
    //     setIsPublic(event.target.checked);
    // };

    // // Hàm submit bài viết
    // const handleSubmit = async () => {
    //     if (postContent.trim() || selectedImage || selectedVideo) {
    //         const visibility = isPublic ? "public" : "private";
    //         const response = await createPost(postContent, selectedImage, selectedVideo, visibility);

    //         if (response?.success) {
    //             addUpdate(response.data);
    //             setPostContent("");
    //             setSelectedImage(null);
    //             setSelectedVideo(null);
    //         } else {
    //             console.error("Failed to create post:", response?.error);
    //         }
    //     }
    // };

    // const handleClose = () => {
    //     setIsToggleOpen(false);
    // };
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Edit Post</DialogTitle>
            <DialogContent>
                <Typography variant="body2" gutterBottom>
                    Please edit your post below:
                </Typography>

                <TextField
                    label="Content"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={content}
                    onChange={handleContentChange}
                    style={{ marginBottom: "20px" }}
                />

                <Typography variant="body2" gutterBottom>
                    Upload Image:
                </Typography>
                <Input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleImageChange}
                    style={{ marginBottom: "20px" }}
                />
                {/* <input
                        accept="image/*,video/*"
                        id="file-input"
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    /> */}
                {image && (
                    <div style={{ marginTop: "10px", marginBottom: "20px" }}>
                        <img
                            src={image}
                            alt="Preview"
                            style={{ width: "100%", maxHeight: "500px", objectFit: "cover" }}
                        />
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleCompleteClick} color="primary" variant="contained">
                    Complete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditPostDialog;
