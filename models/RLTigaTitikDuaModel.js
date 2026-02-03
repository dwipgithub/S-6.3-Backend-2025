import { DataTypes, QueryTypes } from "sequelize"
import { databaseSIRS } from "../config/Database.js"

export const rlTigaTitikDuaHeader = databaseSIRS.define('rl_tiga_titik_dua', 
    {
        rs_id: {
            type: DataTypes.STRING
        },
        periode: {
            type: DataTypes.DATE
        },
        user_id: {
            type: DataTypes.INTEGER
        },
    }
)

export const rlTigaTitikDuaDetail = databaseSIRS.define('rl_tiga_titik_dua_detail',{
    rl_tiga_titik_dua_id: {
        type: DataTypes.INTEGER
    },
    rs_id: {
        type: DataTypes.STRING
    },
    periode: {
        type: DataTypes.DATE
    },
    rl_tiga_titik_dua_jenis_pelayanan_id: {
        type: DataTypes.INTEGER
    },
    pasien_awal_bulan: {
        type: DataTypes.INTEGER
    },
    pasien_masuk: {
        type: DataTypes.INTEGER
    },
    pasien_pindahan: {
        type: DataTypes.INTEGER
    },
    pasien_dipindahkan: {
        type: DataTypes.INTEGER
    },
    pasien_keluar_hidup: {
        type: DataTypes.INTEGER
    },
    pasien_keluar_mati_kurang_dari_48_jam: {
        type: DataTypes.INTEGER
    },
    pasien_keluar_mati_lebih_dari_atau_sama_dengan_48_jam: {
        type: DataTypes.INTEGER
    },
    pasien_wanita_keluar_mati_kurang_dari_48_jam: {
        type: DataTypes.INTEGER
    },
    pasien_wanita_keluar_mati_lebih_dari_atau_sama_dengan_48_jam: {
        type: DataTypes.INTEGER
    },
    jumlah_lama_dirawat: {
        type: DataTypes.INTEGER
    },
    rincian_hari_perawatan_kelas_VVIP: {
        type: DataTypes.INTEGER
    },
    rincian_hari_perawatan_kelas_VIP: {
        type: DataTypes.INTEGER
    },
    rincian_hari_perawatan_kelas_1: {
        type: DataTypes.INTEGER
    },
    rincian_hari_perawatan_kelas_2: {
        type: DataTypes.INTEGER
    },
    rincian_hari_perawatan_kelas_3: {
        type: DataTypes.INTEGER
    },
    rincian_hari_perawatan_kelas_khusus: {
        type: DataTypes.INTEGER
    },
    jumlah_alokasi_tempat_tidur_awal_bulan: {
        type: DataTypes.INTEGER
    },
    user_id: {
        type: DataTypes.INTEGER
    }
})

