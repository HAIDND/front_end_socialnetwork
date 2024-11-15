// import React, { useContext, useState } from "react";
// import { Box, TextField, Button, Avatar, Typography } from "@mui/material";
// import axios from "axios";
// import { CurentUser } from "~/MainRoutes";
// import { updateUser } from "~/services/userServices/userService";

// const EditUserForm = ({ userId, userData }) => {
//     const { curentUserID, curentUserToken } = useContext(CurentUser);
//     console.log(curentUserToken);

//     const [formData, setFormData] = useState({
//         name: userData?.name || "",
//         email: userData?.email || "",
//     });
//     const [avatar, setAvatar] = useState(null);
//     const [avatarPreview, setAvatarPreview] = useState(userData?.avatar?.url || "");
//     const [loading, setLoading] = useState(false);

//     // Xử lý khi người dùng chọn avatar mới
//     const handleAvatarChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setAvatar(file);
//             setAvatarPreview(URL.createObjectURL(file));
//         }
//     };

//     // Xử lý khi thay đổi các trường thông tin
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     // Xử lý gửi dữ liệu lên server
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             const token = curentUserToken; // Lấy token từ localStorage
//             const config = {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                     Authorization: `Bearer ${token}`,
//                 },
//             };

//             const formDataToSend = new FormData();
//             formDataToSend.append("username", formData.name);
//             formDataToSend.append("email", formData.email);
//             if (avatar) {
//                 formDataToSend.append("avatar", avatar);
//             }

//             // Gửi yêu cầu PUT tới server
//             // const response = await axios.put(`http://localhost:4000/api/users/${userId}`, formDataToSend, config);
//             updateUser(curentUserID, token, formDataToSend).then((data) => {
//                 console.log(data);
//             });

//             alert("Cập nhật thông tin thành công!");
//         } catch (error) {
//             console.error("Error updating user:", error);
//             alert("Có lỗi xảy ra khi cập nhật thông tin.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <Box
//             component="form"
//             onSubmit={handleSubmit}
//             sx={{ display: "flex", flexDirection: "column", gap: 2, width: 400 }}
//         >
//             <Typography variant="h5" align="center">
//                 Chỉnh sửa thông tin người dùng
//             </Typography>
//             <Avatar src={avatarPreview} alt="Avatar" sx={{ width: 80, height: 80, alignSelf: "center" }} />
//             <Button variant="contained" component="label">
//                 Thay đổi Avatar
//                 <input hidden accept="image/*" type="file" onChange={handleAvatarChange} />
//             </Button>

//             <TextField label="Tên" name="name" value={formData.name} onChange={handleInputChange} required />
//             <TextField
//                 label="Email"
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 required
//             />

//             <Button type="submit" variant="contained" color="primary" disabled={loading}>
//                 {loading ? "Đang cập nhật..." : "Cập nhật thông tin"}
//             </Button>
//         </Box>
//     );
// };

// export default EditUserForm;
import React, { useContext, useState } from "react";

import { Box, Paper, Grid, Avatar, Typography, TextField, Button } from "@mui/material";
import { updateUser } from "~/services/userServices/userService";
import { CurentUser } from "~/MainRoutes";
const Profile = ({ Profiledata }) => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        dateOfBirth: "",
        phone: "",
        gender: "",
        avatar: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Hàm xử lý thay đổi ảnh đại diện
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // const isImage = file.type.startsWith("image/");
            // const isVideo = file.type.startsWith("video/");
            // if (isImage) setSelectedImage(file);
            // if (isVideo) setSelectedVideo(file);
        }
    };
    const [avatar, setAvatar] = useState([]);
    const [postContent, setPostContent] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(formData.avatar || "");

    // Hàm xử lý file ảnh
    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const isImage = file.type.startsWith("image/");
            const isVideo = file.type.startsWith("video/");
            setAvatarPreview(URL.createObjectURL(file));
            if (isImage) {
                setSelectedImage(file);
                console.log(file);
            }
        }
    };
    const handleAvatarChanges = (e) => {
        const file = e.target.files[0];
        if (file) {
            const isImage = file.type.startsWith("image/");
            if (isImage) {
                setFormData((prevData) => ({
                    ...prevData,
                    avatar: file,
                }));
                setAvatar(file);
                // formData.avatar = file;
                console.log(file);
            }
            // const reader = new FileReader();
            // reader.onloadend = () => {
            //     setFormData((prevData) => ({
            //         ...prevData,
            //         avatar: reader.result,
            //     }));
            // };
            // reader.readAsDataURL(file);
        }
    };
    ///call api update profile
    const { curentUserID, curentUserInfo } = useContext(CurentUser);
    const handleUpdateProfile = async () => {
        if (true) {
            const response = await updateUser(formData, selectedImage, curentUserID);

            if (response) {
                console.log(response);
            } else {
                console.error("Failed to create post:", response?.error);
            }
        }
    };
    return (
        <>
            <Grid container spacing={2} alignItems="center" sx={{ mt: 12 }}></Grid>
            <Box
                component={Paper}
                sx={{
                    maxWidth: 600,
                    mt: 0,
                    ml: 25,
                    justifySelf: "center",
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                    backgroundColor: "#ffffff",
                }}
            >
                <Grid container spacing={2} alignItems="center">
                    {/* Avatar */}
                    <Grid item xs={12} sx={{ textAlign: "center" }}>
                        <Avatar
                            src={avatarPreview || curentUserInfo.avatar || formData.avatar}
                            // src={avatarPreview}
                            alt={`${formData.username}`}
                            sx={{ width: 100, height: 100, margin: "0 auto" }}
                        />
                        <Button variant="text" component="label" sx={{ mt: 2 }}>
                            Thay đổi ảnh
                            {/* <input hidden accept="image/*" type="file" onChange={handleAvatarChange} /> */}
                            <input
                                hidden
                                accept="image/*"
                                id="file-input"
                                type="file"
                                style={{ display: "none" }}
                                onChange={handleAvatarChange}
                            />
                        </Button>
                    </Grid>

                    {/* Form Fields */}
                    <Grid item xs={12} sm={12}>
                        <TextField
                            fullWidth
                            label="User name"
                            name="username"
                            variant="outlined"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    {/* <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Họ"
                        name="lastName"
                        variant="outlined"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </Grid> */}

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            variant="outlined"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Số Điện Thoại"
                            name="phone"
                            type="tel"
                            variant="outlined"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Date Of Birth"
                            name="dateOfBirth"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Gender"
                            name="gender"
                            variant="outlined"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    {/* <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Địa Chỉ"
                        name="address"
                        variant="outlined"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </Grid> */}

                    {/* Submit Button */}
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                            onClick={handleUpdateProfile}
                        >
                            Cập Nhật Thông Tin
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Profile;
