import { DataTypes, QueryTypes } from "sequelize"
import { databaseSIRS } from "../config/Database.js"
import {
    groupJenisKegiatan,
    groupJenisKegiatanHeader,
    jenisKegiatan,
  } from "./JenisKegiatanRLTigaTitikTujuhModel.js";

export const rlTigaTitikTujuh = databaseSIRS.define('rl_tiga_titik_tujuh', 
    {
        rs_id: {
            type: DataTypes.STRING
        },
        tahun: {
            type: DataTypes.DATE
        },
        user_id: {
            type: DataTypes.INTEGER
        },
    }
)

export const rlTigaTitikTujuhDetail = databaseSIRS.define('rl_tiga_titik_tujuh_detail',{
    rs_id: {
        type: DataTypes.STRING
    },
    tahun: {
        type: DataTypes.DATE
    },
    rl_tiga_titik_tujuh_id: {
        type: DataTypes.INTEGER
    },
    jenis_kegiatan_id: {
        type: DataTypes.INTEGER
    },
    rmRumahSakit: {
        type: DataTypes.INTEGER
    },
    rmBidan: {
        type: DataTypes.INTEGER
    },
    rmPuskesmas: {
        type: DataTypes.INTEGER
    },
    rmFaskesLainnya: {
        type: DataTypes.INTEGER
    },
    rmHidup: {
        type: DataTypes.INTEGER
    },
    rmMati: {
        type: DataTypes.INTEGER
    },
    rmTotal: {
        type: DataTypes.INTEGER
    },
    rnmHidup: {
        type: DataTypes.INTEGER
    },
    rnmMati: {
        type: DataTypes.INTEGER
    },
    rnmTotal: {
        type: DataTypes.INTEGER
    },
    nrHidup: {
        type: DataTypes.INTEGER
    },
    nrMati: {
        type: DataTypes.INTEGER
    },
    nrTotal: {
        type: DataTypes.INTEGER
    },
    dirujuk: {
        type: DataTypes.INTEGER
    },
    user_id: {
        type: DataTypes.INTEGER
    }
})

// export const jenisKegiatan = databaseSIRS.define('jenis_kegiatan', 
//     {
//         id:{
//         type: DataTypes.INTEGER,
//         primaryKey: true
//     },
//     group_jenis_kegiatan_id: {
//         type: DataTypes.INTEGER,
//     },
//         nama: {
//             type: DataTypes.STRING
//         },
//         no: {
//             type: DataTypes.NUMBER
//         },
//     }
// )

// export const jenisGroupKegiatanHeader = databaseSIRS.define('group_jenis_kegiatan_header', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true
//     },
//     nama:{
//         type: DataTypes.STRING
//     },
//     no:{
//         type: DataTypes.STRING
//     }
    
// })



rlTigaTitikTujuh.hasMany(rlTigaTitikTujuhDetail, {
    foreignKey: "rl_tiga_titik_tujuh_id",
  });
  
  rlTigaTitikTujuhDetail.belongsTo(rlTigaTitikTujuh, {
    foreignKey: "id",
  });
  
  jenisKegiatan.hasMany(rlTigaTitikTujuhDetail, {
    foreignKey: "id",
  });
  
  rlTigaTitikTujuhDetail.belongsTo(jenisKegiatan, {
    foreignKey: "jenis_kegiatan_id",
  });
  
  groupJenisKegiatan.hasMany(jenisKegiatan, {
    foreignKey: "id",
  });
  
  jenisKegiatan.belongsTo(groupJenisKegiatan, {
    foreignKey: "group_jenis_kegiatan_id",
  });
  
  groupJenisKegiatanHeader.hasMany(groupJenisKegiatan, {
    foreignKey: "id",
  });
  
  groupJenisKegiatan.belongsTo(groupJenisKegiatanHeader, {
    foreignKey: "group_jenis_kegiatan_header_id",
  });
