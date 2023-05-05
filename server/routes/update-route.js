const router = require("express").Router();
const Update = require("../models").updateModel;

router.use((req, res, next) => {
  console.log("請求已進入update API");
  next();
});

router.get("/getUpdate/:_id", async (req, res) => {
  console.log("請求已進入getUpdate API");
  const { _id } = req.params;
  try {
    const updateData = await Update.find({ belong: _id });
    res.json(updateData);
  } catch (err) {
    res.json(err);
  }
});

router.post("/postUpdate", async (req, res) => {
  const { _id, title, detail } = req.body;
  const newUpdate = new Update({ belong: _id, title: title, detail: detail });
  try {
    await newUpdate.save();
    res.status(200).send("創建更新成功");
  } catch (err) {
    res.status(404).send("創建更新失敗", err);
  }
});

router.put("/putUpdate/:_id", async (req, res) => {
  console.log("請求已進入到putUpdate的API");
  const { _id } = req.params;
  const { _title, _detail } = req.body;
  try {
    await Update.findByIdAndUpdate(_id, { title: _title, detail: _detail });
    res.status(200).send("更新成功");
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
