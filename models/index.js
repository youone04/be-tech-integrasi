import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import ModelDataBarang from "./ModelDataBarang.js";
import ModelUser from "./ModelUser.js";

const dbs = {};
dbs.Sequelize = Sequelize;
dbs.db = db;

dbs.barang = ModelDataBarang(db , Sequelize);
dbs.user = ModelUser(db , Sequelize);

export default dbs;