// `Proje` modeli buraya
const db = require("../../data/dbConfig");

async function getAll() {
  let allProjects = await db("projects");
  let mapped = allProjects.map((x) => {
    return {
      ...x,
      project_completed: x.project_completed == 1,
    };
  });
  return mapped;
}
async function getById(project_id) {
  let project = await db("projects").where("project_id", project_id).first();
  project.project_completed = project.project_completed == 1;
  return project;
}
async function create(model) {
  let [project_id] = await db("projects").insert(model);
  return getById(project_id);
}

module.exports = { getAll, create, getById };
