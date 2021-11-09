import { API } from "../config";

export const getVaccinations = () => {
    return fetch(`${API}/vaccinations`, {
            method: "GET",
        })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};