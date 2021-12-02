import { API } from "../config";

export const createVaccinationSchedule = (userId, token, vaccination) => {
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

export const getVaccinesByCenter = (userId, token) => {
  return fetch(`${API}/vaccines/by/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateVaccine = (vaccineId, userId, token, vaccine) => {
  return fetch(`${API}/vaccines/${vaccineId}/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(vaccine),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getVaccinationSchedule = (vaccinationId) => {
  return fetch(`${API}/vaccinations/${vaccinationId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateVaccinationSchedule = (
  vaccinationId,
  userId,
  token,
  vaccination
) => {
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

export const removeVaccinationSchedule = (vaccinationId, userId, token) => {
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

export const listByMedicalStaff = (userId, token) => {
  return fetch(`${API}/vaccinations/by/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
