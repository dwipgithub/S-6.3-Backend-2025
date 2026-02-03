import { DataTypes, QueryTypes } from "sequelize"
import { databaseSIRS }  from "../config/Database.js"

export const get = (req, callback) => {
    const sqlSelect = 'SELECT ' +
        'rl_tiga_titik_dua_jenis_pelayanan.id, ' +
        'rl_tiga_titik_dua_jenis_pelayanan.no, ' +
        'rl_tiga_titik_dua_jenis_pelayanan.nama, ' +
        'rl_tiga_titik_dua_kelompok_jenis_pelayanan.nama as kelompok_jenis_pelayanan_nama '
    
    const sqlFrom = 'FROM ' +
        'rl_tiga_titik_dua_jenis_pelayanan ' +
        'LEFT OUTER JOIN rl_tiga_titik_dua_kelompok_jenis_pelayanan ' +
        'ON rl_tiga_titik_dua_kelompok_jenis_pelayanan.id =  rl_tiga_titik_dua_jenis_pelayanan.rl_tiga_titik_dua_kelompok_jenis_pelayanan_id '

    const sqlWhere = 'WHERE '

    const sqlOrder = 'ORDER BY rl_tiga_titik_dua_jenis_pelayanan.no '

    const sqlLimit = 'LIMIT 100'

    const sql = sqlSelect.concat(sqlFrom).concat(sqlOrder).concat(sqlLimit)
    databaseSIRS.query(sql, {
        type: QueryTypes.SELECT
    })
    .then((res) => {
        callback(null, res)
    })
    .catch((error) => {
        callback(error, null)
    })
}