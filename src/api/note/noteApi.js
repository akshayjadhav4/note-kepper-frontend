const { API } = require("../backend");

export const createNote = (userId, token, note) => {
  return fetch(`${API}/note/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(note),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const updateNote = (userId, token, noteId, note) => {
  return fetch(`${API}/note/update/${userId}/${noteId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(note),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const deleteNote = (userId, token, noteId) => {
  return fetch(`${API}/note/delete/${userId}/${noteId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const getAllNotes = (userId, token) => {
  return fetch(`${API}/notes/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};
