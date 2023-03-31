const router = require("express").Router();
const Case = require("../models").caseModel;
const caseValidation = require("../validation").caseValidation;

router.use((req, res, next) => {
  console.log("請求已進入api...");
  next();
});

//尋找全部案子
router.get("/", (req, res) => {
  console.log("請求進入尋找全部的API");

  Case.find({})
    .populate("proposer", ["username", "email"])
    .then((cases) => {
      res.send(cases);
    })
    .catch(() => {
      res.status(500).send("錯誤！！無法找到案子");
    });
});

//根據關鍵字查找案子
router.get("/findByName/:name", (req, res) => {
  let { name } = req.params;
  Case.find({ title: { $regex: name } }) //只要其中一個字符合就全部抓出來
    .populate("proposer", ["username", "email"])
    .then((cases) => {
      res.status(200).send(cases);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

//查找捐贈者捐贈案子
router.get("/donor/:_donor_id", (req, res) => {
  let { _donor_id } = req.params;
  Case.find({ donor: _donor_id })
    .populate("proposer", ["username", "email"])
    .then((cases) => {
      res.status(200).send(cases);
    })
    .catch(() => {
      res.status(500).send("Cannot get data.");
    });
});

//根據_id尋找課程
router.get("/:_id", (req, res) => {
  let { _id } = req.params;
  Case.findOne({ _id })
    .populate("proposer", ["email"])
    .then((cases) => {
      res.send(cases);
    })
    .catch((err) => {
      res.send(err);
    });
});

//尋找所有提案
router.get("/proposer/:_proposer_id", (req, res) => {
  console.log("請求進入尋找id的API");
  let { _proposer_id } = req.params;
  Case.find({}) //查找資料庫內instructor == _proposer_id的資料
    .populate("proposer", ["username", "email"])
    .then((data) => {
      res.send(data);
      console.log("資料在此", data);
    })
    .catch((err) => {
      res.status(500).send("找不到案子資訊");
    });
});
//根據提案人的id尋找提案
router.get("/proposer/:_proposer_id", (req, res) => {
  console.log("請求進入尋找id的API");
  let { _proposer_id } = req.params;
  Case.find({ proposer: _proposer_id }) //查找資料庫內instructor == _proposer_id的資料
    .populate("proposer", ["username", "email"])
    .then((data) => {
      res.send(data);
      console.log("資料在此", data);
    })
    .catch((err) => {
      res.status(500).send("找不到案子資訊");
    });
});

//上傳提案與提案單位
router.post("/", async (req, res) => {
  //validate the inputs before making a new course
  const { error } = caseValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let {
    title,
    description,
    target,
    deadline,
    image,
    organizeImage,
    organizeName,
    personName,
    idNumber,
    phoneNumber,
    email,
    introduction,
  } = req.body;

  //   if(req.user.isStudent()) 報錯-isStudent() not a function
  if (req.user.role == "donor") {
    res.status(400).send("只有提案者可以發布提案");
  }

  let newCase = new Case({
    title,
    description,
    target,
    deadline,
    image,
    proposer: req.user._id,
    organizeImage,
    organizeName,
    personName,
    idNumber,
    phoneNumber,
    email,
    introduction,
  });

  try {
    await newCase.save();
    res.status(200).send("新案子已經創建");
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/donate/:_id", async (req, res) => {
  let { _id } = req.params;
  let { user_id } = req.body;
  try {
    let cases = await Case.findOne({ _id });
    cases.donor.push(user_id);
    await cases.save();
    res.send("捐款成功");
  } catch (err) {
    res.send(err);
  }
});

router.patch("/:_id", async (req, res) => {
  const { error } = caseValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let { _id } = req.params;
  let cases = await Case.findOne({ _id });
  if (!cases) {
    res.status(404);
    return res.json({ success: false, message: "沒有找到案子" });
  }
  if (cases.proposer.equals(req.user._id) || req.user.isAdmin()) {
    Case.findOneAndUpdate({ _id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then(() => {
        res.send("案子已修改");
      })
      .catch((err) => {
        res.send({
          success: false,
          message: err,
        });
      });
  } else {
    res.status(403);
    return res.json({
      success: false,
      message: "只有該案子的提案人或管理員可以修改案子資訊",
    });
  }
});

router.delete("/:_id", async (req, res) => {
  let { _id } = req.params;
  let cases = await Case.findOne({ _id });
  if (!cases) {
    res.status(404);
    return res.json({ success: false, message: "沒有找到案子" });
  }

  if (cases.proposer.equals(req.user._id) || req.user.isAdmin()) {
    Case.deleteOne({ _id })
      .then(() => {
        res.send("案子已刪除");
      })
      .catch((err) => {
        res.send({
          success: false,
          message: err,
        });
      });
  } else {
    res.status(403);
    return res.json({
      success: false,
      message: "只有該案子的提案人或管理員可以刪除案子資訊",
    });
  }
});

module.exports = router;
