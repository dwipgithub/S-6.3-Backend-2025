import { DataTypes, QueryTypes } from "sequelize";
import { databaseSIRS } from "../config/Database.js";
import { IcdRLLimaTitikSatu } from "./IcdRLLimaTitikSatuModel.js";
import { AgeGroups } from "./AgeGroups.js";
import { satu_sehat_id } from "./UserModel.js";

export const rlLimaTitikSatuHeader = databaseSIRS.define("rl_lima_titik_satu", {
  rs_id: {
    type: DataTypes.STRING,
  },
  periode: {
    type: DataTypes.DATEONLY,
  },
  user_id: {
    type: DataTypes.INTEGER,
  },
});

export const rlLimaTitikSatuDetail = databaseSIRS.define(
  "rl_lima_titik_satu_detail",
  {
    rl_lima_titik_satu_id: {
      type: DataTypes.INTEGER,
    },
    rs_id: {
      type: DataTypes.STRING,
    },
    periode: {
      type: DataTypes.DATEONLY,
    },
    icd_id: {
      type: DataTypes.INTEGER,
    },
    jumlah_L_dibawah_1_jam: {
      type: DataTypes.INTEGER,
    },
    jumlah_P_dibawah_1_jam: {
      type: DataTypes.INTEGER,
    },
    jumlah_L_1_sampai_23_jam: {
      type: DataTypes.INTEGER,
    },
    jumlah_P_1_sampai_23_jam: {
      type: DataTypes.INTEGER,
    },
    jumlah_L_1_sampai_7_hari: {
      type: DataTypes.INTEGER,
    },
    jumlah_P_1_sampai_7_hari: {
      type: DataTypes.INTEGER,
    },
    jumlah_L_8_sampai_28_hari: {
      type: DataTypes.INTEGER,
    },
    jumlah_P_8_sampai_28_hari: {
      type: DataTypes.INTEGER,
    },
    jumlah_L_29_hari_sampai_dibawah_3_bulan: {
      type: DataTypes.INTEGER,
    },
    jumlah_P_29_hari_sampai_dibawah_3_bulan: {
      type: DataTypes.INTEGER,
    },
    jumlah_L_3_bulan_sampai_dibawah_6_bulan: {
      type: DataTypes.INTEGER,
    },
    jumlah_P_3_bulan_sampai_dibawah_6_bulan: {
      type: DataTypes.INTEGER,
    },
    jumlah_L_6_bulan_sampai_11_bulan: {
      type: DataTypes.INTEGER,
    },
    jumlah_P_6_bulan_sampai_11_bulan: {
      type: DataTypes.INTEGER,
    },
    jumlah_L_1_sampai_4_tahun: {
      type: DataTypes.INTEGER,
    },
    jumlah_P_1_sampai_4_tahun: {
      type: DataTypes.INTEGER,
    },
    jumlah_L_5_sampai_9_tahun: {
      type: DataTypes.INTEGER,
    },
    jumlah_P_5_sampai_9_tahun: {
      type: DataTypes.INTEGER,
    },
    jumlah_L_10_sampai_14_tahun: {
      type: DataTypes.INTEGER,
    },
    jumlah_P_10_sampai_14_tahun: {
      type: DataTypes.INTEGER,
    },
    jumlah_L_15_sampai_19_tahun: {
      type: DataTypes.INTEGER,
    },
    jumlah_P_15_sampai_19_tahun: {
      type: DataTypes.INTEGER,
    },
    jumlah_L_20_sampai_24_tahun: {
      type: DataTypes.INTEGER,
    },
    jumlah_P_20_sampai_24_tahun: {
      type: DataTypes.INTEGER,
    },
    jumlah_L_25_sampai_29_tahun: {
      type: DataTypes.INTEGER,
    },
    jumlah_P_25_sampai_29_tahun: {
      type: DataTypes.INTEGER,
    },
    jumlah_L_30_sampai_34_tahun: {
      type: DataTypes.INTEGER,
    },
    jumlah_P_30_sampai_34_tahun: {
      type: DataTypes.INTEGER,
    },
    jumlah_L_35_sampai_39_tahun: {
      type: DataTypes.INTEGER,
    },
    jumlah_P_35_sampai_39_tahun: {
      type: DataTypes.INTEGER,
    },
    jumlah_L_40_sampai_44_tahun: {
      type: DataTypes.INTEGER,
    },
    jumlah_P_40_sampai_44_tahun: {
      type: DataTypes.INTEGER,
    },
    jumlah_L_45_sampai_49_tahun: {
      type: DataTypes.INTEGER,
    },
    jumlah_P_45_sampai_49_tahun: {
      type: DataTypes.INTEGER,
    },
    jumlah_L_50_sampai_54_tahun: {
      type: DataTypes.INTEGER,
    },
    jumlah_P_50_sampai_54_tahun: {
      type: DataTypes.INTEGER,
    },
    jumlah_L_55_sampai_59_tahun: {
      type: DataTypes.INTEGER,
    },
    jumlah_P_55_sampai_59_tahun: {
      type: DataTypes.INTEGER,
    },
    jumlah_L_60_sampai_64_tahun: {
      type: DataTypes.INTEGER,
    },
    jumlah_P_60_sampai_64_tahun: {
      type: DataTypes.INTEGER,
    },
    jumlah_L_65_sampai_69_tahun: {
      type: DataTypes.INTEGER,
    },
    jumlah_P_65_sampai_69_tahun: {
      type: DataTypes.INTEGER,
    },
    jumlah_L_70_sampai_74_tahun: {
      type: DataTypes.INTEGER,
    },
    jumlah_P_70_sampai_74_tahun: {
      type: DataTypes.INTEGER,
    },
    jumlah_L_75_sampai_79_tahun: {
      type: DataTypes.INTEGER,
    },
    jumlah_P_75_sampai_79_tahun: {
      type: DataTypes.INTEGER,
    },
    jumlah_L_80_sampai_84_tahun: {
      type: DataTypes.INTEGER,
    },
    jumlah_P_80_sampai_84_tahun: {
      type: DataTypes.INTEGER,
    },
    jumlah_L_diatas_85_tahun: {
      type: DataTypes.INTEGER,
    },
    jumlah_P_diatas_85_tahun: {
      type: DataTypes.INTEGER,
    },

    jumlah_kasus_baru_L: {
      type: DataTypes.INTEGER,
    },
    jumlah_kasus_baru_P: {
      type: DataTypes.INTEGER,
    },
    total_kasus_baru: {
      type: DataTypes.INTEGER,
    },
    jumlah_kunjungan_L: {
      type: DataTypes.INTEGER,
    },
    jumlah_kunjungan_P: {
      type: DataTypes.INTEGER,
    },
    total_jumlah_kunjungan: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
  }
);

