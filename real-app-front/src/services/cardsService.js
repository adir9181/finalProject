import httpService from "./httpService";
import config from "../config.json";

export function createCard(card) {
  return httpService.post(`${config.apiUrl}/cards`, card);
}

export function getMyCards(title="") {
  return httpService.get(`${config.apiUrl}/cards/my-cards?search=${title}`);
}

export function getCard(id) {
  return httpService.get(`${config.apiUrl}/cards/${id}`);
}

export function editCard({ _id, ...card }) {
  return httpService.put(`${config.apiUrl}/cards/${_id}`, card);
}

export function deleteCard(id) {
  return httpService.delete(`${config.apiUrl}/cards/${id}`);
}

export function getAllCards(title="") {
  return httpService.get(`${config.apiUrl}/cards/all?search=${title}`)
}

export function addToWishlist(userId, cardId) {
  return httpService.post(`${config.apiUrl}/cards/add-wishlist`, {userId, cardId})
}

export function getMyWishlist(title="") {
  return httpService.get(`${config.apiUrl}/cards/get-wishlist?search=${title}`)
}

export function removeFromWishlist(userId, cardId) {
  return httpService.post(`${config.apiUrl}/cards/remove-wishlist`, {userId, cardId})
}

const cardsService = {
  createCard,
  getMyCards,
  getCard,
  editCard,
  deleteCard,
  getAllCards,
  addToWishlist,
  removeFromWishlist,
  getMyWishlist
};

export default cardsService;
