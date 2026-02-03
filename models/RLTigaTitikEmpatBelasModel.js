import { DataTypes, QueryTypes } from "sequelize";
import { databaseSIRS } from "../config/Database.js";
import { RLTigaTitikEmpatBelasJenisKegiatan } from "./RLTigaTitikEmpatBelasJenisKegiatanModel.js";

export const rlTigaTitikEmpatBelas = databaseSIRS.define("rl_tiga_titik_empat_belas", {
  rs_id: {
    type: DataTypes.STRING,
  },
  tahun: {
    type: DataTypes.INTEGER,
  },
  user_id: {
    type: DataTypes.STRING,
  },
});

export const rlTigaTitikEmpatBelasDetail = databaseSIRS.define(
  "rl_tiga_titik_empat_belas_detail",
  {
    rl_tiga_titik_empat_belas_id: {
      type: DataTypes.INTEGER,
    },
    rs_id: {
      type: DataTypes.STRING,
    },
    tahun: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    rl_tiga_titik_empat_belas_jenis_kegiatan_id: {
      type: DataTypes.INTEGER,
    },
    jumlah: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
  }
);

rlTigaTitikEmpatBelas.hasMany(rlTigaTitikEmpatBelasDetail, {
  foreignKey: "rl_tiga_titik_empat_belas_id",
});

rlTigaTitikEmpatBelasDetail.belongsTo(rlTigaTitikEmpatBelas, {
  foreignKey: "id",
});

RLTigaTitikEmpatBelasJenisKegiatan.hasMany(rlTigaTitikEmpatBelasDetail, {
  foreignKey: "id",
});

rlTigaTitikEmpatBelasDetail.belongsTo(RLTigaTitikEmpatBelasJenisKegiatan, { 
  as: 'rl_tiga_titik_empat_belas_jenis_kegiatan',
  foreignKey: "rl_tiga_titik_empat_belas_jenis_kegiatan_id",
});
