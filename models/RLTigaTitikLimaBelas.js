import { DataTypes, QueryTypes } from "sequelize";
import { databaseSIRS } from "../config/Database.js";
import { jenisKegiatanTigaTitikLimaBelas } from "./JenisKegiatanTigaTitikLimaBelas.js";

//new------------------------------------------------------------------------------------------------------------------

export const rlTigaTitikLimaBelas = databaseSIRS.define(
  "rl_tiga_titik_lima_belas",
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

export const rlTigaTitikLimaBelasDetail = databaseSIRS.define(
  "rl_tiga_titik_lima_belas_detail",
  {
    rl_tiga_titik_lima_belas_id: {
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
    jenis_kegiatan_rl_tiga_titik_lima_belas_id: {
      type: DataTypes.INTEGER,
    },
    laki: {
      type: DataTypes.INTEGER,
    },
    perempuan: {
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

rlTigaTitikLimaBelas.hasMany(rlTigaTitikLimaBelasDetail, {
  foreignKey: "rl_tiga_titik_lima_belas_id",
});

rlTigaTitikLimaBelasDetail.belongsTo(rlTigaTitikLimaBelas, {
  foreignKey: "id",
});

jenisKegiatanTigaTitikLimaBelas.hasMany(rlTigaTitikLimaBelasDetail, {
  foreignKey: "id",
});

rlTigaTitikLimaBelasDetail.belongsTo(jenisKegiatanTigaTitikLimaBelas, {
  as: "jenis_kegiatan_rl_tiga_titik_lima_belas",
  foreignKey: "jenis_kegiatan_rl_tiga_titik_lima_belas_id",
});

//old------------------------------------------------------------------------------------------------------------------
// export const rlTigaTitikLimaBelasHeader = databaseSIRS.define('rl_tiga_titik_lima_belas',
//     {
//         rs_id: {
//             type: DataTypes.STRING
//         },
//         tahun: {
//             type: DataTypes.INTEGER
//         },
//         user_id: {
//             type: DataTypes.INTEGER
//         },
//     }
// )

// export const rlTigaTitikLimaBelasDetail = databaseSIRS.define('rl_tiga_titik_lima_belas_detail',{
//     rl_tiga_titik_lima_belas_id: {
//         type: DataTypes.INTEGER
//     },
//     rs_id: {
//         type: DataTypes.INTEGER
//     },
//     tahun: {
//         type: DataTypes.INTEGER
//     },
//     cara_pembayaran_id: {
//         type: DataTypes.INTEGER
//     },
//     pasien_rawat_inap_jpk: {
//         type: DataTypes.INTEGER
//     },
//     pasien_rawat_inap_jld: {
//         type: DataTypes.INTEGER
//     },
//     jumlah_pasien_rawat_jalan: {
//         type: DataTypes.INTEGER
//     },
//     jumlah_pasien_rawat_jalan_lab: {
//         type: DataTypes.INTEGER
//     },
//     jumlah_pasien_rawat_jalan_rad: {
//         type: DataTypes.INTEGER
//     },
//     jumlah_pasien_rawat_jalan_ll: {
//         type: DataTypes.INTEGER
//     },
//     user_id: {
//         type: DataTypes.INTEGER
//     }
// })

// export const caraPembayaran = databaseSIRS.define('cara_pembayaran',
//     {
//         nama: {
//             type: DataTypes.STRING
//         },
//         no: {
//             type: DataTypes.STRING
//         },
//     }
// )

// rlTigaTitikLimaBelasHeader.hasMany(rlTigaTitikLimaBelasDetail, {
//     foreignKey:'rl_tiga_titik_lima_belas_id'
// })

// rlTigaTitikLimaBelasDetail.belongsTo(rlTigaTitikLimaBelasHeader, {
//     foreignKey:'id'
// })

// caraPembayaran.hasMany(rlTigaTitikLimaBelasDetail, {
//     foreignKey:'id'
// })
// rlTigaTitikLimaBelasDetail.belongsTo(caraPembayaran, {
//     foreignKey:'cara_pembayaran_id'
// })
