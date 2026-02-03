import { DataTypes, QueryTypes } from "sequelize";
import { databaseSIRS } from "../config/Database.js";
import { jenisPelayananTigaTitikTiga } from "./JenisPelayananTigaTitikTiga.js";

//new------------------------------------------------------------------------------------------------------------------
export const rlTigaTitikTiga = databaseSIRS.define("rl_tiga_titik_tiga", {
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

export const rlTigaTitikTigaDetail = databaseSIRS.define(
  "rl_tiga_titik_tiga_detail",
  {
    rl_tiga_titik_tiga_id: {
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
    jenis_pelayanan_rl_tiga_titik_tiga_id: {
      type: DataTypes.INTEGER,
    },
    total_pasien_rujukan: {
      type: DataTypes.INTEGER,
    },
    total_pasien_non_rujukan: {
      type: DataTypes.INTEGER,
    },
    tlp_dirawat: {
      type: DataTypes.INTEGER,
    },
    tlp_dirujuk: {
      type: DataTypes.INTEGER,
    },
    tlp_pulang: {
      type: DataTypes.INTEGER,
    },
    m_igd_laki: {
      type: DataTypes.INTEGER,
    },
    m_igd_perempuan: {
      type: DataTypes.INTEGER,
    },
    doa_laki: {
      type: DataTypes.INTEGER,
    },
    doa_perempuan: {
      type: DataTypes.INTEGER,
    },
    luka_laki: {
      type: DataTypes.INTEGER,
    },
    luka_perempuan: {
      type: DataTypes.INTEGER,
    },
    false_emergency: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
  }
);

rlTigaTitikTiga.hasMany(rlTigaTitikTigaDetail, {
  foreignKey: "rl_tiga_titik_tiga_id",
});

rlTigaTitikTigaDetail.belongsTo(rlTigaTitikTiga, {
  foreignKey: "id",
});

jenisPelayananTigaTitikTiga.hasMany(rlTigaTitikTigaDetail, {
  foreignKey: "id",
});

rlTigaTitikTigaDetail.belongsTo(jenisPelayananTigaTitikTiga, {
  as: "jenis_pelayanan_rl_tiga_titik_tiga",
  foreignKey: "jenis_pelayanan_rl_tiga_titik_tiga_id",
});

//old------------------------------------------------------------------------------------------------------------------
// export const rlTigaTitikTigaHeader = databaseSIRS.define("rl_tiga_titik_tiga", {
//   rs_id: {
//     type: DataTypes.STRING,
//   },
//   tahun: {
//     type: DataTypes.INTEGER,
//   },
//   user_id: {
//     type: DataTypes.INTEGER,
//   },
// });

// export const rlTigaTitikTigaDetail = databaseSIRS.define(
//   "rl_tiga_titik_tiga_detail",
//   {
//     rl_tiga_titik_tiga_id: {
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

// rlTigaTitikTigaHeader.hasMany(rlTigaTitikTigaDetail, {
//   foreignKey: "rl_tiga_titik_tiga_id",
// });

// rlTigaTitikTigaDetail.belongsTo(rlTigaTitikTigaHeader, {
//   foreignKey: "id",
// });

// jenisKegiatan.hasMany(rlTigaTitikTigaDetail, {
//   foreignKey: "id",
// });
// rlTigaTitikTigaDetail.belongsTo(jenisKegiatan, {
//   foreignKey: "jenis_kegiatan_id",
// });
