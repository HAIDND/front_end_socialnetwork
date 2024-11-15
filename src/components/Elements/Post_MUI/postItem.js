import React, { useContext, useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Avatar,
    IconButton,
    Typography,
    Divider,
    Button,
    List,
    TextField,
    Paper,
    ListItem,
    ListItemText,
    Box,
} from "@mui/material";
import { Favorite, Comment } from "@mui/icons-material";

import styles from "./Post.module.scss";
import clsx from "clsx";
import { CurentUser } from "~/MainRoutes";
import { createComment, getPost, likePost, unLikePost } from "~/services/postServices/postService";
const handleCommentPost = () => {};

export default function Post() {
    // Trạng thái để lưu việc hiển thị comment của từng bài post
    const [showComments, setShowComments] = useState({});
    //sey user is liek
    const [like, setLike] = useState([]);

    // Hàm xử lý sự kiện khi ấn nút Comment của từng bài post
    const handleShowComments = (postId) => {
        setShowComments((prev) => ({
            ...prev,
            [postId]: !prev[postId],
        }));
    };

    // call api post
    const { curentUserID, curentUserToken } = useContext(CurentUser);
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPost(curentUserID);
                setPostList(data); // Cập nhật danh sách bài post vào state
                console.log("postList:", data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách bài post:", error);
            }
        };
        fetchPosts();
    }, []);
    console.log(Array.isArray(postList));
    console.log(postList);
    // call api like post

    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState(0); //non
    const [postLike, setPostLike] = useState([]);
    const checkLike = (bool) => {
        setLike(bool);
    };
    const likePosts = async (postId) => {
        try {
            const data = await likePost({ postId }, curentUserToken);
            if (!data.error) {
                setPostList((prevList) =>
                    prevList.map((post) => (post._id === postId ? { ...post, likes: data.likes } : post)),
                );
                console.log("Cập nhật bài post sau khi like:", data);
                if (data.message == "You already liked this post") {
                    unLikePost({ postId }, curentUserToken);
                    console.log("Cập nhật un like:", data);
                }
            } else {
                console.error("Lỗi khi like bài post:", data.message);
            }
        } catch (error) {
            console.error("Lỗi khi like bài post:", error);
        }
    };
    ///commment
    const handleComment = async (postId, newComment) => {
        try {
            // Giả định có API thêm comment (handleCommentPost)

            const data = await createComment({ postId, comment: newComment }, curentUserToken);
            if (!data.error) {
                setPostList((prevList) =>
                    prevList.map((post) => (post._id === postId ? { ...post, comments: data.comments } : post)),
                );
                console.log("Cập nhật danh sách comment:", data);
            } else {
                console.error("Lỗi khi thêm comment:", data.message);
            }
        } catch (error) {
            console.error("Lỗi khi thêm comment:", error);
        }
    };

    return (
        <>
            {postList.map((item) => (
                <Card
                    key={item._id}
                    sx={{ maxWidth: 800, margin: "0px auto", mt: 3, bgcolor: "#d7e1e2", border: "1px solid lightgrey" }}
                >
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: "blue" }} aria-label="recipe" src={item?.userId?.avatar}></Avatar>
                        }
                        title={item?.userId?.username}
                        subheader={item?.createdAt + " with role " + item?.visibility}
                    />
                    <Divider sx={{ color: "#6e6858", border: 1 }} />

                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {item.content}
                        </Typography>
                        <Divider />
                    </CardContent>

                    {item?.image && <CardMedia component="img" height="300" image={item?.image} alt="Post Image" />}

                    <CardActions disableSpacing>
                        <IconButton aria-label="like post" onClick={() => likePosts(item._id)}>
                            <Favorite
                                color={item?.likes?.includes(curentUserID) ? "error" : "inherit"}
                                onClick={() => {
                                    checkLike(item?.likes?.includes(curentUserID));
                                }}
                            />
                        </IconButton>
                        <Typography variant="body2">{item?.likes?.length || 0} Likes</Typography>

                        <IconButton aria-label="comment on post" onClick={() => handleShowComments(item._id)}>
                            <Comment />
                        </IconButton>
                        <Typography variant="body2">{item?.comments?.length || 0} Comments</Typography>
                    </CardActions>

                    {showComments[item?._id] && (
                        <CommentList
                            comments={item?.comments || []}
                            onAddComment={(newComment) => handleComment(item._id, newComment)}
                        />
                    )}
                </Card>
            ))}
        </>
    );
}

// Component hiển thị danh sách comment
const CommentList = ({ comments, onAddComment }) => {
    const [newComment, setNewComment] = useState("");

    const handleInputChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleSendComment = () => {
        if (newComment.trim()) {
            onAddComment(newComment);
            setNewComment("");
        }
    };

    return (
        <Paper elevation={3} sx={{ padding: 2, borderRadius: 0 }}>
            <Typography variant="h6" sx={{ mb: "5px" }}>
                Comments
            </Typography>

            <Box
                sx={{
                    maxHeight: "150px",
                    overflowY: "auto",
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                    padding: "8px",
                }}
            >
                <List>
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <React.Fragment key={index}>
                                <Avatar
                                    sx={{ bgcolor: "blue" }}
                                    aria-label="recipe"
                                    src={comment?.userId?.avatar}
                                ></Avatar>
                                <ListItem alignItems="flex-start">
                                    <ListItemText primary={comment?.userId?.username} secondary={comment?.comment} />
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        ))
                    ) : (
                        <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", mt: 0 }}>
                            No comments yet.
                        </Typography>
                    )}
                </List>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mt: "5px" }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={handleInputChange}
                    sx={{ mr: 1 }}
                />
                <Button variant="contained" color="primary" onClick={handleSendComment}>
                    Send
                </Button>
            </Box>
        </Paper>
    );
};
