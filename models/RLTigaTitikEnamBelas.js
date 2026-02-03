import { DataTypes, QueryTypes } from "sequelize";
import { databaseSIRS } from "../config/Database.js";
import {
  JenisPelayananKeluargaberencana,
  MetodaRLTigaTitikEnamBelas,
} from "./RLTigaTitikEnamBelasMetoda.js";

export const rlTigaTitikEnamBelasHeader = databaseSIRS.define(
  "rl_tiga_titik_enam_belas",
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
  }
);

export const rlTigaTitikEnamBelasDetail = databaseSIRS.define(
  "rl_tiga_titik_enam_belas_detail",
  {
    rs_id: {
      type: DataTypes.STRING,
    },
    periode: {
      type: DataTypes.INTEGER,
    },
    rl_tiga_titik_enam_belas_id: {
      type: DataTypes.INTEGER,
    },
    rl_tiga_titik_enam_belas_metoda_id: {
      type: DataTypes.INTEGER,
    },
    pelayanan_kb_paska_persalinan: {
      type: DataTypes.INTEGER,
    },
    pelayanan_kb_paska_keguguran: {
      type: DataTypes.INTEGER,
    },
    pelayanan_kb_interval: {
      type: DataTypes.INTEGER,
    },
    pelayanan_kb_total: {
      type: DataTypes.INTEGER,
    },
    komplikasi_kb: {
      type: DataTypes.INTEGER,
    },
    kegagalan_kb: {
      type: DataTypes.INTEGER,
    },
    efek_samping: {
      type: DataTypes.INTEGER,
    },
    drop_out: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
  }
);

export const get = (req, callback) => {
  const sqlSelect =
    "SELECT " +
    "rl316d.id, " +
    "rl316d.rs_id, " +
    "rl316d.periode, " +
    "rlm.id AS id_metoda, " +
    "rlm.nama, " +
    "rl316d.pelayanan_kb_paska_persalinan, " +
    "rl316d.pelayanan_kb_paska_keguguran, " +
    "rl316d.pelayanan_kb_interval, " +
    "(rl316d.pelayanan_kb_paska_persalinan + rl316d.pelayanan_kb_paska_keguguran + rl316d.pelayanan_kb_interval)" +
    " AS pelayanan_kb_total, " +
    "rl316d.komplikasi_kb, " +
    "rl316d.kegagalan_kb, " +
    "rl316d.efek_samping, " +
    "rl316d.drop_out ";

  // const sqlFrom =
  //   "FROM " +
  //   "rl_tiga_titik_enam_belas_detail rl316d " +
  //   "JOIN rl_tiga_titik_enam_belas_metoda rlm " +
  //   "ON rlm.id = rl316d.rl_tiga_titik_enam_belas_metoda_id ";

  const sqlFrom =
    "FROM " +
    "rl_tiga_titik_enam_belas_detail rl316d " +
    "JOIN rl_tiga_titik_enam_belas_jenis_pelayanan_keluarga_berencana rlm " +
    "ON rlm.id = rl316d.rl_tiga_titik_enam_belas_metoda_id ";

  const sqlWhere = "WHERE ";

  const sqlOrder = " ORDER BY rl316d.rs_id";

  const filter = [];
  const sqlFilterValue = [];

  const rsId = req.query.rsId || null;
  const periode = req.query.periode || null;

  if (rsId != null) {
    filter.push("rl316d.rs_id IN ( ? ) ");
    sqlFilterValue.push(req.query.rsId.split(";"));
  }

  if (periode != null) {
    const customDate = new Date(periode);
    filter.push("rl316d.periode = ?");
    sqlFilterValue.push(customDate.getFullYear());
    sqlFilterValue.push(customDate.getMonth() + 1);
  }

  let sqlFilter = "";
  filter.forEach((value, index) => {
    if (index == 0) {
      sqlFilter = sqlWhere.concat(value);
    } else if (index > 0) {
      sqlFilter = sqlFilter.concat(" AND ").concat(value);
    }
  });

  const sql = sqlSelect.concat(sqlFrom).concat(sqlFilter).concat(sqlOrder);
  databaseSIRS
    .query(sql, {
      type: QueryTypes.SELECT,
      replacements: sqlFilterValue,
    })
    .then((res) => {
      callback(null, res);
    })
    .catch((error) => {
      callback(error, null);
    });
};

