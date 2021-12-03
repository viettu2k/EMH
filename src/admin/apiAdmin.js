import { API } from "../config";

export const createCenter = (userId, token, center) => {
    return fetch(`${API}/center/${userId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: center,
        })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

export const getListUser = () => {
    return fetch(`${API}/users`, {
            method: "GET",
        })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const removeUser = (userId, token) => {
    return fetch(`${API}/user/${userId}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.error(err));
};