const router = require("express").Router();
const Donation = require("../models").donationModel;
const Case = require("../models").caseModel;
router.use((req, res, next) => {
  console.log("請求已進入donation api...");
  next();
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

module.exports = router;
