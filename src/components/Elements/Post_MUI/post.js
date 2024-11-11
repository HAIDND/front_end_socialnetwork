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
import { getPost, likePost } from "~/services/postServices/postService";

export default function Post() {
    const handleComment = () => {
        setComments(comments + 1);
    };

    // Trạng thái để lưu việc hiển thị comment của từng bài post
    const [showComments, setShowComments] = useState({});

    // Hàm xử lý sự kiện khi ấn nút Comment của từng bài post
    const handleShowComments = (postId) => {
        setShowComments((prev) => ({
            ...prev,
            [postId]: !prev[postId], // Toggle trạng thái cho từng postId
        }));
    };

    // call api post
    const { curentUserID, curentUserToken } = useContext(CurentUser);
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPost(curentUserID, curentUserToken);
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
    // const likePosts = async (id) => {
    //     try {
    //         const data = await likePost({ postId: id }, curentUserToken);
    //         if (!data.error) {
    //             setLikes(true); // Cập nhật danh sách bài post vào state
    //             console.log("liked:", data);
    //         } else {
    //             console.log("Lỗi khi like:", data.message);
    //         }
    //     } catch (error) {
    //         console.error("Lỗi khi like bài post:", error);
    //     }
    // };
    // Hàm xử lý sự kiện khi nhấn Like
    const [postLike, setPostLike] = useState([]);

    const likePosts = async (id) => {
        try {
            const data = await likePost({ postId: id }, curentUserToken);
            if (!data.error) {
                // Cập nhật danh sách bài post sau khi like
                setPostLike((prevList) =>
                    prevList.map((post) => (post._id === id ? { ...post, likes: data.likes } : post)),
                );
                console.log("Cập nhật danh sách bài post sau khi like:", data);
            } else {
                console.error("Lỗi khi like bài post:", data.message);
            }
        } catch (error) {
            console.error("Lỗi khi like bài post:", error);
        }
    };

    return (
        <>
            {postList.map((item) => (
                <Card key={item._id} sx={{ maxWidth: 800, margin: "0px auto", mt: 3, bgcolor: "GrayText" }}>
                    {/* Header với avatar và tiêu đề */}
                    <CardHeader
                        avatar={
                            <Avatar
                                sx={{ bgcolor: "red" }}
                                aria-label="recipe"
                                src="https://tse3.mm.bing.net/th?id=OIP.XKQRTYDnmhtXu-36EacQmAHaEK&pid=Api&P=0&h=180"
                            >
                                H
                            </Avatar>
                        }
                        title={item?.userId?.username}
                        subheader={item?.createdAt + " with role " + item?.visibility}
                    />
                    <Divider sx={{ color: "#6e6858", border: 1 }} />

                    {/* Nội dung bài đăng */}
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {item.content}
                        </Typography>
                        <Divider />
                    </CardContent>

                    <Divider sx={{ color: "#6e6858", border: 1 }} />

                    {/* Hình ảnh trong bài post */}
                    {item?.image && <CardMedia component="img" height="300" image={item?.image} alt="Post Image" />}

                    {/* Các nút Like và Comment */}
                    <CardActions disableSpacing>
                        <IconButton aria-label="like post" onClick={() => likePosts(item._id)}>
                            <Favorite color={item?.likes?.includes(curentUserID) ? "error" : "inherit"} />
                        </IconButton>
                        <Typography variant="body2">{item?.likes?.length || 0} Likes</Typography>

                        <IconButton aria-label="comment on post" onClick={() => handleShowComments(item._id)}>
                            <Comment />
                        </IconButton>
                        <Typography variant="body2">{item?.comments?.length || 0} Comments</Typography>
                    </CardActions>

                    {/* <CardActions disableSpacing>
                        <IconButton aria-label="like post" onClick={() => likePosts(item?._id)}>
                            <Favorite color={likes > 0 ? "error" : "inherit"} />
                        </IconButton>
                        <Typography variant="body2">{item?.likes?.length} Likes</Typography>

                        <IconButton aria-label="comment on post" onClick={() => handleShowComments(item?._id)}>
                            <Comment />
                        </IconButton>
                        <Typography variant="body2">{item?.comments?.length} Comments</Typography>
                    </CardActions> */}

                    {/* Hiển thị danh sách comment nếu showComments của bài post đó là true */}
                    {showComments[item?._id] && <CommentList comments={item?.comments || []} />}
                </Card>
            ))}
        </>
    );
}

// Component hiển thị danh sách comment
const CommentList = ({ comments }) => {
    const [newComment, setNewComment] = useState("");

    const handleInputChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleSendComment = () => {
        if (newComment.trim()) {
            console.log("New Comment:", newComment);
            setNewComment("");
        }
    };

    return (
        <Paper elevation={3} sx={{ padding: 2, borderRadius: 0 }}>
            <Typography variant="h6" sx={{ mb: "5px" }}>
                Comments
            </Typography>

            {/* Khung hiển thị danh sách comment có scroll */}
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
                                <ListItem alignItems="flex-start">
                                    <ListItemText primary={comment?.userId} secondary={comment?.comment} />
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

            {/* Input và button cố định */}
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
