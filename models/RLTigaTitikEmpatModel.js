import { DataTypes, QueryTypes } from "sequelize";
import { databaseSIRS } from "../config/Database.js";

export const rlTigaTitikEmpatHeader = databaseSIRS.define(
  "rl_tiga_titik_empat",
  {
    rs_id: {
      type: DataTypes.STRING,
    },
    tahun: {
      type: DataTypes.DATE,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
  }
);

export const rlTigaTitikEmpatDetail = databaseSIRS.define(
  "rl_tiga_titik_empat_detail",
  {
    rs_id: {
      type: DataTypes.STRING,
    },
    tahun: {
      type: DataTypes.DATE,
    },
    rl_tiga_titik_empat_id: {
      type: DataTypes.INTEGER,
    },
    jenis_pengunjung_id: {
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

export const jenisPengunjung = databaseSIRS.define(
  "jenis_pengunjung_rl_tiga_titik_tempat",
  {
    nama: {
      type: DataTypes.STRING,
    },
  }
);

rlTigaTitikEmpatHeader.hasMany(rlTigaTitikEmpatDetail, {
  foreignKey: "rl_tiga_titik_empat_id",
});
rlTigaTitikEmpatDetail.belongsTo(rlTigaTitikEmpatHeader, {
  foreignKey: "id",
});

jenisPengunjung.hasMany(rlTigaTitikEmpatDetail, {
  foreignKey: "id",
});
rlTigaTitikEmpatDetail.belongsTo(jenisPengunjung, {
  foreignKey: "jenis_pengunjung_id",
});

// Model untuk menyimpan data RL 3.4 Satusehat
export const RLTigaTitikEmpatSatusehat = databaseSIRS.define(
  "rl_tiga_titik_empat_satusehat",
  {
    month: {
      type: DataTypes.STRING(7),
      allowNull: false,
    },
    organization_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    new_visitors: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    returning_visitors: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_visitors: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "rl_tiga_titik_empat_satusehat",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);
