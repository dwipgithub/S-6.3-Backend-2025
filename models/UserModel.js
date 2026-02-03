import { DataTypes, QueryTypes } from "sequelize";
import { databaseSIRS } from "../config/Database.js";

export const users = databaseSIRS.define(
  "users",
  {
    nama: {
      type: DataTypes.STRING,
    },
    jenis_user_id: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
    satker_id: {
      type: DataTypes.STRING,
    },
    jenis_user_id: {
      type: DataTypes.STRING,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    modified_at: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
  }
);

export const users_sso = databaseSIRS.define(
  "users_sso",
  {
    nama: {
      type: DataTypes.STRING,
    },
    jenis_user_id: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
    rs_id: {
      type: DataTypes.STRING,
    },
    jenis_user_id: {
      type: DataTypes.STRING,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    modified_at: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
  }
);

export const satu_sehat_id = databaseSIRS.define(
  "satu_sehat_id",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    kode_baru_faskes: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // asumsi kode unik
    },
    secret_key: {
      type: DataTypes.STRING,
    },
    client_id: {
      type: DataTypes.STRING,
    },
    organization_id: {
      type: DataTypes.STRING,
    },
    sim_pengembang_id: {
      type: DataTypes.INTEGER,
    },
    sim_pengembang_nama: {
      type: DataTypes.STRING,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    modified_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "satu_sehat_id",
    timestamps: false, // karena kamu pakai manual created_at & modified_at
    underscored: true, // kalau nama kolom pakai underscore
  }
);

export const show = (req, callback) => {
  const sql =
    "SELECT users.id, " +
    "users.nama, " +
    "users.email, " +
    "users.satker_id as satKerId, " +
    "users.jenis_user_id as jenisUserId, " +
    "users.kriteria_user_id as kriteriaUserId " +
    "FROM " +
    "users " +
    "WHERE users.id = ?";

  const sqlFilterValue = [req.params.id];
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

export const insert = (data, callback) => {
  const sqlInsert =
    "INSERT INTO users (nama,email,password,satker_id,jenis_user_id,kriteria_user_id) VALUES ( ? )";
  databaseSIRS
    .query(sqlInsert, {
      type: QueryTypes.INSERT,
      replacements: [data],
    })
    .then((res) => {
      callback(null, res);
    })
    .catch((error) => {
      callback(error, null);
    });
};

users_sso.hasOne(satu_sehat_id, {
  foreignKey: "kode_baru_faskes", // key di satu_sehat_id
  sourceKey: "rs_id", // key di users_sso yang kita join-kan
  as: "satuSehat", // alias association
});

satu_sehat_id.belongsTo(users_sso, {
  foreignKey: "kode_baru_faskes",
  targetKey: "rs_id",
});
