const router = require("express").Router();
const Organize = require("../models").organizeModel;

router.use((req, res, next) => {
  console.log("請求已進入organize API");
  next();
});

//創建提案身份
router.post("/", async (req, res) => {
  console.log("請求已進入創建提案身份的API");
  const {
    userId,
    organizeImage,
    organizeName,
    personName,
    idNumber,
    phoneNumber,
    email,
    introduction,
  } = req.body;

  let newOrganize = new Organize({
    creator: userId,
    organizeImage,
    organizeName,
    personName,
    idNumber,
    phoneNumber,
    email,
    introduction,
  });

  try {
    const savedOrganize = await newOrganize.save();
    res
      .status(200)
      .json({ message: "新提案身份已創建！", _id: savedOrganize._id });
  } catch (err) {
    res.status(500).send("提案身份創建失敗！", err);
  }
});

router.post("/pushcase/:OrganizeId", async (req, res) => {
  console.log("請求已進入pushcase 的API");
  const { OrganizeId } = req.params;
  const { caseId } = req.body;
  try {
    const updatedOrganize = await Organize.findOneAndUpdate(
      { _id: OrganizeId },
      { $push: { CasesCreated: caseId } },
      { new: true }
    );
    res.status(200).json(updatedOrganize);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/getorganize/:_id", async (req, res) => {
  console.log("請求已進入getOrganize的API");
  const { _id } = req.params;
  Organize.findOne({
    creator: _id,
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

module.exports = router;
