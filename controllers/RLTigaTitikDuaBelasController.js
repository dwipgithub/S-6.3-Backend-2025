import { databaseSIRS } from "../config/Database.js";
import {
  rlTigaTitikDuaBelasDetail,
  rlTigaTitikDuaBelasHeader,
  get,
  show,
} from "../models/RLTigaTitikDuaBelasModel.js";
import { SpesialisasiRLTigaTitikDuaBelas } from "../models/RLTigaTitikDuaBelasSpesialisasiModel.js";
import Joi from "joi";
import joiDate from "@joi/date";

export const insertDataRLTigaTitikDuaBelas = async (req, res) => {
  const schema = Joi.object({
    periodeBulan: Joi.number().greater(0).less(13).required(),
    periodeTahun: Joi.number().greater(2023).required(),
    data: Joi.array()
      .items(
        Joi.object()
          .keys({
            SpesialisasiId: Joi.number().required(),
            Khusus: Joi.number().required(),
            Besar: Joi.number().required(),
            Sedang: Joi.number().required(),
            Kecil: Joi.number().required(),
          })
          .required()
      )
      .required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    res.status(404).send({
      status: false,
      message: error.details[0].message,
    });
    return;
  }

  const periodeBulan = String(req.body.periodeBulan);
  const periodeTahun = String(req.body.periodeTahun);
  const periode = periodeTahun
    .concat("-")
    .concat(periodeBulan)
    .concat("-")
    .concat("1");

  let transaction;
  try {
    transaction = await databaseSIRS.transaction();
    const resultInsertHeader = await rlTigaTitikDuaBelasHeader.create(
      {
        rs_id: req.user.satKerId,
        periode: periode,
        user_id: req.user.id,
      },
      {
        transaction,
      }
    );

    const dataDetail = req.body.data.map((value, index) => {
      let totalall = value.Khusus + value.Besar + value.Sedang + value.Kecil;
      return {
        rs_id: req.user.satKerId,
        periode: periode,
        rl_tiga_titik_dua_belas_id: resultInsertHeader.id,
        rl_tiga_titik_dua_belas_spesialisasi_id: value.SpesialisasiId,
        khusus: value.Khusus,
        besar: value.Besar,
        sedang: value.Sedang,
        kecil: value.Kecil,
        total: totalall,
        user_id: req.user.id,
      };
    });

    const resultInsertDetail = await rlTigaTitikDuaBelasDetail.bulkCreate(
      dataDetail,
      {
        transaction,
        updateOnDuplicate: ["khusus", "besar", "sedang", "kecil", "total"],
      }
    );

    await transaction.commit();
    res.status(201).send({
      status: true,
      message: "Data Success Created",
      data: {
        id: resultInsertHeader,
      },
    });
  } catch (error) {
    if (transaction) {
      if (error.name == "SequelizeForeignKeyConstraintError") {
        res.status(400).send({
          status: false,
          message: "Gagal Input Data, Spesialisasi Salah.",
        });
      } else if (error.name == "SequelizeUniqueConstraintError") {
        res.status(400).send({
          status: false,
          message: "Duplicate Data Periode.",
        });
      } else {
        res.status(400).send({
          status: false,
          message: "Gagal Input Data.",
          error: error.name,
        });
        console.log(error);
      }
      await transaction.rollback();
    }
  }
};

export const getRLTigaTitikDuaBelas = (req, res) => {
  const joi = Joi.extend(joiDate);
  const schema = Joi.object({
    rsId: Joi.string().required(),
    periode: joi.date().format("YYYY-M").required(),
    // periode: Joi.number().required(),
    page: Joi.number(),
    limit: Joi.number(),
  });

  const { error, value } = schema.validate(req.query);

  if (error) {
    res.status(400).send({
      status: false,
      message: error.details[0].message,
    });
    return;
  }

  get(req, (err, results) => {
    // console.log(results);
    const message = results.length ? "data found" : "data not found";
    res.status(200).send({
      status: true,
      message: message,
      data: results,
    });
  });
};

export const showRLTigaTitikDuaBelas = (req, res) => {
  show(req.params.id, (err, results) => {
    if (err) {
      res.status(422).send({
        status: false,
        message: err,
      });
      return;
    }

    const message = results.length ? "data found" : "data not found";
    const data = results.length ? results[0] : null;

    res.status(200).send({
      status: true,
      message: message,
      data: data,
    });
  });
};

export const getDataRLTigaTitikDuaBelas = async (req, res) => {
  rlTigaTitikDuaBelasHeader
    .findAll({
      attributes: ["id", "tahun"],
      where: {
        rs_id: req.user.rsId,
        tahun: req.query.tahun,
      },
      include: {
        model: rlTigaTitikDuaBelasDetail,
        attributes: [
          "id",
          "rs_id",
          "tahun",
          "rl_tiga_titik_dua_belas_spesialisasi_id",
          "khusus",
          "besar",
          "sedang",
          "kecil",
          "total",
        ],
        include: {
          model: SpesialisasiRLTigaTitikDuaBelas,
        },
      },
      order: [
        [
          {
            model: rlTigaTitikDuaBelasDetail,
          },
          "rl_tiga_titik_dua_belas_spesialisasi_id",
          "ASC",
        ],
      ],
    })
    .then((results) => {
      res.status(200).send({
        status: true,
        message: "Data Found",
        data: results,
      });
    })
    .catch((err) => {
      res.status(422).send({
        status: false,
        message: err,
      });
      return;
    });
};

export const getRLTigaTitikDuaBelasById = async (req, res) => {
  rlTigaTitikDuaBelasDetail
    .findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: SpesialisasiRLTigaTitikDuaBelas,
      },
    })
    .then((results) => {
      res.status(200).send({
        status: true,
        message: "data found",
        data: results,
      });
    })
    .catch((err) => {
      res.status(422).send({
        status: false,
        message: err,
      });
      return;
    });
};

