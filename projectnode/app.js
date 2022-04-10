const mongoose = require("mongoose");
const express = require("express");
const apiApp = express();
const morgan = require("morgan");
const user = require("./routers/users");
const authRouter = require("./routers/auth");
const cardsRouter = require("./routers/cards");
const cors = require("cors"); //מאפשר לגשת לכמה פרוקטים שונים
const bcrypt = require("bcrypt");
const { User } = require("./models/users");
// const { application } = require("express");

mongoose //
  .connect("mongodb://localhost/my-First-api")

  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Not connect 2 MongoDB", err));

// Create an admin
try {
  User.findOne({ biz: true }, async function (err, data) {
    if (!data) {
      const admin = new User({
        name: "Adir Shop",
        email: "adir9181@gmail.com",
        password: "Adir!adir",
        biz: true,
      });
      const salt = await bcrypt.genSalt(15);
      admin.password = await bcrypt.hash(admin.password, salt);
      await admin.save();
    }
  });
} catch (error) {
  console.log(error);
}

apiApp.use(cors());
apiApp.use(morgan("dev"));
apiApp.use(express.json());
apiApp.use("/api/users", user);
apiApp.use("/api/auth", authRouter);
apiApp.use("/api/cards", cardsRouter);
apiApp.use("/api/cardAll", cardsRouter);

const PORT = 3900;
apiApp.listen(PORT, () => {
  console.log(`started ${PORT}`);
});
