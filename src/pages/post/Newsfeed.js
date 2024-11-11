import React, { useState, useEffect } from "react";
import { Card, Typography, Divider, Box } from "@mui/material";
import auth from "~/services/authService/authHelper.js";
import PostList from "./PostList";
import { listNewsFeed } from "./api-post.js";
import NewPost from "./NewPost";

export default function Newsfeed() {
    const [posts, setPosts] = useState([]);
    const jwt = auth.isAuthenticated();

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        listNewsFeed({ userId: jwt.user._id }, { t: jwt.token }, signal).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                setPosts(data);
            }
        });

        return () => {
            abortController.abort();
        };
    }, [jwt.user._id, jwt.token]);

    const addPost = (post) => {
        setPosts((prevPosts) => [post, ...prevPosts]);
    };

    const removePost = (post) => {
        setPosts((prevPosts) => prevPosts.filter((p) => p !== post));
    };

    return (
        <Card
            sx={{
                margin: "auto",
                paddingY: 3,
            }}
        >
            <Typography variant="h5" sx={{ padding: 2 }}>
                Newsfeed
            </Typography>
            <Divider />
            <NewPost addUpdate={addPost} />
            <Divider />
            <PostList removeUpdate={removePost} posts={posts} />
        </Card>
    );
}
