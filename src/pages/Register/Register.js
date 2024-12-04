import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    TextField,
    Grid,
    Container,
    Typography,
    CssBaseline,
    Button,
    Icon,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
} from "@mui/material";

import { API_BASE_URL } from "~/config/apiConfig";
import { createUser } from "~/services/userServices/userService";

export default function Register() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        name: "",
        email: "",
        password: "",
        open: false,
        error: "",
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    const navigate = useNavigate();
    const clickSubmit = () => {
        const user = {
            username: formData.firstName + formData.lastName || undefined,
            email: formData.email || undefined,
            password: formData.password || undefined,
        };
        createUser(user).then((data) => {
            if (data) {
                setFormData({ ...formData, error: data.message });
                alert("create success");
            } else {
                setFormData({ ...formData, error: "", open: true });
            }
        });

        setTimeout(() => {
            navigate("/login");
        }, 500);
    };
    return (
        <Box
            component="form"
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                width: { xs: "90%", sm: 500 },
                padding: 4,
                backgroundColor: "#ffffff",
                borderRadius: 2,
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                margin: "0 auto",
                mt: 5,
                mb: 8,
            }}
        >
            <Container component="main" maxWidth="xs" sx={{ textAlign: "center" }}>
                <CssBaseline />
                <Typography component="h1" variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
                    Đăng Ký
                </Typography>

                <form onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="Tên"
                                name="firstName"
                                autoComplete="fname"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </Grid>
                        {/* <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Họ"
                                name="lastName"
                                autoComplete="lname"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </Grid> */}
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Địa chỉ Email"
                                name="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Mật khẩu"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="phone"
                                label="Số Điện Thoại"
                                name="phone"
                                // value={formData.phone}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="dateOfBirth"
                                label="Ngày Sinh"
                                name="dateOfBirth"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                // value={formData.dateOfBirth}
                                onChange={handleChange}
                            />
                        </Grid>
                        {/* <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="address"
                                label="Địa Chỉ"
                                name="address"
                                // value={formData.address}
                                onChange={handleChange}
                            />
                        </Grid> */}
                        <Grid item xs={12}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel id="gender-label">Giới Tính</InputLabel>
                                <Select
                                    labelId="gender-label"
                                    id="gender"
                                    label="Giới Tính"
                                    name="gender"
                                    // value={formData.gender}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="male">Nam</MenuItem>
                                    <MenuItem value="female">Nữ</MenuItem>
                                    <MenuItem value="other">Khác</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    {formData.error && (
                        <Typography component="p" color="error" sx={{ mt: 2, display: "flex", alignItems: "center" }}>
                            <Icon color="error" sx={{ mr: 1 }} />
                            {formData.error}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, py: 1.5, fontWeight: "bold" }}
                        onClick={clickSubmit}
                    >
                        Đăng Ký
                    </Button>
                </form>

                <Dialog open={formData.open} disableBackdropClick={true}>
                    <DialogTitle>Tài khoản mới</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Tài khoản của bạn đã được tạo thành công.</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Link to="/login">
                            <Button color="primary" autoFocus variant="contained">
                                Đăng Nhập
                            </Button>
                        </Link>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    );
}
