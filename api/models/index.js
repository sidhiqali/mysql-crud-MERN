import dbConfig from "../config/db.config.js";
import Sequelize from "sequelize";
import defineBookModel from "./book.js";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.books = defineBookModel(sequelize);

db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});

export default db;
