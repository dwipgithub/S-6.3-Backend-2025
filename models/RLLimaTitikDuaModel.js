import { DataTypes, QueryTypes } from "sequelize"
import { databaseSIRS } from '../config/Database.js'

export const rlLimaTitikDua = databaseSIRS.define("rl_lima_titik_satu",{
    rs_id: {
        type: DataTypes.STRING,
    },
    periode: {
        type: DataTypes.DATEONLY,
    },
    user_id: {
        type: DataTypes.INTEGER,
    }
})

export const rlLimaTitikDuaDetail = databaseSIRS.define("rl_lima_titik_satu_detail",{
    rl_lima_titik_satu_id: {
        type: DataTypes.INTEGER,
    },
    user_id: {
        type: DataTypes.INTEGER,
    },
    // no_urut_id: {
    //     type: DataTypes.INTEGER,
    // },
    icd_id: {
        type: DataTypes.STRING,
        unique:true
    },
    
    jumlah_kasus_baru_L: {
        type: DataTypes.INTEGER,
    },
    jumlah_kasus_baru_P: {
        type: DataTypes.INTEGER,
    },
    total_kasus_baru: {
        type: DataTypes.INTEGER,
    },
    jumlah_kunjungan_L: {
        type: DataTypes.INTEGER,
    },
    jumlah_kunjungan_P: {
        type: DataTypes.INTEGER,
    },
    total_jumlah_kunjungan: {
        type: DataTypes.INTEGER,
    },   
    periode: {
        type: DataTypes.DATEONLY,
    },
    rs_id: {
        type: DataTypes.INTEGER,
    }
})

// export const noUrut = databaseSIRS.define('no_urut', {
//     no: {
//         type: DataTypes.NUMBER
//     }
// })

// export const icd10 = databaseSIRS.define('icd_10', {
//     code: {
//         type: DataTypes.STRING
//     },
//     description: {
//         type: DataTypes.STRING
//     }
// })

// rlLimaTitikTiga.hasMany(rlLimaTitikTigaDetail, {
//     foreignKey:'rl_lima_titik_empat_id'
// })
// rlLimaTitikTigaDetail.belongsTo(rlLimaTitikTiga, {
//     foreignKey:'id'
// })
// noUrut.hasMany(rlLimaTitikTigaDetail, {
//     foreignKey:'id'
// })
// rlLimaTitikTigaDetail.belongsTo(noUrut, {
//     foreignKey:'no_urut_id'
// })
// icd10.hasMany(rlLimaTitikTigaDetail, {
//     foreignKey:'id'
// })
// rlLimaTitikTigaDetail.belongsTo(icd10, {
//     foreignKey:'kode_icd_10'
// })

export const get = (req, callback) => { 
    const sqlSelect = 'SELECT  '+
    'icd.icd_code_group, '+
    'icd.description_code_group, '+
    'SUM(rl_lima_titik_satu_detail.jumlah_kasus_baru_L) as jumlah_kasus_baru_L,  '+
    'SUM(rl_lima_titik_satu_detail.jumlah_kasus_baru_P) as jumlah_kasus_baru_P, '+
    'SUM(rl_lima_titik_satu_detail.total_kasus_baru) as total_kasus_baru_group_by_icd_code, '+
    'SUM(rl_lima_titik_satu_detail.jumlah_kunjungan_L) AS jumlah_kunjungan_L, '+
    'SUM(rl_lima_titik_satu_detail.jumlah_kunjungan_P) AS jumlah_kunjungan_P, '+
    'SUM(rl_lima_titik_satu_detail.total_jumlah_kunjungan) as total_jumlah_kunjungan_group_by_icd_code '

    const sqlFrom = 'FROM rl_lima_titik_satu_detail '+
    'JOIN icd ON rl_lima_titik_satu_detail.icd_id=icd.id '

    const sqlWhere = 'WHERE icd.status_top_10 = 1 AND icd.status_rawat_jalan = 1 AND '

    const sqlOrder = 'GROUP BY icd.icd_code_group, icd.description_code_group ORDER BY total_kasus_baru_group_by_icd_code DESC LIMIT 10'

    const filter = []
    const sqlFilterValue = []

    const rsId = req.query.rsId || null
    const periode = req.query.periode || null

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