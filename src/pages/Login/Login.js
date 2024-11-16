import styles from "./Login.module.scss";
import cx from "clsx";
// // import React from 'react';
// // import { useState, useStyles, useEffect } from 'react';
import {
    TextField,
    Grid,
    Icon,
    Card,
    FormHelperText,
    Container,
    Typography,
    CssBaseline,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Avatar,
    IconButton,
    Button,
    List,
    ListItem,
    ListItemText,
    Box,
} from "@mui/material";

// // const create = async (user) => {
// //     // tạo mới một user  http://localhost:4000/api/users
// //     try {
// //         let response = await fetch('http://localhost:4000/api/users/', {
// //             method: 'POST',
// //             headers: {
// //                 Accept: 'application/json',
// //                 'Content-Type': 'application/json',
// //             },
// //             body: JSON.stringify(user),
// //         });
// //         return await response.json();
// //     } catch (err) {
// //         console.log(err);
// //     }
// // };
// // export default function Signup() {
// //     // const classes = useStyles();
// //     // const [values, setValues] = useState({
// //     //     name: '',
// //     //     password: '',
// //     //     email: '',
// //     //     open: false,
// //     //     error: '',
// //     // });

// //     // const handleChange = (name) => (event) => {
// //     //     setValues({ ...values, [name]: event.target.value });
// //     // };

// //     const [formData, setFormData] = useState({
// //         firstName: '',
// //         lastName: '',
// //         name: '',
// //         email: '',
// //         password: '',
// //         open: false,
// //         error: '',
// //     });
// //     const handleChange = (e) => {
// //         setFormData({
// //             ...formData,
// //             [e.target.name]: e.target.value,
// //         });
// //     };
// //     const handleSubmit = (e) => {
// //         e.preventDefault();
// //         console.log(formData);
// //     };
// //     const clickSubmit = () => {
// //         const user = {
// //             name: formData.firstName + formData.lastName || undefined,
// //             email: formData.email || undefined,
// //             password: formData.password || undefined,
// //         };
// //         create(user).then((data) => {
// //             if (data.error) {
// //                 setFormData({ ...formData, error: data.error });
// //             } else {
// //                 setFormData({ ...formData, error: '', open: true });
// //             }
// //         });
// //     };
// //     return (
// //         <Container component="main" maxWidth="xs" className={clsx(styles.formsignup)}>
// //             <CssBaseline />
// //             <div>
// //                 <Typography component="h1" variant="h5">
// //                     Đăng Ký
// //                 </Typography>
// //                 <form onSubmit={handleSubmit}>
// //                     <Grid container spacing={2}>
// //                         <Grid item xs={12} sm={6}>
// //                             <TextField
// //                                 variant="outlined"
// //                                 required
// //                                 fullWidth
// //                                 id="firstName"
// //                                 label="Tên"
// //                                 name="firstName"
// //                                 autoComplete="fname"
// //                                 value={formData.firstName}
// //                                 onChange={handleChange}
// //                             />
// //                         </Grid>
// //                         <Grid item xs={12} sm={6}>
// //                             <TextField
// //                                 variant="outlined"
// //                                 required
// //                                 fullWidth
// //                                 id="lastName"
// //                                 label="Họ"
// //                                 name="lastName"
// //                                 autoComplete="lname"
// //                                 value={formData.lastName}
// //                                 onChange={handleChange}
// //                             />
// //                         </Grid>
// //                         <Grid item xs={12}>
// //                             <TextField
// //                                 variant="outlined"
// //                                 required
// //                                 fullWidth
// //                                 id="email"
// //                                 label="Địa chỉ Email"
// //                                 name="email"
// //                                 autoComplete="email"
// //                                 value={formData.email}
// //                                 onChange={handleChange}
// //                             />
// //                         </Grid>
// //                         <Grid item xs={12}>
// //                             <TextField
// //                                 variant="outlined"
// //                                 required
// //                                 fullWidth
// //                                 name="password"
// //                                 label="Mật khẩu"
// //                                 type="password"
// //                                 id="password"
// //                                 autoComplete="current-password"
// //                                 value={formData.password}
// //                                 onChange={handleChange}
// //                             />
// //                         </Grid>
// //                     </Grid>
// //                     <Button
// //                         type="submit"
// //                         fullWidth
// //                         variant="contained"
// //                         color="primary"
// //                         style={{ marginTop: '16px' }}
// //                         onClick={clickSubmit}
// //                     >
// //                         Đăng Ký
// //                     </Button>
// //                 </form>
// //             </div>
// //         </Container>
// //     );
// // }

