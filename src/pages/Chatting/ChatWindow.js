// // import React, { useState } from 'react';
// // import { Drawer, Box, Button, Backdrop, List, ListItem, ListItemText } from '@mui/material';

// // const users = [
// //     { id: 1, name: 'User 1' },
// //     { id: 2, name: 'User 2' },
// //     { id: 3, name: 'User 3' },
// // ];

// // const App = () => {
// //     const [isDrawerOpen, setDrawerOpen] = useState(false);
// //     const [isChatOpen, setChatOpen] = useState(false);
// //     const [activeUser, setActiveUser] = useState(null);

// //     const toggleDrawer = () => {
// //         setDrawerOpen(!isDrawerOpen);
// //         if (!isDrawerOpen) setChatOpen(false); // Đóng chat khi đóng popup chính
// //     };

// //     const openChatWithUser = (user) => {
// //         setActiveUser(user);
// //         setChatOpen(true);
// //     };

// //     const closeChat = () => {
// //         setChatOpen(false);
// //         setActiveUser(null);
// //     };
// //     const [messageText, setMessageText] = useState([]);
// //     function message() {
// //         fetch('https://jsonplaceholder.typicode.com/comments/1')
// //             .then((response) => response.json())
// //             .then((data) => setMessageText(data))
// //             .catch((error) => console.error('Error:', error));
// //     }
// //     return (
// //         <div>
// //             {/* Nút để mở popup chính */}
// //             <Button variant="contained" onClick={toggleDrawer}>
// //                 Open User List
// //             </Button>

// //             {/* Backdrop để đóng popup khi click bên ngoài */}
// //             <Backdrop open={isDrawerOpen} onClick={toggleDrawer} sx={{ zIndex: (theme) => theme.zIndex.drawer - 1 }} />

// //             {/* Drawer chính chứa danh sách người dùng */}
// //             <Drawer
// //                 anchor="right"
// //                 open={isDrawerOpen}
// //                 onClose={toggleDrawer}
// //                 sx={{
// //                     width: 300,
// //                     flexShrink: 0,
// //                     '& .MuiDrawer-paper': {
// //                         width: 300,
// //                         boxSizing: 'border-box',
// //                     },
// //                 }}
// //             >
// //                 <Box role="presentation" sx={{ width: 300, padding: 2 }} onClick={(e) => e.stopPropagation()}>
// //                     <h3>Danh sách người dùng</h3>
// //                     <List>
// //                         {users.map((user) => (
// //                             <ListItem button key={user.id} onClick={() => openChatWithUser(user)}>
// //                                 <ListItemText primary={user.name} />
// //                             </ListItem>
// //                         ))}
// //                     </List>
// //                 </Box>
// //             </Drawer>

// //             {/* Drawer phụ chứa chat riêng cho từng người dùng */}
// //             <Drawer
// //                 anchor="right"
// //                 open={isChatOpen}
// //                 onClose={closeChat}
// //                 sx={{
// //                     width: 300,
// //                     flexShrink: 0,
// //                     '& .MuiDrawer-paper': {
// //                         width: 300,
// //                         boxSizing: 'border-box',
// //                         right: 350, // Cách lề phải 350px
// //                     },
// //                 }}
// //             >
// //                 <Box role="presentation" sx={{ width: 300, padding: 2 }}>
// //                     <h3>Chat với {activeUser?.name}</h3>

// //                     <p>
// //                         Đây là cửa sổ chat với {activeUser?.name}. {messageText.body}
// //                     </p>
// //                 </Box>
// //             </Drawer>
// //         </div>
// //     );
// // };

// // export default App;

// import React, { useState, useEffect } from "react";
// // import "./MenuList.css";

// const ChatWindow = ({ onClose }) => {
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState("");

//     // Lấy dữ liệu từ API khi component được tải
//     useEffect(() => {
//         fetchMessages();

//         // Cleanup khi unmount component
//         return () => {
//             setMessages([]);
//         };
//     }, []);

//     const fetchMessages = async () => {
//         try {
//             const response = await fetch("https://api.example.com/messages");
//             const data = await response.json();
//             setMessages(data);
//         } catch (error) {
//             console.error("Error fetching messages:", error);
//         }
//     };

//     const handleSendMessage = () => {
//         if (newMessage.trim() === "") return;

//         const message = {
//             sender: "You",
//             content: newMessage,
//             timestamp: new Date().toLocaleTimeString(),
//         };
//         setMessages([...messages, message]);
//         setNewMessage("");
//     };

//     return (
//         <div className="chat-window">
//             <header className="chat-header">
//                 <div className="user-info">
//                     <img src="https://via.placeholder.com/40" alt="User Avatar" className="avatar" />
//                     <div>
//                         <h3 className="user-name">Hendrix Stamp</h3>
//                         <p className="status">
//                             <span className="status-dot" /> Available
//                         </p>
//                     </div>
//                 </div>
//                 <button className="close-btn" onClick={onClose}>
//                     ×
//                 </button>
//             </header>

//             <div className="chat-content">
//                 {messages.map((message, index) => (
//                     <div key={index} className={`message ${message.sender === "You" ? "sent" : "received"}`}>
//                         <p className="message-content">{message.content}</p>
//                         <span className="message-time">{message.timestamp}</span>
//                     </div>
//                 ))}
//             </div>

//             <div className="chat-input">
//                 <input
//                     type="text"
//                     placeholder="Start typing..."
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//                 />
//                 <button className="send-btn" onClick={handleSendMessage}>
//                     ➤
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default ChatWindow;

// import React, { useState } from 'react';
// import { TextField, Button, Checkbox } from '@mui/material';

