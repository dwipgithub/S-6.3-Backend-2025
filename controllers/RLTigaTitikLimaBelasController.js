import { databaseSIRS } from "../config/Database.js";

import Joi from "joi";
import {
  rlTigaTitikLimaBelas,
  rlTigaTitikLimaBelasDetail,
} from "../models/RLTigaTitikLimaBelas.js";
import { jenisKegiatanTigaTitikLimaBelas } from "../models/JenisKegiatanTigaTitikLimaBelas.js";

//new---------------------------------------------------------------------------------------------------------------------------
export const getDataRLTigaTitikLimaBelas = (req, res) => {
  rlTigaTitikLimaBelas
    .findAll({
      attributes: ["id", "tahun"],
      where: {
        rs_id: req.user.satKerId,
        tahun: req.query.tahun,
      },
      include: {
        model: rlTigaTitikLimaBelasDetail,
        include: {
          model: jenisKegiatanTigaTitikLimaBelas,
          attributes: ["id", "no", "nama"],
          as: "jenis_kegiatan_rl_tiga_titik_lima_belas",
        },
      },
      order: [
        [
          rlTigaTitikLimaBelasDetail,
          {
            model: jenisKegiatanTigaTitikLimaBelas,
            as: "jenis_kegiatan_rl_tiga_titik_lima_belas",
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

export const getDataRLTigaTitikLimaBelasDetailKegiatan = (req, res) => {
  rlTigaTitikLimaBelasDetail
    .findAll({
      attributes: ["id", "rl_tiga_titik_lima_belas_id", "jumlah"],
      where: {
        rs_id: req.user.satKerId,
        tahun: req.query.tahun,
      },
      include: {
        model: jenisKegiatanTigaTitikLimaBelas,
        attributes: ["id", "no", "nama"],
        as: "jenis_kegiatan_rl_tiga_titik_lima_belas",
      },
      order: [
        [
          {
            model: jenisKegiatanTigaTitikLimaBelas,
            as: "jenis_kegiatan_rl_tiga_titik_lima_belas",
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

export const getDataRLTigaTitikLimaBelasById = (req, res) => {
  rlTigaTitikLimaBelasDetail
    .findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: jenisKegiatanTigaTitikLimaBelas,
        as: "jenis_kegiatan_rl_tiga_titik_lima_belas",
        attributes: ["no", "nama"],
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

export const getDataRLTigaTitikLimaBelasDetails = (req, res) => {
  rlTigaTitikLimaBelas
    .findAll({
      include: [
        {
          model: rlTigaTitikLimaBelasDetail,
          include: [jenisKegiatanTigaTitikLimaBelas],
        },
      ],
      attributes: ["id", "tahun"],
      where: {
        rs_id: req.user.satKerId,
        user_id: req.user.id,
        tahun: req.param.tahun,
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

export const insertDataRLTigaTitikLimaBelas = async (req, res) => {
  const schema = Joi.object({
    tahun: Joi.number().required(),
    data: Joi.array()
      .items(
        Joi.object().keys({
          jenisKegiatanTigaTitikLimaBelasId: Joi.number().required(),
          jumlah: Joi.number().min(0),
          laki: Joi.number().min(0),
          perempuan: Joi.number().min(0),
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
    const rlInsertHeader = await rlTigaTitikLimaBelas.create(
      {
        rs_id: req.user.satKerId,
        user_id: req.user.id,
        tahun: req.body.tahun,
      },
      { transaction }
    );
    const dataDetail = req.body.data.map((value, index) => {
      return {
        tahun: req.body.tahun,
        rs_id: req.user.satKerId,
        rl_tiga_titik_lima_belas_id: rlInsertHeader.id,
        jenis_kegiatan_rl_tiga_titik_lima_belas_id:
          value.jenisKegiatanTigaTitikLimaBelasId,
        laki: value.laki,
        perempuan: value.perempuan,
        jumlah: value.jumlah,
        user_id: req.user.id,
      };
    });

    await rlTigaTitikLimaBelasDetail.bulkCreate(dataDetail, {
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
        });
        s;
      } else {
        console.log(error);
        res.status(400).send({
          status: false,
          message: "Gagal Input Data.",
        });
      }
      await transaction.rollback();
    }
  }
};

export const updateDataRLTigaTitikLimaBelas = async (req, res) => {
  const schema = Joi.object({
    jumlah: Joi.number().required(),
    laki: Joi.number().required(),
    perempuan: Joi.number().required(),
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

    const existingData = await rlTigaTitikLimaBelasDetail.findOne({
      where: {
        id: req.params.id,
        rs_id: req.user.satKerId,
      },
    });

    if (existingData) {
      if (existingData.jumlah !== req.body.jumlah) {
        existingData.perempuan = req.body.perempuan;
        existingData.laki = req.body.laki;
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
          message:
            "Nilai baru sama dengan nilai yang sebelumnya, tidak ada pembaruan",
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

export const deleteDataRLTigaTitikLimaBelas = async (req, res) => {
  try {
    const deleted = await rlTigaTitikLimaBelasDetail.destroy({
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
    res.status(500).send({
      status: false,
      message: error,
    });
  }
};

//old----------------------------------------------------------------------------------------------------------------------------------------------------

// export const getDataRLTigaTitikLimaBelas = (req, res) => {
//     rlTigaTitikLimaBelasHeader.findAll({
//         attributes: ['id','tahun'],
//         where:{
//             rs_id: req.user.rsId,
//             tahun: req.query.tahun
//         },
//         include:{
//             model: rlTigaTitikLimaBelasDetail,
//             include: {
//                 model: caraPembayaran
//             }
//         },
//         order:[[{model:rlTigaTitikLimaBelasDetail}, 'cara_pembayaran_id','ASC']]
//     })
//     .then((results) => {
//         res.status(200).send({
//             status: true,
//             message: "data found",
//             data: results
//         })
//     })
//     .catch((err) => {
//         res.status(422).send({
//             status: false,
//             message: err
//         })
//         return
//     })
// }

// export const getDataRLTigaTitikLimaBelasDetail = (req, res) => {
//     rlTigaTitikLimaBelasDetail.findAll({
//         attributes: [
//             'id',
//             'rl_tiga_titik_lima_belas_id',
//             'user_id',
//             'cara_pembayaran_id',
//             'pasien_rawat_inap_jpk',
//             'pasien_rawat_inap_jld',
//             'jumlah_pasien_rawat_jalan',
//             'jumlah_pasien_rawat_jalan_lab',
//             'jumlah_pasien_rawat_jalan_rad',
//             'jumlah_pasien_rawat_jalan_ll',
//         ],
//         where:{
//             id: req.params.id
//         },
//         include: {
//             model: caraPembayaran,
//             attributes: ['nama']
//         }
//         })
//         .then((results) => {
//             res.status(200).send({
//                 status: true,
//                 message: "data found",
//                 data: results
//             })
//         })
//         .catch((err) => {
//             res.status(422).send({
//                 status: false,
//                 message: err
//             })
//             return
//         })
//     }

// export const getRLTigaTitikLimaBelasById = async(req,res)=>{
//     rlTigaTitikLimaBelasDetail.findOne({

//         where:{
//             // rs_id: req.user.rsId,
//             // tahun: req.query.tahun
//             id:req.params.id
//         },
//         include:{
//             model: caraPembayaran
//             // include: {
//             //     model: caraPembayaran
//             // }
//         }
//     })
//     .then((results) => {
//         res.status(200).send({
//             status: true,
//             message: "data found",
//             data: results
//         })
//     })
//     .catch((err) => {
//         res.status(422).send({
//             status: false,
//             message: err
//         })
//         return
//     })
// }

// export const updateDataRLTigaTitikLimaBelas = async(req,res)=>{
//     try{
//         const data = req.body
//         try {
//             const update = await rlTigaTitikLimaBelasDetail.update( data,
//             {
//                 where: {
//                     id: req.params.id
//                 }
//             }
//         )
//         res.status(201).send({
//             status: true,
//             message: "Data Diperbaharui",
//         })
//     } catch (error){
//         res.status(400).send({
//             status:false,
//             message: "Gagal Memperbaharui Data"
//         })
//     }
// }  catch (error) {
//     console.log(error.message)
//     res.status(400).send({
//         status:false,
//         message: "Gagal Memperbaharui Data"
//     })
// }
// }

// export const insertDataRLTigaTitikLimaBelas =  async (req, res) => {
//     const schema = Joi.object({
//         tahun: Joi.number().required(),
//         data: Joi.array()
//             .items(
//                 Joi.object().keys({
//                     caraPembayaranId: Joi.number().required(),
//                     pasienRawatInapJpk: Joi.number().required(),
//                     pasienRawatInapJld: Joi.number().required(),
//                     jumlahPasienRawatJalan: Joi.number().required(),
//                     jumlahPasienRawatJalanLab: Joi.number().required(),
//                     jumlahPasienRawatJalanRad: Joi.number().required(),
//                     jumlahPasienRawatJalanLl: Joi.number().required()
//                 }).required()
//             ).required()
//     })

//     const { error, value } =  schema.validate(req.body)
//     if (error) {
//         res.status(404).send({
//             status: false,
//             message: error.details[0].message
//         })
//         return
//     }
//     // console.log(req.user);
//     let transaction
//     try {
//         transaction = await databaseSIRS.transaction()
//         const resultInsertHeader = await rlTigaTitikLimaBelasHeader.create({
//             rs_id: req.user.rsId,
//             tahun: req.body.tahun,
//             user_id: req.user.id
//         }, {
//             transaction
//          })

//         const dataDetail = req.body.data.map((value, index) => {
//             return {
//                 rs_id: req.user.rsId,
//                 tahun: req.body.tahun,
//                 rl_tiga_titik_lima_belas_id: resultInsertHeader.id,
//                 cara_pembayaran_id: value.caraPembayaranId,
//                 pasien_rawat_inap_jpk: value.pasienRawatInapJpk,
//                 pasien_rawat_inap_jld: value.pasienRawatInapJld,
//                 jumlah_pasien_rawat_jalan: value.jumlahPasienRawatJalan,
//                 jumlah_pasien_rawat_jalan_lab: value.jumlahPasienRawatJalanLab,
//                 jumlah_pasien_rawat_jalan_rad: value.jumlahPasienRawatJalanRad,
//                 jumlah_pasien_rawat_jalan_ll: value.jumlahPasienRawatJalanLl,
//                 user_id: req.user.id
//             }
//         })

//         const resultInsertDetail = await rlTigaTitikLimaBelasDetail.bulkCreate(dataDetail, {
//             transaction,
//             updateOnDuplicate:[
//             'pasien_rawat_inap_jpk',
//             'pasien_rawat_inap_jld',
//             'jumlah_pasien_rawat_jalan',
//             'jumlah_pasien_rawat_jalan_lab',
//             'jumlah_pasien_rawat_jalan_rad',
//             'jumlah_pasien_rawat_jalan_ll'
//             ]
//         })

//         await transaction.commit()
//         res.status(201).send({
//             status: true,
//             message: "data created",
//             data: {
//                 id: resultInsertHeader.id
//             }
//         })
//     } catch (error) {
//         console.log(error)
//         if (transaction) {
//             await transaction.rollback()
//         }
//     }
// }

// export const deleteDataRLTigaTitikLimaBelas = async(req, res) => {
//     try {
//         const count = await rlTigaTitikLimaBelasDetail.destroy({
//             where: {
//                 id: req.params.id
//             }
//         })
//         res.status(201).send({
//             status: true,
//             message: "data deleted successfully",
//             data: {
//                 'deleted_rows': count
//             }
//         })
//     } catch (error) {
//         res.status(404).send({
//             status: false,
//             message: error
//         })
//     }
// }
