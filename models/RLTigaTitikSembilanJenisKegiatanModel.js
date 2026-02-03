import { DataTypes, QueryTypes } from "sequelize"
import { databaseSIRS }  from "../config/Database.js"

export const jenisKegiatan = databaseSIRS.define('rl_tiga_titik_sembilan_jenis_kegiatan', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
   
    no: {
        type: DataTypes.INTEGER
    },
    nama: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
})

export const jenisGroupKegiatanHeader = databaseSIRS.define('rl_tiga_titik_sembilan_group_jenis_kegiatan', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    
    nama: {
        type: DataTypes.STRING
    },
    
    no: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
})

jenisGroupKegiatanHeader.hasMany(jenisKegiatan, {foreignKey: 'id'})
jenisKegiatan.belongsTo(jenisGroupKegiatanHeader, {foreignKey: 'rl_tiga_titik_sembilan_group_jenis_kegiatan_id'})