// import React, { useState } from 'react';
// import { TextField, Button, Box, Typography, FormHelperText } from '@mui/material';

// const LoginForm = ({ onLogin }) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [errors, setErrors] = useState({ email: '', password: '' });

//     // Hàm kiểm tra tính hợp lệ của dữ liệu đầu vào
//     const validate = () => {
//         let tempErrors = { email: '', password: '' };
//         tempErrors.email = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? '' : 'Email không hợp lệ.';
//         tempErrors.password = password.length >= 6 ? '' : 'Mật khẩu phải có ít nhất 6 ký tự.';

//         setErrors(tempErrors);
//         return Object.values(tempErrors).every((x) => x === '');
//     };

//     const handleLogin = async (e) => {
//         e.preventDefault();

//         if (validate()) {
//             try {
//                 // Giả sử bạn có một API endpoint để đăng nhập, ví dụ POST /api/login
//                 const response = await fetch('/api/login', {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({ email, password }),
//                 });

//                 const data = await response.json();
//                 if (response.ok && data.token) {
//                     onLogin(data.token); // Gọi callback khi đăng nhập thành công
//                 } else {
//                     alert(data.message || 'Thông tin đăng nhập không chính xác');
//                 }
//             } catch (error) {
//                 console.error('Lỗi đăng nhập:', error);
//                 alert('Có lỗi xảy ra. Vui lòng thử lại.');
//             }
//         }
//     };

//     return (
//         <Box
//             className={cx(styles.LoginForm)}
//             component="form"
//             onSubmit={handleLogin}
//             sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 300, margin: '0 auto' }}
//         >
//             <Typography variant="h5" textAlign="center">
//                 Đăng nhập
//             </Typography>

//             <TextField
//                 label="Email"
//                 name="email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 error={Boolean(errors.email)}
//                 helperText={errors.email}
//                 required
//             />

//             <TextField
//                 label="Mật khẩu"
//                 name="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 error={Boolean(errors.password)}
//                 helperText={errors.password}
//                 required
//             />

//             <Button variant="contained" color="primary" type="submit">
//                 Đăng nhập
//             </Button>

//             {errors.email || errors.password ? (
//                 <FormHelperText error>Vui lòng kiểm tra lại thông tin đăng nhập.</FormHelperText>
//             ) : null}
//         </Box>
//     );
// };

// export default LoginForm;
// import { login } from '~/services/authService';
// import { useState } from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// export default function Login(props) {
//     const [values, setValues] = useState({
//         email: '',
//         password: '',
//         error: '',
//         redirectToReferer: false,
//     });
//     const clickSubmit = () => {
//         const user = { email: values.email || undefined, password: values.password || undefined };

//         login(user).then((data) => {
//             if (data.error) {
//                 setValues({ ...values, error: '', redirectToReferer: true });
//             }
//         });
//     };
//     const handleChange = (name) => (event) => {
//         setValues({ ...values, [name]: event.target.value });
//     };
//     const location = useLocation();
//     const { from } = location.state || { from: { pathname: '/' } };
//     const { redirectToReferer } = values;
//     if (redirectToReferer) {
//         return <Navigate to={from} />;
//     }
//     return (
//         <Box
//             component="form"
//             sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: 2,
//                 width: 300,
//                 padding: 4,
//                 backgroundColor: '#f9f9f9',
//                 borderRadius: 2,
//                 boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//                 margin: '0 auto',
//                 mt: 10, // Khoảng cách từ trên xuống
//             }}
//         >
//             <Typography variant="h5" textAlign="center" fontWeight="bold" color="primary" mb={2}>
//                 Đăng nhập
//             </Typography>

