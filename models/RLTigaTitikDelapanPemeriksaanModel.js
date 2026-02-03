import { DataTypes, QueryTypes } from "sequelize"
import { databaseSIRS }  from "../config/Database.js"

export const RLTigaTitikDelapanPemeriksaan= databaseSIRS.define('rl_tiga_titik_delapan_pemeriksaan', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    rl_tiga_titik_delapan_group_pemeriksaan_id: {
        type: DataTypes.INTEGER     
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

export const RLTigaTitikDelapanPemeriksaanGroup= databaseSIRS.define("rl_tiga_titik_delapan_group_pemeriksaan", {
    no: {
        type: DataTypes.STRING,
    },
    nama: {
        type: DataTypes.STRING,
    },
    rl_tiga_titik_delapan_group_pemeriksaan_header_id: {
        type: DataTypes.INTEGER,
    }
})


export const RLTigaTitikDelapanPemeriksaanGroupHeader = databaseSIRS.define('rl_tiga_titik_delapan_group_pemeriksaan_header', {
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

// groupPemeriksaanRlTigaTitikDelapanHeader.hasMany(pemeriksaanRlTigaTitikDelapan, {foreignKey: 'id'})
// pemeriksaanRlTigaTitikDelapan.belongsTo(groupPemeriksaanRlTigaTitikDelapanHeader, {foreignKey: 'group_pemeriksaan_rl_tiga_titik_delapan_id'})