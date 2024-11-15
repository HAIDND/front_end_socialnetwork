import React, { useContext, useState } from "react";

import { Box, Paper, Grid, Avatar, Typography, TextField, Button } from "@mui/material";
import Sidebar from "~/components/Layouts/Sidebar";
import { getInfo, updateUser } from "~/services/userServices/userService";
import { CurentUser } from "~/MainRoutes";
const EditProfile = ({ Profiledata }) => {
    const { curentUserID, curentUser, curentUserToken } = useContext(CurentUser);
    const curentProfile = getInfo();
    console.log(curentProfile);
    const data = {
        avatarUrl: "https://timbaby.net/wp-content/uploads/2022/11/anh-avatar-dep-cho-con-gai-10.jpg", // URL ảnh đại diện mẫu
        firstName: "Nguyễn",
        lastName: "Văn A",
        dateOfBirth: "1990-01-01",
        email: "nguyenvana@example.com",
        phone: "0123456789",
        gender: "Nam",
        address: "123 Đường ABC, Phường 1, Quận 1, TP. Hồ Chí Minh",
    };
    const [formData, setFormData] = useState(
        curentProfile,
        // avatarUrl: "", // URL của ảnh đại diện
        // firstName: "",
        // lastName: "",
        // dateOfBirth: "",
        // email: "",
        // phone: "",
        // gender: "",
        // address: "",
    );
    console.log();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Hàm xử lý thay đổi ảnh đại diện
    // const handleAvatarChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setFormData((prevData) => ({
    //                 ...prevData,
    //                 avatar: reader.result,
    //             }));
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prevData) => ({
                ...prevData,
                avatar: file, // Đặt file trực tiếp vào state
            }));
        }
    };
    // Hàm xử lý submit form
    const handleSubmit = (e) => {
        e.preventDefault();

        // Thêm logic để gửi dữ liệu form đi (ví dụ: gửi API)
        console.log("Thông tin người dùng đã cập nhật:", formData);
        updateUser(curentUserID, curentUserToken, formData);
    };

    return (
        <Grid container>
            <Grid item flex={2}>
                <Sidebar />
            </Grid>
            <Grid item flex={5} sx={{ mt: 12 }}>
                <Box
                    component={Paper}
                    className="mt-4"
                    sx={{
                        maxWidth: 600,
                        margin: "0 auto",
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
                                src={formData.avatarUrl}
                                alt={`${formData.firstName} ${formData.lastName}`}
                                sx={{ width: 100, height: 100, margin: "0 auto" }}
                            />
                            <Button variant="text" component="label" sx={{ mt: 2 }}>
                                Thay đổi ảnh
                                <input hidden accept="image/*" type="file" onChange={handleAvatarChange} />
                            </Button>
                        </Grid>

                        {/* Form Fields */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Tên"
                                name="username"
                                variant="outlined"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Họ"
                                name="lastName"
                                variant="outlined"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Ngày Sinh"
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
                                label="Giới Tính"
                                name="gender"
                                variant="outlined"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Địa Chỉ"
                                name="address"
                                variant="outlined"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </Grid>

                        {/* Submit Button */}
                        <Grid item xs={12}>
                            <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit}>
                                Cập Nhật Thông Tin
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
            <Grid item flex={1}></Grid>
        </Grid>
    );
};

export default EditProfile;
