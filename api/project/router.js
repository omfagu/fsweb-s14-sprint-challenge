//  `/api/projects` router buraya
const router = require("express").Router();
const projectModel = require("./model");
const mw = require("./middleware");

router.get("/", async (req, res, next) => {
  try {
    const allData = await projectModel.getAll();
    res.json(allData);
  } catch (error) {
    next(error);
  }
});
router.post("/", mw.validatePayload, async (req, res, next) => {
  try {
    let insertModel = {
      project_name: req.body.project_name,
      project_description: req.body.project_description,
      project_completed: req.body.project_completed,
    };
    const insertedProject = await projectModel.create(insertModel);
    res.status(201).json(insertedProject);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
