import { DataTypes, QueryTypes } from "sequelize";
import { databaseSIRS } from "../config/Database.js";

export const icd = databaseSIRS.define(
  "icd",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    icd_code: {
      type: DataTypes.STRING,
    },
    nama: {
      type: DataTypes.STRING,
    },
    rl_able: {
      type: DataTypes.INTEGER,
    },
    description_code: {
      type: DataTypes.STRING,
    },
    icd_code_group: {
      type: DataTypes.STRING,
    },
    description_code_group: {
      type: DataTypes.STRING,
    },
    status_top_10: {
      type: DataTypes.INTEGER,
    },
    status_rawat_inap: {
      type: DataTypes.INTEGER,
    },
    status_rawat_jalan: {
      type: DataTypes.INTEGER,
    },
    status_laki: {
      type: DataTypes.INTEGER,
    },
    status_perempuan: {
      type: DataTypes.INTEGER,
    },
    is_active: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);
