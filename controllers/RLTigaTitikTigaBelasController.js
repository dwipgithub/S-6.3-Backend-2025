import { databaseSIRS } from "../config/Database.js";
import {
  rlTigaTitikTigaBelasDetail,
  rlTigaTitikTigaBelasHeader,
  get,
  show,
} from "../models/RLTigaTitikTigaBelasModel.js";

import {
  JenisTindakanRLTigaTitikTigaBelasHeader,
  JenisTindakanRLTigaTitikTigaBelas,
} from "../models/RLTigaTitikTigaBelasJenisTindakanModel.js";

import Joi from "joi";

export const insertDataRLTigaTitikTigaBelas = async (req, res) => {
  const schema = Joi.object({
    tahun: Joi.number().required(),
    data: Joi.array()
      .items(
        Joi.object()
          .keys({
            rl_tiga_titik_tiga_belas_jenis_tindakan_id: Joi.number().required(),
            jumlah: Joi.number().required(),
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

  let transaction;
  try {
    transaction = await databaseSIRS.transaction();
    const resultInsertHeader = await rlTigaTitikTigaBelasHeader.create(
      {
        rs_id: req.user.satKerId,
        periode: req.body.tahun,
        user_id: req.user.id,
      },
      {
        transaction,
      }
    );

    const dataDetail = req.body.data.map((value, index) => {
      return {
        rs_id: req.user.satKerId,
        periode: req.body.tahun,
        rl_tiga_titik_tiga_belas_id: resultInsertHeader.id,
        rl_tiga_titik_tiga_belas_jenis_tindakan_id:
          value.rl_tiga_titik_tiga_belas_jenis_tindakan_id,
        jumlah: value.jumlah,
        user_id: req.user.id,
      };
    });
    const resultInsertDetail = await rlTigaTitikTigaBelasDetail.bulkCreate(
      dataDetail,
      {
        transaction,
        updateOnDuplicate: ["jumlah"],
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
          message: "Gagal Input Data, Jenis Tindakan Salah.",
        });
      } else {
        res.status(400).send({
          status: false,
          message: "Gagal Input Data.",
          error: error.name,
        });
      }
      await transaction.rollback();
    }
  }
};

export const getRLTigaTitikTigaBelas = (req, res) => {
  const schema = Joi.object({
    rsId: Joi.string().required(),
    periode: Joi.number().required(),
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
    const message = results.length ? "data found" : "data not found";
    res.status(200).send({
      status: true,
      message: message,
      data: results,
    });
  });
};

export const showRLTigaTitikTigaBelas = (req, res) => {
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

export const getDataRLTigaTitikTigaBelas = async (req, res) => {
  rlTigaTitikTigaBelasHeader
    .findAll({
      attributes: ["id", "tahun"],
      where: {
        rs_id: req.user.satKerId,
        periode: req.query.tahun,
      },
      include: {
        model: rlTigaTitikTigaBelasDetail,
        attributes: [
          "id",
          "rs_id",
          "tahun",
          "rl_tiga_titik_tiga_belas_jenis_tindakan_id",
          "jumlah",
        ],
        include: {
          model: JenisTindakanRLTigaTitikTigaBelas,
          include: {
            model: JenisTindakanRLTigaTitikTigaBelasHeader,
          },
        },
      },
      order: [
        [
          {
            model: rlTigaTitikTigaBelasDetail,
          },
          "rl_tiga_titik_tiga_belas_jenis_tindakan_id",
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

export const getRLTigaTitikTigaBelasById = async (req, res) => {
  rlTigaTitikTigaBelasDetail
    .findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: JenisTindakanRLTigaTitikTigaBelas,
        include: {
          model: JenisTindakanRLTigaTitikTigaBelasHeader,
        },
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

export const updateDataRLTigaTitikTigaBelas = async (req, res) => {
  const schema = Joi.object({
    jumlah: Joi.number().required(),
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
    try {
      transaction = await databaseSIRS.transaction();
      const update = await rlTigaTitikTigaBelasDetail.update(data, {
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

export const deleteDataRLTigaTitikTigaBelas = async (req, res) => {
  let transaction;
  try {
    transaction = await databaseSIRS.transaction();
    const count = await rlTigaTitikTigaBelasDetail.destroy({
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
