function connectionToDB() {
  const knex = require("knex")({
    client: "pg",
    connection:
      "postgres://mahi:7nfoNMtE0XZRJubfeSV4q8kOFmNyDZgV@dpg-chd1mrl269vdj68g8e70-a.oregon-postgres.render.com/facerecognition_mkxq",
  });

  knex
    .raw("SELECT 1")
    .then(() => {
      console.log("Database connection successful");
    })
    .catch((error) => {
      console.error("Database connection failed:", error);
    });
}

module.exports = connectionToDB;
