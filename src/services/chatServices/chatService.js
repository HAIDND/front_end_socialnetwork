///call  api get chat lis

export const getChatList = () => async () => {
    const tokens = sessionStorage.getItem("jwt");
    const token = tokens.token;
    try {
        const response = await fetch("http://localhost:4000/api/chat/chats", {
            method: "GET",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error("Failed to get chat list");
        }
    } catch (error) {
        console.error(error);
    }
};

///call api chat with user
export const getChatWithUser = () => async () => {
    const tokens = sessionStorage.getItem("jwt");
    const token = tokens.token;
    try {
        const response = await fetch("http://localhost:4000/api/chat/messages", {
            method: "GET",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error("Failed to get chat list");
        }
    } catch (error) {
        console.error(error);
    }
};
