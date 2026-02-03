import { QueryTypes } from "sequelize"
import { databaseRSOnline } from "../config/Database.js"

export const get = (req, callback) => {
    const sqlSelect = 'SELECT db_fasyankes.`data`.Propinsi as id, ' +
        'db_fasyankes.`data`.RUMAH_SAKIT AS nama, ' +
        'db_fasyankes.`data`.ALAMAT AS alamat, ' +
        'db_fasyankes.`kab_kota`.nama as kab_kota_nama, ' +
        'db_fasyankes.`provinsi`.nama as provinsi_nama '

    const sqlFrom = 'FROM ' +
        'db_fasyankes.`data` INNER JOIN db_fasyankes.provinsi ON db_fasyankes.provinsi.id = db_fasyankes.`data`.provinsi_id ' +
        'INNER JOIN db_fasyankes.kab_kota ON db_fasyankes.kab_kota.id = db_fasyankes.`data`.kab_kota_id '

    const sqlWhere = 'WHERE db_fasyankes.`data`.aktive = 1 AND '

    const sqlOrder = 'ORDER BY `data`.Propinsi'

    const filter = []
    const sqlFilterValue = []

    const provinsiId = req.query.provinsiId || null
    const kabKotaId = req.query.kabKotaId || null

    if (provinsiId != null) {
        filter.push("`data`.provinsi_id =  ? ")
        sqlFilterValue.push(provinsiId)
    }

    if (kabKotaId != null) {
        filter.push("`data`.kab_kota_id =  ? ")
        sqlFilterValue.push(kabKotaId)
    }

    let sqlFilter = ''
    filter.forEach((value, index) => {
        if (index == 0) {
            sqlFilter = sqlWhere.concat(value)
        } else if (index > 0) {
            sqlFilter = sqlFilter.concat(' AND ').concat(value)
        }
    })

    const sql = sqlSelect.concat(sqlFrom).concat(sqlFilter).concat(sqlOrder)
    databaseRSOnline.query(sql, {
        type: QueryTypes.SELECT,
        replacements: sqlFilterValue
    })
        .then((res) => {
            callback(null, res)
        })
        .catch((error) => {
            callback(error, null)
        })
}

export const show = (id, callback) => {
    const sql = 'SELECT db_fasyankes.`data`.Propinsi as id, ' +
        'db_fasyankes.`data`.RUMAH_SAKIT AS nama, ' +
        'db_fasyankes.`data`.ALAMAT AS alamat, ' +
        'db_fasyankes.`kab_kota`.nama as kab_kota_nama, ' +
        'db_fasyankes.`provinsi`.nama as provinsi_nama ' +
        'FROM ' +
        'db_fasyankes.`data` LEFT OUTER JOIN db_fasyankes.provinsi ON db_fasyankes.provinsi.id = db_fasyankes.`data`.provinsi_id ' +
        'LEFT OUTER JOIN db_fasyankes.kab_kota ON db_fasyankes.kab_kota.id = db_fasyankes.`data`.kab_kota_id ' +
        'WHERE db_fasyankes.`data`.Propinsi IN (?)'

    const sqlFilterValue = [id]
    databaseRSOnline.query(sql, {
        type: QueryTypes.SELECT,
        replacements: sqlFilterValue
    }).then(
        (res) => {
            callback(null, res)
        }
    )
        .catch(
            (error) => {
                callback(error, null)
            }
        )
}