// import { useState } from "react";
// import React from "react";
// import styles from "./Sidebar.module.scss";
// import clsx from "clsx";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//     faGear,
//     faBandage,
//     faFileText,
//     faFlask,
//     faHandshake,
//     faMessage,
//     faNewspaper,
//     faUser,
//     faUserGroup,
// } from "@fortawesome/free-solid-svg-icons";

// const cx = clsx.bind(this);

// // function Sidebar() {
// //     return (
// //         <>
// //             <nav className={cx(styles.Navigation)}>
// //                 <div className={cx(styles.Container)}>
// //                     <div className="nav-content">
// //                         <div className={cx(styles.Nav_Wrap)}>
// //                             <div className={cx(styles.Nav_caption)}>
// //                                 <span className={cx(styles.Span)}>Menu</span>
// //                             </div>
// //                             <List1 className="bg-color" />
// //                         </div>

// //                         {/* <div className={cx(styles.Nav_Wrap)}>
// //                             <div className={cx(styles.Nav_caption)}>
// //                                 <span className={cx(styles.Span)}>More Pages</span>
// //                             </div>
// //                             <List2 />
// //                         </div>

// //                         <div className={cx(styles.Nav_Wrap)}>
// //                             <div className={cx(styles.Nav_caption)}>
// //                                 <span className={cx(styles.Span)}>Account</span>
// //                             </div>
// //                             <List3 />
// //                         </div> */}
// //                     </div>
// //                 </div>
// //             </nav>
// //         </>
// //     );
// // }

// // export default Sidebar;
// import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from "@mui/material";
// const Sidebar = () => {
//     const listMenu = [
//         {
//             title: "Newsfeed",
//             path: "/newsfeed",
//             icon: faNewspaper,
//         },
//         {
//             title: "Profile",
//             path: "/profile",
//             icon: faUser,
//         },
//         {
//             title: "Chat",
//             path: "/chat",
//             icon: faMessage,
//         },
//         {
//             title: "Friends",
//             path: "/friends",
//             icon: faUserGroup,
//         },
//         {
//             title: "Settings",
//             path: "/settings",
//             icon: faGear,
//         },
//     ];

//     return (
//         <Drawer
//             variant="permanent"
//             sx={{
//                 width: 240,
//                 flexShrink: 0,
//                 [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
//             }}
//         >
//             <List>
//                 {listMenu.map((item, index) => (
//                     <ListItem button component={Link} to={item.path} key={index}>
//                         <ListItemIcon>
//                             <FontAwesomeIcon icon={item.icon} />
//                         </ListItemIcon>
//                         <ListItemText primary={item.title} />
//                     </ListItem>
//                 ))}
//             </List>
//         </Drawer>
//     );
// };

// export default Sidebar;
// function List1() {
//     const listMenu = [
//         {
//             title: "Newsfeed",
//             path: "/newsfeed",
//             icon: faNewspaper,
//         },
//         {
//             title: "Profile",
//             path: "/profile",
//             icon: faUser,
//         },
//         {
//             title: "Chat",
//             path: "/chat",
//             icon: faMessage,
//         },
//         {
//             title: "Friends",
//             path: "/friends",
//             icon: faUserGroup,
//         },
//         {
//             title: "Settings",
//             path: "/settings",
//             icon: faGear,
//         },
//     ];
//     return (
//         <ul className={cx(styles.Ul)}>
//             {listMenu.map((item) => {
//                 return (
//                     <li>
//                         <Link to={item.path} className={cx(styles.Li_Link, "button")}>
//                             <FontAwesomeIcon className={cx("icon-medium")} icon={item.icon} />
//                             <span className="p-4 justify-center ">{item.title}</span>
//                         </Link>
//                     </li>
//                 );
//             })}
//             {/* ;<li className={cx(styles.Logo)}></li>
//             <li>
//                 <Link to="newsfeed" className={cx(styles.Li_Link, 'button')}>
//                     <FontAwesomeIcon className={cx('icon-medium')} icon={faNewspaper} />
//                     <span>Newsfeed</span>
//                 </Link>
//             </li>
//             <li>
//                 <Link to="badge" className={cx(styles.Li_Link, 'button')}>
//                     <FontAwesomeIcon className={cx('icon-medium')} icon={faBandage} />
//                     <span>Badges</span>
//                 </Link>
//             </li>
//             <li>
//                 <Link to="storie" className={cx(styles.Li_Link, 'button')}>
//                     <FontAwesomeIcon className={cx('icon-medium')} icon={faFlask} />
//                     <span>Explore Stories</span>
//                 </Link>
//             </li>
//             <li>
//                 <Link to="group" className={cx(styles.Li_Link, 'button')}>
//                     <FontAwesomeIcon className={cx('icon-medium')} icon={faUserGroup} />
//                     <span>Popular Groups</span>
//                 </Link>
//             </li>
//             <li>
//                 <Link to="user-page" className={cx(styles.Li_Link, 'button')}>
//                     <FontAwesomeIcon className={cx('icon-medium')} icon={faUser} />
//                     <span>Author Profile </span>
//                 </Link>
//             </li> */}
//         </ul>
//     );
// }

