import React from "react";
import { Box, Card, CardContent, Typography, Button, Avatar } from "@mui/material";

const FriendRequestList = ({ requests, onAccept, onDeny }) => {
    return (
        <Box
            sx={{
                display: "flex",
                backgroundColor: "#F3F3F3",
                flexDirection: "column",
                gap: 2,
                width: 360,
                padding: 4,
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                margin: "0 auto",
            }}
        >
            <Typography variant="h5" sx={{ textAlign: "center", color: "#000000" }}>
                Friend Requests
            </Typography>
            {requests.map((request) => (
                <Card key={request.id} sx={{ marginBottom: 2 }}>
                    <CardContent sx={{ display: "flex", alignItems: "center", padding: 1 }}>
                        <Avatar alt={request.name} src={request.avatar} sx={{ marginRight: 2 }} />
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="body1" sx={{ color: "#2F3E46" }}>
                                {request.name}
                            </Typography>
                            <Box sx={{ display: "flex", gap: 1, marginTop: 1 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => onAccept(request.id)}
                                    sx={{
                                        backgroundColor: "#4CAF50",
                                        "&:hover": { backgroundColor: "#45a049" },
                                        minWidth: 60, // Kích thước tối thiểu của nút
                                    }}
                                >
                                    Accept
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={() => onDeny(request.id)}
                                    sx={{
                                        backgroundColor: "red",
                                        color: "white",
                                        "&:hover": { backgroundColor: "darkred" },
                                        minWidth: 40, // Kích thước tối thiểu của nút
                                    }}
                                >
                                    Deny
                                </Button>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default FriendRequestList;
