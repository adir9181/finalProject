const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config"); //help me to read and create from the config file json

const usersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },

  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  biz: {
    type: Boolean,
    required: true,
  },
  reset_token: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  cards: Array,
});

usersSchema.methods.generateAuthToken = function () {
  //get back all the information of the user
  return jwt.sign({ _id: this._id, biz: this.biz }, config.get("jwtKey")); //config.get take the jwtkey from the default.json(secret key)
};

const User = mongoose.model("User", usersSchema, "users");

function validateUser(user) {
  //joi Helps me define more things like .com, @ ....
  const schema = Joi.object({
    // name: Joi.string().min(2).max(255).required(),
    email: Joi.string()
      .required()
      .email({ tlds: { allow: ["com", "net", "il"] } }), //tlds false false מבטל את בדיקת הסיומת של האתר
    password: Joi.string()
      .required()
      .regex(/^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,10}$/),
    name: Joi.string().required().min(2).max(30),
    phone: Joi.string().regex(/^0[0-9]+[-]\d{6,7}$/),

    biz: Joi.boolean().required(),
  });

  return schema.validate(user);
}
function validateCards(data) {
  const schema = Joi.object({
    cards: Joi.array().min(1).required(),
  });
  return schema.validate(data);
}
module.exports = {
  User,
  validateUser,
  validateCards,
};
