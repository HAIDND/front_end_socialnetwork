import FiendRequest from "~/components/Elements/Friend/Request";
import "bootstrap/dist/css/bootstrap.css";
import Post from "~/components/Elements/Post_MUI/post";
import CreatePostUI from "~/components/Elements/Post_MUI/createPost";
import { useState } from "react";
import { Grid } from "@mui/material";
import Sidebar from "~/components/Layouts/Sidebar";
import NewsfeedContent from "./newfeed.midle";
function Newsfeed() {
    const [requests, setRequests] = useState([
        { id: 1, name: "John Doe", avatar: "https://via.placeholder.com/40" },
        { id: 2, name: "Jane Smith", avatar: "https://via.placeholder.com/40" },
        { id: 3, name: "Alice Johnson", avatar: "https://via.placeholder.com/40" },
    ]);

    const handleAccept = (id) => {
        console.log(`Accepted request from ID: ${id}`);
        setRequests(requests.filter((request) => request.id !== id));
    };

    const handleDeny = (id) => {
        console.log(`Denied request from ID: ${id}`);
        setRequests(requests.filter((request) => request.id !== id));
    };
    return (
        <Grid container>
            <Grid item flex={2} sx={{ overflow: "auto" }} display={{ xs: "none", md: "block" }}>
                <Sidebar />
            </Grid>
            <Grid item flex={3} sx={{ mt: 12, height: "100%", overflow: "auto", borderLeft: "1px solid lightgrey" }}>
                <CreatePostUI />
                <NewsfeedContent />
                {/* <Post />{" "} */}
            </Grid>
            <Grid item flex={2} sx={{ mt: 12, height: "100%", overflow: "auto" }}>
                <FiendRequest requests={requests} onAccept={handleAccept} onDeny={handleDeny} />
                <FiendRequest requests={requests} onAccept={handleAccept} onDeny={handleDeny} />
                <FiendRequest requests={requests} onAccept={handleAccept} onDeny={handleDeny} />
                <FiendRequest requests={requests} onAccept={handleAccept} onDeny={handleDeny} />
            </Grid>
        </Grid>
    );
}

export default Newsfeed;
