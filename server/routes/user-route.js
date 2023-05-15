const router = require("express").Router();
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const User = require("../models").userModel;
const jwt = require("jsonwebtoken");

router.use((req, res, next) => {
  console.log("請求已進入user-route.js了");
  next();
});

//將organize添加進user
router.post("/addorganize/:_id", async (req, res) => {
  console.log("請求已進入添加organize的API");
  const { _id } = req.params;
  const { _organize } = req.body;
  console.log("organizeId", _organize);
  const newOrganize = { organize: _organize };
  try {
    const user = await User.findOneAndUpdate({ _id }, { $set: newOrganize });
    if (user) {
      res.status(200).send("已添加organize");
      console.log("添加身份成功");
    } else {
      res.status(404).send("找不到用戶");
      console.log("添加身份失敗");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("數據操作失敗");
  }
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

//用作更新用戶資料後，刷新localstorage裡的user資訊
router.get("/getcurrentuser/:_id", (req, res) => {
  console.log("請求已進入getcurrentuser的API");
  let _id = req.params;
  User.findOne({ _id: _id })

    .then((user) => {
      const tokenObject = { _id: user._id, email: user.email };
      const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
      res.send({ succes: true, token: "JWT " + token, user });
    })
    .catch((err) => {
      res.status(400).send("getcurrentuser失敗", err);
    });
});

router.get("/getAllUser", (req, res) => {
  console.log("請求已進入取得全部用戶的API");
  User.find()
    .populate("organize")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
