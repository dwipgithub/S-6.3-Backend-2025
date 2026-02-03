import { databaseSIRS } from "../config/Database.js";

import Joi from "joi";
import {
  rlTigaTitikSembilanBelas,
  rlTigaTitikSembilanBelasDetail,
} from "../models/RLTigaTitikSembilanBelas.js";
import { golonganObatTigaTitikSembilanBelas } from "../models/GolonganObatTigaTitikSembilanBelas.js";

//new

// Done
export const getDataRLTigaTitikSembilanBelas = (req, res) => {
  let where = { rs_id: req.user.satKerId };

  if (req.query.tahun) where.tahun = req.query.tahun;

  rlTigaTitikSembilanBelas
    .findAll({
      attributes: ["id", "tahun"],
      where: where,
      include: {
        model: rlTigaTitikSembilanBelasDetail,
        include: {
          model: golonganObatTigaTitikSembilanBelas,
          attributes: ["id", "no", "nama"],
          as: "golongan_obat_rl_tiga_titik_sembilan_belas",
        },
      },
      order: [
        [
          rlTigaTitikSembilanBelasDetail,
          {
            model: golonganObatTigaTitikSembilanBelas,
            as: "golongan_obat_rl_tiga_titik_sembilan_belas",
          },
          "no",
          "ASC",
        ],
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

// Unknown
export const getDataRLTigaTitikSembilanBelasDetailGolonganObat = (req, res) => {
  rlTigaTitikSembilanBelasDetail
    .findAll({
      attributes: [
        "id",
        "rl_tiga_titik_sembilan_belas_id",
        "ranap_pasien_keluar",
        "ranap_lama_dirawat",
        "jumlah_pasien_rajal",
        "rajal_lab",
        "rajal_radiologi",
        "rajal_lain_lain",
      ],
      where: {
        rs_id: req.user.satKerId,
        tahun: req.query.tahun,
      },
      include: {
        model: golonganObatTigaTitikSembilanBelas,
        attributes: ["id", "no", "nama"],
        as: "golongan_obat_rl_tiga_titik_sembilan_belas",
      },
      order: [
        [
          {
            model: golonganObatTigaTitikSembilanBelas,
            as: "golongan_obat_rl_tiga_titik_sembilan_belas",
          },
          "id",
          "ASC",
        ],
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
      console.log(err);
      res.status(422).send({
        status: false,
        message: err,
      });
      return;
    });
};

// Done
export const getDataRLTigaTitikSembilanBelasById = (req, res) => {
  rlTigaTitikSembilanBelasDetail
    .findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: golonganObatTigaTitikSembilanBelas,
        attributes: ["id", "no", "nama"],
        as: "golongan_obat_rl_tiga_titik_sembilan_belas",
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

export const getDataRLTigaTitikSembilanBelasDetails = (req, res) => {
  rlTigaTitikSembilanBelasDetail
    .findOne({
      where: {
        rs_id: req.user.satKerId,
        user_id: req.user.id,
        tahun: req.query.tahun,
        golongan_obat_rl_tiga_titik_sembilan_belas_id: req.query.specificId,
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

// Done
export const insertDataRLTigaTitikSembilanBelas = async (req, res) => {
  const schema = Joi.object({
    tahun: Joi.number().required(),
    data: Joi.array()
      .items(
        Joi.object().keys({
          golonganObatTigaTitikSembilanBelasId: Joi.number().required(),
          ranap_pasien_keluar: Joi.number().min(0),
          ranap_lama_dirawat: Joi.number().min(0),
          jumlah_pasien_rajal: Joi.number().min(0),
          rajal_lab: Joi.number().min(0),
          rajal_radiologi: Joi.number().min(0),
          rajal_lain_lain: Joi.number().min(0),
        })
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
    let rlTigaTitikSembilanBelasID;

    const dataExisted = await rlTigaTitikSembilanBelas.findOne({
      where: {
        tahun: req.body.tahun,
        rs_id: req.user.satKerId,
        user_id: req.user.id,
      },
    });

    if (dataExisted) {
      rlTigaTitikSembilanBelasID = dataExisted.id;
    } else {
      const rlInsertHeader = await rlTigaTitikSembilanBelas.create(
        {
          rs_id: req.user.satKerId,
          user_id: req.user.id,
          tahun: req.body.tahun,
        },
        { transaction }
      );

      rlTigaTitikSembilanBelasID = rlInsertHeader.id;
    }

    const dataDetail = req.body.data.map((value, index) => {
      return {
        tahun: req.body.tahun,
        rs_id: req.user.satKerId,
        rl_tiga_titik_sembilan_belas_id: rlTigaTitikSembilanBelasID,
        golongan_obat_rl_tiga_titik_sembilan_belas_id:
          value.golonganObatTigaTitikSembilanBelasId,
        ranap_pasien_keluar: value.ranap_pasien_keluar,
        ranap_lama_dirawat: value.ranap_lama_dirawat,
        jumlah_pasien_rajal: value.jumlah_pasien_rajal,
        rajal_lab: value.rajal_lab,
        rajal_radiologi: value.rajal_radiologi,
        rajal_lain_lain: value.rajal_lain_lain,
        user_id: req.user.id,
      };
    });

    await rlTigaTitikSembilanBelasDetail.bulkCreate(dataDetail, {
      transaction,
      updateOnDuplicate: ["ranap_pasien_keluar"],
      updateOnDuplicate: ["ranap_lama_dirawat"],
      updateOnDuplicate: ["jumlah_pasien_rajal"],
      updateOnDuplicate: ["rajal_lab"],
      updateOnDuplicate: ["rajal_radiologi"],
      updateOnDuplicate: ["rajal_lain_lain"],
    });

    await transaction.commit();
    res.status(201).send({
      status: true,
      message: "data created",
      data: {
        id: rlTigaTitikSembilanBelasID,
      },
    });
  } catch (error) {
    if (transaction) {
      if (error.name == "SequelizeForeignKeyConstraintError") {
        res.status(400).send({
          status: false,
          message: "Gagal Input Data, Jenis Kegiatan Salah.",
          data: error,
        });
      } else {
        console.log(error);
        res.status(400).send({
          status: false,
          message: error,
        });
      }
      await transaction.rollback();
    }
  }
};

// Done
export const updateDataRLTigaTitikSembilanBelas = async (req, res) => {
  const schema = Joi.object({
    ranap_pasien_keluar: Joi.number().required(),
    ranap_lama_dirawat: Joi.number().required(),
    jumlah_pasien_rajal: Joi.number().required(),
    rajal_lab: Joi.number().required(),
    rajal_radiologi: Joi.number().required(),
    rajal_lain_lain: Joi.number().required(),
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

    const existingData = await rlTigaTitikSembilanBelasDetail.findOne({
      where: {
        id: req.params.id,
        rs_id: req.user.satKerId,
      },
    });

    if (existingData) {
      if (existingData.ranap_pasien_keluar !== req.body.ranap_pasien_keluar)
        existingData.ranap_pasien_keluar = req.body.ranap_pasien_keluar;
      if (existingData.ranap_lama_dirawat !== req.body.ranap_lama_dirawat)
        existingData.ranap_lama_dirawat = req.body.ranap_lama_dirawat;
      if (existingData.jumlah_pasien_rajal !== req.body.jumlah_pasien_rajal)
        existingData.jumlah_pasien_rajal = req.body.jumlah_pasien_rajal;
      if (existingData.rajal_lab !== req.body.rajal_lab)
        existingData.rajal_lab = req.body.rajal_lab;
      if (existingData.rajal_radiologi !== req.body.rajal_radiologi)
        existingData.rajal_radiologi = req.body.rajal_radiologi;
      if (existingData.rajal_lain_lain !== req.body.rajal_lain_lain)
        existingData.rajal_lain_lain = req.body.rajal_lain_lain;

      await existingData.save();
      await transaction.commit();

      res.status(201).send({
        status: true,
        message: "Data berhasil diperbaharui.",
      });
    } else {
      await transaction.rollback();
      res.status(400).send({
        status: false,
        message: "Data tidak ditemukan",
      });
    }
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    res.status(500).send({
      status: false,
      message: "Gagal Memperbaharui Data",
    });
  }
};

// Done
export const deleteDataRLTigaTitikSembilanBelas = async (req, res) => {
  let transaction;

  try {
    const deleted = await rlTigaTitikSembilanBelasDetail.destroy({
      where: {
        id: req.params.id,
        rs_id: req.user.satKerId,
      },
    });

    if (deleted) {
      res.status(201).send({
        status: true,
        message: "Data Berhasil Dihapus",
      });
    }
  } catch (error) {
    // await transaction.rollback();
    res.status(500).send({
      status: false,
      message: error,
    });
  }
};
