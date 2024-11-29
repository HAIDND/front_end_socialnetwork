import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { CurentUser } from "~/MainRoutes";
import auth from "~/services/authService/authHelper";
import { readUser } from "~/services/userServices/userService";

function AdminRoute({ children }) {
    const { contextValue, curentUserID, curentUserToken } = useContext(CurentUser);
    // useEffect(() => {
    //     if (curentUserID) {
    //         readUser(curentUserID).then((data) => {
    //             if (data) {
    //                 contextValue.setCurrentUserProfile(data);
    //             } else {
    //                 alert("No profile!");
    //             }
    //         });
    //     }
    // }, [auth.isAuthenticated()?.userId]);contextValue.curentUserProfile?.role

    if (auth.isAuthenticated() && auth.isAdmin("admin")) return children;
    return <Navigate to="/login" />;
}

export default AdminRoute;
