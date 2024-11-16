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
import styles from "./Register.module.scss";
import { API_BASE_URL } from "~/config/apiConfig";

const create = async (user) => {
    // tạo mới một user  http://localhost:4000/api/users
    try {
        let response = await fetch(`http://localhost:4000/api/users/register`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};
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
        console.log(formData);
    };
    const navigate = useNavigate();
    const clickSubmit = () => {
        const user = {
            username: formData.firstName + formData.lastName || undefined,
            email: formData.email || undefined,
            password: formData.password || undefined,
        };
        create(user).then((data) => {
            if (data.message) {
                setFormData({ ...formData, error: data.message });
            } else {
                setFormData({ ...formData, error: "", open: true });
            }
        });
        alert("create success");
        setTimeout(() => {
            navigate("/login");
        }, 1000);
    };
    return (
        // <Box
        //     component="form"
        //     sx={{
        //         display: "flex",
        //         flexDirection: "column",
        //         gap: 2,
        //         width: 500,
        //         padding: 4,
        //         backgroundColor: "#f9f9f9",
        //         borderRadius: 2,
        //         boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        //         margin: "0 auto",
        //         mt: 10,
        //     }}
        // >
        //     <Container component="main" maxWidth="xs" className={clsx(styles.formsignup)}>
        //         <CssBaseline />
        //         <div>
        //             <Typography component="h1" variant="h5">
        //                 Đăng Ký
        //             </Typography>
        //             <form onSubmit={handleSubmit}>
        //                 <Grid container spacing={2}>
        //                     <Grid item xs={12} sm={6}>
        //                         <TextField
        //                             variant="outlined"
        //                             required
        //                             fullWidth
        //                             id="firstName"
        //                             label="Tên"
        //                             name="firstName"
        //                             autoComplete="fname"
        //                             value={formData.firstName}
        //                             onChange={handleChange}
        //                         />
        //                     </Grid>
        //                     <Grid item xs={12} sm={6}>
        //                         <TextField
        //                             variant="outlined"
        //                             required
        //                             fullWidth
        //                             id="lastName"
        //                             label="Họ"
        //                             name="lastName"
        //                             autoComplete="lname"
        //                             value={formData.lastName}
        //                             onChange={handleChange}
        //                         />
        //                     </Grid>
        //                     <Grid item xs={12}>
        //                         <TextField
        //                             variant="outlined"
        //                             required
        //                             fullWidth
        //                             id="email"
        //                             label="Địa chỉ Email"
        //                             name="email"
        //                             autoComplete="email"
        //                             value={formData.email}
        //                             onChange={handleChange}
        //                         />
        //                     </Grid>
        //                     <Grid item xs={12}>
        //                         <TextField
        //                             variant="outlined"
        //                             required
        //                             fullWidth
        //                             name="password"
        //                             label="Mật khẩu"
        //                             type="password"
        //                             id="password"
        //                             autoComplete="current-password"
        //                             value={formData.password}
        //                             onChange={handleChange}
        //                         />
        //                     </Grid>
        //                     <br />{" "}
        //                     {formData.error && (
        //                         <Typography component="p" color="error">
        //                             <Icon color="error"></Icon>
        //                             {formData.error}
        //                         </Typography>
        //                     )}
        //                 </Grid>
        //                 <Button
        //                     type="submit"
        //                     fullWidth
        //                     variant="contained"
        //                     color="primary"
        //                     style={{ marginTop: "16px" }}
        //                     onClick={clickSubmit}
        //                 >
        //                     Đăng Ký
        //                 </Button>
        //             </form>
        //         </div>
        //         <Dialog open={formData.open} disableBackdropClick={true}>
        //             <DialogTitle>New Account</DialogTitle>
        //             <DialogContent>
        //                 <DialogContentText>New account successfully created.</DialogContentText>
        //             </DialogContent>
        //             <DialogActions>
        //                 <Link to="/login">
        //                     <Button color="primary" autoFocus="autoFocus" variant="contained">
        //                         Login
        //                     </Button>
        //                 </Link>
        //             </DialogActions>
        //         </Dialog>
        //     </Container>
        // </Box>

        // <Box
        //     component="form"
        //     sx={{
        //         display: "flex",
        //         flexDirection: "column",
        //         gap: 3,
        //         width: { xs: "90%", sm: 500 },
        //         padding: 4,
        //         backgroundColor: "#ffffff",
        //         borderRadius: 2,
        //         boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
        //         margin: "0 auto",
        //         mt: 8,
        //     }}
        // >
        //     <Container component="main" maxWidth="xs" sx={{ textAlign: "center" }}>
        //         <CssBaseline />
        //         <Typography component="h1" variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
        //             Đăng Ký
        //         </Typography>

        //         <form onSubmit={handleSubmit} noValidate>
        //             <Grid container spacing={2}>
        //                 <Grid item xs={12} sm={6}>
        //                     <TextField
        //                         variant="outlined"
        //                         required
        //                         fullWidth
        //                         id="firstName"
        //                         label="Tên"
        //                         name="firstName"
        //                         autoComplete="fname"
        //                         value={formData.firstName}
        //                         onChange={handleChange}
        //                     />
        //                 </Grid>
        //                 <Grid item xs={12} sm={6}>
        //                     <TextField
        //                         variant="outlined"
        //                         required
        //                         fullWidth
        //                         id="lastName"
        //                         label="Họ"
        //                         name="lastName"
        //                         autoComplete="lname"
        //                         value={formData.lastName}
        //                         onChange={handleChange}
        //                     />
        //                 </Grid>
        //                 <Grid item xs={12}>
        //                     <TextField
        //                         variant="outlined"
        //                         required
        //                         fullWidth
        //                         id="email"
        //                         label="Địa chỉ Email"
        //                         name="email"
        //                         autoComplete="email"
        //                         value={formData.email}
        //                         onChange={handleChange}
        //                     />
        //                 </Grid>
        //                 <Grid item xs={12}>
        //                     <TextField
        //                         variant="outlined"
        //                         required
        //                         fullWidth
        //                         name="password"
        //                         label="Mật khẩu"
        //                         type="password"
        //                         id="password"
        //                         autoComplete="current-password"
        //                         value={formData.password}
        //                         onChange={handleChange}
        //                     />
        //                 </Grid>
        //             </Grid>

        //             {formData.error && (
        //                 <Typography component="p" color="error" sx={{ mt: 2, display: "flex", alignItems: "center" }}>
        //                     <Icon color="error" sx={{ mr: 1 }} />
        //                     {formData.error}
        //                 </Typography>
        //             )}

        //             <Button
        //                 type="submit"
        //                 fullWidth
        //                 variant="contained"
        //                 color="primary"
        //                 sx={{ mt: 3, py: 1.5, fontWeight: "bold" }}
        //                 onClick={clickSubmit}
        //             >
        //                 Đăng Ký
        //             </Button>
        //         </form>

        //         <Dialog open={formData.open} disableBackdropClick={true}>
        //             <DialogTitle>Tài khoản mới</DialogTitle>
        //             <DialogContent>
        //                 <DialogContentText>Tài khoản của bạn đã được tạo thành công.</DialogContentText>
        //             </DialogContent>
        //             <DialogActions>
        //                 <Link to="/login" style={{ textDecoration: "none" }}>
        //                     <Button color="primary" autoFocus variant="contained">
        //                         Đăng Nhập
        //                     </Button>
        //                 </Link>
        //             </DialogActions>
        //         </Dialog>
        //     </Container>
        // </Box>
        <Box
            className={styles.RegisterFrom}
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
                mt: 8,
            }}
        >
            <Container component="main" maxWidth="xs" sx={{ textAlign: "center" }}>
                <CssBaseline />
                <Typography component="h1" variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
                    Đăng Ký
                </Typography>

                <form onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
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
                        <Grid item xs={12} sm={6}>
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
                        </Grid>
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
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="address"
                                label="Địa Chỉ"
                                name="address"
                                // value={formData.address}
                                onChange={handleChange}
                            />
                        </Grid>
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
                        <Link to="/login" style={{ textDecoration: "none" }}>
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
