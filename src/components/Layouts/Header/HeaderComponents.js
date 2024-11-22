import { useEffect, useState } from "react";
import Tippy from "@tippyjs/react/headless";

import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHandshake,
    faMagnifyingGlass,
    faHouse,
    faVideo,
    faStore,
    faGear,
    faClose,
    faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { faBell, faMessage } from "@fortawesome/free-regular-svg-icons";

import Wrapper from "../Popper";

import auth from "~/services/authService/authHelper";

export function Logo() {
    return (
        <div className={cx(styles.Logo)}>
            <Link className={cx(styles.Link)} to={"/home"}>
                <FontAwesomeIcon className={cx(styles.Icon)} icon={faHandshake} />
                <span className={cx(styles.Name)}>VieSocial</span>
            </Link>{" "}
        </div>
    );
}

export function SearchHeader() {
    const [visible, setVisible] = useState(false);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);
    const [arrow, setArrow] = useState(null);

    return (
        <form className={cx(styles.SearchHeader)}>
            <Tippy
                content="Tooltip"
                visible={visible}
                onClickOutside={hide}
                render={(attrs) => (
                    <div {...attrs}>
                        <Wrapper />
                    </div>
                )}
            >
                <div className={cx(styles.Search)}>
                    <FontAwesomeIcon className={cx(styles.Icon)} icon={faMagnifyingGlass} />
                    <input
                        id="inputSearch"
                        onClick={visible ? hide : show}
                        type="text"
                        placeholder="Start typing to search.."
                        spellCheck={false}
                        className={cx(styles.Input)}
                    />
                    <FontAwesomeIcon
                        className={cx(styles.ClearButton)}
                        icon={faClose}
                        onClick={() => {
                            let input = document.getElementById("inputSearch");
                            return (input.defaultValue = "");
                        }}
                    />
                </div>
            </Tippy>
        </form>
    );
}

export function CenterButton() {
    const centerButton = [
        { name: "Home", icon: faHouse, paths: "/home" },
        { name: "Video", icon: faVideo, paths: "/video" },
        { name: "Store", icon: faStore, paths: "/store" },
    ];
    console.log(centerButton);
    return (
        <>
            <Link to={centerButton[0].paths} className={cx(styles.CenterButton)}>
                <FontAwesomeIcon className={cx(styles.Icon, "icon-max")} icon={centerButton[0].icon} />
            </Link>
            <Link to={centerButton[1].paths} className={cx(styles.CenterButton)}>
                <FontAwesomeIcon className={cx(styles.Icon, "icon-max")} icon={centerButton[1].icon} />
            </Link>
            <Link to={centerButton[2].paths} className={cx(styles.CenterButton)}>
                <FontAwesomeIcon className={cx(styles.Icon, "icon-max")} icon={centerButton[2].icon} />
            </Link>
        </>
    );
}

export function MenuIcon() {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);

    const toggleActive = () => {
        setIsActive(!isActive);
    };
    console.log("Toggle active is" + isActive);
    return (
        <div className={cx(styles.MenuIcon)}>
            <Link
                to={"/notifications/"}
                className={cx(styles.Notification)}
                id="dropdownMenu3"
                data-bs-toggle="dropdown"
                aria-expanded="false"

                // onClick={setIsActiveNoti(!isActive)}
            >
                <FontAwesomeIcon className={cx(styles.Icon, "icon-medium")} icon={faBell} />
            </Link>
            <Link to={"/chat"} className={cx(styles.Chat)}>
                <FontAwesomeIcon className={cx(styles.Icon, "icon-medium")} icon={faMessage} />
            </Link>
            <Link to={"/settings"} className={cx(styles.Chat)}>
                <FontAwesomeIcon className={cx(styles.Icon, "icon-medium")} icon={faGear} />
            </Link>
            <Link to="/authorsettings" className={cx(styles.AuhtorSettings)}>
                <img
                    src="https://tse1.mm.bing.net/th?id=OIP.l0ai3Gemc84mnwkfBwywrAHaHa&pid=Api&rs=1&c=1&qlt=95&w=119&h=119"
                    alt="user"
                    className={cx(styles.Avatar, "avatar-medium")}
                />
            </Link>
            {auth.isAuthenticated() && (
                <>
                    <Link
                        color="inherit"
                        onClick={() => {
                            auth.clearJWT(() => navigate("/"));
                        }}
                    >
                        <FontAwesomeIcon className={cx(styles.Icon, "icon-medium")} icon={faSignOut} />
                    </Link>
                </>
            )}
        </div>
    );
}

