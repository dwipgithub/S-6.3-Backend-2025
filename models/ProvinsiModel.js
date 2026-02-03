import { DataTypes, QueryTypes } from "sequelize"
import { databaseSIRS } from "../config/Database.js"

export const get = (req, callback) => { 
    const sqlSelect = 'SELECT ' +
        'id, ' +
        'nama '
    
    const sqlFrom = 'FROM ' +
        'provinsi '

    const sqlOrder = 'ORDER BY id'

    const sql = sqlSelect.concat(sqlFrom).concat(sqlOrder)
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

export const show = (id, callback) => {
    const sql = 'SELECT ' +
        'id, ' +
        'nama ' +
    'FROM ' +
        'provinsi ' +
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