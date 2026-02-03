import { DataTypes, QueryTypes } from "sequelize"
import { databaseSIRS } from "../config/Database.js"

export const get = (req, callback) => { 
    const sqlSelect = 'SELECT ' +
        'icd.icd_code_group as kelompok_icd_10, ' +
        'icd.description_code_group as kelompok_diagnosa_penyakit, ' +
        'SUM(rl_lima_titik_satu_detail.jumlah_kasus_baru_L) as jumlah_kasus_baru_l, ' +
        'SUM(rl_lima_titik_satu_detail.jumlah_kasus_baru_P) as jumlah_kasus_baru_p, ' +
        'SUM(rl_lima_titik_satu_detail.jumlah_kasus_baru_L) + SUM(rl_lima_titik_satu_detail.jumlah_kasus_baru_P) as total_jumlah_kasus_baru, ' +
        'SUM(rl_lima_titik_satu_detail.jumlah_kunjungan_L) as jumlah_kunjungan_l, ' +
        'SUM(rl_lima_titik_satu_detail.jumlah_kunjungan_P) as jumlah_kunjungan_p, ' +
        'SUM(rl_lima_titik_satu_detail.jumlah_kunjungan_L) + SUM(rl_lima_titik_satu_detail.jumlah_kunjungan_P) as total_kunjungan '
    
    const sqlFrom = 'FROM ' +
        'rl_lima_titik_satu_detail ' +
        'INNER JOIN icd ' +
        'ON icd.id =  rl_lima_titik_satu_detail.icd_id '

    const sqlWhere = 'WHERE ' 

    const sqlGroupBy = 'GROUP BY icd.icd_code_group, icd.description_code_group '

    const sqlOrder = 'ORDER BY total_kunjungan DESC '

    const sqlLimit = 'LIMIT 10'

    const filter = []
    const sqlFilterValue = []

    const rsId = req.query.rsId || null
    const periode = req.query.periode || null

    filter.push("icd.icd_code NOT LIKE '%Z%' AND icd.icd_code NOT LIKE '%R%' AND icd.icd_code NOT LIKE '%08.0%' AND icd.icd_code NOT LIKE '%08.2%'")

    if (rsId != null) {
        filter.push("rl_lima_titik_satu_detail.rs_id IN ( ? ) ")
        sqlFilterValue.push(req.query.rsId.split(';'))
    }

    if (periode != null) {
        const customDate = new Date(periode)
        filter.push("YEAR(rl_lima_titik_satu_detail.periode) = ? AND MONTH(rl_lima_titik_satu_detail.periode) = ? ")
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

    const sql = sqlSelect.concat(sqlFrom).concat(sqlFilter).concat(sqlGroupBy).concat(sqlOrder).concat(sqlLimit)
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