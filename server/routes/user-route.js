const router = require("express").Router();
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const User = require("../models").userModel;

router.use((req, res, next) => {
  console.log("請求已進入user-route.js了");
  next();
});

//更新個人資料
router.put("/update/:_id", async (req, res) => {
  console.log("請求已進入更新個人資料");
  let { _id } = req.params;
  const { picture, email, username, phoneNumber, birth, sex, address } =
    req.body;
  const update = {
    picture: picture,
    email: email,
    username: username,
    phoneNumber: phoneNumber,
    birth: birth,
    sex: sex,
    address: address,
  };
  console.log("update", update);
  User.updateOne({ _id }, { $set: update })
    .then((result) => {
      console.log("result", result);
      res.status(200).send("更新成功");
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send("更新失敗");
    });
});

module.exports = router;