//             <TextField
//                 label="Email"
//                 name="email"
//                 type="email"
//                 value={values.email}
//                 onChange={handleChange('email')}
//                 error={Boolean(values.email)}
//                 helperText={values.email}
//                 required
//                 fullWidth
//             />

//             <TextField
//                 label="Mật khẩu"
//                 name="password"
//                 type="password"
//                 value={values.password}
//                 onChange={handleChange('password')}
//                 error={Boolean(values.password)}
//                 helperText={values.password}
//                 required
//                 fullWidth
//             />

//             <Button variant="contained" color="primary" onClick={clickSubmit} fullWidth sx={{ mt: 1.5 }}>
//                 Đăng nhập
//             </Button>

//             {(values.email || values.password) && (
//                 <FormHelperText error sx={{ textAlign: 'center', mt: 1 }}>
//                     Vui lòng kiểm tra lại thông tin đăng nhập.
//                 </FormHelperText>
//             )}
//         </Box>
//     );
// }

import { login, loginUser } from "~/services/authService/authService";
import { useState, useEffect, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import auth from "~/services/authService/authHelper";
import { CurentUser } from "~/MainRoutes";
import { getInfo, readUser, saveInfo } from "~/services/userServices/userService";
export default function Login(props) {
    const { curentUser, setCurrentUser, curentUserProfile, setCurrentUserProfile, curentUserID, curentUserToken } =
        useContext(CurentUser);

    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        redirectToReferrer: false,
    });

    const clickSubmit = () => {
        const user = { email: values.email || undefined, password: values.password || undefined };

        login(user).then((data) => {
            console.log(data);

            setCurrentUserProfile(() => {
                readUser(data.userId);
            });
            if (data.message) {
                // Chỉ đặt error khi có lỗi từ server, không hiển thị mật khẩu
                setValues({ ...values, error: data.message });
            } else {
                // Chuyển hướng khi đăng nhập thành công
                auth.authenticate(data, () => {
                    setValues({ ...values, error: "", redirectToReferrer: true });
                });
            }
        });
    };

    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value, error: "" }); // Reset lỗi khi người dùng thay đổi thông tin
    };

    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = values;

    if (redirectToReferrer) {
        return <Navigate to={from} />;
    }

    return (
        <>
            <Box
                className={styles.LoginForm}
                component="form"
                sx={{
                    display: "flex",
                    backgroundColor: "#ffffff",
                    flexDirection: "column",
                    gap: 2,
                    width: 300,
                    padding: 4,

                    borderRadius: 2,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    margin: "0 auto",
                    mt: 10,
                }}
            >
                <Typography variant="h5" textAlign="center" fontWeight="bold" color="primary" mb={2}>
                    Đăng nhập
                </Typography>
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange("email")}
                    // error={Boolean(values.error && values.email)}
                    // helperText={values.error && values.email ? values.error : ''}
                    required
                    fullWidth
                />
                <TextField
                    label="Mật khẩu"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange("password")}
                    // error={Boolean(values.error && !values.email)}
                    // helperText={values.error && !values.email ? values.error : ''}
                    required
                    fullWidth
                />{" "}
                <br />{" "}
                {values.error && (
                    <Typography component="p" color="error">
                        {/* <Icon color="error" className={values.error}>
                        error
                    </Icon> */}
                        {values.error}
                    </Typography>
                )}
                <Button variant="contained" color="primary" onClick={clickSubmit} fullWidth sx={{ mt: 1.5 }}>
                    Đăng nhập
                </Button>
                {values.error && (
                    <FormHelperText error sx={{ textAlign: "center", mt: 1 }}>
                        {values.error}
                    </FormHelperText>
                )}
            </Box>
        </>
    );
}
