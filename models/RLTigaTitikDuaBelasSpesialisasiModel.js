import { DataTypes, QueryTypes } from "sequelize";
import { databaseSIRS } from "../config/Database.js";

export const SpesialisasiRLTigaTitikDuaBelas = databaseSIRS.define(
  "rl_tiga_titik_dua_belas_spesialisasi",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nama_spesialisasi: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);
