const resourceModel = require("./model");
async function validatePayload(req, res, next) {
  try {
    let { resource_name } = req.body;
    if (!resource_name) {
      res.status(400).json({ message: "Eksik alan var" });
    } else {
      const isExist = await resourceModel.getByResourceName(resource_name);
      if (isExist) {
        res.status(400).json({ message: "zaten mevcut" });
      } else {
        next();
      }
    }
  } catch (error) {
    next(error);
  }
}
module.exports = {
  validatePayload,
};
