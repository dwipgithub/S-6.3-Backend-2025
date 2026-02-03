import { databaseSIRS } from "../config/Database.js";
import Joi from "joi";
import joiDate from "@joi/date"
import { rlTigaTitikEmpatBelas, rlTigaTitikEmpatBelasDetail } from "../models/RLTigaTitikEmpatBelasModel.js";
import { RLTigaTitikEmpatBelasJenisKegiatan } from "../models/RLTigaTitikEmpatBelasJenisKegiatanModel.js";

export const getDataRLTigaTitikEmpatBelasDetailKegiatan= (req, res) => {
  const joi = Joi.extend(joiDate) 
  const schema = joi.object({
      rsId: joi.string().required(),
      tahun: joi.date().required(),
      page: joi.number(),
      limit: joi.number()
  })
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
      tahun: req.query.tahun,
    }
  }else{
    whereClause = {
      rs_id: req.query.rsId,
      tahun: req.query.tahun,
    }
  }

  rlTigaTitikEmpatBelasDetail
    .findAll({
      attributes: ["id", "rl_tiga_titik_empat_belas_id", "jumlah"],
      where: whereClause,
      include: {
        model: RLTigaTitikEmpatBelasJenisKegiatan,
        attributes: ["id", "no", "nama"],
        as: 'rl_tiga_titik_empat_belas_jenis_kegiatan',
      },
      order: [[{ model: RLTigaTitikEmpatBelasJenisKegiatan, as: 'rl_tiga_titik_empat_belas_jenis_kegiatan' }, "id", "ASC"]],
    })
    .then((results) => {

      res.status(200).send({
        status: true,
        message: "data found",
        data: results,
      });
    })
    .catch((err) => {
      console.log(err)
      res.status(422).send({
        status: false,
        message: err,
      });
      return;
    });
};

export const getDataRLTigaTitikEmpatBelasById = (req, res) => {
  rlTigaTitikEmpatBelasDetail
    .findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: RLTigaTitikEmpatBelasJenisKegiatan,
        as : 'rl_tiga_titik_empat_belas_jenis_kegiatan',
        attributes: ["id","no","nama"],
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
      console.log(err)
      res.status(422).send({
        status: false,
        message: err,
      });
      return;
    });
};

export const insertDataRLTigaTitikEmpatBelas = async (req, res) => {
  const schema = Joi.object({
    tahun: Joi.number().required(),
    tahunDanBulan: Joi.date().required(),
    data: Joi.array()
      .items(
        Joi.object().keys({
          rLTigaTitikEmpatBelasJenisKegiatanId: Joi.number().required(),
          jumlah: Joi.number().min(0)
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
    const rlInsertHeader = await rlTigaTitikEmpatBelas.create(
      {
        rs_id: req.user.satKerId,
        user_id: req.user.id,
        tahun: req.body.tahunDanBulan,
      },
      { transaction }
    );
    const dataDetail = req.body.data.map((value, index) => {

      return {
        tahun: req.body.tahunDanBulan,
        rs_id: req.user.satKerId,
        rl_tiga_titik_empat_belas_id: rlInsertHeader.id,
        rl_tiga_titik_empat_belas_jenis_kegiatan_id: value.rLTigaTitikEmpatBelasJenisKegiatanId,
        jumlah: value.jumlah,
        user_id: req.user.id
      };
    });

   await rlTigaTitikEmpatBelasDetail.bulkCreate(dataDetail, {
      transaction,
      updateOnDuplicate: ["jumlah"],
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
    if (transaction) {
      if (error.name == "SequelizeForeignKeyConstraintError") {
        res.status(400).send({
          status: false,
          message: "Gagal Input Data, Jenis Kegiatan Salah.",
        });s
      } else {
        console.log(error)
        res.status(400).send({
          status: false,
          message: "Gagal Input Data.",
        });
      }
      await transaction.rollback();
    }
  }
};

export const updateDataRLTigaTitikEmpatBelas = async (req, res) => {
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
    transaction = await databaseSIRS.transaction();

    const existingData = await rlTigaTitikEmpatBelasDetail.findOne({
      where: {
        id: req.params.id,
        rs_id: req.user.satKerId,
      },
    });

    if (existingData) {
      if (
        existingData.jumlah !== req.body.jumlah 
      ) {
        existingData.jumlah = req.body.jumlah; 
        await existingData.save();
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

export const deleteDataRLTigaTitikEmpatBelas = async (req, res) => {
  let transaction;
  try {
    transaction = await databaseSIRS.transaction();
    const count = await rlTigaTitikEmpatBelasDetail.destroy({
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
