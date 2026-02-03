import { DataTypes, QueryTypes } from "sequelize"
import { databaseSIRS } from "../config/Database.js"

export const validasi = databaseSIRS.define('validasi', 
    {
        rs_id: {
            type: DataTypes.STRING
        },
        rl_id: {
            type: DataTypes.STRING
        },
        periode: {
            type: DataTypes.DATE
        },
        status_id: {
            type: DataTypes.INTEGER
        },
        keterangan: {
            type: DataTypes.STRING
        },
        user_id: {
            type: DataTypes.INTEGER
        }
    }
)

export const get = (req, callback) => { 
    const sqlSelect = 'SELECT ' +
        'validasi.id, ' +
        'validasi.rs_id, ' +
        'validasi.status_id, ' +
        'validasi.keterangan '
    
    const sqlFrom = 'FROM ' +
        'validasi '

    const sqlWhere = 'WHERE '

    const sqlOrder = 'ORDER BY validasi.created_at'

    const filter = []
    const sqlFilterValue = []

    const rsId = req.query.rsId || null
    const rlId = req.query.rlId || null
    const periode = req.query.periode || null

    if (rsId != null) {
        filter.push("validasi.rs_id IN ( ? ) ")
        sqlFilterValue.push(req.query.rsId.split(';'))
    }

    if (rlId != null) {
        filter.push("validasi.rl_id IN ( ? ) ")
        sqlFilterValue.push(req.query.rlId.split(';'))
    }

    if (periode != null) {
        const customDate = new Date(periode)
        filter.push("YEAR(validasi.periode) = ? AND MONTH(validasi.periode) = ? ")
        sqlFilterValue.push(customDate.getFullYear())
        sqlFilterValue.push(customDate.getMonth() + 1)
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