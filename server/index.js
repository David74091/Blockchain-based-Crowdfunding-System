const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth;
const caseRoute = require("./routes").case;
const userRoute = require("./routes").user;
const organizeRoute = require("./routes").organize;
const messageRoute = require("./routes").message;
const donationRoute = require("./routes").donation;
const updateRoute = require("./routes").update;
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
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);
app.use("/api/organize", organizeRoute);
app.use("/api/donation", donationRoute);
app.use("/api/update", updateRoute);
app.use(
  "/api/cases",
  // passport.authenticate("jwt", { session: false }),
  caseRoute
);

app.listen(8080, () => {
  console.log("伺服器成功運行在port8080");
});
