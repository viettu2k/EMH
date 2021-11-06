import { API } from "../config";

export const createVaccination = (userId, token, vaccination) => {
    return fetch(`${API}/vaccinations/${userId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(vaccination),
        })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

export const getCenters = () => {
    return fetch(`${API}/centers`, {
            method: "GET",
        })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};