import axios from "axios";

const buyerAPI = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL });

buyerAPI.interceptors.request.use((req) => {
  console.log('hello')
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

const sellerAPI = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL });

sellerAPI.interceptors.request.use((req) => {
  if (localStorage.getItem("seller_profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("seller_profile")).token
    }`;
  }
  return req;
});

const API = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL });
export const fetchAllPosts = () => API.get("/artworks");

export const login = (formData) => buyerAPI.post("/user/login", formData);
export const register = (formData) => buyerAPI.post("/user/register", formData);
export const deleteUser = (id) => buyerAPI.delete(`/user/${id}`);
export const getInfo = (id) => buyerAPI.get(`/user/${id}`);
export const updateInfo = (id, updatedInfo) =>
  buyerAPI.patch(`/user/${id}`, updatedInfo);
export const resetPwd = (id, formData) =>
  buyerAPI.patch(`/user/resetPwd/${id}`, formData);
export const getSubscriptionInfo = (customer) =>
  buyerAPI.post(`/subs/stripe/checksubs`, { ...customer });

export const s_register = (formData) =>
  sellerAPI.post("/seller/s_register", formData);
export const s_login = (formData) =>
  sellerAPI.post("/seller/s_login", formData);
export const deleteSeller = (id) => sellerAPI.delete(`/seller/${id}`);
export const forgotPwd = (email) => sellerAPI.post("/seller/forgotPwd", email);
export const s_getInfo = (id) => sellerAPI.get(`/seller/${id}`);
export const s_updateInfo = (id, updatedInfo) =>
  sellerAPI.patch(`/seller/${id}`, updatedInfo);

export const s_getSubscriptionInfo = (customer) =>
  buyerAPI.post(`/subsseller/stripe/checksubs`, { ...customer });

export const likePost = (id) => {
  buyerAPI.patch(`/artworks/${id}/likePost`)};

export const fetchPosts = (id) => sellerAPI.get(`/artworks/${id}`);
export const add_artwork = (newArtwork) =>
  sellerAPI.post("/artworks", newArtwork);
export const updateArtwork = (id, updatedPost) =>
  sellerAPI.patch(`/artworks/${id}`, updatedPost);
export const deletePost = (id) => sellerAPI.delete(`/artworks/${id}`);