export function DropdownNotification() {
    let api = "https://jsonplaceholder.typicode.com/posts/1/comments";
    const [oneData, setOneData] = useState(false);
    const [mutilData, setMutilData] = useState([]);
    useEffect(() => {
        fetch(api)
            .then((response) => response.json())
            .then((json) => {
                if (Array.isArray(json)) {
                    setMutilData(json);
                } else {
                    setOneData(json);
                }
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    console.log("mouted dropdown notifications");
    return (
        <div
            className={cx(styles.DropdownNotification)}
            aria-labelledby="dropdownMenu3"
            data-popper-placement="bottom-end"
        >
            <h4 className={cx(styles.null)}>Notification</h4>
            {mutilData.map((item) => {
                return (
                    <div className={cx(styles.Card)}>
                        <img src={item?.url} alt={item.id} className={cx(styles.Image)} />
                        <h5 className={cx(styles.Name)}>
                            {item.email}
                            <span className={cx(styles.Span)}>{item?.timestamp}</span>
                        </h5>
                        <h6 className={cx(styles.Text)}>{item.body}</h6>
                    </div>
                );
            })}
            {/* <div className={cx(styles.Card)}>
                <img src="chrome://branding/content/about-logo@2x.png" alt="user" className={cx(styles.Image)} />
                <h5 className={cx(styles.Name)}>
                    Hendrix Stamp
                    <span className={cx(styles.Span)}>3 min</span>
                </h5>
                <h6 className={cx(styles.Text)}>There are many variations of pass..</h6>
            </div> */}
        </div>
    );
}

export function DropdownSettings() {
    const listItem = [
        { color: "red", color: "#ff3b30", className: "icon" },
        { color: "green", color: "#4cd964", className: "icon" },
        { color: "blue", color: "#132977", className: "icon" },
        { color: "yellow", color: "#ffcc00", className: "icon" },
        { color: "orange", color: "#ff9500", className: "icon" },
        { color: "pink", color: "#ff2d55", className: "icon" },
        { color: "brown", color: "#d2691e", className: "icon" },
        { color: "black", color: "#000", className: "icon" },
    ];
    const list = listItem.map(() => {
        return (
            <li className={cx(styles.ListItem)}>
                <label className="item-radio item-content">
                    <input
                        type="radio"
                        name="color-radio"
                        className={cx(styles.Button)}
                        defaultValue={listItem.color}
                        checked=""
                    />
                    <span className="circle-color bg-red"></span>
                </label>
            </li>
        );
    });
    return (
        <div className={cx(styles.DropdownSettings)}>
            <h4 className={cx(styles.H4)}>Settings</h4>
            <h6 className={cx(styles.H6)}>Choose Color Theme</h6>
            <ul>{list}</ul>

            <div className={cx(styles.Card)}>
                <h4 className={cx(styles.H4)}>Header Background</h4>
                <div className={cx(styles.Div)}>
                    <label className={cx(styles.Label)}>
                        <input type="checkbox" />
                        <span className={cx(styles.Span)}></span>
                    </label>
                </div>
            </div>
            <div className={cx(styles.Card)}>
                <h4 className={cx(styles.H4)}>Header Background</h4>
                <div className={cx(styles.Div)}>
                    <label className={cx(styles.Label)}>
                        <input type="checkbox" />
                        <span className={cx(styles.Span)}></span>
                    </label>
                </div>
            </div>
            <div className={cx(styles.Card)}>
                <h4 className={cx(styles.H4)}>Dark Mode</h4>
                <div className={cx(styles.Div)}>
                    <label className={cx(styles.Label)}>
                        <input type="checkbox" />
                        <span className={cx(styles.Span)}></span>
                    </label>
                </div>
            </div>
        </div>
    );
}
