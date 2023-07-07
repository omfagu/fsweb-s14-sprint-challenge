// `/api/resources` router buraya
const router = require("express").Router();
const resourceModel = require("./model");
const mw = require("./middleware");

router.get("/", async (req, res, next) => {
  try {
    const allData = await resourceModel.getAll();
    res.json(allData);
  } catch (error) {
    next(error);
  }
});
router.post("/", mw.validatePayload, async (req, res, next) => {
  try {
    let insertModel = {
      resource_name: req.body.resource_name,
      resource_description: req.body.resource_description,
    };
    const insertedResource = await resourceModel.create(insertModel);
    res.status(201).json(insertedResource);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
