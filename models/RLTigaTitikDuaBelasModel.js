import { DataTypes, QueryTypes } from "sequelize";
import { databaseSIRS } from "../config/Database.js";
import { SpesialisasiRLTigaTitikDuaBelas } from "./RLTigaTitikDuaBelasSpesialisasiModel.js";

export const rlTigaTitikDuaBelasHeader = databaseSIRS.define(
  "rl_tiga_titik_dua_belas",
  {
    rs_id: {
      type: DataTypes.STRING,
    },
    periode: {
      type: DataTypes.DATE,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
  }
);

export const rlTigaTitikDuaBelasDetail = databaseSIRS.define(
  "rl_tiga_titik_dua_belas_detail",
  {
    rs_id: {
      type: DataTypes.STRING,
    },
    periode: {
      type: DataTypes.DATE,
    },
    rl_tiga_titik_dua_belas_id: {
      type: DataTypes.INTEGER,
    },
    rl_tiga_titik_dua_belas_spesialisasi_id: {
      type: DataTypes.INTEGER,
    },
    khusus: {
      type: DataTypes.INTEGER,
    },
    besar: {
      type: DataTypes.INTEGER,
    },
    sedang: {
      type: DataTypes.INTEGER,
    },
    kecil: {
      type: DataTypes.INTEGER,
    },
    total: {
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
    "rl_tiga_titik_dua_belas_detail.id, " +
    "rl_tiga_titik_dua_belas_detail.rs_id, " +
    "rl_tiga_titik_dua_belas_detail.periode, " +
    "rl_tiga_titik_dua_belas_spesialisasi.nama_spesialisasi, " +
    "rl_tiga_titik_dua_belas_detail.khusus, " +
    "rl_tiga_titik_dua_belas_detail.besar, " +
    "rl_tiga_titik_dua_belas_detail.sedang, " +
    "rl_tiga_titik_dua_belas_detail.kecil, " +
    "rl_tiga_titik_dua_belas_detail.total ";

  const sqlFrom =
    "FROM " +
    "rl_tiga_titik_dua_belas_detail " +
    "INNER JOIN rl_tiga_titik_dua_belas_spesialisasi " +
    "ON rl_tiga_titik_dua_belas_spesialisasi.id = rl_tiga_titik_dua_belas_detail.rl_tiga_titik_dua_belas_spesialisasi_id ";

  const sqlWhere = "WHERE ";

  const sqlOrder = " ORDER BY rl_tiga_titik_dua_belas_detail.rs_id";

  const filter = [];
  const sqlFilterValue = [];

  const rsId = req.query.rsId || null;
  const periode = req.query.periode || null;

  if (rsId != null) {
    filter.push("rl_tiga_titik_dua_belas_detail.rs_id IN ( ? ) ");
    sqlFilterValue.push(req.query.rsId.split(";"));
  }

  if (periode != null) {
    const customDate = new Date(periode);
    // filter.push("rl_tiga_titik_dua_belas_detail.periode = ?");
    filter.push(
      "YEAR(rl_tiga_titik_dua_belas_detail.periode) = ? AND MONTH(rl_tiga_titik_dua_belas_detail.periode) = ? "
    );
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
    "rl_tiga_titik_dua_belas_detail.id, " +
    "rl_tiga_titik_dua_belas_detail.rs_id, " +
    "rl_tiga_titik_dua_belas_detail.periode, " +
    "rl_tiga_titik_dua_belas_spesialisasi.nama_spesialisasi, " +
    "rl_tiga_titik_dua_belas_detail.khusus, " +
    "rl_tiga_titik_dua_belas_detail.besar, " +
    "rl_tiga_titik_dua_belas_detail.sedang, " +
    "rl_tiga_titik_dua_belas_detail.kecil, " +
    "rl_tiga_titik_dua_belas_detail.total " +
    "FROM " +
    "rl_tiga_titik_dua_belas_detail " +
    "INNER JOIN rl_tiga_titik_dua_belas_spesialisasi " +
    "ON rl_tiga_titik_dua_belas_spesialisasi.id = rl_tiga_titik_dua_belas_detail.rl_tiga_titik_dua_belas_spesialisasi_id " +
    "WHERE " +
    "rl_tiga_titik_dua_belas_detail.id = ? ";

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

rlTigaTitikDuaBelasHeader.hasMany(rlTigaTitikDuaBelasDetail, {
  foreignKey: "rl_tiga_titik_dua_belas_id",
});

rlTigaTitikDuaBelasDetail.belongsTo(rlTigaTitikDuaBelasHeader, {
  foreignKey: "id",
});

SpesialisasiRLTigaTitikDuaBelas.hasMany(rlTigaTitikDuaBelasDetail, {
  foreignKey: "id",
});

rlTigaTitikDuaBelasDetail.belongsTo(SpesialisasiRLTigaTitikDuaBelas, {
  foreignKey: "rl_tiga_titik_dua_belas_spesialisasi_id",
});
