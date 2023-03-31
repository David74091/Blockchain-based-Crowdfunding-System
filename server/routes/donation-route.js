const router = require("express").Router();
const Case = require("../models").caseModel;

router.use((req, res, next) => {
  console.log("請求已進入donation api...");
  next();
});


router.post('/cases/:id/donor', async (req, res) => {
    try {
      const caseId = req.params.id;
      const newDonorId = req.body.donorId;
      const newDonorAmount = req.body.amount;
  
      const updatedCase = await Case.findOneAndUpdate(
        { _id: caseId },
        { $push: { donor: { _id: newDonorId, amount: newDonorAmount } } },
        { new: true }
      ).populate('proposer').populate('donor');
  
      res.json(updatedCase);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  module.exports = router;