// function List2() {
//     let numNotifi = 0;
//     return (
//         <ul className={cx(styles.Ul)}>
//             <li>
//                 <Link to="email-box" className={cx(styles.Li_Link, "button")}>
//                     <FontAwesomeIcon className={cx("icon-medium")} icon={faFileText} />
//                     <span>Email Box</span>
//                     <span className={cx(styles.SpanNote)}>{numNotifi}</span>
//                 </Link>
//             </li>
//             <li>
//                 <Link to="hotel" className={cx(styles.Li_Link, "button")}>
//                     <FontAwesomeIcon className={cx("icon-medium")} icon={faHandshake} />
//                     <span>Near Hotel</span>
//                 </Link>
//             </li>
//             <li>
//                 <Link to="event" className={cx(styles.Li_Link, "button")}>
//                     <FontAwesomeIcon className={cx("icon-medium")} icon={faHandshake} />
//                     <span>Latest Event</span>
//                 </Link>
//             </li>
//             <li>
//                 <Link to="live-stream" className={cx(styles.Li_Link, "button")}>
//                     <FontAwesomeIcon className={cx("icon-medium")} icon={faHandshake} />
//                     <span>Live Stream</span>
//                 </Link>
//             </li>
//         </ul>
//     );
// }

// function List3() {
//     let numMessage = 0;
//     return (
//         <ul className={cx(styles.Ul)}>
//             <li className={cx(styles.Logo)}></li>
//             <li>
//                 <Link to="authorsettings" className={cx(styles.Li_Link, "button")}>
//                     <FontAwesomeIcon className={cx("icon-medium")} icon={faHandshake} />
//                     <span>Settings</span>
//                 </Link>
//             </li>
//             <li>
//                 <Link to="analytics" className={cx(styles.Li_Link, "button")}>
//                     <FontAwesomeIcon className={cx("icon-medium")} icon={faHandshake} />
//                     <span>Analytics</span>
//                 </Link>
//             </li>
//             <li>
//                 <Link to="message" className={cx(styles.Li_Link, "button")}>
//                     <FontAwesomeIcon className={cx("icon-medium")} icon={faHandshake} />
//                     <span>Chat</span>
//                     <span className={cx(styles.SpanNote)}>{numMessage}</span>
//                 </Link>
//             </li>
//         </ul>
//     );
// }
import React from "react";
import { Drawer, Box, List, ListItem, ListItemIcon, ListItemText, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper, faUser, faMessage, faUserGroup, faGear } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
    const listMenu = [
        {
            title: "Newsfeed",
            path: "/newsfeed",
            icon: faNewspaper,
        },
        {
            title: "Profile",
            path: "/profile",
            icon: faUser,
        },
        {
            title: "Chat",
            path: "/chat",
            icon: faMessage,
        },
        {
            title: "Friends",
            path: "/friends",
            icon: faUserGroup,
        },
        {
            title: "Settings",
            path: "/settings",
            icon: faGear,
        },
    ];

    return (
        <Box
            variant="permanent"
            sx={{
                mt: 10,
                width: 240,
                position: "fixed",
            }}
        >
            <List>
                {listMenu.map((item, index) => (
                    <ListItem button component={Link} to={item.path} key={index}>
                        <ListItemIcon>
                            <FontAwesomeIcon icon={item.icon} />
                        </ListItemIcon>
                        <ListItemText primary={item.title} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default Sidebar;
