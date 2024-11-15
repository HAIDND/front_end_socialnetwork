import { API_BASE_URL } from "~/config/apiConfig";
import { comment } from "~/pages/post/api-post";

const getPost = async (userID) => {
    const storedToken = sessionStorage.getItem("jwt");
    const tokenData = storedToken ? JSON.parse(storedToken) : null;
    const token = tokenData?.token;
    try {
        // Gửi request lên server
        const response = await fetch(`http://localhost:4000/api/posts/userPosts`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer " + token, // Thêm Bearer token
            },
        });

        return await response.json();
    } catch (err) {
        console.error(err);
    }
};
//call api create post
const createPost = async (content, image, video, visibility) => {
    const storedToken = sessionStorage.getItem("jwt");
    const tokenData = storedToken ? JSON.parse(storedToken) : null;
    const token = tokenData?.token;

    const formData = new FormData();
    formData.append("content", content);
    console.log(formData);
    if (image) formData.append("image", image);
    if (video) formData.append("video", video);
    formData.append("visibility", visibility);
    console.log("form lasttest");
    console.log(formData);

    try {
        const response = await fetch("http://localhost:4000/api/posts/create", {
            method: "POST",
            headers: {
                authorization: "Bearer " + token,
            },
            body: formData,
        });
        return await response.json();
    } catch (error) {
        console.error(error);
        return { success: false, error };
    }
};

// const createPost = async (content, image, video, visibility) => {
//     const storedToken = sessionStorage.getItem("jwt");
//     // Parse JSON thành object
//     const tokenData = storedToken ? JSON.parse(storedToken) : null;
//     // Kiểm tra và sử dụng token
//     const token = tokenData.token;
//     try {
//         let response = await fetch("http://localhost:4000/api/posts/create", {
//             method: "POST",
//             headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json",
//                 authorization: "Bearer " + token, // Thêm Bearer token
//             },
//             body: JSON.stringify(content, image, video, visibility),
//         });
//         return await response.json();
//     } catch (error) {
//         console.log(error);
//     }
// };
//call api like post
const likePost = async (postId, token) => {
    try {
        let response = await fetch(`http://localhost:4000/api/posts/like`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer " + token, // Thêm Bearer token
            },
            body: JSON.stringify(postId),
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

//call api unlike post
const unLikePost = async (postId, token) => {
    try {
        let response = await fetch(`http://localhost:4000/api/posts/unlike`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer " + token, // Thêm Bearer token
            },
            body: JSON.stringify(postId),
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};
//call api comment post
const createComment = async (data, token) => {
    try {
        let response = await fetch(`http://localhost:4000/api/posts/comment`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer " + token, // Thêm Bearer token
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

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
// const create = async (user) => {
//     // tạo mới một user  http://localhost:4000/api/users
//     try {
//         let response = await fetch(`http://localhost:4000/api/users/register`, {
//             method: "POST",
//             headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(user),
//         });
//         return await response.json();
//     } catch (err) {
//         console.log(err);
//     }
// };
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
export { getPost, likePost, createComment, unLikePost, createPost };
