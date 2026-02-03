import { DataTypes, QueryTypes } from "sequelize";
import { databaseSIRS } from "../config/Database.js";
import { jenisSpesialisTigaTitikSepuluh } from "./JenisSpesialisTigaTitikSepuluh.js";

//new-------------------------------------------------------------------------------------------------------------------------
export const rlTigaTitikSepuluh = databaseSIRS.define("rl_tiga_titik_sepuluh", {
  rs_id: {
    type: DataTypes.STRING,
  },
  tahun: {
    type: DataTypes.INTEGER,
  },
  bulan: {
    type: DataTypes.INTEGER,
  },
  user_id: {
    type: DataTypes.STRING,
  },
});

export const rlTigaTitikSepuluhDetail = databaseSIRS.define(
  "rl_tiga_titik_sepuluh_detail",
  {
    rl_tiga_titik_sepuluh_id: {
      type: DataTypes.INTEGER,
    },
    rs_id: {
      type: DataTypes.STRING,
    },
    tahun: {
      type: DataTypes.INTEGER,
    },
    bulan: {
      type: DataTypes.INTEGER,
    },
    jenis_spesialis_rl_tiga_titik_sepuluh_id: {
      type: DataTypes.INTEGER,
    },
    rm_diterima_puskesmas: {
      type: DataTypes.INTEGER,
    },
    rm_diterima_rs: {
      type: DataTypes.INTEGER,
    },
    rm_diterima_faskes_lain: {
      type: DataTypes.INTEGER,
    },
    rm_diterima_total_rm: {
      type: DataTypes.INTEGER,
    },
    rm_dikembalikan_puskesmas: {
      type: DataTypes.INTEGER,
    },
    rm_dikembalikan_rs: {
      type: DataTypes.INTEGER,
    },
    rm_dikembalikan_faskes_lain: {
      type: DataTypes.INTEGER,
    },
    rm_dikembalikan_total_rm: {
      type: DataTypes.INTEGER,
    },
    keluar_pasien_rujukan: {
      type: DataTypes.INTEGER,
    },
    keluar_pasien_datang_sendiri: {
      type: DataTypes.INTEGER,
    },
    keluar_total_keluar: {
      type: DataTypes.INTEGER,
    },
    keluar_diterima_kembali: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
  }
);

rlTigaTitikSepuluh.hasMany(rlTigaTitikSepuluhDetail, {
  foreignKey: "rl_tiga_titik_sepuluh_id",
});

rlTigaTitikSepuluhDetail.belongsTo(rlTigaTitikSepuluh, {
  foreignKey: "id",
});

jenisSpesialisTigaTitikSepuluh.hasMany(rlTigaTitikSepuluhDetail, {
  foreignKey: "id",
});

rlTigaTitikSepuluhDetail.belongsTo(jenisSpesialisTigaTitikSepuluh, {
  as: "jenis_spesialis_rl_tiga_titik_sepuluh",
  foreignKey: "jenis_spesialis_rl_tiga_titik_sepuluh_id",
});

//old-------------------------------------------------------------------------------------------------------------------------
// export const rlTigaTitikSepuluhHeader = databaseSIRS.define(
//   "rl_tiga_titik_sepuluh",
//   {
//     rs_id: {
//       type: DataTypes.STRING,
//     },
//     tahun: {
//       type: DataTypes.INTEGER,
//     },
//     user_id: {
//       type: DataTypes.INTEGER,
//     },
//   }
// );

// export const rlTigaTitikSepuluhDetail = databaseSIRS.define(
//   "rl_tiga_titik_sepuluh_detail",
//   {
//     rl_tiga_titik_sepuluh_id: {
//       type: DataTypes.INTEGER,
//     },
//     rs_id: {
//       type: DataTypes.INTEGER,
//     },
//     tahun: {
//       type: DataTypes.INTEGER,
//     },
//     jenis_kegiatan_id: {
//       type: DataTypes.INTEGER,
//     },
//     jumlah: {
//       type: DataTypes.INTEGER,
//     },
//     user_id: {
//       type: DataTypes.INTEGER,
//     },
//   }
// );

// export const jenisKegiatan = databaseSIRS.define("jenis_kegiatan", {
//   nama: {
//     type: DataTypes.STRING,
//   },
//   no: {
//     type: DataTypes.NUMBER,
//   },
// });

// rlTigaTitikSepuluhHeader.hasMany(rlTigaTitikSepuluhDetail, {
//   foreignKey: "rl_tiga_titik_sepuluh_id",
// });

// rlTigaTitikSepuluhDetail.belongsTo(rlTigaTitikSepuluhHeader, {
//   foreignKey: "id",
// });

// jenisKegiatan.hasMany(rlTigaTitikSepuluhDetail, {
//   foreignKey: "id",
// });
// rlTigaTitikSepuluhDetail.belongsTo(jenisKegiatan, {
//   foreignKey: "jenis_kegiatan_id",
// });
