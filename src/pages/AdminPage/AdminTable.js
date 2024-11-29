import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Typography,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { listUser } from "~/services/userServices/userService"; // Giả định gọi API
import EditUserDialog from "~/pages/ProfileUsers/EditProfile"; // Dialog chỉnh sửa

const AdminTable = ({ api, columns }) => {
    const [data, setData] = useState([]);

    // Gọi API để lấy dữ liệu
    const fetchData = async () => {
        try {
            const response = await api.get(); // Gọi API lấy dữ liệu người dùng
            setData(response);
            console.log(data); // Cập nhật state với dữ liệu nhận được
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Hàm xử lý xóa
    const handleDelete = async (id) => {
        // Gọi API xóa
        console.log("Xóa người dùng:", id);
    };

    // Hàm xử lý chỉnh sửa
    const handleEdit = (user) => {
        // Mở dialog chỉnh sửa
        console.log("Chỉnh sửa:", user);
    };

    return (
        <Paper elevation={3} sx={{ padding: 3, marginTop: 2 }}>
            <Typography variant="h5" gutterBottom>
                Quản lý người dùng
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            {columns.map((column) => (
                                <TableCell key={column?.field}>{column?.label}</TableCell>
                            ))}
                            <TableCell>Chỉnh sửa</TableCell>
                            <TableCell>Xóa</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow key={item._id}>
                                <TableCell>{index + 1}</TableCell>
                                {columns.map((column) => (
                                    <TableCell key={column.field}>{item[column.field]}</TableCell>
                                ))}
                                <TableCell>
                                    <IconButton color="primary" onClick={() => handleEdit(item)}>
                                        <Edit />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton color="error" onClick={() => handleDelete(item._id)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default AdminTable;
