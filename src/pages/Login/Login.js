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
    const { from } = location.state || { from: { pathname: "/home" } };
    const { redirectToReferrer } = values;

    if (redirectToReferrer) {
        return <Navigate to={from} />;
    }

    return (
        <>
            <Box
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
                    mt: 5,
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
