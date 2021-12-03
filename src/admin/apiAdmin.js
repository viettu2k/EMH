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