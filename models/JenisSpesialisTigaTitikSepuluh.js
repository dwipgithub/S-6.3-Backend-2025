import { DataTypes, QueryTypes } from "sequelize";
import { databaseSIRS } from "../config/Database.js";

export const jenisSpesialisTigaTitikSepuluh = databaseSIRS.define(
  "rl_tiga_titik_sepuluh_jenis_spesialis",
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

// export const RL = databaseSIRS.define("rl", {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//   },
//   nama: {
//     type: DataTypes.STRING,
//   },
// });

// RL.hasMany(jenisSpesialisTigaTitikSepuluh, { foreignKey: "id" });
// jenisSpesialis.belongsTo(RL, { foreignKey: "rl_tiga_titik_enam_id" });
