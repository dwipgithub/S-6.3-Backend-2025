import { DataTypes, QueryTypes } from "sequelize"
import { databaseSIRS }  from "../config/Database.js"

export const jenisPengunjung = databaseSIRS.define('jenis_pengunjung_rl_tiga_titik_tempat', {
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