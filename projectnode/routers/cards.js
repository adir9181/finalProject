const express = require("express");
const router = express.Router();
const { validateCard, generateBizNumber, Card } = require("../models/cards");
const auth = require("../middleware/auth");
const { Wishlist } = require("../models/wishlist");

router.get("/my-cards", auth, async (req, res) => {
  if (!req.user.biz) {
    return res.status(401).send("Access Denied");
  }
  const { search } = req.query;
  const searchCondition = {}
  if (search) {
    searchCondition.$or = [
      { bizName: { $regex: '.*' + search + '.*', $options: 'i' } },
      { bizDescription: { $regex: '.*' + search + '.*', $options: 'i' } },
      { bizAddress: { $regex: '.*' + search + '.*', $options: 'i' } },
      { bizPhone: { $regex: '.*' + search + '.*', $options: 'i' } }
    ]
  }
  const cards = await Card.find({ user_id: req.user._id, ...searchCondition });
  res.json(cards);
});

router.get("/all", auth, async (req, res) => {
  const { search } = req.query;
  const searchCondition = {}
  if (search) {
    searchCondition.$or = [
      { bizName: { $regex: '.*' + search + '.*', $options: 'i' } },
      { bizDescription: { $regex: '.*' + search + '.*', $options: 'i' } },
      { bizAddress: { $regex: '.*' + search + '.*', $options: 'i' } },
      { bizPhone: { $regex: '.*' + search + '.*', $options: 'i' } }
    ]
  }
  const cards = await Card.find(searchCondition);
  res.json(cards);
});

router.post("/add-wishlist", auth, async (req, res) => {
  const { userId, cardId } = req.body;
  if (!userId || !cardId) {
    return res.status(400).send({ error: "Invalid request" });
  }
  try {
    const wish = new Wishlist({
      user_id: userId, card_id: cardId
    })
    await wish.save()
    res.json(wish);
  } catch (e) {
    console.log(error)
    res.status(400).send({ error, message: "Server error" });
  }
})

router.post("/remove-wishlist", auth, async (req, res) => {
  const { userId, cardId } = req.body;
  if (!userId || !cardId) {
    return res.status(400).send({ error: "Invalid request" });
  }
  try {
    const wish = await Wishlist.findOneAndDelete({ user_id: userId, card_id: cardId }).exec()
    res.json({ success: true, wish });
  } catch (e) {
    console.log(error)
    res.status(400).send({ error, message: "Server error" });
  }
})

router.get("/get-wishlist", auth, async (req, res) => {
  const user_id = req.user._id
  try {
    const { search } = req.query;
    const match = {}
    if (search) {
      match.$or = [
        { bizName: { $regex: '.*' + search + '.*', $options: 'i' } },
        { bizDescription: { $regex: '.*' + search + '.*', $options: 'i' } },
        { bizAddress: { $regex: '.*' + search + '.*', $options: 'i' } },
        { bizPhone: { $regex: '.*' + search + '.*', $options: 'i' } }
      ]
    }
    const lists = await Wishlist.find({ user_id })
      .populate({
        path: 'card_id',
        match
      }).exec()
    res.json(lists)
  } catch (error) {
    console.log(error)
    res.status(400).send({ error, message: "Server error" });
  }
})

router.post("/", auth, async (req, res) => {
  // validate user's input
  const { error } = validateCard(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  router.get("/search", function (req, res, next) {
    res.render("search");
  });
  // validate system

  // process
  const card = new Card({
    ...req.body,
    bizImage: req.body.bizImage
      ? req.body.bizImage
      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    bizNumber: await generateBizNumber(),
    user_id: req.user._id,
  });

  await card.save();

  // response ok
  res.json(card);
});

router.delete("/:id", auth, async (req, res) => {
  const card = await Card.findOneAndDelete({
    _id: req.params.id,
    user_id: req.user._id,
  });

  if (!card) {
    res.status(404).send("The card with the given ID was not found");
    return;
  }

  res.json(card);
});

router.put("/:id", auth, async (req, res) => {
  // validate user's input
  const { error } = validateCard(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  let card = await Card.findOneAndUpdate(
    {
      _id: req.params.id,
      user_id: req.user._id,
    },
    req.body
  );

  if (!card) {
    res.status(404).send("The card with the given ID was not found");
    return;
  }

  card = await Card.findOne({
    _id: req.params.id,
    user_id: req.user._id,
  });

  res.json(card);
});

router.get("/:id", auth, async (req, res) => {
  const card = await Card.findOne({
    _id: req.params.id,
    user_id: req.user._id,
  });

  if (!card) {
    res.status(404).send("The card with the given ID was not found");
    return;
  }

  res.json(card);
});
/////////////////////////////////////////////////////
router.get("/", auth, async (req, res) => {
  cardAll = await Card.find({ user_id: req.user._id });
  if (cardAll) {
    res.json(cardAll);
    return;
  }
});
//////////////////////////////////////////////////////
module.exports = router;
