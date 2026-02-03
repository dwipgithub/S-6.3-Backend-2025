import { DataTypes, QueryTypes } from "sequelize"
import { databaseSIRS } from "../config/Database.js"

export const rlTigaTitikEnamHeader = databaseSIRS.define('rl_tiga_titik_enam', 
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

export const rlTigaTitikEnamDetail = databaseSIRS.define('rl_tiga_titik_enam_detail',{
    rs_id: {
        type: DataTypes.STRING
    },
    tahun: {
        type: DataTypes.DATE
    },
    rl_tiga_titik_enam_id: {
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

export const jenisKegiatan = databaseSIRS.define('jenis_kegiatan_rl_tiga_titik_enam', 
    {
        nama: {
            type: DataTypes.STRING
        },
        no: {
            type: DataTypes.INTEGER
        }
    }
)

export const jenisGroupKegiatanHeader = databaseSIRS.define('group_jenis_kegiatan_header_rl_tiga_titik_enam', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nama:{
        type: DataTypes.STRING
    },
    no:{
        type: DataTypes.STRING
    }
    
})


rlTigaTitikEnamHeader.hasMany(rlTigaTitikEnamDetail, {
    foreignKey:'rl_tiga_titik_enam_id'
})
rlTigaTitikEnamDetail.belongsTo(rlTigaTitikEnamHeader, {
    foreignKey:'id'
})

jenisKegiatan.hasMany(rlTigaTitikEnamDetail, {
    foreignKey:'id'
})
rlTigaTitikEnamDetail.belongsTo(jenisKegiatan, {
    foreignKey:'jenis_kegiatan_id'
})

jenisGroupKegiatanHeader.hasMany(jenisKegiatan, {foreignKey: 'id'})
jenisKegiatan.belongsTo(jenisGroupKegiatanHeader, {foreignKey: 'group_jenis_kegiatan_id'})