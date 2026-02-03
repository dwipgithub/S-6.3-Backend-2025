import { DataTypes, QueryTypes } from "sequelize"
import { databaseSIRS }  from "../config/Database.js"

export const jenisKegiatan = databaseSIRS.define('jenis_kegiatan_rl_tiga_titik_lima', {
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