export const get = (req, callback) => { 
    const sqlSelect = 'SELECT ' +
        'rl_tiga_titik_dua_detail.id, ' +
        'rl_tiga_titik_dua_detail.rs_id, ' +
        'rl_tiga_titik_dua_jenis_pelayanan.nama as nama_jenis_pelayanan, ' +
        'rl_tiga_titik_dua_detail.pasien_awal_bulan, ' +
        'rl_tiga_titik_dua_detail.pasien_masuk, ' +
        'rl_tiga_titik_dua_detail.pasien_pindahan, ' +
        'rl_tiga_titik_dua_detail.pasien_dipindahkan, ' +
        'rl_tiga_titik_dua_detail.pasien_keluar_hidup, ' +
        'rl_tiga_titik_dua_detail.pasien_keluar_mati_kurang_dari_48_jam, ' +
        'rl_tiga_titik_dua_detail.pasien_keluar_mati_lebih_dari_atau_sama_dengan_48_jam, ' +
        'rl_tiga_titik_dua_detail.pasien_wanita_keluar_mati_kurang_dari_48_jam, ' +
        'rl_tiga_titik_dua_detail.pasien_wanita_keluar_mati_lebih_dari_atau_sama_dengan_48_jam, ' +
        'rl_tiga_titik_dua_detail.jumlah_lama_dirawat, ' +
        'rl_tiga_titik_dua_detail.rincian_hari_perawatan_kelas_VVIP, ' +
        'rl_tiga_titik_dua_detail.rincian_hari_perawatan_kelas_VIP, ' +
        'rl_tiga_titik_dua_detail.rincian_hari_perawatan_kelas_1, ' +
        'rl_tiga_titik_dua_detail.rincian_hari_perawatan_kelas_2, ' +
        'rl_tiga_titik_dua_detail.rincian_hari_perawatan_kelas_3, ' +
        'rl_tiga_titik_dua_detail.rincian_hari_perawatan_kelas_khusus, ' +
        'rl_tiga_titik_dua_detail.jumlah_alokasi_tempat_tidur_awal_bulan, ' +
        'rl_tiga_titik_dua_kelompok_jenis_pelayanan.nama as nama_kelompok_jenis_pelayanan '
    
    const sqlFrom = 'FROM ' +
        'rl_tiga_titik_dua_detail ' +
        'INNER JOIN rl_tiga_titik_dua_jenis_pelayanan ' +
        'ON rl_tiga_titik_dua_jenis_pelayanan.id = rl_tiga_titik_dua_detail.rl_tiga_titik_dua_jenis_pelayanan_id ' +
        'LEFT OUTER JOIN rl_tiga_titik_dua_kelompok_jenis_pelayanan ' +
        'ON rl_tiga_titik_dua_kelompok_jenis_pelayanan.id = rl_tiga_titik_dua_jenis_pelayanan.rl_tiga_titik_dua_kelompok_jenis_pelayanan_id '

    const sqlWhere = 'WHERE '

    const sqlOrder = 'ORDER BY rl_tiga_titik_dua_detail.rs_id'

    const filter = []
    const sqlFilterValue = []

    const rsId = req.query.rsId || null
    const periode = req.query.periode || null

    if (rsId != null) {
        filter.push("rl_tiga_titik_dua_detail.rs_id IN ( ? ) ")
        sqlFilterValue.push(req.query.rsId.split(';'))
    }

    if (periode != null) {
        const customDate = new Date(periode)
        filter.push("YEAR(rl_tiga_titik_dua_detail.periode) = ? AND MONTH(rl_tiga_titik_dua_detail.periode) = ? ")
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

export const show = (id, callback) => {
    const sql = 'SELECT ' +
        'rl_tiga_titik_dua_detail.id, ' +
        'rl_tiga_titik_dua_detail.rs_id, ' +
        'rl_tiga_titik_dua_jenis_pelayanan.nama as nama_jenis_pelayanan, ' +
        'rl_tiga_titik_dua_detail.pasien_awal_bulan, ' +
        'rl_tiga_titik_dua_detail.pasien_masuk, ' +
        'rl_tiga_titik_dua_detail.pasien_pindahan, ' +
        'rl_tiga_titik_dua_detail.pasien_dipindahkan, ' +
        'rl_tiga_titik_dua_detail.pasien_keluar_hidup, ' +
        'rl_tiga_titik_dua_detail.pasien_keluar_mati_kurang_dari_48_jam, ' +
        'rl_tiga_titik_dua_detail.pasien_keluar_mati_lebih_dari_atau_sama_dengan_48_jam, ' +
        'rl_tiga_titik_dua_detail.pasien_wanita_keluar_mati_kurang_dari_48_jam, ' +
        'rl_tiga_titik_dua_detail.pasien_wanita_keluar_mati_lebih_dari_atau_sama_dengan_48_jam, ' +
        'rl_tiga_titik_dua_detail.jumlah_lama_dirawat, ' +
        'rl_tiga_titik_dua_detail.rincian_hari_perawatan_kelas_VVIP, ' +
        'rl_tiga_titik_dua_detail.rincian_hari_perawatan_kelas_VIP, ' +
        'rl_tiga_titik_dua_detail.rincian_hari_perawatan_kelas_1, ' +
        'rl_tiga_titik_dua_detail.rincian_hari_perawatan_kelas_2, ' +
        'rl_tiga_titik_dua_detail.rincian_hari_perawatan_kelas_3, ' +
        'rl_tiga_titik_dua_detail.rincian_hari_perawatan_kelas_khusus, ' +
        'rl_tiga_titik_dua_detail.jumlah_alokasi_tempat_tidur_awal_bulan, ' +
        'rl_tiga_titik_dua_kelompok_jenis_pelayanan.nama as kelompok_jenis_pelayanan_nama ' +
    'FROM ' +
        'rl_tiga_titik_dua_detail ' +
        'INNER JOIN rl_tiga_titik_dua_jenis_pelayanan ' +
        'ON rl_tiga_titik_dua_jenis_pelayanan.id = rl_tiga_titik_dua_detail.rl_tiga_titik_dua_jenis_pelayanan_id ' +
        'LEFT OUTER JOIN rl_tiga_titik_dua_kelompok_jenis_pelayanan ' +
        'ON rl_tiga_titik_dua_kelompok_jenis_pelayanan.id = rl_tiga_titik_dua_jenis_pelayanan.rl_tiga_titik_dua_kelompok_jenis_pelayanan_id ' +
    'WHERE ' +
        'rl_tiga_titik_dua_detail.id = ? '

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