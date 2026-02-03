import { DataTypes, QueryTypes } from "sequelize"
import { databaseSIRS }  from "../config/Database.js"

export const golonganObatRLTigaTitikDelapanBelas = databaseSIRS.define('rl_tiga_titik_delapan_belas_golongan_obat', {
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