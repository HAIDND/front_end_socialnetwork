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
import { getPost, updatePost } from "~/services/postServices/postService";
import EditPostDialog from "../NewFeed/EditPostDialog";

const AdminTable = () => {
    const [data, setData] = useState([]);
    const [openUpdate, setOpenUpdate] = useState(false);
    const handleCloseUpdate = () => {
        setOpenUpdate(false);
    };
    // Gọi API để lấy dữ liệu
    const fetchData = async () => {
        try {
            const response = await getPost(); // Gọi API lấy dữ liệu
            setData(response); // Cập nhật state với dữ liệu nhận được
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
        }
    };

    useEffect(() => {
        fetchData(); // Gọi hàm lấy dữ liệu khi component được mount
    }, []);

    // Hàm xử lý xóa
    const handleDelete = async (id) => {
        try {
            await updatePost(id); // Gọi API xóa
            fetchData(); // Reload dữ liệu sau khi xóa thành công
        } catch (error) {
            console.error("Lỗi khi xóa:", error);
        }
    };

    // Hàm xử lý chỉnh sửa (giả định mở modal chỉnh sửa)
    let id;
    let itemId;
    let content;
    let image;
    const handleEdit = (ID, ItemID, Content, Image) => {
        if (true) {
            id = ID;
            itemId = ItemID;
            content = Content;
            image = Image;
        }
        setOpenUpdate(true); // Reload dữ liệu sau khi chỉnh sửa thành công
    };

    return (
        <Paper elevation={3} sx={{ padding: 3, marginTop: 2 }}>
            <Typography variant="h5" gutterBottom>
                Quản lý dữ liệu
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: "5%" }}>STT</TableCell>
                            <TableCell sx={{ width: "10%" }}>ID</TableCell>
                            <TableCell sx={{ width: "15%" }}>Tên</TableCell>
                            <TableCell sx={{ width: "40%" }}>Nội dung</TableCell>
                            <TableCell sx={{ width: "15%" }}>Thời gian</TableCell>
                            <TableCell sx={{ width: "7%", textAlign: "center" }}>Chỉnh sửa</TableCell>
                            <TableCell sx={{ width: "7%", textAlign: "center" }}>Xóa</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow key={item._id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{item._id}</TableCell>
                                <TableCell>{item.userId?.username}</TableCell>
                                <TableCell>{item.content}</TableCell>
                                <TableCell>{new Date(item.time).toLocaleString()}</TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleEdit(item._id, item.content, item.image)}
                                    >
                                        <Edit />
                                        <EditPostDialog
                                            open={openUpdate}
                                            onClose={handleCloseUpdate}
                                            postContent={content}
                                            postImage={image}
                                            postId={id}
                                        />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="center">
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
