import { DataTypes, QueryTypes } from "sequelize";
import { databaseSIRS } from "../config/Database.js";

export const jenisKegiatanTigaTitikLimaBelas = databaseSIRS.define(
  "rl_tiga_titik_lima_belas_jenis_kegiatan",
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

// export const groupJenisKegiatanTigaTitikLimaBelas = databaseSIRS.define(
//   "group_jenis_kegiatan",
//   {
//     no: {
//       type: DataTypes.STRING,
//     },
//     nama: {
//       type: DataTypes.STRING,
//     },
//     group_jenis_kegiatan_header_id: {
//       type: DataTypes.INTEGER,
//     },
//   }
// );

// export const groupJenisKegiatanTigaTitikLimaBelasHeader = databaseSIRS.define(
//   "group_jenis_kegiatan_header",
//   {
//     nama: {
//       type: DataTypes.STRING,
//     },
//   }
// );
// export const jenisGroupKegiatanTigaTitikLimaBelasHeader = databaseSIRS.define(
//   "group_jenis_kegiatan_header",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//     },

//     nama: {
//       type: DataTypes.STRING,
//     },

//     no: {
//       type: DataTypes.STRING,
//     },
//   },
//   {
//     freezeTableName: true,
//   }
// );

// jenisGroupKegiatanTigaTitikLimaBelasHeader.hasMany(
//   jenisKegiatanTigaTitikLimaBelas,
//   { foreignKey: "id" }
// );
// jenisKegiatanTigaTitikLimaBelas.belongsTo(
//   jenisGroupKegiatanTigaTitikLimaBelasHeader,
//   {
//     foreignKey: "group_jenis_kegiatan_id",
//   }
// );
