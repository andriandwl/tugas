const BASE_URL = "https://jcc.brandingyou.id/api";

function getAccessToken() {
  return localStorage.getItem("accessToken");
}

function putAccessToken(accessToken) {
  return localStorage.setItem("accessToken", accessToken);
}

async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}
async function login({ username, password }) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const responseJson = await response.json();
  if (responseJson.meta.status !== "success") {
    alert(responseJson.meta.message);
    return { meta: true, data: null };
  }

  return { meta: false, data: responseJson.data };
}

async function register({ name, email, username, password }) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify({ name, email, username, password }),
  });

  const responseJson = await response.json();

  if (responseJson.meta.status !== "success") {
    alert(responseJson.meta.message);
    return { meta: true };
  }

  return { meta: false };
}

async function getPost() {
  const response = await fetchWithToken(`${BASE_URL}/post`);
  const responseJson = await response.json();

  if (responseJson.meta.status !== "success") {
    return { meta: true, data: null };
  }

  return { meta: false, data: responseJson.data };
}

async function getPst(id) {
  const response = await fetchWithToken(`${BASE_URL}/post/${id}`);
  const responseJson = await response.json();

  if (responseJson.meta.status !== "success") {
    return { meta: true, data: null };
  }

  return { meta: false, data: responseJson.data };
}

async function addPost({ title, content, image }) {
  const response = await fetchWithToken(`${BASE_URL}/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      title,
      content,
      image,
    }),
  });

  const responseJson = await response.json();

  if (responseJson.meta.status !== "success") {
    return {
      meta: true,
      data: null,
    };
  }

  return {
    meta: false,
    data: responseJson.data,
  };
}
async function deletePost(id) {
  const response = await fetchWithToken(`${BASE_URL}/post/${id}`, {
    method: "DELETE",
  });

  const responseJson = await response.json();

  if (responseJson.meta.status !== "success") {
    return { meta: true, data: null };
  }

  return { meta: false, data: responseJson.data };
}

async function editPost(id) {
  const response = await fetchWithToken(`${BASE_URL}/post/${id}`, {
    method: "PUT",
  });

  const responseJson = await response.json();

  if (responseJson.meta.status !== "success") {
    return { meta: true, data: null };
  }

  return { meta: false, data: responseJson.data };
}

export {
  login,
  register,
  putAccessToken,
  deletePost,
  fetchWithToken,
  getPost,
  addPost,
  getAccessToken,
  editPost,
  getPst,
};
