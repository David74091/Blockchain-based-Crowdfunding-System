const router = require("express").Router();
const Message = require("../models").messageModel;
const Case = require("../models").caseModel;

router.use((req, res, next) => {
  console.log("請求已進入message API");
  next();
});

router.post("/postmessage", async (req, res) => {
  console.log("請求已進入postmessage API");
  let { message, caseId, userId } = req.body;
  let newMessage = new Message({
    message,
    caseId,
    userId,
  });
  try {
    await newMessage.save();
    res.status(200).send("成功留言！");
  } catch (err) {
    res.status(400).send("留言失敗！", err);
  }
});

router.post("/postreply", async (req, res) => {
  console.log("請求已進入post reply API");
  let { messageId, reply } = req.body;
  try {
    await Message.findOneAndUpdate(
      { _id: messageId },
      { $push: { reply: { message: reply } } },
      { new: true }
    );
    res.status(200).send("回覆成功！");
  } catch (err) {
    console.error(err);
    res.status(500).json("回覆失敗！", err);
  }
});

router.get("/getmessage", async (req, res) => {
  console.log("請求已進入getmessage API");
  let _caseId = req.query.caseId;
  const messages = Message.find({ caseId: _caseId })
    .populate("userId", ["picture", "username"])
    .then((messages) => {
      res.status(200).send(messages);
    })
    .catch((err) => {
      res.status(err.code).send("沒有找到留言", err);
    });
});

module.exports = router;
