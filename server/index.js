const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth;
const caseRoute = require("./routes").case;
const passport = require("passport");
require("./config/passport")(passport);
const cors = require("cors");

//connect to db
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("資料庫連接成功");
  })
  .catch((err) => {
    console.error("資料庫連接錯誤", err);
  });

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/user", authRoute);
app.use(
  "/api/cases",
  passport.authenticate("jwt", { session: false }),
  caseRoute
);

app.listen(8080, () => {
  console.log("伺服器成功運行在port8080");
});
