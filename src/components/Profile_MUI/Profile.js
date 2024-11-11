import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Paper,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Avatar,
    IconButton,
    Typography,
    Divider,
    Button,
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { Redirect, Link } from "react-router-dom";
import DeleteUser from "./DeleteUser";
import auth from "./../auth/auth-helper";
import { read } from "./api-user.js";
import FollowProfileButton from "./../user/FollowProfileButton";
import ProfileTabs from "./../user/ProfileTabs";
import { listByUser } from "./../post/api-post.js";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 600,
        margin: "auto",
        padding: theme.spacing(3),
        marginTop: theme.spacing(5),
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[4],
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        color: theme.palette.primary.main,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: theme.spacing(2),
    },
    bigAvatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    userDetails: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    aboutSection: {
        marginTop: theme.spacing(2),
        fontStyle: "italic",
    },
}));

export default function Profile({ match }) {
    const classes = useStyles();
    const [values, setValues] = useState({
        user: { following: [], followers: [] },
        redirectToSignin: false,
        following: false,
    });
    const [posts, setPosts] = useState([]);
    const jwt = auth.isAuthenticated();

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        read({ userId: match.params.userId }, { t: jwt.token }, signal).then((data) => {
            if (data && data.error) {
                setValues({ ...values, redirectToSignin: true });
            } else {
                let following = checkFollow(data);
                setValues({ ...values, user: data, following });
                loadPosts(data._id);
            }
        });
        return () => abortController.abort();
    }, [match.params.userId]);

    const checkFollow = (user) => user.followers.some((follower) => follower._id === jwt.user._id);

    const clickFollowButton = (callApi) => {
        callApi({ userId: jwt.user._id }, { t: jwt.token }, values.user._id).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, user: data, following: !values.following });
            }
        });
    };

    const loadPosts = (user) => {
        listByUser({ userId: user }, { t: jwt.token }).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                setPosts(data);
            }
        });
    };

    const removePost = (post) => {
        const updatedPosts = posts.filter((p) => p !== post);
        setPosts(updatedPosts);
    };

    const photoUrl = values.user._id
        ? `/api/users/photo/${values.user._id}?${new Date().getTime()}`
        : "/api/users/defaultphoto";

    if (values.redirectToSignin) {
        return <Redirect to="/signin" />;
    }

    return (
        <Paper className={classes.root}>
            <Typography variant="h5" className={classes.title}>
                Profile
            </Typography>
            <List dense>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar src={photoUrl} className={classes.bigAvatar} />
                    </ListItemAvatar>
                    <ListItemText primary={values.user.name} secondary={values.user.email} />
                    <ListItemSecondaryAction>
                        {auth.isAuthenticated().user && auth.isAuthenticated().user._id === values.user._id ? (
                            <>
                                <Link to={`/user/edit/${values.user._id}`}>
                                    <IconButton aria-label="Edit" color="primary">
                                        <Edit />
                                    </IconButton>
                                </Link>
                                <DeleteUser userId={values.user._id} />
                            </>
                        ) : (
                            <FollowProfileButton following={values.following} onButtonClick={clickFollowButton} />
                        )}
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem className={classes.aboutSection}>
                    <ListItemText
                        primary={values.user.about}
                        secondary={`Joined: ${new Date(values.user.created).toDateString()}`}
                    />
                </ListItem>
            </List>
            <ProfileTabs user={values.user} posts={posts} removePostUpdate={removePost} />
        </Paper>
    );
}
