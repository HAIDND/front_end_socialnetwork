import React, { useEffect, useState } from "react";
import { Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, Badge, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ChatWindow from "./ChatWindow";
import { getChatList, getChatWithUser } from "~/services/chatServices/chatService";
import { getListFriend } from "~/services/friendServices/friendService";

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
    const [chats, setChats] = useState([]); // Khởi tạo mảng rỗng
    const [listFriend, setListFriend] = useState([]); // Khởi tạo mảng rỗng
    const userId = "672ebaf8c63b15d5410fe80d"; // ID người dùng mẫu

    useEffect(() => {
        const fetchChatList = async () => {
            try {
                const data = await getChatList();
                const friend = await getListFriend();
                console.log(data);
                setChats(data); // Cập nhật mảng chats với dữ liệu từ API
                setListFriend(friend);
            } catch (error) {
                console.error("Failed to fetch chats:", error);
            }
        };

        fetchChatList();
    }, [userId]); // Chỉ chạy lại khi userId thay đổi

    //click to open chat windows
    const [openChat, setOpenChat] = useState(false);
    const [chatFriend, setChatFriend] = useState([]);
    function handleOpenChat(x) {
        setOpenChat(!openChat);
        setChatFriend(x);
    }

    const handleCloseChat = () => {
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
                    <ListItem
                        key={index}
                        sx={{
                            border: "ActiveCaption",
                            "&:hover": {
                                backgroundColor: "blue", // Thay đổi màu khi hover
                            },
                        }}
                        alignItems="flex-start"
                        onClick={() => {
                            handleOpenChat(chat);
                        }}
                        onclose={handleOpenChat}
                    >
                        <ListItemAvatar>
                            <Avatar alt={chat.name} src={chat.avatar} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={chat?.username}
                            secondary={
                                <Typography component="span" variant="body2" color="text.secondary" noWrap>
                                    {chat?.email}
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
                {listFriend.map((chat, index) => (
                    <ListItem
                        key={index}
                        sx={{
                            border: "ActiveCaption",
                            "&:hover": {
                                backgroundColor: "blue", // Thay đổi màu khi hover
                            },
                        }}
                        alignItems="flex-start"
                        onClick={() => {
                            handleOpenChat(chat);
                        }}
                        onclose={handleOpenChat}
                    >
                        <ListItemAvatar>
                            <Avatar alt={chat.name} src={chat.avatar} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={chat?.username}
                            secondary={
                                <Typography component="span" variant="body2" color="text.secondary" noWrap>
                                    {chat?.email}
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
            {openChat && <ChatWindow friend={chatFriend} onClose={handleCloseChat} />}
        </ChatListContainer>
    );
};

export default ChatList;
