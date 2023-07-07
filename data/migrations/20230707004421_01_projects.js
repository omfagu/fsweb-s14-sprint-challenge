/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("projects", (t) => {
      t.increments("project_id");
      t.string("project_name").notNullable();
      t.string("project_description");
      t.boolean("project_completed").defaultTo(false, {
        constraintName: "project_table_value",
      });
    })
    .createTable("resources", (t) => {
      t.increments("resource_id");
      t.string("resource_name").notNullable().unique();
      t.string("resource_description");
    })
    .createTable("tasks", (t) => {
      t.increments("task_id");
      t.string("task_description").notNullable();
      t.string("task_notes");
      t.boolean("task_completed").defaultTo(0);
      //ilişki
      t.integer("project_id")
        .notNullable()
        .references("project_id")
        .inTable("projects")
        .onDelete("CASCADE"); //RESTRICT
    })
    .createTable("projects_resources", (t) => {
      t.increments("project_resource_id");
      t.integer("project_id")
        .notNullable()
        .references("project_id")
        .inTable("projects")
        .onDelete("CASCADE"); //RESTRICT
      t.integer("resource_id")
        .notNullable()
        .references("resource_id")
        .inTable("resources")
        .onDelete("CASCADE"); //RESTRICT
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("projects_resources")
    .dropTableIfExists("tasks")
    .dropTableIfExists("resources")
    .dropTableIfExists("projects");
};
