import React, { useState, useEffect } from "react";
import auth from "~/services/authService/authHelper.js";
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Button,
    TextField,
    Typography,
    Avatar,
    IconButton,
    Box,
} from "@mui/material";
import { PhotoCamera, Error as ErrorIcon } from "@mui/icons-material";
import PropTypes from "prop-types";
import { create } from "./api-post.js";

export default function NewPost(props) {
    const [values, setValues] = useState({
        text: "",
        photo: "",
        error: "",
        user: {},
    });
    const jwt = auth.isAuthenticated();

    useEffect(() => {
        setValues((prevValues) => ({ ...prevValues, user: auth.isAuthenticated().user }));
    }, []);

    const clickPost = () => {
        let postData = new FormData();
        postData.append("text", values.text);
        postData.append("photo", values.photo);
        create({ userId: jwt.user._id }, { t: jwt.token }, postData).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, text: "", photo: "" });
                props.addUpdate(data);
            }
        });
    };

    const handleChange = (name) => (event) => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        setValues({ ...values, [name]: value });
    };

    const photoURL = values.user._id ? `/api/users/photo/${values.user._id}` : "/api/users/defaultphoto";

    return (
        <Box
            sx={{
                backgroundColor: "#f0f2f5",
                paddingY: 3,
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Card
                sx={{
                    maxWidth: 600,
                    marginBottom: 3,
                    boxShadow: "none",
                    border: "1px solid rgba(0, 0, 0, 0.12)",
                }}
            >
                <CardHeader avatar={<Avatar src={photoURL} />} title={values.user.name} sx={{ paddingY: 1 }} />
                <CardContent sx={{ backgroundColor: "#fff", paddingY: 2 }}>
                    <TextField
                        placeholder="Share your thoughts ..."
                        multiline
                        rows={3}
                        value={values.text}
                        onChange={handleChange("text")}
                        fullWidth
                        sx={{
                            marginY: 1,
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: "#f9f9f9",
                            },
                        }}
                    />
                    <input
                        accept="image/*"
                        onChange={handleChange("photo")}
                        style={{ display: "none" }}
                        id="icon-button-file"
                        type="file"
                    />
                    <label htmlFor="icon-button-file">
                        <IconButton color="secondary" component="span" sx={{ height: 30, marginY: 1 }}>
                            <PhotoCamera />
                        </IconButton>
                    </label>
                    <Typography variant="body2" sx={{ verticalAlign: "super", ml: 1 }}>
                        {values.photo ? values.photo.name : ""}
                    </Typography>
                    {values.error && (
                        <Typography color="error" sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                            <ErrorIcon sx={{ mr: 0.5 }} />
                            {values.error}
                        </Typography>
                    )}
                </CardContent>
                <CardActions>
                    <Button
                        color="primary"
                        variant="contained"
                        disabled={values.text === ""}
                        onClick={clickPost}
                        sx={{ mx: "auto", my: 1 }}
                    >
                        POST
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
}

NewPost.propTypes = {
    addUpdate: PropTypes.func.isRequired,
};
