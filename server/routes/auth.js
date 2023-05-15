const router = require("express").Router();
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const User = require("../models").userModel;
const jwt = require("jsonwebtoken");

router.use((req, res, next) => {
  console.log("請求已進入auth.js了");
  next();
});

router.get("/testAPI", (req, res) => {
  const msgObject = {
    message: "Test API 正常運作中",
  };
  return res.json(msgObject);
});

//post跟get都可以使用，但post在傳遞訊息時比較安全，不會將資料顯示在url上
router.post("/register", async (req, res) => {
  console.log("Register!!!");
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //檢查使用者是否存在
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("信箱已被註冊");

  //新用戶註冊
  const newUser = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
    address: req.body.address,
    birth: req.body.birth,
    phoneNumber: req.body.phoneNumber,
    sex: req.body.sex,
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).send({ msg: "使用者儲存成功", saveObject: savedUser });
  } catch (err) {
    res.status(400).send("使用者無法儲存");
    console.log("註冊出錯", err);
  }
});

router.get("/userData/:_id", async (req, res) => {
  let { _id } = req.params;
  User.findOne({ _id })

    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.post("/login", async (req, res) => {
  //check the validaton of data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      res.status(400).send(err);
    }
    if (!user) {
      res.status(401).send("找不到使用者");
    } else {
      user.comparePasswords(req.body.password, function (err, isMatch) {
        if (err) return res.status(400).send(err);
        if (isMatch) {
          const tokenObject = { _id: user._id, email: user.email };
          const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
          res.send({ succes: true, token: "JWT " + token, user });
        } else {
          res.status(401).send("密碼錯誤");
        }
      });
    }
  }).populate("organize");
});

module.exports = router;