export const show = (id, callback) => {
  // const sql =
  //   "SELECT " +
  //   "rl316d.id, " +
  //   "rl316d.rs_id, " +
  //   "rl316d.periode, " +
  //   "rlm.id AS id_metoda, " +
  //   "rlm.nama, " +
  //   "rl316d.pelayanan_kb_paska_persalinan, " +
  //   "rl316d.pelayanan_kb_paska_keguguran, " +
  //   "rl316d.pelayanan_kb_interval, " +
  //   "(rl316d.pelayanan_kb_paska_persalinan + rl316d.pelayanan_kb_paska_keguguran + rl316d.pelayanan_kb_interval)" +
  //   " AS pelayanan_kb_total, " +
  //   "rl316d.komplikasi_kb, " +
  //   "rl316d.kegagalan_kb, " +
  //   "rl316d.efek_samping, " +
  //   "rl316d.drop_out " +
  //   "FROM " +
  //   "rl_tiga_titik_enam_belas_detail rl316d " +
  //   "JOIN rl_tiga_titik_enam_belas_metoda rlm " +
  //   "ON rlm.id = rl316d.rl_tiga_titik_enam_belas_metoda_id " +
  //   "WHERE " +
  //   "rl316d.id = ? ";

  const sql =
    "SELECT " +
    "rl316d.id, " +
    "rl316d.rs_id, " +
    "rl316d.periode, " +
    "rlm.id AS id_metoda, " +
    "rlm.nama, " +
    "rl316d.pelayanan_kb_paska_persalinan, " +
    "rl316d.pelayanan_kb_paska_keguguran, " +
    "rl316d.pelayanan_kb_interval, " +
    "(rl316d.pelayanan_kb_paska_persalinan + rl316d.pelayanan_kb_paska_keguguran + rl316d.pelayanan_kb_interval)" +
    " AS pelayanan_kb_total, " +
    "rl316d.komplikasi_kb, " +
    "rl316d.kegagalan_kb, " +
    "rl316d.efek_samping, " +
    "rl316d.drop_out " +
    "FROM " +
    "rl_tiga_titik_enam_belas_detail rl316d " +
    "JOIN rl_tiga_titik_enam_belas_jenis_pelayanan_keluarga_berencana rlm " +
    "ON rlm.id = rl316d.rl_tiga_titik_enam_belas_metoda_id " +
    "WHERE " +
    "rl316d.id = ? ";

  const sqlFilterValue = [id];
  databaseSIRS
    .query(sql, {
      type: QueryTypes.SELECT,
      replacements: sqlFilterValue,
    })
    .then(
      (res) => {
        callback(null, res);
      },
      (error) => {
        throw error;
      }
    )
    .catch((error) => {
      console.log(error);
    });
};

rlTigaTitikEnamBelasHeader.hasMany(rlTigaTitikEnamBelasDetail, {
  foreignKey: "rl_tiga_titik_enam_belas_id",
});

rlTigaTitikEnamBelasDetail.belongsTo(rlTigaTitikEnamBelasHeader, {
  foreignKey: "id",
});

MetodaRLTigaTitikEnamBelas.hasMany(rlTigaTitikEnamBelasDetail, {
  foreignKey: "id",
});

rlTigaTitikEnamBelasDetail.belongsTo(MetodaRLTigaTitikEnamBelas, {
  foreignKey: "rl_tiga_titik_enam_belas_metoda_id",
});

rlTigaTitikEnamBelasDetail.belongsTo(JenisPelayananKeluargaberencana, {
  foreignKey: "rl_tiga_titik_enam_belas_metoda_id",
});
