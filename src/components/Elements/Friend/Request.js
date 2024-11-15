// import React, { useContext, useEffect, useState } from "react";
// import { Box, Card, CardContent, Typography, Button, Avatar, Grid } from "@mui/material";
// import { CurentUser } from "~/MainRoutes";
// import { getListFriendRequest, acceptFriendRequest } from "~/services/friendServices/friendService"; // Import các hàm API

// // Component hiển thị từng yêu cầu kết bạn
// const FriendRequestCard = ({ request, onAccept, onDeny }) => {
//     return (
//         <Card
//             sx={{
//                 width: 200,
//                 minHeight: 225,
//                 border: "1px solid #ddd",
//                 borderRadius: 2,
//                 boxShadow: 1,
//                 padding: 2,
//                 textAlign: "center",
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "space-between",
//                 marginBottom: 2,
//             }}
//         >
//             <Avatar src={request.avatar} alt={request?.username} sx={{ width: 80, height: 80, margin: "0 auto" }} />
//             <Typography variant="body1" fontWeight="600" mt={1}>
//                 {request?.requester}
//             </Typography>
//             <Box sx={{ display: "flex", justifyContent: "space-around", marginTop: 2 }}>
//                 <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={() => onAccept(request._id)}
//                     sx={{ textTransform: "none" }}
//                 >
//                     Xác nhận
//                 </Button>
//                 <Button
//                     variant="outlined"
//                     color="secondary"
//                     onClick={() => onDeny(request._id)}
//                     sx={{ textTransform: "none" }}
//                 >
//                     Xóa
//                 </Button>
//             </Box>
//         </Card>
//     );
// };

// // Component danh sách yêu cầu kết bạn
// const FriendRequestList = ({ requests, handleAccept, handleDeny }) => {
//     return (
//         <Box sx={{ padding: 3 }}>
//             <Typography variant="h6" fontWeight="600" marginBottom={2}>
//                 Danh sách yêu cầu kết bạn
//             </Typography>
//             <Grid container spacing={2}>
//                 {requests.map((request) => (
//                     <Grid item key={request._id}>
//                         <FriendRequestCard request={request} onAccept={handleAccept} onDeny={handleDeny} />
//                     </Grid>
//                 ))}
//             </Grid>
//         </Box>
//     );
// };

// // Component chính
// const FriendRequest = () => {
//     const { curentUserID } = useContext(CurentUser);
//     const [data, setData] = useState([]);

//     // Hàm xử lý chấp nhận yêu cầu kết bạn
//     const handleAccept = async (id) => {
//         try {
//             const result = await acceptFriendRequest(id);
//             if (result.success) {
//                 alert(result.message);
//                 setData(data.filter((item) => item._id !== id)); // Cập nhật lại danh sách yêu cầu
//             } else {
//                 alert("Không thể chấp nhận yêu cầu.");
//             }
//         } catch (err) {
//             console.error("Error accepting request:", err);
//         }
//     };

//     // Hàm xử lý từ chối yêu cầu kết bạn
//     const handleDeny = async (id) => {
//         alert("Denying");
//     };

//     // Gọi API lấy danh sách yêu cầu kết bạn
//     useEffect(() => {
//         try {
//             getListFriendRequest().then((result) => {
//                 console.log(result);
//                 console.log("result request  list");
//                 setData(result);
//             });
//         } catch (error) {
//             console.log(error);
//         }
//     }, []);

//     return (
//         <Grid container justifyContent="center">
//             <FriendRequestList requests={data} handleAccept={handleAccept} handleDeny={handleDeny} />
//         </Grid>
//     );
// };

// export default FriendRequest;
import { Box, Card, CardContent, Typography, Button, Avatar } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { CurentUser } from "~/MainRoutes";
import { acceptFriendRequest, getListFriendRequest } from "~/services/friendServices/friendService";

const FriendRequestList = () => {
    const { curentUserID } = useContext(CurentUser);
    const [requests, setData] = useState([]);

    // Hàm xử lý chấp nhận yêu cầu kết bạn
    // const handleAccept = async (id) => {
    //     try {
    //         const result = await acceptFriendRequest(id);
    //         if (result.success) {
    //             alert(result.message);
    //             setData(data.filter((item) => item._id !== id)); // Cập nhật lại danh sách yêu cầu
    //         } else {
    //             alert("Không thể chấp nhận yêu cầu.");
    //         }
    //     } catch (err) {
    //         console.error("Error accepting request:", err);
    //     }
    // };
    const handleAccept = (id) => {
        try {
            acceptFriendRequest(id).then((result) => {
                if (result) {
                    alert(result.message);
                } else {
                    alert(result.message);
                }
            });
        } catch (err) {
            console.log(err);
        }
    };
    // Hàm xử lý từ chối yêu cầu kết bạn
    const handleDeny = async (id) => {
        alert("Denying");
    };
    //     // Gọi API lấy danh sách yêu cầu kết bạn
    useEffect(() => {
        try {
            getListFriendRequest().then((result) => {
                console.log(result);
                console.log("result request  list");
                setData(result);
            });
        } catch (error) {
            console.log(error);
        }
    }, []);
    console.log("request list in newfedd...");
    console.log(requests);
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
                                {request._id}
                            </Typography>
                            <Box sx={{ display: "flex", gap: 1, marginTop: 1 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleAccept(request.id)}
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
                                    onClick={() => handleDeny(request.id)}
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
