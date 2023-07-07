// `/api/tasks` router buraya
const router = require("express").Router();
const taskModel = require("./model");
const mw = require("./middleware");

router.get("/", async (req, res, next) => {
  try {
    const allData = await taskModel.getAll();
    res.json(allData);
  } catch (error) {
    next(error);
  }
});
router.post(
  "/",
  mw.validatePayload,
  mw.validateProjectId,
  async (req, res, next) => {
    try {
      let insertModel = {
        task_description: req.body.task_description,
        task_notes: req.body.task_notes,
        project_id: req.body.project_id,
        task_completed: req.body.task_completed,
      };
      const insertedTask = await taskModel.create(insertModel);
      res.status(201).json(insertedTask);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
