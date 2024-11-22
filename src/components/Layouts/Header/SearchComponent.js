import React, { useState, useEffect } from "react";
import {
    TextField,
    Box,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    CircularProgress,
} from "@mui/material";
import axios from "axios";
import { searchHeader } from "~/services/searchServices/search";

const SearchComponent = () => {
    const [keyword, setKeyword] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (keyword.trim() === "") {
            setResults([]);
            return;
        }

        const fetchResults = async () => {
            setLoading(true);
            try {
                // Thay thế URL API của bạn ở đây
                const response = await searchHeader(keyword).then((data) => {
                    if (data.users || data.groups) {
                        setResults(data);
                    } else setResults([]);
                });
                // Lấy danh sách người dùng từ API
                console.log(results);
            } catch (error) {
                console.error("Error fetching search results:", error);
                setResults([]);
            } finally {
                setLoading(false);
            }
        };

        const debounceTimeout = setTimeout(fetchResults, 500); // Thêm debounce để giảm số lần gọi API

        return () => clearTimeout(debounceTimeout); // Cleanup tránh race condition
    }, [keyword]);
    return (
        <Box sx={{ width: 400, margin: "auto", mt: 15 }}>
            <TextField
                fullWidth
                label="Search"
                variant="outlined"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                autoFocus
            />
            {loading && <CircularProgress size={24} sx={{ mt: 2 }} />}
            {/* {results && keyword && !loading && (
                <Typography variant="body2" color= textSecondary" sx={{ mt: 2 }}>
                    Not found
                </Typography>
            )} */}
            {(results?.users || results?.groups) && (
                <List
                    sx={{
                        maxHeight: 200,
                        scrollBehavior: "auto",
                    }}
                >
                    {results?.users.map((user) => (
                        <ListItem key={user._id}>
                            <ListItemAvatar>
                                <Avatar alt={user.username} src={user.avatar} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={user.username}
                                secondary={user.email} // Bạn có thể tùy chọn hiển thị thông tin khác nếu cần
                            />
                        </ListItem>
                    ))}
                    {results?.groups.map((group) => (
                        <ListItem key={group._id}>
                            <ListItemAvatar>
                                <Avatar alt={group.name} src={group.avatar} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={group.name}
                                secondary={group.privacy + " groups"} // Bạn có thể tùy chọn hiển thị thông tin khác nếu cần
                            />
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default SearchComponent;