export const rlLimaTitikSatuSatuSehat = databaseSIRS.define(
  "rl_lima_titik_satu_satusehat",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    organization_id: DataTypes.STRING,
    periode: DataTypes.DATEONLY,
    icd_10: DataTypes.STRING,
    diagnosis: DataTypes.STRING,
    age_id: DataTypes.STRING,
    male_new_cases: DataTypes.INTEGER,
    females_new_cases: DataTypes.INTEGER,
    total_new_cases: DataTypes.INTEGER,
    male_visits: DataTypes.INTEGER,
    female_visits: DataTypes.INTEGER,
    total_visits: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    modified_at: DataTypes.DATE,
  }
);

rlLimaTitikSatuHeader.hasMany(rlLimaTitikSatuDetail, {
  foreignKey: "rl_lima_titik_satu_id",
});
rlLimaTitikSatuDetail.belongsTo(rlLimaTitikSatuHeader, {
  foreignKey: "id",
});

IcdRLLimaTitikSatu.hasMany(rlLimaTitikSatuDetail, {
  foreignKey: "id",
});
rlLimaTitikSatuDetail.belongsTo(IcdRLLimaTitikSatu, {
  foreignKey: "icd_id",
});

// Satu AgesGroup bisa punya banyak RLLimaSatu
AgeGroups.hasMany(rlLimaTitikSatuSatuSehat, { foreignKey: "age_id" });

// RLLimaSatu punya satu AgesGroup
rlLimaTitikSatuSatuSehat.belongsTo(AgeGroups, { foreignKey: "age_id" });

rlLimaTitikSatuSatuSehat.belongsTo(satu_sehat_id, {
  foreignKey: "organization_id",
  targetKey: "organization_id",
});
