import { DataTypes, QueryTypes } from "sequelize";
import { databaseSIRS } from "../config/Database.js";
import { golonganObatTigaTitikSembilanBelas } from "./GolonganObatTigaTitikSembilanBelas.js";

//new------------------------------------------------------------------------------------------------------------------
export const rlTigaTitikSembilanBelas = databaseSIRS.define(
  "rl_tiga_titik_sembilan_belas",
  {
    rs_id: {
      type: DataTypes.STRING,
    },
    tahun: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.STRING,
    },
  }
);

export const rlTigaTitikSembilanBelasDetail = databaseSIRS.define(
  "rl_tiga_titik_sembilan_belas_detail",
  {
    rl_tiga_titik_sembilan_belas_id: {
      type: DataTypes.INTEGER,
    },
    rs_id: {
      type: DataTypes.STRING,
    },
    tahun: {
      type: DataTypes.INTEGER,
    },
    golongan_obat_rl_tiga_titik_sembilan_belas_id: {
      type: DataTypes.INTEGER,
    },
    ranap_pasien_keluar: {
      type: DataTypes.INTEGER,
    },
    ranap_lama_dirawat: {
      type: DataTypes.INTEGER,
    },
    jumlah_pasien_rajal: {
      type: DataTypes.INTEGER,
    },
    rajal_lab: {
      type: DataTypes.INTEGER,
    },
    rajal_radiologi: {
      type: DataTypes.INTEGER,
    },
    rajal_lain_lain: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
  }
);

rlTigaTitikSembilanBelas.hasMany(rlTigaTitikSembilanBelasDetail, {
  foreignKey: "rl_tiga_titik_sembilan_belas_id",
});

rlTigaTitikSembilanBelasDetail.belongsTo(rlTigaTitikSembilanBelas, {
  foreignKey: "id",
});

golonganObatTigaTitikSembilanBelas.hasMany(rlTigaTitikSembilanBelasDetail, {
  foreignKey: "id",
});

rlTigaTitikSembilanBelasDetail.belongsTo(golonganObatTigaTitikSembilanBelas, {
  as: "golongan_obat_rl_tiga_titik_sembilan_belas",
  foreignKey: "golongan_obat_rl_tiga_titik_sembilan_belas_id",
});
