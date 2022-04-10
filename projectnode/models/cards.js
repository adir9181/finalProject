const Joi = require("joi");
const mongoose = require("mongoose");
const _ = require("lodash"); //A library that contains auxiliary functions

const cardSchema = new mongoose.Schema({
  //All the Fields i want in the cards
  bizName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  bizDescription: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  bizAddress: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 400,
  },
  bizPhone: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 10,
  },
  bizImage: {
    type: String,
    required: true,
    minlength: 11,
    maxlength: 1024,
  },
  bizNumber: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 15,
    unique: true,
  },
  user_id: {
    //How create the card
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const Card = mongoose.model("Card", cardSchema, "cards"); //.Model turn it to class

function validateCard(card) {
  const schema = Joi.object({
    bizName: Joi.string().min(2).max(255).required(),
    bizDescription: Joi.string().min(2).max(1024).required(),
    bizAddress: Joi.string().min(2).max(400).required(),
    bizPhone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/),
    bizImage: Joi.string().min(11).max(1024).uri(),
  });

  return schema.validate(card);
}

async function generateBizNumber() {
  //
  while (true) {
    //while (true) is for Eternity loop
    const random = _.random(100, 999_999_999_999_999); //Lodash give me random number
    const card = await Card.findOne({ bizNumber: random }); // If the number dont Exists
    if (!card) {
      return String(random); //He's expecting for text so I'm giving him text back(String)
    }
  }
}

module.exports = {
  Card,
  validateCard,
  generateBizNumber,
};
