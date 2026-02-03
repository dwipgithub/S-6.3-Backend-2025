import { DataTypes, QueryTypes } from "sequelize";
import { databaseSIRS } from "../config/Database.js";

export const golonganObatTigaTitikSembilanBelas = databaseSIRS.define(
  "rl_tiga_titik_sembilan_belas_golongan_obat",
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
