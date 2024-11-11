import { API_BASE_URL } from "~/config/apiConfig";

const createUser = async (user) => {
    try {
        let response = await fetch("api/user/", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};
const readUser = async (params) => {
    try {
        let response = await fetch(`http://localhost:4000/api/users/` + params, {
            method: "GET",
            // signal: signal,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                // Authorization: "Bearer " + credentials.t,
            },
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};
const create = async (user) => {
    // tạo mới một user  http://localhost:4000/api/users
    try {
        let response = await fetch(`http://localhost:4000/api/users/register`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};
// const updateUser = async (userID, token, userData) => {
//     try {
//         let response = await fetch("http://localhost:4000/api/user/" + userID, {
//             method: "PUT",
//             headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json",
//                 Authorization: "Bearer " + token,
//             },
//             body: JSON.stringify(userData),
//         });
//         return await response.json();
//     } catch (err) {
//         console.log(err);
//     }
// };
const updateUser = async (userID, token, userData) => {
    try {
        const formData = new FormData();

        // Duyệt qua các key trong userData và thêm vào FormData
        for (let key in userData) {
            formData.append(key, userData[key]);
        }

        // Gửi request lên server
        const response = await fetch(`http://localhost:4000/api/user/${userID}`, {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + token, // Thêm Bearer token
            },
            body: formData,
        });

        const result = await response.json();
        console.log(result);
    } catch (err) {
        console.error(err);
    }
};

const list = async (signal) => {
    // lấy danh sách người dùng
    try {
        let response = await fetch("/api/users/", {
            method: "GET",
            signal: signal,
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};
const deleteUser = async (params, credentials) => {
    try {
        let response = await fetch("api/user/" + params.userId, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer" + credentials.t,
            },
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

const saveInfo = async (user) => {
    localStorage.setItem("user", JSON.stringify(user));
};

const getInfo = () => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : { name: "none", email: "none" };
};
export { createUser, readUser, updateUser, deleteUser, list, saveInfo, getInfo };
