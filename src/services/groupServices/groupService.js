const createGroup = async ({ name, description, privacy }) => {
    // Lấy dữ liệu từ sessionStorage
    const storedToken = sessionStorage.getItem("jwt");
    // Parse JSON thành object
    const tokenData = storedToken ? JSON.parse(storedToken) : null;
    // Kiểm tra và sử dụng token
    const token = tokenData.token;
    const formGroup = {
        name,
        description,
        privacy,
    };
    try {
        let response = await fetch("http://localhost:4000/api/groups/create", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer " + token,
            },
            body: JSON.stringify(formGroup),
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

///call api list group all
const listGroupJoin = async () => {
    // Lấy dữ liệu từ sessionStorage
    const storedToken = sessionStorage.getItem("jwt");
    // Parse JSON thành object
    const tokenData = storedToken ? JSON.parse(storedToken) : null;
    // Kiểm tra và sử dụng token
    const token = tokenData.token;
    try {
        let response = await fetch("http://localhost:4000/api/groups/user/groups", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer " + token,
            },
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};
export { createGroup, listGroupJoin };
