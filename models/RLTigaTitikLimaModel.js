import { DataTypes, QueryTypes } from "sequelize"
import { databaseSIRS } from "../config/Database.js"

export const rlTigaTitikLimaHeader = databaseSIRS.define('rl_tiga_titik_lima', 
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

export const rlTigaTitikLimaDetail = databaseSIRS.define('rl_tiga_titik_lima_detail',{
    rs_id: {
        type: DataTypes.STRING
    },
    tahun: {
        type: DataTypes.DATE
    },
    rl_tiga_titik_lima_id: {
        type: DataTypes.INTEGER
    },
    jenis_kegiatan_id: {
        type: DataTypes.INTEGER
    },
    kunjungan_pasien_dalam_kabkota_laki: {
        type: DataTypes.INTEGER
    },
    kunjungan_pasien_luar_kabkota_laki: {
        type: DataTypes.INTEGER
    },
    kunjungan_pasien_dalam_kabkota_perempuan: {
        type: DataTypes.INTEGER
    },
    kunjungan_pasien_luar_kabkota_perempuan: {
        type: DataTypes.INTEGER
    },
    total_kunjungan: {
        type: DataTypes.INTEGER
    },
    user_id: {
        type: DataTypes.INTEGER
    }
})

export const jenisKegiatan = databaseSIRS.define('jenis_kegiatan_rl_tiga_titik_lima', 
    {
        nama: {
            type: DataTypes.STRING
        }
    }
)


rlTigaTitikLimaHeader.hasMany(rlTigaTitikLimaDetail, {
    foreignKey:'rl_tiga_titik_lima_id'
})
rlTigaTitikLimaDetail.belongsTo(rlTigaTitikLimaHeader, {
    foreignKey:'id'
})

jenisKegiatan.hasMany(rlTigaTitikLimaDetail, {
    foreignKey:'id'
})
rlTigaTitikLimaDetail.belongsTo(jenisKegiatan, {
    foreignKey:'jenis_kegiatan_id'
})