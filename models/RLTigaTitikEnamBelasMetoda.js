import { DataTypes, QueryTypes } from "sequelize";
import { databaseSIRS } from "../config/Database.js";

export const MetodaRLTigaTitikEnamBelas = databaseSIRS.define(
  "rl_tiga_titik_enam_belas_metoda",
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

export const JenisPelayananKeluargaberencana = databaseSIRS.define(
  "rl_tiga_titik_enam_belas_jenis_pelayanan_keluarga_berencana",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nama: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);
