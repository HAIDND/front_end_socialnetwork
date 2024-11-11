import styles from "./AuthorSettings.module.scss";
import { useState } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { Grid, Box, Typography, List, ListItem, ListItemText } from "@mui/material";

import Sidebar from "~/components/Layouts/Sidebar";
const cx = clsx;
const name = (x) => {
    cx(styles.x);
};
function SettingsPage() {
    return (
        <>
            <Grid container>
                <Grid item flex={2} sx={{ overflow: "auto" }} display={{ xs: "none", md: "block" }}>
                    <Sidebar />
                </Grid>
                <Grid
                    item
                    flex={5}
                    sx={{ mt: 12, height: "100%", overflow: "auto", borderLeft: "1px solid lightgrey" }}
                >
                    <Box sx={{ padding: 3, maxWidth: 360 }}>
                        <Box mb={4}>
                            <Typography variant="h4" fontWeight="700" sx={{ fontSize: { xs: "1.25rem", lg: "2rem" } }}>
                                Settings
                            </Typography>
                        </Box>

                        {/* General Section */}
                        <Box mb={4}>
                            <Typography variant="caption" sx={{ fontWeight: 600, color: "grey.500", mb: 1 }}>
                                General
                            </Typography>
                            <List>
                                <ListItem disablePadding>
                                    <ListItemText
                                        primary={
                                            <Link href="account-information.html" underline="hover">
                                                Account Information
                                            </Link>
                                        }
                                    />
                                </ListItem>
                            </List>
                        </Box>

                        {/* Account Section */}
                        <Box mb={4}>
                            <Typography variant="caption" sx={{ fontWeight: 600, color: "grey.500", mb: 1 }}>
                                Account
                            </Typography>
                            <List>
                                <ListItem disablePadding>
                                    <Link to="editprofile" underline="hover">
                                        Profile
                                    </Link>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemText
                                        primary={
                                            <Link href="account-information.html" underline="hover">
                                                Account Password
                                            </Link>
                                        }
                                    />
                                </ListItem>
                            </List>
                        </Box>

                        {/* Other Section */}
                        <Box mb={4}>
                            <Typography variant="caption" sx={{ fontWeight: 600, color: "grey.500", mb: 1 }}>
                                Other
                            </Typography>
                            <List>
                                <ListItem disablePadding>
                                    <ListItemText
                                        primary={
                                            <Link href="account-information.html" underline="hover">
                                                Help Information
                                            </Link>
                                        }
                                    />
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemText
                                        primary={
                                            <Link href="account-information.html" underline="hover">
                                                Logout
                                            </Link>
                                        }
                                    />
                                </ListItem>
                            </List>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default SettingsPage;