export const updateDataRLTigaTitikDuaBelas = async (req, res) => {
  const schema = Joi.object({
    khusus: Joi.number().required(),
    besar: Joi.number().required(),
    sedang: Joi.number().required(),
    kecil: Joi.number().required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(404).send({
      status: false,
      message: error.details[0].message,
    });
    return;
  }
  let transaction;
  try {
    const data = req.body;
    data["total"] = data.khusus + data.besar + data.sedang + data.kecil;
    try {
      transaction = await databaseSIRS.transaction();
      const update = await rlTigaTitikDuaBelasDetail.update(data, {
        where: {
          id: req.params.id,
          rs_id: req.user.satKerId,
        },
      });
      if (update[0] != 0) {
        await transaction.commit();
        res.status(201).send({
          status: true,
          message: "Data Diperbaharui",
        });
      } else {
        await transaction.rollback();
        res.status(400).send({
          status: false,
          message: "Gagal Memperbaharui Data",
        });
      }
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      res.status(400).send({
        status: false,
        message: "Gagal Memperbaharui Data",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).send({
      status: false,
      message: "Gagal Memperbaharui Data",
    });
  }
};

export const deleteDataRLTigaTitikDuaBelas = async (req, res) => {
  let transaction;
  try {
    transaction = await databaseSIRS.transaction();
    const count = await rlTigaTitikDuaBelasDetail.destroy({
      where: {
        id: req.params.id,
        rs_id: req.user.satKerId,
      },
    });
    if (count != 0) {
      await transaction.commit();
      res.status(201).send({
        status: true,
        message: "data deleted successfully",
        data: {
          deleted_rows: count,
        },
      });
    } else {
      await transaction.rollback();
      res.status(404).send({
        status: false,
        message: "Gagal Menghapus Data",
      });
    }
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    res.status(404).send({
      status: false,
      message: error,
    });
  }
};
