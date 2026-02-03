import { QueryTypes } from "sequelize";
import { databaseSIRS } from "../config/Database.js";

export const get = (req, callback) => {
    const sqlSelect = 'SELECT  ' +
        'rl_empat_titik_satu_detail.rs_id, ' +
        'icd.icd_code_group, ' +
        'icd.description_code_group, ' +
        'SUM(rl_empat_titik_satu_detail.jmlh_pas_hidup_mati_gen_l) as jmlh_pas_hidup_mati_laki,  ' +
        'SUM(rl_empat_titik_satu_detail.jmlh_pas_hidup_mati_gen_p) as jmlh_pas_hidup_mati_perempuan, ' +
        'SUM(rl_empat_titik_satu_detail.total_pas_hidup_mati) as total_pas_hidup_mati_group_by_icd_code, ' +
        'SUM(rl_empat_titik_satu_detail.jmlh_pas_keluar_mati_gen_l) AS jmlh_pas_keluar_mati_gen_laki, ' +
        'SUM(rl_empat_titik_satu_detail.jmlh_pas_keluar_mati_gen_p) AS jmlh_pas_keluar_mati_gen_perempuan, ' +
        'SUM(rl_empat_titik_satu_detail.total_pas_keluar_mati) as total_pas_keluar_mati_group_by_icd_code '

    const sqlFrom = 'FROM rl_empat_titik_satu_detail ' +
        'JOIN icd ON rl_empat_titik_satu_detail.icd_id=icd.id '

    const sqlWhere = 'WHERE icd.status_top_10 = 1 AND icd.status_rawat_inap = 1 AND '

    const sqlOrder = 'GROUP BY icd.icd_code_group, icd.description_code_group ORDER BY total_pas_keluar_mati_group_by_icd_code DESC LIMIT 10'

    const filter = []
    const sqlFilterValue = []

    const rsId = req.query.rsId || null
    const periode = req.query.periode || null

    if (rsId != null) {
        filter.push("rl_empat_titik_satu_detail.rs_id IN ( ? ) ")
        sqlFilterValue.push(req.query.rsId.split(';'))
    }
    if (periode != null) {
        filter.push("rl_empat_titik_satu_detail.periode = ? ")
        sqlFilterValue.push(periode)
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