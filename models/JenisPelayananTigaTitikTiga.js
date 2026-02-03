import { DataTypes, QueryTypes } from "sequelize";
import { databaseSIRS } from "../config/Database.js";

export const jenisPelayananTigaTitikTiga = databaseSIRS.define(
  "rl_tiga_titik_tiga_jenis_pelayanan",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    no: {
      type: DataTypes.INTEGER,
    },
    nama: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);
