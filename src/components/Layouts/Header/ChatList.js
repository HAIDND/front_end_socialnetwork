import React, { useState } from "react";
import { Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, Badge, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ChatWindow from "./ChatWindow";

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
    const chats = [
        {
            name: "Nguyễn Văn A",
            avatar: "https://i.pravatar.cc/300?img=1",
            message: "Xin chào! Bạn khỏe không?",
            hasNewMessage: true,
        },
        {
            name: "Lê Thị B",
            avatar: "https://i.pravatar.cc/300?img=2",
            message: "Hẹn gặp bạn vào chiều nay nhé.",
            hasNewMessage: false,
        },
        {
            name: "Trần Văn C",
            avatar: "https://i.pravatar.cc/300?img=3",
            message: "Có cuộc họp lúc 10 giờ sáng.",
            hasNewMessage: true,
        },
    ];

    //click to open chat windows
    const [openChat, setOpenChat] = useState(true);

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
                Danh sách trò chuyện
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
