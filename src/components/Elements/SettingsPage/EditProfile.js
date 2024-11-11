import React, { useContext, useState } from "react";
import { Box, TextField, Button, Avatar, Typography } from "@mui/material";
import axios from "axios";
import { CurentUser } from "~/MainRoutes";
import { updateUser } from "~/services/userServices/userService";

const EditUserForm = ({ userId, userData }) => {
    const { curentUserID, curentUserToken } = useContext(CurentUser);
    console.log(curentUserToken);

    const [formData, setFormData] = useState({
        name: userData?.name || "",
        email: userData?.email || "",
    });
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(userData?.avatar?.url || "");
    const [loading, setLoading] = useState(false);

    // Xử lý khi người dùng chọn avatar mới
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    // Xử lý khi thay đổi các trường thông tin
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Xử lý gửi dữ liệu lên server
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = curentUserToken; // Lấy token từ localStorage
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            };

            const formDataToSend = new FormData();
            formDataToSend.append("username", formData.name);
            formDataToSend.append("email", formData.email);
            if (avatar) {
                formDataToSend.append("avatar", avatar);
            }

            // Gửi yêu cầu PUT tới server
            // const response = await axios.put(`http://localhost:4000/api/users/${userId}`, formDataToSend, config);
            updateUser(curentUserID, token, formDataToSend).then((data) => {
                console.log(data);
            });

            alert("Cập nhật thông tin thành công!");
        } catch (error) {
            console.error("Error updating user:", error);
            alert("Có lỗi xảy ra khi cập nhật thông tin.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2, width: 400 }}
        >
            <Typography variant="h5" align="center">
                Chỉnh sửa thông tin người dùng
            </Typography>
            <Avatar src={avatarPreview} alt="Avatar" sx={{ width: 80, height: 80, alignSelf: "center" }} />
            <Button variant="contained" component="label">
                Thay đổi Avatar
                <input hidden accept="image/*" type="file" onChange={handleAvatarChange} />
            </Button>

            <TextField label="Tên" name="name" value={formData.name} onChange={handleInputChange} required />
            <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
            />

            <Button type="submit" variant="contained" color="primary" disabled={loading}>
                {loading ? "Đang cập nhật..." : "Cập nhật thông tin"}
            </Button>
        </Box>
    );
};

export default EditUserForm;
