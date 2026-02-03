import { DataTypes, QueryTypes } from "sequelize";
import { databaseSIRS } from "../config/Database.js";
import { icd } from "./ICDModel.js";

export const rlEmpatTitikSatuHeader = databaseSIRS.define("rl_empat_titik_satu", {
  rs_id: {
    type: DataTypes.STRING,
  },
  periode: {
    type: DataTypes.DATEONLY,
  },
  user_id: {
    type: DataTypes.INTEGER,
  },
});

export const rlEmpatTitikSatuDetail = databaseSIRS.define("rl_empat_titik_satu_detail", {
  rl_empat_titik_satu_id: {
    type: DataTypes.INTEGER,
  },
  rs_id: {
    type: DataTypes.STRING,
  },
  periode: {
    type: DataTypes.DATEONLY,
  },
  icd_id: {
    type: DataTypes.INTEGER,
  },
  
  jmlh_pas_hidup_mati_umur_gen_0_1jam_l: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_0_1jam_p: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_1_23jam_l: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_1_23jam_p: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_1_7hr_l: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_1_7hr_p: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_8_28hr_l: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_8_28hr_p: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_29hr_3bln_l: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_29hr_3bln_p: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_3_6bln_l: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_3_6bln_p: {
    type: DataTypes.INTEGER,
  },
  
  jmlh_pas_hidup_mati_umur_gen_6_11bln_l: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_6_11bln_p: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_1_4th_l: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_1_4th_p: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_5_9th_l: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_5_9th_p: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_10_14th_l: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_10_14th_p: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_15_19th_l: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_15_19th_p: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_20_24th_l: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_20_24th_p: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_25_29th_l: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_25_29th_p: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_30_34th_l: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_30_34th_p: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_35_39th_l: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_35_39th_p: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_40_44th_l: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_40_44th_p: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_45_49th_l: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_45_49th_p: {
    type: DataTypes.INTEGER,
  },
  
  jmlh_pas_hidup_mati_umur_gen_50_54th_l: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_50_54th_p: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_55_59th_l: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_55_59th_p: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_60_64th_l: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_60_64th_p: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_65_69th_l: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_65_69th_p: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_70_74th_l: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_70_74th_p: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_75_79th_l: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_75_79th_p: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_80_84th_l: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_80_84th_p: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_lebih85th_l: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_umur_gen_lebih85th_p: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_gen_l: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_hidup_mati_gen_p: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_keluar_mati_gen_l: {
    type: DataTypes.INTEGER,
  },
  jmlh_pas_keluar_mati_gen_p: {
    type: DataTypes.INTEGER,
  },
  total_pas_hidup_mati: {
    type: DataTypes.INTEGER,
  },
  total_pas_keluar_mati: {
    type: DataTypes.INTEGER,
  },
  user_id: {
    type: DataTypes.INTEGER,
  },
});


rlEmpatTitikSatuHeader.hasMany(rlEmpatTitikSatuDetail, {
  foreignKey: "rl_empat_titik_satu_id",
});
rlEmpatTitikSatuDetail.belongsTo(rlEmpatTitikSatuHeader, {
  foreignKey: "id",
});

icd.hasMany(rlEmpatTitikSatuDetail, {
  foreignKey: "id",
});
rlEmpatTitikSatuDetail.belongsTo(icd, {
  foreignKey: "icd_id",
});



export const get42 = (req, callback) => { 
  const sqlSelect = 'SELECT  '+
  'icd.icd_code_group, '+
  'icd.description_code_group, '+
  'SUM(rl_empat_titik_satu_detail.jmlh_pas_hidup_mati_gen_l) as jmlh_pas_hidup_mati_laki,  '+
  'SUM(rl_empat_titik_satu_detail.jmlh_pas_hidup_mati_gen_p) as jmlh_pas_hidup_mati_perempuan, '+
  'SUM(rl_empat_titik_satu_detail.total_pas_hidup_mati) as total_pas_hidup_mati_group_by_icd_code, '+
  'SUM(rl_empat_titik_satu_detail.jmlh_pas_keluar_mati_gen_l) AS jmlh_pas_keluar_mati_gen_laki, '+
  'SUM(rl_empat_titik_satu_detail.jmlh_pas_keluar_mati_gen_p) AS jmlh_pas_keluar_mati_gen_perempuan, '+
  'SUM(rl_empat_titik_satu_detail.total_pas_keluar_mati) as total_pas_keluar_mati_group_by_icd_code '

  const sqlFrom = 'FROM rl_empat_titik_satu_detail '+
'JOIN icd ON rl_empat_titik_satu_detail.icd_id=icd.id '

  const sqlWhere = 'WHERE icd.status_top_10 = 1 AND icd.status_rawat_inap = 1 AND '

  const sqlOrder = 'GROUP BY icd.icd_code_group ORDER BY total_pas_hidup_mati_group_by_icd_code DESC LIMIT 10'

  const filter = []
  const sqlFilterValue = []
  let rsId = req.query.rsId || null
  const periode = req.query.periode || null
  
  if(req.user.jenisUserId == 4){
    rsId= req.user.satKerId
  }

  if (rsId != null) {
    filter.push("rl_empat_titik_satu_detail.rs_id IN ( ? ) ")
    sqlFilterValue.push(rsId.split(';'))
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


export const get43 = (req, callback) => { 
  const sqlSelect = 'SELECT  '+
  'icd.icd_code_group, '+
  'icd.description_code_group, '+
  'SUM(rl_empat_titik_satu_detail.jmlh_pas_hidup_mati_gen_l) as jmlh_pas_hidup_mati_laki,  '+
  'SUM(rl_empat_titik_satu_detail.jmlh_pas_hidup_mati_gen_p) as jmlh_pas_hidup_mati_perempuan, '+
  'SUM(rl_empat_titik_satu_detail.total_pas_hidup_mati) as total_pas_hidup_mati_group_by_icd_code, '+
  'SUM(rl_empat_titik_satu_detail.jmlh_pas_keluar_mati_gen_l) AS jmlh_pas_keluar_mati_gen_laki, '+
  'SUM(rl_empat_titik_satu_detail.jmlh_pas_keluar_mati_gen_p) AS jmlh_pas_keluar_mati_gen_perempuan, '+
  'SUM(rl_empat_titik_satu_detail.total_pas_keluar_mati) as total_pas_keluar_mati_group_by_icd_code '

  const sqlFrom = 'FROM rl_empat_titik_satu_detail '+
'JOIN icd ON rl_empat_titik_satu_detail.icd_id=icd.id '

  const sqlWhere = 'WHERE icd.status_top_10 = 1 AND icd.status_rawat_inap = 1 AND '

  const sqlOrder = 'GROUP BY icd.icd_code_group ORDER BY total_pas_keluar_mati_group_by_icd_code DESC LIMIT 10'

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