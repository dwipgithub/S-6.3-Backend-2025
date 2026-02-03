import { DataTypes, QueryTypes } from "sequelize";
import { databaseSIRS } from "../config/Database.js";

import { JenisKegiatanRLTigaTitikSebelas } from "./JenisKegiatanRLTigaTitikSebelasModel.js";

export const rlTigaTitikSebelasHeader = databaseSIRS.define(
  "rl_tiga_titik_sebelas",
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

export const rlTigaTitikSebelasDetail = databaseSIRS.define(
  "rl_tiga_titik_sebelas_detail",
  {
    rs_id: {
      type: DataTypes.STRING,
    },
    periode: {
      type: DataTypes.INTEGER,
    },
    rl_tiga_titik_sebelas_id: {
      type: DataTypes.INTEGER,
    },
    rl_tiga_titik_sebelas_jenis_kegiatan_id: {
      type: DataTypes.INTEGER,
    },
    jumlah: {
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
    "rl_tiga_titik_sebelas_detail.id, " +
    "rl_tiga_titik_sebelas_detail.rs_id, " +
    "rl_tiga_titik_sebelas_detail.periode, " +
    "rl_tiga_titik_sebelas_jenis_kegiatan.`no`, " +
    "rl_tiga_titik_sebelas_jenis_kegiatan.id as jenis_kegiatan_id, " +
    "rl_tiga_titik_sebelas_jenis_kegiatan.nama_jenis_kegiatan, " +
    "rl_tiga_titik_sebelas_detail.jumlah ";

  const sqlFrom =
    "FROM " +
    "rl_tiga_titik_sebelas_detail " +
    "INNER JOIN rl_tiga_titik_sebelas_jenis_kegiatan " +
    "ON rl_tiga_titik_sebelas_jenis_kegiatan.id = rl_tiga_titik_sebelas_detail.rl_tiga_titik_sebelas_jenis_kegiatan_id ";

  const sqlWhere = "WHERE ";

  const sqlOrder = " ORDER BY rl_tiga_titik_sebelas_jenis_kegiatan_id ASC";

  const filter = [];
  const sqlFilterValue = [];

  const rsId = req.query.rsId || null;
  const periode = req.query.periode || null;

  if (rsId != null) {
    filter.push("rl_tiga_titik_sebelas_detail.rs_id IN ( ? ) ");
    sqlFilterValue.push(req.query.rsId.split(";"));
  }

  if (periode != null) {
    const customDate = new Date(periode);
    filter.push("rl_tiga_titik_sebelas_detail.periode = ?");
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
  const sql =
    "SELECT " +
    "rl_tiga_titik_sebelas_detail.id, " +
    "rl_tiga_titik_sebelas_detail.rs_id, " +
    "rl_tiga_titik_sebelas_jenis_kegiatan.`no`, " +
    "rl_tiga_titik_sebelas_jenis_kegiatan.id as jenis_kegiatan_id, " +
    "rl_tiga_titik_sebelas_jenis_kegiatan.nama_jenis_kegiatan, " +
    "rl_tiga_titik_sebelas_detail.jumlah " +
    "FROM " +
    "rl_tiga_titik_sebelas_detail " +
    "INNER JOIN rl_tiga_titik_sebelas_jenis_kegiatan " +
    "ON rl_tiga_titik_sebelas_jenis_kegiatan.id = rl_tiga_titik_sebelas_detail.rl_tiga_titik_sebelas_jenis_kegiatan_id " +
    "WHERE " +
    "rl_tiga_titik_sebelas_detail.id = ? ";

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

rlTigaTitikSebelasHeader.hasMany(rlTigaTitikSebelasDetail, {
  foreignKey: "rl_tiga_titik_sebelas_id",
});

rlTigaTitikSebelasDetail.belongsTo(rlTigaTitikSebelasHeader, {
  foreignKey: "id",
});

JenisKegiatanRLTigaTitikSebelas.hasMany(rlTigaTitikSebelasDetail, {
  foreignKey: "id",
  // as: "test",
});

rlTigaTitikSebelasDetail.belongsTo(JenisKegiatanRLTigaTitikSebelas, {
  foreignKey: "rl_tiga_titik_sebelas_jenis_kegiatan_id",
});
