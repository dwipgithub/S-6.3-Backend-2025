import { DataTypes, QueryTypes } from "sequelize"
import { databaseSIRS } from '../config/Database.js'

export const rlTigaTitikSembilan = databaseSIRS.define(
    "rl_tiga_titik_sembilan",
    {
      rs_id: {
        type: DataTypes.STRING,
      },
      periode: {
        type: DataTypes.DATEONLY,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },

    },
  );
  
  export const rlTigaTitikSembilanDetail = databaseSIRS.define(
    "rl_tiga_titik_sembilan_detail",
    {
      rl_tiga_titik_sembilan_id: {
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
      jenis_kegiatan_id: {
        type: DataTypes.INTEGER,
      },
      jumlah: {
        type: DataTypes.INTEGER,
      }, 
      periode: {
        type: DataTypes.DATEONLY,
      },
      rs_id: {
        type: DataTypes.INTEGER,
      },
    //   created_at: {
    //     type: DataTypes.DATE,
    //   },
    //   modified_at: {
    //     type: DataTypes.DATE,
    //   },
    },
   
  );
  export const jenisKegiatan = databaseSIRS.define('rl_tiga_titik_sembilan_jenis_kegiatan', 
    {
      id:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    rl_tiga_titik_sembilan_group_jenis_kegiatan_id: {
        type: DataTypes.INTEGER,
    },
        nama: {
            type: DataTypes.STRING
        },
        no: {
          type: DataTypes.NUMBER
      },
    }
)


export const jenisGroupKegiatanHeader = databaseSIRS.define('rl_tiga_titik_sembilan_group_jenis_kegiatan', {
  id: {
      type: DataTypes.INTEGER,
      primaryKey: true
  },
  nama:{
      type: DataTypes.STRING
  },  
    
    no: {
        type: DataTypes.STRING
    }  
 
})

export const get = (req, callback) => { 
  const sqlSelect = 'SELECT ' +
      'rl_tiga_titik_sembilan_detail.id, ' +
      'rl_tiga_titik_sembilan_detail.rs_id, ' +
      'rl_tiga_titik_sembilan_jenis_kegiatan.no as no_jenis_kegiatan, ' +
      'rl_tiga_titik_sembilan_jenis_kegiatan.nama as nama_jenis_kegiatan, ' +
  'rl_tiga_titik_sembilan_jenis_kegiatan.rl_tiga_titik_sembilan_group_jenis_kegiatan_id as group_jenis_kegiatan_id, ' +
      'rl_tiga_titik_sembilan_detail.jenis_kegiatan_id, ' +
      'rl_tiga_titik_sembilan_detail.jumlah, ' +
      'rl_tiga_titik_sembilan_group_jenis_kegiatan.no as no_group_jenis_kegiatan, ' +
      'rl_tiga_titik_sembilan_group_jenis_kegiatan.nama as nama_group_jenis_kegiatan '
  
  const sqlFrom = 'FROM ' +
      'rl_tiga_titik_sembilan_detail ' +
      'INNER JOIN rl_tiga_titik_sembilan_jenis_kegiatan ' +
      'ON rl_tiga_titik_sembilan_jenis_kegiatan.id = rl_tiga_titik_sembilan_detail.jenis_kegiatan_id ' +
      'INNER JOIN rl_tiga_titik_sembilan_group_jenis_kegiatan ' +
      'ON rl_tiga_titik_sembilan_jenis_kegiatan.rl_tiga_titik_sembilan_group_jenis_kegiatan_id = rl_tiga_titik_sembilan_group_jenis_kegiatan.id ' 

  const sqlWhere = 'WHERE '

  const sqlOrder = 'ORDER BY rl_tiga_titik_sembilan_detail.rs_id'

  const filter = []
  const sqlFilterValue = []

  const rsId = req.query.rsId || null
    const periode = req.query.periode || null

  if (rsId != null) {
    filter.push("rl_tiga_titik_sembilan_detail.rs_id IN ( ? ) ")
    sqlFilterValue.push(req.query.rsId.split(';'))
}

if (periode != null) {
    const customDate = new Date(periode)
    filter.push("YEAR(rl_tiga_titik_sembilan_detail.periode) = ? AND MONTH(rl_tiga_titik_sembilan_detail.periode) = ? ")
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
  'rl_tiga_titik_sembilan_detail.id, ' +
  'rl_tiga_titik_sembilan_detail.rs_id, ' +
  'rl_tiga_titik_sembilan_jenis_kegiatan.no as no_jenis_kegiatan, ' +
  'rl_tiga_titik_sembilan_jenis_kegiatan.nama as nama_jenis_kegiatan, ' +
  'rl_tiga_titik_sembilan_jenis_kegiatan.rl_tiga_titik_sembilan_group_jenis_kegiatan_id as group_jenis_kegiatan_id, ' +
  'rl_tiga_titik_sembilan_detail.jenis_kegiatan_id, ' +
  'rl_tiga_titik_sembilan_detail.jumlah, ' +
  'rl_tiga_titik_sembilan_group_jenis_kegiatan.no as no_group_jenis_kegiatan, ' +
  'rl_tiga_titik_sembilan_group_jenis_kegiatan.nama as nama_group_jenis_kegiatan '+
  'FROM ' +
  'rl_tiga_titik_sembilan_detail ' +
      'INNER JOIN rl_tiga_titik_sembilan_jenis_kegiatan ' +
      'ON rl_tiga_titik_sembilan_jenis_kegiatan.id = rl_tiga_titik_sembilan_detail.jenis_kegiatan_id ' +
      'INNER JOIN rl_tiga_titik_sembilan_group_jenis_kegiatan ' +
      'ON rl_tiga_titik_sembilan_jenis_kegiatan.rl_tiga_titik_sembilan_group_jenis_kegiatan_id = rl_tiga_titik_sembilan_group_jenis_kegiatan.id '  +
  'WHERE ' +
      'rl_tiga_titik_sembilan_detail.id = ? '

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

rlTigaTitikSembilan.hasMany(rlTigaTitikSembilanDetail, {foreignKey:'rl_tiga_titik_sembilan_id'})
rlTigaTitikSembilanDetail.belongsTo(rlTigaTitikSembilan, {foreignKey:'id'})

jenisKegiatan.hasMany(rlTigaTitikSembilanDetail, {foreignKey: 'id'})
rlTigaTitikSembilanDetail.belongsTo(jenisKegiatan, {foreignKey: 'jenis_kegiatan_id'})

jenisGroupKegiatanHeader.hasMany(jenisKegiatan, {foreignKey: 'id'})
jenisKegiatan.belongsTo(jenisGroupKegiatanHeader, {foreignKey: 'rl_tiga_titik_sembilan_group_jenis_kegiatan_id'})

