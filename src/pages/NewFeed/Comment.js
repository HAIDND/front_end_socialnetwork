import React, { useState } from "react";
import {
    Paper,
    List,
    ListItem,
    Avatar,
    ListItemText,
    IconButton,
    Divider,
    Box,
    Typography,
    TextField,
    Button,
    Menu,
    MenuItem,
} from "@mui/material";
import { Settings } from "@mui/icons-material";

const CommentList = ({ comments, postID, curentUserID, onAddComment, onEditComment, onDeleteComment }) => {
    const [newComment, setNewComment] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedCommentId, setSelectedCommentId] = useState(null);

    // Handle sending a new comment
    const handleSendComment = async () => {
        if (newComment.trim()) {
            await onAddComment(newComment); // Add comment
            setNewComment("");
        }
    };

    // Open settings menu for a comment
    const handleMenuOpen = (event, commentId) => {
        setAnchorEl(event.currentTarget);
        setSelectedCommentId(commentId);
    };

    // Close settings menu
    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedCommentId(null);
    };

    // Handle comment edit action
    const handleEditComment = async () => {
        await onEditComment(postID, selectedCommentId); // Edit comment
        handleMenuClose();
    };

    // Handle comment delete action
    const handleDeleteComment = async () => {
        await onDeleteComment(postID, selectedCommentId); // Delete comment
        handleMenuClose();
    };

    return (
        <Paper elevation={3} sx={{ padding: 2, bgcolor: "background.default" }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Comments
            </Typography>

            <Box sx={{ maxHeight: 150, overflowY: "auto", borderRadius: 1, bgcolor: "background.paper" }}>
                <List>
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <React.Fragment key={comment._id}>
                                <ListItem alignItems="flex-start">
                                    <Avatar src={comment?.userId?.avatar} sx={{ mr: 2 }} />
                                    <ListItemText
                                        primary={<Typography variant="body1">{comment?.userId?.username}</Typography>}
                                        secondary={
                                            <>
                                                <Typography variant="caption" color="text.secondary">
                                                    {comment?.createdAt}
                                                </Typography>
                                                <Typography variant="body2">{comment?.comment}</Typography>
                                            </>
                                        }
                                    />
                                    {comment?.userId?._id === curentUserID && (
                                        <Box sx={{ ml: "auto" }}>
                                            <IconButton
                                                size="small"
                                                onClick={(event) => handleMenuOpen(event, comment._id)}
                                            >
                                                <Settings />
                                            </IconButton>
                                        </Box>
                                    )}
                                </ListItem>
                                <Divider />
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl) && selectedCommentId === comment._id}
                                    onClose={handleMenuClose}
                                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                                >
                                    <MenuItem onClick={handleEditComment}>Update</MenuItem>
                                    <MenuItem onClick={handleDeleteComment}>Delete</MenuItem>
                                </Menu>
                            </React.Fragment>
                        ))
                    ) : (
                        <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
                            No comments yet.
                        </Typography>
                    )}
                </List>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    sx={{ mr: 1 }}
                />
                <Button variant="contained" onClick={handleSendComment}>
                    Send
                </Button>
            </Box>
        </Paper>
    );
};

export default CommentList;
