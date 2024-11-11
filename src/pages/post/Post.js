import React, { useState } from "react";
import auth from "~/services/authService/authHelper.js";
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Typography,
    Avatar,
    IconButton,
    Divider,
    Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import { Link } from "react-router-dom";
import { remove, like, unlike } from "./api-post.js";
import Comments from "./Comments";
import PropTypes from "prop-types";

export default function Post(props) {
    const jwt = auth.isAuthenticated();

    const checkLike = (likes) => {
        return likes.indexOf(jwt.user._id) !== -1;
    };

    const [values, setValues] = useState({
        like: checkLike(props.post.likes),
        likes: props.post.likes.length,
        comments: props.post.comments,
    });

    const clickLike = () => {
        const callApi = values.like ? unlike : like;
        callApi({ userId: jwt.user._id }, { t: jwt.token }, props.post._id).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({ ...values, like: !values.like, likes: data.likes.length });
            }
        });
    };

    const updateComments = (comments) => {
        setValues({ ...values, comments: comments });
    };

    const deletePost = () => {
        remove({ postId: props.post._id }, { t: jwt.token }).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                props.onRemove(props.post);
            }
        });
    };

    return (
        <Card
            sx={{
                maxWidth: 600,
                margin: "auto",
                mb: 3,
                backgroundColor: "rgba(0, 0, 0, 0.06)",
            }}
        >
            <CardHeader
                avatar={<Avatar src={`/api/users/photo/${props.post.postedBy._id}`} />}
                action={
                    props.post.postedBy._id === jwt.user._id && (
                        <IconButton onClick={deletePost}>
                            <DeleteIcon />
                        </IconButton>
                    )
                }
                title={<Link to={`/user/${props.post.postedBy._id}`}>{props.post.postedBy.name}</Link>}
                subheader={new Date(props.post.created).toDateString()}
                sx={{ pt: 1, pb: 1 }}
            />
            <CardContent sx={{ bgcolor: "white", py: 0 }}>
                <Typography component="p" sx={{ m: 2 }}>
                    {props.post.text}
                </Typography>
                {props.post.photo && (
                    <Box
                        sx={{
                            textAlign: "center",
                            bgcolor: "#f2f5f4",
                            p: 1,
                        }}
                    >
                        <img
                            style={{ height: 200, width: "100%", objectFit: "cover" }}
                            src={`/api/posts/photo/${props.post._id}`}
                            alt={props.post.text}
                        />
                    </Box>
                )}
            </CardContent>
            <CardActions>
                <IconButton onClick={clickLike} aria-label={values.like ? "Unlike" : "Like"} color="secondary">
                    {values.like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
                <span>{values.likes}</span>
                <IconButton aria-label="Comment" color="secondary">
                    <CommentIcon />
                </IconButton>
                <span>{values.comments.length}</span>
            </CardActions>
            <Divider />
            <Comments postId={props.post._id} comments={values.comments} updateComments={updateComments} />
        </Card>
    );
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired,
};