// const RegisterForm = () => {
//     const [values, setValues] = useState({
//         name: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//         terms: false,
//     });
//     const [errors, setErrors] = useState({}); // Lưu trữ lỗi nhập liệu

//     const handleSubmit = (event) => {
//         event.preventDefault();

//         let hasError = false; // Biến kiểm tra có lỗi hay không
//         const newErrors = {}; // Lưu trữ lỗi mới

//         // Kiểm tra tên
//         if (!values.name) {
//             hasError = true;
//             newErrors.name = 'Vui lòng nhập tên của bạn';
//         }

//         // Kiểm tra email (kiểm tra đơn giản, không dùng biểu thức chính quy)
//         if (!values.email) {
//             hasError = true;
//             newErrors.email = 'Vui lòng nhập email của bạn';
//         } else if (!/\S+@\S+\.\S+/.test(values.email)) {
//             hasError = true;
//             newErrors.email = 'Email không hợp lệ';
//         }

//         // Kiểm tra mật khẩu
//         if (!values.password) {
//             hasError = true;
//             newErrors.password = 'Vui lòng nhập mật khẩu';
//         } else if (values.password.length < 6) {
//             hasError = true;
//             newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
//         }

//         // Kiểm tra xác nhận mật khẩu
//         if (!values.confirmPassword) {
//             hasError = true;
//             newErrors.confirmPassword = 'Vui lòng nhập lại mật khẩu';
//         } else if (values.confirmPassword !== values.password) {
//             hasError = true;
//             newErrors.confirmPassword = 'Mật khẩu không khớp';
//         }

//         // Kiểm tra điều khoản
//         if (!values.terms) {
//             hasError = true;
//             newErrors.terms = 'Bạn phải đồng ý với điều khoản';
//         }

//         // Cập nhật lỗi và xử lý nếu không có lỗi
//         setErrors(newErrors);
//         if (!hasError) {
//             // Gửi dữ liệu đến backend (chưa có xử lý gửi dữ liệu)
//             console.log('Dữ liệu hợp lệ:', values);
//         }
//     };

//     const handleChange = (event) => {
//         setValues({
//             ...values,
//             [event.target.name]: event.target.value,
//         });
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <TextField
//                 label="Tên"
//                 variant="outlined"
//                 margin="normal"
//                 fullWidth
//                 name="name"
//                 value={values.name}
//                 onChange={handleChange}
//                 error={!!errors.name}
//                 helperText={errors.name}
//             />
//             {/* Các TextField khác cho email, password, confirmPassword */}
//             <Checkbox name="terms" checked={values.terms} onChange={handleChange} color="primary" />
//             <label>Tôi đồng ý với các điều khoản</label>
//             <Button type="submit" variant="contained" color="primary" fullWidth>
//                 Đăng ký
//             </Button>
//             {JSON.stringify(errors)} // Hiển thị lỗi dạng JSON (có thể tùy chỉnh hiển thị)
//         </form>
//     );
// };

// export default RegisterForm;

import React, { useState, useEffect, useContext } from "react";
import { Box, Avatar, Typography, IconButton, TextField, Button, Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { getChatWithUser, sendMessage } from "~/services/chatServices/chatService";
import { CurentUser } from "~/MainRoutes";

const ChatWindow = ({ onClose, friend }) => {
    //id user
    const { curentUserID } = useContext(CurentUser);
    const [messages, setMessages] = useState([]); // old mess
    const [newMessage, setNewMessage] = useState(""); //new mess
    ///call lít chat
    // const [chats, setChats] = useState([]); // Khởi tạo mảng rỗng

    useEffect(() => {
        const fetchChatList = async () => {
            try {
                const data = await getChatWithUser(friend?._id);
                setMessages(data); // Cập nhật mảng chats với dữ liệu từ API
            } catch (error) {
                console.error("Failed to fetch chats:", error);
            }
            return () => setMessages([]);
        };

        fetchChatList();
    }, [messages]);

    const handleSendMessage = async () => {
        if (newMessage.trim() === "") return;
        const response = await sendMessage(friend?._id, newMessage);
        setNewMessage("");
    };

    return (
        <Box
            component={Paper}
            elevation={5}
            sx={{
                bgcolor: "background.paper",
                position: "fixed",
                right: 350,
                bottom: 50,
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
                    padding: 2,
                    borderBottom: "1px solid #ddd",
                }}
            >
                <Box display="flex" alignItems="center">
                    <Avatar src={friend?.avatar} alt="User Avatar" sx={{ marginRight: 2 }} />
                    <Box>
                        <Typography variant="h6">{friend?.username}</Typography>
                        <Typography variant="body2" color="textSecondary">
                            <span className="status-dot" /> {messages?.content}
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
                }}
            >
                {messages.map((message, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: "flex",
                            justifyContent: message.senderId === curentUserID ? "flex-end" : "flex-start",
                            mb: 1.5,
                        }}
                    >
                        <Box
                            sx={{
                                maxWidth: "75%",
                                padding: 1,
                                borderRadius: 1,
                                backgroundColor: message.senderId === curentUserID ? "#007bff" : "#e0e0e0",
                                color: message.sender === curentUserID ? "white" : "black",
                            }}
                        >
                            <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
                                {message?.content}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{ fontSize: 8, display: "block", textAlign: "right", marginTop: 0.5 }}
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
                    padding: 1,
                    borderTop: "1px solid #ddd",
                }}
            >
                <TextField
                    fullWidth
                    placeholder="Start typing..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    size="small"
                    variant="outlined"
                    content="secondary"
                    sx={{ marginRight: 1 }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSendMessage}
                    sx={{ minWidth: "auto", padding: "8px" }}
                >
                    <SendIcon />
                </Button>
            </Box>
        </Box>
    );
};

export default ChatWindow;
