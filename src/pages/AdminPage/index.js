import { Grid } from "@mui/material";
import AdminTable from "./AdminTable";
import Sidebar from "~/components/Layouts/Sidebar";
import { useState, useEffect } from "react";
import { deleteUser, listUser, updateUser } from "~/services/userServices/userService";

function AdminPage({ type }) {
    const [columns, setColumns] = useState([]);
    const userAPI = {
        get: listUser,
        post: updateUser,
        delete: deleteUser,
    };
    ///columns

    const userColumns = [
        { field: "username", label: "Tên người dùng" },
        { field: "email", label: "Email" },
        { field: "role", label: "Vai trò" },
        { field: "phone", label: "Số điện thoại" },
    ];

    const groupColumns = [
        { field: "username", label: "Tên người dùng" },
        { field: "email", label: "Email" },
        { field: "role", label: "Vai trò" },
        { field: "phone", label: "Số điện thoại" },
    ];

    const friendColumns = [
        { field: "username", label: "Tên người dùng" },
        { field: "email", label: "Email" },
        { field: "role", label: "Vai trò" },
        { field: "phone", label: "Số điện thoại" },
    ];

    const messageColumns = [
        { field: "username", label: "Tên người dùng" },
        { field: "email", label: "Email" },
        { field: "role", label: "Vai trò" },
        { field: "phone", label: "Số điện thoại" },
    ];

    const notifiColumns = [
        { field: "username", label: "Tên người dùng" },
        { field: "email", label: "Email" },
        { field: "role", label: "Vai trò" },
        { field: "phone", label: "Số điện thoại" },
    ];

    const postColumns = [
        { field: "username", label: "Tên người dùng" },
        { field: "email", label: "Email" },
        { field: "role", label: "Vai trò" },
        { field: "phone", label: "Số điện thoại" },
    ];

    // Sử dụng useEffect để thay đổi columns khi type thay đổi
    useEffect(() => {
        switch (type) {
            case "user":
                setColumns(userColumns);
                break;
            case "group":
                setColumns(groupColumns);
                break;
            case "friend":
                setColumns(friendColumns);
                break;
            case "message":
                setColumns(messageColumns);
                break;
            case "notifi":
                setColumns(notifiColumns);
                break;
            case "post":
                setColumns(postColumns);
                break;
            default:
                setColumns([]); // Nếu không có type phù hợp, set là mảng rỗng
        }
    }, []); // Chạy lại khi type thay đổi

    return (
        <Grid container>
            <Grid item flex={2} sx={{ overflow: "auto" }} display={{ xs: "none", md: "block" }}>
                <Sidebar />
            </Grid>
            <Grid item flex={8} sx={{ mt: 12, height: "100%", overflow: "auto" }}>
                <AdminTable api={userAPI} columns={columns} />
            </Grid>
        </Grid>
    );
}

export default AdminPage;
