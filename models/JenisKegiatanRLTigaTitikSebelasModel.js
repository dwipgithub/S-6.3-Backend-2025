import { DataTypes, QueryTypes } from "sequelize";
import { databaseSIRS } from "../config/Database.js";

export const JenisKegiatanRLTigaTitikSebelas = databaseSIRS.define(
  "rl_tiga_titik_sebelas_jenis_kegiatan",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nama_jenis_kegiatan: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);
