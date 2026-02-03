import { DataTypes, QueryTypes } from "sequelize"
import { databaseSIRS } from '../config/Database.js'

export const rlTigaTitikDelapanBelas = databaseSIRS.define(
    "rl_tiga_titik_delapan_belas",
    {
      rs_id: {
        type: DataTypes.STRING,
      },
      periode: {
        type: DataTypes.INTEGER,
      },
      user_id: {
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
  
  export const rlTigaTitikDelapanBelasDetail = databaseSIRS.define(
    "rl_tiga_titik_delapan_belas_detail",
    {
      rl_tiga_titik_delapan_belas_id: {
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
      golongan_obat_id: {
        type: DataTypes.INTEGER,
      },
      rawat_jalan: {
        type: DataTypes.INTEGER,
      },
      igd: {
        type: DataTypes.INTEGER,
      },
      rawat_inap: {
        type: DataTypes.INTEGER,
      },
      periode: {
        type: DataTypes.INTEGER,
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
  export const golonganObatRLTigaTitikDelapanBelas = databaseSIRS.define('rl_tiga_titik_delapan_belas_golongan_obat', 
    {
        nama: {
            type: DataTypes.STRING
        },
        no: {
          type: DataTypes.NUMBER
      },
    }
)

export const get = (req, callback) => { 
  const sqlSelect = 'SELECT ' +
      'rl_tiga_titik_delapan_belas_detail.id, ' +
      'rl_tiga_titik_delapan_belas_detail.rs_id, ' +
      'rl_tiga_titik_delapan_belas_golongan_obat.no as no_golongan_obat, ' +
      'rl_tiga_titik_delapan_belas_golongan_obat.nama as nama_golongan_obat, ' +
      'rl_tiga_titik_delapan_belas_detail.rawat_jalan, ' +
      'rl_tiga_titik_delapan_belas_detail.igd, ' +
      'rl_tiga_titik_delapan_belas_detail.rawat_inap '
  
  const sqlFrom = 'FROM ' +
      'rl_tiga_titik_delapan_belas_detail ' +
      'INNER JOIN rl_tiga_titik_delapan_belas_golongan_obat ' +
      'ON rl_tiga_titik_delapan_belas_golongan_obat.id = rl_tiga_titik_delapan_belas_detail.golongan_obat_id ' 

  const sqlWhere = 'WHERE '

  const sqlOrder = 'ORDER BY rl_tiga_titik_delapan_belas_detail.rs_id'

  const filter = []
  const sqlFilterValue = []

  const rsId = req.query.rsId || null
  const periode = req.query.periode || null

  if (rsId != null) {
      filter.push("rl_tiga_titik_delapan_belas_detail.rs_id IN ( ? ) ")
      sqlFilterValue.push(req.query.rsId.split(';'))
  }

  if (periode != null) {
      const customDate = new Date(periode)
      filter.push("rl_tiga_titik_delapan_belas_detail.periode = ? ")
      sqlFilterValue.push(customDate.getFullYear())
      // sqlFilterValue.push(customDate.getMonth() + 1)
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
  'rl_tiga_titik_delapan_belas_detail.id, ' +
  'rl_tiga_titik_delapan_belas_detail.rs_id, ' +
  'rl_tiga_titik_delapan_belas_golongan_obat.no as no_golongan_obat, ' +
  'rl_tiga_titik_delapan_belas_golongan_obat.nama as nama_golongan_obat, ' +
  'rl_tiga_titik_delapan_belas_detail.rawat_jalan, ' +
  'rl_tiga_titik_delapan_belas_detail.igd, ' +
  'rl_tiga_titik_delapan_belas_detail.rawat_inap ' +
  'FROM ' +
  'rl_tiga_titik_delapan_belas_detail ' +
  'INNER JOIN rl_tiga_titik_delapan_belas_golongan_obat ' +
  'ON rl_tiga_titik_delapan_belas_golongan_obat.id = rl_tiga_titik_delapan_belas_detail.golongan_obat_id '  +
  'WHERE ' +
      'rl_tiga_titik_delapan_belas_detail.id = ? '

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


rlTigaTitikDelapanBelas.hasMany(rlTigaTitikDelapanBelasDetail, {
    foreignKey:'rl_tiga_titik_delapan_belas_id'
})
rlTigaTitikDelapanBelasDetail.belongsTo(rlTigaTitikDelapanBelas, {
    foreignKey:'id'
})

golonganObatRLTigaTitikDelapanBelas.hasMany(rlTigaTitikDelapanBelasDetail, {
    foreignKey:'id'
})
rlTigaTitikDelapanBelasDetail.belongsTo(golonganObatRLTigaTitikDelapanBelas, {
    foreignKey:'golongan_obat_id'
})