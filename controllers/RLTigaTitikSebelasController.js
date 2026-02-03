import { databaseSIRS } from "../config/Database.js";
import {
  rlTigaTitikSebelasHeader,
  rlTigaTitikSebelasDetail,
  get,
  show,
} from "../models/RLTigaTitikSebelasModel.js";

import { JenisKegiatanRLTigaTitikSebelas } from "../models/JenisKegiatanRLTigaTitikSebelasModel.js";

import Joi from "joi";

export const getDataRLTigaTitikSebelas = (req, res) => {
  rlTigaTitikSebelasHeader
    .findAll({
      attributes: ["id", "periode"],
      where: {
        rs_id: req.query.rsId,
        periode: req.query.tahun,
      },
      include: {
        model: rlTigaTitikSebelasDetail,
        attributes: [
          "id",
          "rs_id",
          "periode",
          "rl_tiga_titik_sebelas_jenis_kegiatan_id",
          "jumlah",
        ],
        include: {
          model: JenisKegiatanRLTigaTitikSebelas,
        },
      },
      order: [
        [
          { model: rlTigaTitikSebelasDetail },
          "rl_tiga_titik_sebelas_jenis_kegiatan_id",
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

export const getRLTigaTitikSebelas = (req, res) => {
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
    // console.log(results);
    const message = results.length ? "data found" : "data not found";
    res.status(200).send({
      status: true,
      message: message,
      data: results,
    });
  });
};

export const showRLTigaTitikSebelas = (req, res) => {
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

export const getDataRLTigaTitikSebelasDetail = (req, res) => {
  rlTigaTitikSebelasDetail
    .findAll({
      attributes: [
        "id",
        "rl_tiga_titik_sebelas_id",
        "jeniskegiatan_rl_tigatitiksebelas_id",
        "jumlah",
      ],
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

export const getRLTigaTitikSebelasById = async (req, res) => {
  rlTigaTitikSebelasDetail
    .findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: JenisKegiatanRLTigaTitikSebelas,
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

export const insertDataRLTigaTitikSebelas = async (req, res) => {
  const schema = Joi.object({
    tahun: Joi.number().required(),
    data: Joi.array()
      .items(
        Joi.object()
          .keys({
            jenisKegiatanId: Joi.number().required(),
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
    const resultInsertHeader = await rlTigaTitikSebelasHeader.create(
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
        rl_tiga_titik_sebelas_id: resultInsertHeader.id,
        rl_tiga_titik_sebelas_jenis_kegiatan_id: value.jenisKegiatanId,
        jumlah: value.jumlah,
        user_id: req.user.id,
      };
    });

    const resultInsertDetail = await rlTigaTitikSebelasDetail.bulkCreate(
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
          message: "Gagal Input Data, Jenis Kegiatan Salah.",
        });
      } else {
        res.status(400).send({
          status: false,
          message: "Gagal Input Data.",
          error: error,
        });
      }
      await transaction.rollback();
    }
  }
};

export const updateDataRLTigaTitikSebelas = async (req, res) => {
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
      const update = await rlTigaTitikSebelasDetail.update(data, {
        where: {
          id: req.params.id,
          rs_id: req.user.satKerId,
        },
      });
      //   console.log(update[0] ==);
      if (update[0] != 0) {
        console.log(update);
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
          error: update,
        });
      }
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      res.status(400).send({
        status: false,
        message: "Gagal Memperbaharui Data",
        error: error,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).send({
      status: false,
      message: "Gagal Memperbaharui Data",
      error: error,
    });
  }

  //   console.log(req.body);
};

export const deleteDataRLTigaTitikSebelas = async (req, res) => {
  let transaction;
  try {
    transaction = await databaseSIRS.transaction();
    const count = await rlTigaTitikSebelasDetail.destroy({
      where: {
        id: req.params.id,
        rs_id: req.user.satKerId,
      },
    });

    if (count != 0) {
      console.log("atas");
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
