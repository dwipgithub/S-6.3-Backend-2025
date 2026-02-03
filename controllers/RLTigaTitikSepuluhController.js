import { databaseSIRS } from "../config/Database.js";

// import { rlTigaTitikSepuluhHeader, rlTigaTitikSepuluhDetail, jenisKegiatan } from '../models/RLTigaTitikSepuluh.js'
import Joi from "joi";
import {
  rlTigaTitikSepuluh,
  rlTigaTitikSepuluhDetail,
} from "../models/RLTigaTitikSepuluh.js";
import { jenisSpesialisTigaTitikSepuluh } from "../models/JenisSpesialisTigaTitikSepuluh.js";

//new-----------------------------------------------------------------------------------------------------------
export const getDataRLTigaTitikSepuluh = (req, res) => {
  let where = { rs_id: req.user.satKerId };

  if (req.query.tahun) where.tahun = req.query.tahun;
  if (req.query.bulan) where.bulan = req.query.bulan;

  rlTigaTitikSepuluh
    .findAll({
      attributes: ["id", "tahun", "bulan"],
      where: where,
      include: {
        model: rlTigaTitikSepuluhDetail,
        include: {
          model: jenisSpesialisTigaTitikSepuluh,
          attributes: ["id", "no", "nama"],
          as: "jenis_spesialis_rl_tiga_titik_sepuluh",
        },
      },
      order: [
        [
          rlTigaTitikSepuluhDetail,
          {
            model: jenisSpesialisTigaTitikSepuluh,
            as: "jenis_spesialis_rl_tiga_titik_sepuluh",
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
export const getDataRLTigaTitikSepuluhDetailSpesialis = (req, res) => {
  rlTigaTitikSepuluhDetail
    .findAll({
      attributes: [
        "id",
        "rl_tiga_titik_sepuluh_id",
        "rm_dikembalikan_puskesmas",
        "rm_diterima_rs",
        "rm_diterima_faskes_lain",
        "rm_diterima_total_rm",
        "rm_dikembalikan_puskesmas",
        "rm_dikembalikan_rs",
        "rm_dikembalikan_faskes_lain",
        "rm_dikembalikan_total_rm",
        "keluar_pasien_rujukan",
        "keluar_pasien_datang_sendiri",
        "keluar_total_keluar",
      ],
      where: {
        rs_id: req.user.satKerId,
        tahun: req.query.tahun,
      },
      include: {
        model: jenisSpesialisTigaTitikSepuluh,
        attributes: ["id", "no", "nama"],
        as: "jenis_spesialis_rl_tiga_titik_sepuluh",
      },
      order: [
        [
          {
            model: jenisSpesialisTigaTitikSepuluh,
            as: "jenis_spesialis_rl_tiga_titik_sepuluh",
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
export const getDataRLTigaTitikSepuluhById = (req, res) => {
  rlTigaTitikSepuluhDetail
    .findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: jenisSpesialisTigaTitikSepuluh,
        attributes: ["id", "no", "nama"],
        as: "jenis_spesialis_rl_tiga_titik_sepuluh",
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

// Unknown
export const getDataRLTigaTitikSepuluhDetails = (req, res) => {
  rlTigaTitikSepuluh
    .findAll({
      include: [
        {
          model: rlTigaTitikSepuluhDetail,
          include: [jenisSpesialisTigaTitikSepuluh],
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

// Done
export const insertDataRLTigaTitikSepuluh = async (req, res) => {
  const schema = Joi.object({
    tahun: Joi.number().required(),
    bulan: Joi.number().required(),
    data: Joi.array()
      .items(
        Joi.object().keys({
          jenisSpesialisTigaTitikSepuluhId: Joi.number().required(),
          rm_diterima_puskesmas: Joi.number().min(0),
          rm_diterima_rs: Joi.number().min(0),
          rm_diterima_faskes_lain: Joi.number().min(0),
          rm_diterima_total_rm: Joi.number().min(0),
          rm_dikembalikan_puskesmas: Joi.number().min(0),
          rm_dikembalikan_rs: Joi.number().min(0),
          rm_dikembalikan_faskes_lain: Joi.number().min(0),
          rm_dikembalikan_total_rm: Joi.number().min(0),
          keluar_pasien_rujukan: Joi.number().min(0),
          keluar_pasien_datang_sendiri: Joi.number().min(0),
          keluar_total_keluar: Joi.number().min(0),
          keluar_diterima_kembali: Joi.number().min(0),
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

  const transaction = await databaseSIRS.transaction();

  try {
    // transaction = await databaseSIRS.transaction();
    // let rlTigaTitikSepuluhID;

    // const dataExisted = await rlTigaTitikSepuluh.findOne({
    //   where: {
    //     tahun: req.body.tahun,
    //     bulan: req.body.bulan,
    //     user_id: req.user.id,
    //   },
    // });

    // if (dataExisted) {
    //   rlTigaTitikSepuluhID = dataExisted.id;
    // } else {
    //   const rlInsertHeader = await rlTigaTitikSepuluh.create(
    //     {
    //       rs_id: req.user.satKerId,
    //       user_id: req.user.id,
    //       tahun: req.body.tahun,
    //       bulan: req.body.bulan,
    //     },
    //     { transaction }
    //   );

    //   rlTigaTitikSepuluhID = rlInsertHeader.id;
    // }

    const rlInsertHeader = await rlTigaTitikSepuluh.create(
      {
        rs_id: req.user.satKerId,
        user_id: req.user.id,
        tahun: req.body.tahun,
        bulan: req.body.bulan,
      },
      { transaction }
    );

    const dataDetail = req.body.data.map((value, index) => {
      const now = new Date();
      const date = now.getDate();
      return {
        tahun: `${req.body.tahun}-${req.body.bulan}-01`,
        bulan: req.body.bulan,
        rs_id: req.user.satKerId,
        rl_tiga_titik_sepuluh_id: rlInsertHeader.id,
        jenis_spesialis_rl_tiga_titik_sepuluh_id:
          value.jenisSpesialisTigaTitikSepuluhId,
        rm_diterima_puskesmas: value.rm_diterima_puskesmas,
        rm_diterima_rs: value.rm_diterima_rs,
        rm_diterima_faskes_lain: value.rm_diterima_faskes_lain,
        rm_diterima_total_rm: value.rm_diterima_total_rm,
        rm_dikembalikan_puskesmas: value.rm_dikembalikan_puskesmas,
        rm_dikembalikan_rs: value.rm_dikembalikan_rs,
        rm_dikembalikan_faskes_lain: value.rm_dikembalikan_faskes_lain,
        rm_dikembalikan_total_rm: value.rm_dikembalikan_total_rm,
        keluar_pasien_rujukan: value.keluar_pasien_rujukan,
        keluar_pasien_datang_sendiri: value.keluar_pasien_datang_sendiri,
        keluar_total_keluar: value.keluar_total_keluar,
        keluar_diterima_kembali: value.keluar_diterima_kembali,
        user_id: req.user.id,
      };
    });

    await rlTigaTitikSepuluhDetail.bulkCreate(dataDetail, {
      transaction,
      updateOnDuplicate: ["rm_diterima_puskesmas"],
      updateOnDuplicate: ["rm_diterima_rs"],
      updateOnDuplicate: ["rm_diterima_faskes_lain"],
      updateOnDuplicate: ["rm_diterima_total_rm"],
      updateOnDuplicate: ["rm_dikembalikan_puskesmas"],
      updateOnDuplicate: ["rm_dikembalikan_rs"],
      updateOnDuplicate: ["rm_dikembalikan_faskes_lain"],
      updateOnDuplicate: ["rm_dikembalikan_total_rm"],
      updateOnDuplicate: ["keluar_pasien_rujukan"],
      updateOnDuplicate: ["keluar_pasien_datang_sendiri"],
      updateOnDuplicate: ["keluar_total_keluar"],
      updateOnDuplicate: ["keluar_diterima_kembali"],
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
    await transaction.rollback();
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400).send({
        status: false,
        message: "Duplicate Entry",
      });
    } else {
      res.status(400).send({
        status: false,
        message: error,
      });
    }
    // if (transaction) {
    //   if (error.name == "SequelizeForeignKeyConstraintError") {
    //     res.status(400).send({
    //       status: false,
    //       message: "Gagal Input Data, Jenis Spesialisasi Salah.",
    //     });
    //   } else {
    //     res.status(400).send({
    //       status: false,
    //       message: error,
    //     });
    //   }
    //   await transaction.rollback();
    // }
  }
};

// Done
export const updateDataRLTigaTitikSepuluh = async (req, res) => {
  const schema = Joi.object({
    rm_diterima_puskesmas: Joi.number().required(),
    rm_diterima_rs: Joi.number().required(),
    rm_diterima_faskes_lain: Joi.number().required(),
    rm_diterima_total_rm: Joi.number().required(),
    rm_dikembalikan_puskesmas: Joi.number().required(),
    rm_dikembalikan_rs: Joi.number().required(),
    rm_dikembalikan_faskes_lain: Joi.number().required(),
    rm_dikembalikan_total_rm: Joi.number().required(),
    keluar_pasien_rujukan: Joi.number().required(),
    keluar_pasien_datang_sendiri: Joi.number().required(),
    keluar_total_keluar: Joi.number().required(),
    keluar_diterima_kembali: Joi.number().required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    res.status(404).send({
      status: false,
      message: error.details[0].message,
    });
    return;
  }

  // let transaction;
  // try {
  //   transaction = await databaseSIRS.transaction();

  //   const existingData = await rlTigaTitikSepuluhDetail.findOne({
  //     where: {
  //       id: req.params.id,
  //       rs_id: req.user.satKerId,
  //     },
  //   });

  //   if (existingData) {
  //     if (existingData.rm_diterima_puskesmas !== req.body.rm_diterima_puskesmas)
  //       existingData.rm_diterima_puskesmas = req.body.rm_diterima_puskesmas;
  //     if (existingData.rm_diterima_rs !== req.body.rm_diterima_rs)
  //       existingData.rm_diterima_rs = req.body.rm_diterima_rs;
  //     if (
  //       existingData.rm_diterima_faskes_lain !==
  //       req.body.rm_diterima_faskes_lain
  //     )
  //       existingData.rm_diterima_faskes_lain = req.body.rm_diterima_faskes_lain;
  //     if (existingData.rm_diterima_total_rm !== req.body.rm_diterima_total_rm)
  //       existingData.rm_diterima_total_rm = req.body.rm_diterima_total_rm;
  //     if (
  //       existingData.rm_dikembalikan_puskesmas !==
  //       req.body.rm_dikembalikan_puskesmas
  //     )
  //       existingData.rm_dikembalikan_puskesmas =
  //         req.body.rm_dikembalikan_puskesmas;
  //     if (existingData.rm_dikembalikan_rs !== req.body.rm_dikembalikan_rs)
  //       existingData.rm_dikembalikan_rs = req.body.rm_dikembalikan_rs;
  //     if (
  //       existingData.rm_dikembalikan_faskes_lain !==
  //       req.body.rm_dikembalikan_faskes_lain
  //     )
  //       existingData.rm_dikembalikan_faskes_lain =
  //         req.body.rm_dikembalikan_faskes_lain;
  //     if (
  //       existingData.rm_dikembalikan_total_rm !==
  //       req.body.rm_dikembalikan_total_rm
  //     )
  //       existingData.rm_dikembalikan_total_rm =
  //         req.body.rm_dikembalikan_total_rm;
  //     if (existingData.keluar_pasien_rujukan !== req.body.keluar_pasien_rujukan)
  //       existingData.keluar_pasien_rujukan = req.body.keluar_pasien_rujukan;
  //     if (
  //       existingData.keluar_pasien_datang_sendiri !==
  //       req.body.keluar_pasien_datang_sendiri
  //     )
  //       existingData.keluar_pasien_datang_sendiri =
  //         req.body.keluar_pasien_datang_sendiri;
  //     if (existingData.keluar_total_keluar !== req.body.keluar_total_keluar)
  //       existingData.keluar_total_keluar = req.body.keluar_total_keluar;
  //     if (
  //       existingData.keluar_diterima_kembali !==
  //       req.body.keluar_diterima_kembali
  //     )
  //       existingData.keluar_diterima_kembali = req.body.keluar_diterima_kembali;

  //     await existingData.save();
  //     await transaction.commit();

  //     res.status(201).send({
  //       status: true,
  //       message: "Data berhasil diperbaharui.",
  //     });
  //   } else {
  //     await transaction.rollback();
  //     res.status(400).send({
  //       status: false,
  //       message: "Data tidak ditemukan",
  //     });
  //   }
  // } catch (error) {
  //   if (transaction) {
  //     await transaction.rollback();
  //   }
  //   res.status(500).send({
  //     status: false,
  //     message: "Gagal Memperbaharui Data",
  //   });
  // }

  try {
    const update = await rlTigaTitikSepuluhDetail.update(
      {
        rm_diterima_puskesmas: req.body.rm_diterima_puskesmas,
        rm_diterima_rs: req.body.rm_diterima_rs,
        rm_diterima_faskes_lain: req.body.rm_diterima_faskes_lain,
        rm_diterima_total_rm: req.body.rm_diterima_total_rm,
        rm_dikembalikan_puskesmas: req.body.rm_dikembalikan_puskesmas,
        rm_dikembalikan_rs: req.body.rm_dikembalikan_rs,
        rm_dikembalikan_faskes_lain: req.body.rm_dikembalikan_faskes_lain,
        rm_dikembalikan_total_rm: req.body.rm_dikembalikan_total_rm,
        keluar_pasien_rujukan: req.body.keluar_pasien_rujukan,
        keluar_pasien_datang_sendiri: req.body.keluar_pasien_datang_sendiri,
        keluar_total_keluar: req.body.keluar_total_keluar,
        keluar_diterima_kembali: req.body.keluar_diterima_kembali,
        user_id: req.user.id,
      },
      {
        where: {
          id: req.params.id,
          rs_id: req.user.satKerId,
        },
      }
    );
    res.status(200).json({
      status: true,
      message: "Data berhasil diperbaharui.",
    });
  } catch (error) {
    // console.log(error.message);
    res.status(500).send({
      status: false,
      message: "Gagal Memperbaharui Data" + error,
    });
  }
};

// Done
export const deleteDataRLTigaTitikSepuluh = async (req, res) => {
  try {
    const count = await rlTigaTitikSepuluhDetail.destroy({
      where: {
        id: req.params.id,
        rs_id: req.user.satKerId,
      },
    });

    if (count == 0) {
      res.status(404).send({
        status: true,
        message: "Data Not Found",
        data: {
          deleted_rows: count,
        },
      });
    } else {
      res.status(201).send({
        status: true,
        message: "data deleted successfully",
        data: {
          deleted_rows: count,
        },
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

//old-----------------------------------------------------------------------------------------------------------
// export const getDatarlTigaTitikSepuluh = (req, res) => {
//     rlTigaTitikSepuluhHeader.findAll({
//         attributes: ['id','tahun'],
//         where:{
//             rs_id: req.user.rsId,
//             tahun: req.query.tahun
//         },
//         include:{
//             model: rlTigaTitikSepuluhDetail,
//             include: {
//                 model: jenisKegiatan
//             },
//             order: [
//                 [rlTigaTitikSepuluhDetail, 'jenis_kegiatan_id', 'DESC']
//             ]
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

// export const getDatarlTigaTitikSepuluhDetail = (req, res) => {
//     rlTigaTitikSepuluhDetail.findAll({
//         attributes: [
//         'id',
//         'rl_tiga_titik_sepuluh_id',
//         'user_id',
//         'jenis_kegiatan_id',
//         'jumlah'
//     ],
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

// export const getrlTigaTitikSepuluhById = async(req,res)=>{
//     rlTigaTitikSepuluhDetail.findOne({

//         where:{
//             // rs_id: req.user.rsId,
//             // tahun: req.query.tahun
//             id:req.params.id
//         },
//         include:{
//             model: jenisKegiatan
//             // include: {
//             //     model: jenisKegiatan
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

// export const updateDatarlTigaTitikSepuluh = async(req,res)=>{
//     try{
//         await rlTigaTitikSepuluhDetail.update(req.body,{
//             where:{
//                 id: req.params.id
//             }
//         });
//         res.status(200).json({message: "Rekapitulasi Laporan Telah Diperbaharui"});
//     }catch(error){
//         console.log(error.message);
//     }
// }

// export const insertDataRLTigaTitikSepuluh =  async (req, res) => {
//     const schema = Joi.object({
//         tahun: Joi.number().required(),
//         data: Joi.array()
//             .items(
//                 Joi.object().keys({
//                     jenisKegiatanId: Joi.number().required(),
//                     jumlah: Joi.number().required(),
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

//     let transaction
//     try {
//         transaction = await databaseSIRS.transaction()
//         const resultInsertHeader = await rlTigaTitikSepuluhHeader.create({
//             rs_id: req.user.rsId,
//             tahun: req.body.tahun,
//             user_id: req.user.id
//         }, {
//             transaction
//         })

//         const dataDetail = req.body.data.map((value, index) => {
//             return {
//                 rs_id: req.user.rsId,
//                 tahun: req.body.tahun,
//                 rl_tiga_titik_sepuluh_id: resultInsertHeader.id,
//                 jenis_kegiatan_id: value.jenisKegiatanId,
//                 jumlah: value.jumlah,
//                 user_id: req.user.id
//             }
//         })

//         const resultInsertDetail = await rlTigaTitikSepuluhDetail.bulkCreate(dataDetail, {
//             transaction,
//             updateOnDuplicate:['jumlah']
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

// export const deleteDataRLTigaTitikSepuluh = async(req, res) => {
//     try {
//         const count = await rlTigaTitikSepuluhDetail.destroy({
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
