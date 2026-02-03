import { DataTypes, QueryTypes } from "sequelize"
import { databaseSIRS } from "../config/Database.js"

export const get = (req, callback) => { 
    const sqlSelect = 'SELECT ' +
        'id, ' +
        'nama, ' +
        'provinsi_id '
    
    const sqlFrom = 'FROM ' +
        'kab_kota '

    const sqlWhere = 'WHERE '

    const sqlOrder = 'ORDER BY id'

    const filter = []
    const sqlFilterValue = []

    const provinsiId = req.query.provinsiId || null

    if (provinsiId != null) {
        filter.push("provinsi_id = ? ")
        sqlFilterValue.push(provinsiId)
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
    databaseSIRS.query(sql, {
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
    const sql = 'SELECT ' +
        'id, ' +
        'nama ' +
    'FROM ' +
        'kab_kota ' +
    'WHERE ' +
        'id = ? '

    const sqlFilterValue = [id]
    databaseSIRS.query(sql, {
        type: QueryTypes.SELECT,
        replacements: sqlFilterValue
    })
    .then(
        (res) => {
            callback(null, res)
        },(error) => {
            throw error
        }
    )
    .catch((error) => {
            console.log(error)
        }
    )
}