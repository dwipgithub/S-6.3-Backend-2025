import { DataTypes, QueryTypes, Sequelize } from "sequelize"
import { databaseSIRS }  from "../config/Database.js"

export const RLTigaTitikEmpatBelasJenisKegiatan = databaseSIRS.define('rl_tiga_titik_empat_belas_jenis_kegiatan', {
    rl_tiga_titik_empat_belas_jenis_kegiatan: {
        type: Sequelize.STRING,
        field: 'rl_tiga_titik_empat_belas_jenis_kegiatan', // Menentukan nama kolom dalam database
      },
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