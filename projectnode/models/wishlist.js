const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config"); //help me to read and create from the config file json

const wishlistsSchema = new mongoose.Schema(
  {
    user_id: {
      //How create the card
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    card_id: {
      //How create the card
      type: mongoose.Types.ObjectId,
      ref: "Card",
    },
  },
  {
    timestamps: true,
  }
);

const Wishlist = mongoose.model("Wishlist", wishlistsSchema, "wishlists");

module.exports = {
  Wishlist,
};
