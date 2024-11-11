// import React, { useState } from "react";
// import {
//     Box,
//     Grid,
//     Paper,
//     Typography,
//     IconButton,
//     Drawer,
//     AppBar,
//     Toolbar,
//     useMediaQuery,
//     useTheme,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu"; // Icon cho nút mở Drawer

// const ThreePartLayout = () => {
//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Kiểm tra kích thước màn hình
//     const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
//     const [rightDrawerOpen, setRightDrawerOpen] = useState(false);

//     const toggleLeftDrawer = () => {
//         setLeftDrawerOpen(!leftDrawerOpen);
//     };

//     const toggleRightDrawer = () => {
//         setRightDrawerOpen(!rightDrawerOpen);
//     };

//     return (
//         <Box sx={{ flexGrow: 1 }}>
//             {/* AppBar */}
//             <AppBar position="static">
//                 <Toolbar>
//                     <IconButton edge="start" color="inherit" onClick={toggleLeftDrawer}>
//                         <MenuIcon />
//                     </IconButton>
//                     <Typography variant="h6" sx={{ flexGrow: 1 }}>
//                         Three-Part Layout
//                     </Typography>
//                     <IconButton edge="end" color="inherit" onClick={toggleRightDrawer}>
//                         <MenuIcon />
//                     </IconButton>
//                 </Toolbar>
//             </AppBar>

//             <Grid container spacing={2}>
//                 {/* Left Section */}
//                 <Grid item xs={isMobile ? 0 : 3}>
//                     {!isMobile ? (
//                         <Paper elevation={3} sx={{ p: 2, height: "100vh", overflowY: "auto" }}>
//                             <Typography variant="h6" align="center">
//                                 Left Sidebar
//                             </Typography>
//                             {/* Content for Left Sidebar */}
//                         </Paper>
//                     ) : (
//                         <Drawer anchor="left" open={leftDrawerOpen} onClose={toggleLeftDrawer}>
//                             <Paper elevation={3} sx={{ width: 250, height: "100vh", overflowY: "auto" }}>
//                                 <Typography variant="h6" align="center">
//                                     Left Sidebar
//                                 </Typography>
//                                 {/* Content for Left Sidebar */}
//                             </Paper>
//                         </Drawer>
//                     )}
//                 </Grid>

//                 {/* Center Section */}
//                 <Grid item xs={12} md={6}>
//                     <Paper elevation={3} sx={{ p: 2, minHeight: "100vh" }}>
//                         <Typography variant="h4" align="center">
//                             Center Content
//                         </Typography>
//                         {/* Main Content */}
//                     </Paper>
//                 </Grid>

//                 {/* Right Section */}
//                 <Grid item xs={isMobile ? 0 : 3}>
//                     {!isMobile ? (
//                         <Paper elevation={3} sx={{ p: 2, height: "100vh", overflowY: "auto" }}>
//                             <Typography variant="h6" align="center">
//                                 Right Sidebar
//                             </Typography>
//                             {/* Content for Right Sidebar */}
//                         </Paper>
//                     ) : (
//                         <Drawer anchor="right" open={rightDrawerOpen} onClose={toggleRightDrawer}>
//                             <Paper elevation={3} sx={{ width: 250, height: "100vh", overflowY: "auto" }}>
//                                 <Typography variant="h6" align="center">
//                                     Right Sidebar
//                                 </Typography>
//                                 {/* Content for Right Sidebar */}
//                             </Paper>
//                         </Drawer>
//                     )}
//                 </Grid>
//             </Grid>
//         </Box>
//     );
// };

// export default ThreePartLayout;
import React, { useState } from "react";
import { Popover, Button, Typography } from "@mui/material";

export default function InteractivePopover() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const open = Boolean(anchorEl);

    return (
        <div>
            <Button variant="contained" onClick={handleClick}>
                Open Popover
            </Button>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <Typography sx={{ p: 2 }}>Nội dung Popover mà bạn cần</Typography>
            </Popover>
        </div>
    );
}
