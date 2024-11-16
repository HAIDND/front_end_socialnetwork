import React, { useEffect, useState } from "react";
import { Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, Badge, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ChatWindow from "./ChatWindow";
import { getChatList } from "~/services/chatServices/chatService";

const ChatListContainer = styled(Box)(({ theme }) => ({
    position: "fixed",
    right: 0,
    top: 0,
    width: 300,
    height: "100vh",
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
    overflowY: "auto",
    zIndex: 1300,
    padding: theme.spacing(2),
}));

const ChatList = () => {
    const [chats, setChats] = useState([]); // Khởi tạo là mảng rỗng

    useEffect(() => {
        const fetchChatList = async () => {
            try {
                const data = await getChatList();
                if (Array.isArray(data)) {
                    setChats(data);
                } else {
                    console.error("Dữ liệu không phải là mảng:", data);
                    setChats([{ name: "duy" }]); // Đặt lại là mảng rỗng nếu dữ liệu không hợp lệ
                }
            } catch (error) {
                console.error("Lỗi khi lấy danh sách chat:", error);
            }
        };

        fetchChatList();
    }, []);

    //click to open chat windows
    const [openChat, setOpenChat] = useState(null);

    const handleOpenChat = () => {
        setOpenChat(!openChat);
    };
    return (
        <ChatListContainer
            sx={{
                mt: 12,
                mr: 2,
                boxShadow: true,
            }}
        >
            <Typography variant="h6" gutterBottom>
                Chat list
            </Typography>
            <List>
                {chats.map((chat, index) => (
                    <ListItem key={index} alignItems="flex-start" onClick={handleOpenChat} onclose={handleOpenChat}>
                        <ListItemAvatar>
                            <Avatar alt={chat.name} src={chat.avatar} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={chat.name}
                            secondary={
                                <Typography component="span" variant="body2" color="text.secondary" noWrap>
                                    {chat.message}
                                </Typography>
                            }
                        />
                        {chat.hasNewMessage && (
                            <Badge
                                color="error"
                                variant="dot"
                                sx={{
                                    marginLeft: "auto",
                                }}
                            />
                        )}
                    </ListItem>
                ))}
            </List>
            {openChat && <ChatWindow />}
        </ChatListContainer>
    );
};

export default ChatList;
