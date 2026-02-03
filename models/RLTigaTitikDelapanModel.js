import { DataTypes, QueryTypes } from "sequelize";
import { databaseSIRS } from "../config/Database.js";
import { RLTigaTitikDelapanPemeriksaan, RLTigaTitikDelapanPemeriksaanGroup, RLTigaTitikDelapanPemeriksaanGroupHeader } from "./RLTigaTitikDelapanPemeriksaanModel.js";

export const rlTigaTitikDelapan = databaseSIRS.define("rl_tiga_titik_delapan", {
  rs_id: {
    type: DataTypes.STRING,
  },
  periode: {
    type: DataTypes.DATEONLY,
  },
  user_id: {
    type: DataTypes.STRING,
  },
});

export const rlTigaTitikDelapanDetail = databaseSIRS.define(
  "rl_tiga_titik_delapan_detail",
  {
    rl_tiga_titik_delapan_id: {
      type: DataTypes.INTEGER,
    },
    rs_id: {
      type: DataTypes.STRING,
    },
    periode: {
      type: DataTypes.DATEONLY,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    rl_tiga_titik_delapan_pemeriksaan_id: {
      type: DataTypes.INTEGER,
    },
    jumlahLaki: {
      type: DataTypes.INTEGER,
    },
    jumlahPerempuan: {
      type: DataTypes.INTEGER,
    },
    rataLaki: {
      type: DataTypes.DECIMAL(10,3),
    },
    rataPerempuan: {
      type: DataTypes.DECIMAL(10,3),
    }
  }
);

rlTigaTitikDelapan.hasMany(rlTigaTitikDelapanDetail, {
  foreignKey: "rl_tiga_titik_delapan_id",
});

rlTigaTitikDelapanDetail.belongsTo(rlTigaTitikDelapan, {
  foreignKey: "id",
});

RLTigaTitikDelapanPemeriksaan.hasMany(rlTigaTitikDelapanDetail, {
  foreignKey: "id",
});

rlTigaTitikDelapanDetail.belongsTo(RLTigaTitikDelapanPemeriksaan, {
  foreignKey: "rl_tiga_titik_delapan_pemeriksaan_id",
});

RLTigaTitikDelapanPemeriksaanGroup.hasMany(RLTigaTitikDelapanPemeriksaan, {
  foreignKey: "id",
});

RLTigaTitikDelapanPemeriksaan.belongsTo(RLTigaTitikDelapanPemeriksaanGroup, {
  foreignKey: "rl_tiga_titik_delapan_group_pemeriksaan_id",
});

RLTigaTitikDelapanPemeriksaanGroupHeader.hasMany(RLTigaTitikDelapanPemeriksaanGroup, {
  foreignKey: "id",
});

RLTigaTitikDelapanPemeriksaanGroup.belongsTo(RLTigaTitikDelapanPemeriksaanGroupHeader, {
  foreignKey: "rl_tiga_titik_delapan_group_pemeriksaan_header_id",
});
