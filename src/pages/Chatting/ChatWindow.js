
import React, { useState, useEffect, useContext } from "react";
import { Box, Avatar, Typography, IconButton, TextField, Button, Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { getChatWithUser, sendMessage } from "~/services/chatServices/chatService";
import { CurentUser } from "~/MainRoutes";

const ChatWindow = ({ onClose, friend }) => {
    //id user
    const { curentUserID } = useContext(CurentUser);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        setNewMessage();
        return () => setMessages([]); // Cleanup on unmount
    }, []);

    const [chats, setChats] = useState([]); // Khởi tạo là mảng rỗng

    const handleSendMessage = async () => {
        if (newMessage.trim() === "") return;

        const message = {
            receiverId: friend?._id,
            content: newMessage,
        };
        try {
            const response = await sendMessage(friend?._id, newMessage);

            setMessages(...message, response.content);
        } catch {
            alert("error");
        }
        setMessages([...messages, message]);
        setNewMessage("");
    };
    ///call lít chat
    // const [chats, setChats] = useState([]); // Khởi tạo mảng rỗng
    const userId = "672ebaf8c63b15d5410fe80d"; // ID người dùng mẫu

    useEffect(() => {
        const fetchChatList = async () => {
            try {
                const data = await getChatWithUser(friend?._id);
                console.log("window chat " + data);
                setChats(data); // Cập nhật mảng chats với dữ liệu từ API
            } catch (error) {
                console.error("Failed to fetch chats:", error);
            }
        };

        fetchChatList();
    }, [userId]);
    return (
        <Box
            component={Paper}
            elevation={4}
            sx={{
                position: "fixed",
                right: 50,
                bottom: 0,
                width: 400,
                maxHeight: 500,
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 1.5,
                    borderBottom: "1px solid #ddd",
                    backgroundColor: "#f1f1f1", // Màu nền giống Facebook
                }}
            >
                <Box display="flex" alignItems="center">
                    <Avatar
                        src={friend?.avatar}
                        alt="User Avatar"
                        sx={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            marginRight: 1,
                        }}
                    />
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
                            {friend?.username}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ display: "flex", alignItems: "center", fontSize: "0.875rem" }}>
                            <Box
                                sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: "50%",
                                    backgroundColor: "green", // Màu chấm trạng thái online
                                    marginRight: 1,
                                }}
                            />
                            Active now
                        </Typography>
                    </Box>
                </Box>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>

            {/* Messages Section */}
            <Box
                sx={{
                    flex: 1,
                    overflowY: "auto",
                    padding: 2,
                    backgroundColor: "#fafafa", // Nền sáng giống Facebook
                }}
            >
                {chats.map((message, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: "flex",
                            justifyContent: message.senderId === curentUserID ? "flex-end" : "flex-start",
                            mb: 2,
                        }}
                    >
                        <Box
                            sx={{
                                maxWidth: "70%",
                                padding: 1.5,
                                borderRadius: 2,
                                backgroundColor: message.senderId === curentUserID ? "#0866ff" : "#e4e6eb", // Màu xanh nhạt hơn cho người gửi, màu sáng cho người nhận
                                color: message.senderId === curentUserID ? "white" : "black",
                                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)", // Đổ bóng nhẹ hơn
                                marginBottom: 1.5, // Thêm khoảng cách dưới mỗi tin nhắn để chúng không quá sát nhau
                                wordBreak: "break-word", // Đảm bảo nội dung không bị tràn ra ngoài
                                alignSelf: message.senderId === curentUserID ? "flex-end" : "flex-start", // Tin nhắn của người gửi và người nhận được căn trái phải
                            }}
                        >
                            <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
                                {message?.content}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    fontSize: 10,
                                    display: "block",
                                    textAlign: "right",
                                    marginTop: 0.5,
                                    color: "#8a8d91", // Màu thời gian giống Facebook
                                }}
                            >
                                {message?.createdAt}
                            </Typography>
                        </Box>

                    </Box>
                ))}
            </Box>

            {/* Input Section */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: 1.5,
                    borderTop: "1px solid #ddd",
                    backgroundColor: "#fff",
                }}
            >
                <TextField
                    fullWidth
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    size="small"
                    variant="outlined"
                    sx={{
                        marginRight: 1,
                        borderRadius: "20px", // Tạo hình dáng tròn cho input
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSendMessage}
                    sx={{
                        borderRadius: "50%",
                        minWidth: "auto",
                        padding: "8px",
                        backgroundColor: "#1877f2", // Màu nút gửi giống Facebook
                        "&:hover": {
                            backgroundColor: "#166fe5", // Màu nút khi hover
                        },
                    }}
                >
                    <SendIcon />
                </Button>
            </Box>
        </Box>
    );
};

export default ChatWindow;