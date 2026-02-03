import { databaseSIRS } from "../config/Database.js";
import { RLTigaTitikDelapanPemeriksaan, RLTigaTitikDelapanPemeriksaanGroup, RLTigaTitikDelapanPemeriksaanGroupHeader } from "../models/RLTigaTitikDelapanPemeriksaanModel.js";
import {
  rlTigaTitikDelapan,
  rlTigaTitikDelapanDetail,
} from "../models/RLTigaTitikDelapanModel.js";
import Joi from "joi";
import joiDate from "@joi/date"

export const getDataRLTigaTitikDelapan = (req, res) => {
  rlTigaTitikDelapan
    .findAll({
      attributes: ["id", "tahun"],
      where: {
        rs_id: req.query.rsId,
        tahun: req.query.tahun,
      },
      include: {
        model: rlTigaTitikDelapanDetail,
        include: {
          model: RLTigaTitikDelapanPemeriksaan,
        },
      },
      order: [[rlTigaTitikDelapanDetail, RLTigaTitikDelapanPemeriksaan, "no", "ASC"]],
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

export const getDataRLTigaTitikDelapanDetailPemeriksaan = (req, res) => {
  const joi = Joi.extend(joiDate) 
  const schema = joi.object({
    rsId: joi.string().required(),
    periode: joi.date().format("YYYY-MM").required(),
    page: joi.number(),
    limit: joi.number()
})
// 
// const { error, value } =  schema.validate(req.query)

const { error, value } = schema.validate(req.query);
if (error) {
  res.status(404).send({
    status: false,
    message: error.details[0].message,
  });
  return;
}

let whereClause = {}
if(req.user.jenisUserId == 4){
  if(req.query.rsId != req.user.satKerId){
    res.status(404).send({
      status: false,
      message: "Kode RS Tidak Sesuai",
    });
    return;
  }
  whereClause = {
    rs_id: req.user.satKerId,
    periode: req.query.periode,
  }
}else{
  whereClause = {
    rs_id: req.query.rsId,
    periode: req.query.periode,
  }
}

  rlTigaTitikDelapanDetail
    .findAll({
      attributes: ["id", "rl_tiga_titik_delapan_id", "jumlahLaki", "jumlahPerempuan", "rataLaki", "rataPerempuan"],
      where: whereClause,
      include: {
        model: RLTigaTitikDelapanPemeriksaan,
        attributes: ["id", "no", "nama"],
        include: {
          model: RLTigaTitikDelapanPemeriksaanGroup,
          attributes: ["id", "no", "nama"],
          include: {
            model: RLTigaTitikDelapanPemeriksaanGroupHeader,
          },
        },
      },
      order: [[RLTigaTitikDelapanPemeriksaan, "id", "ASC"]],
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

export const getDataRLTigaTitikDelapanById = (req, res) => {
  rlTigaTitikDelapanDetail
    .findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: RLTigaTitikDelapanPemeriksaan,
        attributes: ["nama"],
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

export const getDataRLTigaTitikDelapanDetails = (req, res) => {
  rlTigaTitikDelapan
    .findAll({
      include: [{ model: rlTigaTitikDelapanDetail, include: [RLTigaTitikDelapanPemeriksaan] }],
      attributes: ["id", "tahun"],
      where: {
        rs_id: req.user.satKerId,
        user_id: req.user.id,
        periode: req.param.periode,
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

export const insertDataRLTigaTitikDelapan = async (req, res) => {
  const schema = Joi.object({
    // periode: Joi.date().required(),
    periodeBulan: Joi.number().greater(0).less(13).required(),
    periodeTahun: Joi.number().greater(2022).required(),
    data: Joi.array()
      .items(
        Joi.object().keys({
          rLTigaTitikDelapanPemeriksaanId: Joi.number().required(),
          jumlahLaki: Joi.number().min(0),
          jumlahPerempuan: Joi.number().min(0),
          rataLaki: Joi.number().min(0).precision(3),
          rataPerempuan: Joi.number().min(0).precision(3),
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
    const periode = String(req.body.periodeTahun)+"-"+String(req.body.periodeBulan)+"-1"
    // console.log(periode)
    transaction = await databaseSIRS.transaction();
    const rlInsertHeader = await rlTigaTitikDelapan.create(
      {
        rs_id: req.user.satKerId,
        user_id: req.user.id,
        periode: periode,
      },
      { transaction }
    );

    const dataDetail = req.body.data.map((value, index) => {
      return {
        periode: periode,
        rs_id: req.user.satKerId,
        rl_tiga_titik_delapan_id: rlInsertHeader.id,
        rl_tiga_titik_delapan_pemeriksaan_id: value.rLTigaTitikDelapanPemeriksaanId,
        jumlahLaki: value.jumlahLaki,
        jumlahPerempuan: value.jumlahPerempuan,
        rataLaki: value.rataLaki,
        rataPerempuan: value.rataPerempuan,
        user_id: req.user.id,
      };
    });

    await rlTigaTitikDelapanDetail.bulkCreate(dataDetail, {
      transaction,
      updateOnDuplicate: ["jumlahLaki", "jumlahPerempuan", "rataLaki", "rataPerempuan"],
    });

    await transaction.commit();
    res.status(201).send({
      status: true,
      message: "data created",
      data: {
        id: rlInsertHeader.id,
      },
    });
  } catch (error) {
    console.log(error);
    if (transaction) {
      await transaction.rollback();
    }
  }
};

export const updateDataRLTigaTitikDelapan = async (req, res) => {
  const schema = Joi.object({
    jumlahLaki: Joi.number().min(0),
    jumlahPerempuan: Joi.number().min(0),
    rataLaki: Joi.number().min(0),
    rataPerempuan: Joi.number().min(0),
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
    const existingData = await rlTigaTitikDelapanDetail.findOne({
      where: {
        id: req.params.id,
        rs_id: req.user.satKerId,
      },transaction
    });
    console.log(existingData)
    if (existingData) {
      if (
        existingData.jumlahLaki !== parseInt(req.body.jumlahLaki) ||
        existingData.jumlahPerempuan !== parseInt(req.body.jumlahPerempuan) ||
        existingData.rataLaki !== parseFloat(req.body.rataLaki) ||
        existingData.rataPerempuan !== parseFloat(req.body.rataPerempuan)
      ) {
        existingData.jumlahLaki = parseInt(req.body.jumlahLaki) 
        existingData.jumlahPerempuan = parseInt(req.body.jumlahPerempuan) 
        existingData.rataLaki = parseFloat(req.body.rataLaki)
        existingData.rataPerempuan = parseFloat(req.body.rataPerempuan)
        await existingData.save({ transaction });
        await transaction.commit();

        res.status(201).send({
          status: true,
          message: "Data Diperbaharui",
        });
      } else {
        await transaction.rollback();
        res.status(200).send({
          status: false,
          message: "Nilai baru sama dengan nilai yang sebelumnya, tidak ada pembaruan",
        });
      }
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

export const deleteDataRLTigaTitikDelapan = async (req, res) => {
  let transaction;
  try {
    transaction = await databaseSIRS.transaction();
    const count = await rlTigaTitikDelapanDetail.destroy({
      where: {
        id: req.params.id,
        rs_id: req.user.satKerId,
      },
    });
    if (count != 0) {
      await transaction.commit();
      res.status(201).send({
        status: true,
        message: "Data Berhasil Dihapus",
        data: {
          deleted_rows: count,
        },
      });
    } else {
      await transaction.rollback();
      res.status(404).send({
        status: false,
        message: "Data Tidak Berhasil di Hapus",
      });
    }
  } catch (error) {
    await transaction.rollback();
    res.status(500).send({
      status: false,
      message: error,
    });
  }
};
