import { DataTypes, QueryTypes } from "sequelize";
import { databaseSIRS } from "../config/Database.js";
import { JenisTindakanRLTigaTitikTigaBelas } from "./RLTigaTitikTigaBelasJenisTindakanModel.js";

export const rlTigaTitikTigaBelasHeader = databaseSIRS.define(
  "rl_tiga_titik_tiga_belas",
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

export const rlTigaTitikTigaBelasDetail = databaseSIRS.define(
  "rl_tiga_titik_tiga_belas_detail",
  {
    rs_id: {
      type: DataTypes.STRING,
    },
    periode: {
      type: DataTypes.INTEGER,
    },
    rl_tiga_titik_tiga_belas_id: {
      type: DataTypes.INTEGER,
    },
    rl_tiga_titik_tiga_belas_jenis_tindakan_id: {
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
    "rl_tiga_titik_tiga_belas_detail.id, " +
    "rl_tiga_titik_tiga_belas_detail.rs_id, " +
    "rl_tiga_titik_tiga_belas_detail.periode, " +
    "rl_tiga_titik_tiga_belas_jenis_tindakan.nama as nama_jenis_tindakan, " +
    "rl_tiga_titik_tiga_belas_jenis_tindakan.no as jenis_tindakan_no, " +
    "rl_tiga_titik_tiga_belas_jenis_tindakan.id as jenis_tindakan_id, " +
    "rl_tiga_titik_tiga_belas_jenis_tindakan.rl_tiga_titik_tiga_belas_jenis_tindakan_header_id as kelompok_id, " +
    "rl_tiga_titik_tiga_belas_jenis_tindakan_header.nama as nama_kelompok_jenis_tindakan, " +
    "rl_tiga_titik_tiga_belas_detail.jumlah ";

  const sqlFrom =
    "FROM " +
    "rl_tiga_titik_tiga_belas_detail " +
    "INNER JOIN rl_tiga_titik_tiga_belas_jenis_tindakan " +
    "ON rl_tiga_titik_tiga_belas_jenis_tindakan.id = rl_tiga_titik_tiga_belas_detail.rl_tiga_titik_tiga_belas_jenis_tindakan_id " +
    "INNER JOIN rl_tiga_titik_tiga_belas_jenis_tindakan_header " +
    "ON rl_tiga_titik_tiga_belas_jenis_tindakan_header.id = rl_tiga_titik_tiga_belas_jenis_tindakan.rl_tiga_titik_tiga_belas_jenis_tindakan_header_id ";

  const sqlWhere = "WHERE ";

  const sqlOrder = " ORDER BY rl_tiga_titik_tiga_belas_detail.rs_id";

  const filter = [];
  const sqlFilterValue = [];

  const rsId = req.query.rsId || null;
  const periode = req.query.periode || null;

  if (rsId != null) {
    filter.push("rl_tiga_titik_tiga_belas_detail.rs_id IN ( ? ) ");
    sqlFilterValue.push(req.query.rsId.split(";"));
  }

  if (periode != null) {
    const customDate = new Date(periode);
    filter.push("rl_tiga_titik_tiga_belas_detail.periode = ?");
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
    "rl_tiga_titik_tiga_belas_detail.id, " +
    "rl_tiga_titik_tiga_belas_detail.rs_id, " +
    "rl_tiga_titik_tiga_belas_jenis_tindakan.nama as nama_jenis_tindakan, " +
    "rl_tiga_titik_tiga_belas_jenis_tindakan.no as no_jenis_tindakan, " +
    "rl_tiga_titik_tiga_belas_jenis_tindakan.rl_tiga_titik_tiga_belas_jenis_tindakan_header_id, " +
    "rl_tiga_titik_tiga_belas_jenis_tindakan_header.nama as kelompok_jenis_tindakan_nama, " +
    "rl_tiga_titik_tiga_belas_detail.jumlah " +
    "FROM " +
    "rl_tiga_titik_tiga_belas_detail " +
    "INNER JOIN rl_tiga_titik_tiga_belas_jenis_tindakan " +
    "ON rl_tiga_titik_tiga_belas_jenis_tindakan.id = rl_tiga_titik_tiga_belas_detail.rl_tiga_titik_tiga_belas_jenis_tindakan_id " +
    "INNER JOIN rl_tiga_titik_tiga_belas_jenis_tindakan_header " +
    "ON rl_tiga_titik_tiga_belas_jenis_tindakan_header.id = rl_tiga_titik_tiga_belas_jenis_tindakan.rl_tiga_titik_tiga_belas_jenis_tindakan_header_id " +
    "WHERE " +
    "rl_tiga_titik_tiga_belas_detail.id = ? ";

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

rlTigaTitikTigaBelasHeader.hasMany(rlTigaTitikTigaBelasDetail, {
  foreignKey: "rl_tiga_titik_tiga_belas_id",
});

rlTigaTitikTigaBelasDetail.belongsTo(rlTigaTitikTigaBelasHeader, {
  foreignKey: "id",
});

JenisTindakanRLTigaTitikTigaBelas.hasMany(rlTigaTitikTigaBelasDetail, {
  foreignKey: "id",
});

rlTigaTitikTigaBelasDetail.belongsTo(JenisTindakanRLTigaTitikTigaBelas, {
  foreignKey: "rl_tiga_titik_tiga_belas_jenis_tindakan_id",
});
