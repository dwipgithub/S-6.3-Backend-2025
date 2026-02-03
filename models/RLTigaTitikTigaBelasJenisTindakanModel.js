import { DataTypes, QueryTypes } from "sequelize";
import { databaseSIRS } from "../config/Database.js";

export const JenisTindakanRLTigaTitikTigaBelas = databaseSIRS.define(
  "rl_tiga_titik_tiga_belas_jenis_tindakan",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    no: {
      type: DataTypes.INTEGER,
    },
    rl_tiga_titik_tiga_belas_jenis_tindakan_header_id: {
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

export const JenisTindakanRLTigaTitikTigaBelasHeader = databaseSIRS.define(
  "rl_tiga_titik_tiga_belas_jenis_tindakan_header",
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
  }
);

JenisTindakanRLTigaTitikTigaBelasHeader.hasMany(
  JenisTindakanRLTigaTitikTigaBelas,
  {
    foreignKey: "rl_tiga_titik_tiga_belas_jenis_tindakan_header_id",
  }
);

JenisTindakanRLTigaTitikTigaBelas.belongsTo(
  JenisTindakanRLTigaTitikTigaBelasHeader,
  {
    foreignKey: "rl_tiga_titik_tiga_belas_jenis_tindakan_header_id",
  }
);
