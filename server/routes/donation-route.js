const router = require("express").Router();
const Donation = require("../models").donationModel;
const Case = require("../models").caseModel;
router.use((req, res, next) => {
  console.log("請求已進入donation api...");
  next();
});
//管理員將捐款驗證至區塊鏈上
router.put("/verified/:_id", async (req, res) => {
  console.log("請求已進入驗證donations的api");
  let { _id } = req.params;
  let donations = await Donation.findById({ _id });
  if (!donations) {
    res.status(404);
    return res.json({ success: false, message: "沒有找到金流" });
  }
  if (donations.Verified === true) {
    res.status(404).send("請勿重複驗證");
  } else {
    Donation.findByIdAndUpdate(_id, { Verified: true }, { new: true }) //findByIdAndUpdate() 方法更新文檔時，該選項控制返回的文檔是更新前還是更新後的版本。
      // new: true：返回更新後的文檔。這意味著你將看到已經應用了更新操作的文檔。
      // new: false（默認）：返回更新前的文檔。這意味著你將看到更新操作之前的原始文檔。
      .then(() => {
        res.status(200).send("成功驗證");
      })
      .catch((err) => {
        res.status(404).send("無法驗證", err);
      });
  }
});
//將驗證捐款後產生的交易hash放置指定的捐款上
router.put("/hash/:_id", async (req, res) => {
  console.log("請求已經入交易hash放置API");
  let { _id } = req.params;
  let { _hash } = req.body;
  try {
    await Donation.findByIdAndUpdate(_id, { hash: _hash }, { new: true });
    res.status(200).send("交易hash放置成功！");
  } catch (err) {
    res.status(404).send("交易hash放置失敗", err);
  }
});

//取得個人捐款紀錄
router.get("/getDonationHistory/:_id", async (req, res) => {
  console.log("請求已進入取得個人捐款紀錄的API");
  let { _id } = req.params;
  try {
    let history = await Donation.find({ donor: _id }).populate("belong", [
      "image",
      "title",
    ]);
    res.status(200).json(history);
  } catch {
    (err) => {
      res.status(404).send(err);
    };
  }
});

//取得還沒驗證的捐款
router.get("/getdonations/false", async (req, res) => {
  console.log("請求已進入get donations False的API");
  try {
    const donations = await Donation.find({ Verified: false }).populate(
      "belong"
    );
    res.status(200).json(donations);
  } catch (err) {
    res.status(404).send("取得所有donations失敗", err);
  }
});

router.get("/getdonations", async (req, res) => {
  console.log("請求已進入get donations的API");
  try {
    const donations = await Donation.find().populate("belong");
    res.status(200).json(donations);
  } catch (err) {
    res.status(404).send("取得所有donations失敗", err);
  }
});

//捐款
router.post("/pushdonation", async (req, res) => {
  console.log("請求已進入捐款的API");
  try {
    const { caseId, donorId, amount } = req.body;
    console.log("caseApi:caseId,donorId,amount", caseId, donorId, amount);
    const theCase = await Case.findById(caseId);
    const newDonation = new Donation({
      belong: caseId,
      donor: donorId,
      amount: amount,
      donateDate: new Date(),
    });
    await newDonation.save();

    // 將捐款添加到相應的案例
    const caseToUpdate = await Case.findById(caseId);
    caseToUpdate.donations.push(newDonation);
    await caseToUpdate.save();

    res.status(200).json(newDonation);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

//管理員驗證金流
router.put("/verified/:_id", async (req, res) => {
  console.log("請求已進入驗證提案的api");
  let { _id } = req.params;
  let cases = await Case.findById({ _id });
  if (!cases) {
    res.status(404);
    return res.json({ success: false, message: "沒有找到金流" });
  }
  if (cases.Verified === true) {
    res.status(404).send("請勿重複驗證");
  } else {
    Case.findByIdAndUpdate(_id, { Verified: true }, { new: true })
      .then(() => {
        res.status(200).send("成功驗證");
      })
      .catch((err) => {
        res.status(404).send("無法驗證", err);
      });
  }
});

module.exports = router;
