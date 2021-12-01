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

export const getCenter = (centerId) => {
    return fetch(`${API}/user/${centerId}`, {
            method: "GET",
        })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const updateCenter = (centerId, userId, token, center) => {
    return fetch(`${API}/centers/${centerId}/${userId}`, {
            method: "PUT",
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

export const removeCenter = (centerId, userId, token) => {
    return fetch(`${API}/centers/${centerId}/${userId}`, {
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

export const getCenters = () => {
    return fetch(`${API}/centers`, {
            method: "GET",
        })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const getVaccination = (vaccinationId) => {
    return fetch(`${API}/vaccinations/${vaccinationId}`, {
            method: "GET",
        })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const updateVaccination = (
    vaccinationId,
    userId,
    token,
    vaccination
) => {
    console.log(vaccination);
    return fetch(`${API}/vaccinations/${vaccinationId}/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
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

export const removeVaccination = (vaccinationId, userId, token) => {
    return fetch(`${API}/vaccinations/${vaccinationId}/${userId}`, {
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

export const getVaccinationByCenter = (centerId) => {
    return fetch(`${API}/vaccinations/center/${centerId}`, {
            method: "GET",
        })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const registerVaccination = (token, user) => {
    return fetch(`${API}/vaccinations/register`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(user),
        })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.error(err));
};

export const cancelRegister = (token, user) => {
    return fetch(`${API}/vaccinations/cancel-register`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(user),
        })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.error(err));
};

export const sendVaccinationTime = (
    email,
    vaccinationName,
    vaccinationTime
) => {
    return fetch(`${API}/send-vaccination-time`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, vaccinationName, vaccinationTime }),
        })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const updateUser = (user, next) => {
    if (typeof window !== "undefined") {
        if (localStorage.getItem("jwt")) {
            let auth = JSON.parse(localStorage.getItem("jwt"));
            auth.user = user;
            localStorage.setItem("jwt", JSON.stringify(auth));
            next();
        }
    }
};

export const addToHistory = (token, history) => {
    return fetch(`${API}/user/add-to-history`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(history),
        })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.error(err));
};

export const removeFromHistory = (token, history) => {
    return fetch(`${API}/user/remove-from-history`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(history),
        })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.error(err));
};