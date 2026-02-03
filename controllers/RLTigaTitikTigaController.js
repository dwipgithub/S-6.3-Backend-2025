import { databaseSIRS } from "../config/Database.js";

import Joi from "joi";
import {
  rlTigaTitikTiga,
  rlTigaTitikTigaDetail,
} from "../models/RLTigaTitikTiga.js";
import { jenisPelayananTigaTitikTiga } from "../models/JenisPelayananTigaTitikTiga.js";

//new

// Done
export const getDataRLTigaTitikTiga = (req, res) => {
  let where = { rs_id: req.user.satKerId };

  if (req.query.tahun) where.tahun = req.query.tahun;
  if (req.query.bulan) where.bulan = req.query.bulan;

  rlTigaTitikTiga
    .findAll({
      attributes: ["id", "tahun", "bulan"],
      where: where,
      include: {
        model: rlTigaTitikTigaDetail,
        include: {
          model: jenisPelayananTigaTitikTiga,
          attributes: ["id", "no", "nama"],
          as: "jenis_pelayanan_rl_tiga_titik_tiga",
        },
      },
      order: [
        [
          rlTigaTitikTigaDetail,
          {
            model: jenisPelayananTigaTitikTiga,
            as: "jenis_pelayanan_rl_tiga_titik_tiga",
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
export const getDataRLTigaTitikTigaDetailPelayanan = (req, res) => {
  rlTigaTitikTigaDetail
    .findAll({
      attributes: [
        "id",
        "rl_tiga_titik_tiga_id",
        "total_pasien_rujukan",
        "total_pasien_non_rujukan",
        "tlp_dirawat",
        "tlp_dirujuk",
        "tlp_pulang",
        "m_igd_laki",
        "m_igd_perempuan",
        "doa_laki",
        "doa_perempuan",
        "luka_laki",
        "luka_perempuan",
        "false_emergency",
      ],
      where: {
        rs_id: req.user.satKerId,
        tahun: req.query.tahun,
      },
      include: {
        model: jenisPelayananTigaTitikTiga,
        attributes: ["id", "no", "nama"],
        as: "jenis_pelayanan_rl_tiga_titik_tiga",
      },
      order: [
        [
          {
            model: jenisPelayananTigaTitikTiga,
            as: "jenis_pelayanan_rl_tiga_titik_tiga",
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
export const getDataRLTigaTitikTigaById = (req, res) => {
  rlTigaTitikTigaDetail
    .findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: jenisPelayananTigaTitikTiga,
        attributes: ["id", "no", "nama"],
        as: "jenis_pelayanan_rl_tiga_titik_tiga",
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

export const getDataRLTigaTitikTigaDetails = (req, res) => {
  rlTigaTitikTigaDetail
    .findOne({
      where: {
        rs_id: req.user.satKerId,
        user_id: req.user.id,
        tahun: `${req.query.tahun}-${req.query.bulan}-01`,
        // bulan: req.query.bulan,
        jenis_pelayanan_rl_tiga_titik_tiga_id: req.query.specificId,
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
// export const insertDataRLTigaTitikTiga = async (req, res) => {
//   const schema = Joi.object({
//     tahun: Joi.number().required(),
//     bulan: Joi.number().required(),
//     data: Joi.array()
//       .items(
//         Joi.object().keys({
//           jenisPelayananTigaTitikTigaId: Joi.number().required(),
//           total_pasien_rujukan: Joi.number().min(0),
//           total_pasien_non_rujukan: Joi.number().min(0),
//           tlp_dirawat: Joi.number().min(0),
//           tlp_dirujuk: Joi.number().min(0),
//           tlp_pulang: Joi.number().min(0),
//           m_igd_laki: Joi.number().min(0),
//           m_igd_perempuan: Joi.number().min(0),
//           doa_laki: Joi.number().min(0),
//           doa_perempuan: Joi.number().min(0),
//           luka_laki: Joi.number().min(0),
//           luka_perempuan: Joi.number().min(0),
//           false_emergency: Joi.number().min(0),
//         })
//       )
//       .required(),
//   });

//   const { error, value } = schema.validate(req.body);
//   if (error) {
//     res.status(404).send({
//       status: false,
//       message: error.details[0].message,
//     });
//     return;
//   }

//   let transaction;

//   try {
//     transaction = await databaseSIRS.transaction();
//     let rlTigaTitikTIgaID;

//     const dataExisted = await rlTigaTitikTiga.findOne({
//       where: {
//         tahun: req.body.tahun,
//         bulan: req.body.bulan,
//         rs_id: req.user.satKerId,
//         user_id: req.user.id,
//       },
//     });

//     if (dataExisted) {
//       rlTigaTitikTIgaID = dataExisted.id;
//     } else {
//       const rlInsertHeader = await rlTigaTitikTiga.create(
//         {
//           rs_id: req.user.satKerId,
//           user_id: req.user.id,
//           tahun: req.body.tahun,
//           bulan: req.body.bulan,
//         },
//         { transaction }
//       );

//       rlTigaTitikTIgaID = rlInsertHeader.id;
//     }

//     const dataDetail = req.body.data.map((value, index) => {
//       const now = new Date();
//       const date = now.getDate();
//       const bulan = req.body.bulan < 10 ? `0${req.body.bulan}` : req.body.bulan;
//       return {
//         tahun: `${req.body.tahun}-${bulan}-01`,
//         bulan: req.body.bulan,
//         rs_id: req.user.satKerId,
//         rl_tiga_titik_tiga_id: rlTigaTitikTIgaID,
//         jenis_pelayanan_rl_tiga_titik_tiga_id:
//           value.jenisPelayananTigaTitikTigaId,
//         total_pasien_rujukan: value.total_pasien_rujukan,
//         total_pasien_non_rujukan: value.total_pasien_non_rujukan,
//         tlp_dirawat: value.tlp_dirawat,
//         tlp_dirujuk: value.tlp_dirujuk,
//         tlp_pulang: value.tlp_pulang,
//         m_igd_laki: value.m_igd_laki,
//         m_igd_perempuan: value.m_igd_perempuan,
//         doa_laki: value.doa_laki,
//         doa_perempuan: value.doa_perempuan,
//         luka_laki: value.luka_laki,
//         luka_perempuan: value.luka_perempuan,
//         false_emergency: value.false_emergency,
//         user_id: req.user.id,
//       };
//     });

//     await rlTigaTitikTigaDetail.bulkCreate(dataDetail, {
//       transaction,
//       updateOnDuplicate: ["total_pasien_rujukan"],
//       updateOnDuplicate: ["total_pasien_non_rujukan"],
//       updateOnDuplicate: ["tlp_dirawat"],
//       updateOnDuplicate: ["tlp_dirujuk"],
//       updateOnDuplicate: ["tlp_pulang"],
//       updateOnDuplicate: ["m_igd_laki"],
//       updateOnDuplicate: ["m_igd_perempuan"],
//       updateOnDuplicate: ["doa_laki"],
//       updateOnDuplicate: ["doa_perempuan"],
//       updateOnDuplicate: ["luka_laki"],
//       updateOnDuplicate: ["luka_perempuan"],
//       updateOnDuplicate: ["false_emergency"],
//     });

//     await transaction.commit();
//     res.status(201).send({
//       status: true,
//       message: "data created",
//       data: {
//         id: rlTigaTitikTIgaID,
//       },
//     });
//   } catch (error) {
//     await transaction.rollback();
//     if (error.name == "SequelizeForeignKeyConstraintError") {
//       res.status(400).send({
//         status: false,
//         message: "Gagal Input Data, Jenis Kegiatan Salah.",
//         data: error,
//       });
//     } else {
//       console.log(error);
//       res.status(400).send({
//         status: false,
//         message: error,
//       });
//     }
//     // if (transaction) {
//     //   if (error.name == "SequelizeForeignKeyConstraintError") {
//     //     res.status(400).send({
//     //       status: false,
//     //       message: "Gagal Input Data, Jenis Kegiatan Salah.",
//     //       data: error,
//     //     });
//     //   } else {
//     //     console.log(error);
//     //     res.status(400).send({
//     //       status: false,
//     //       message: error,
//     //     });
//     //   }
//     //   await transaction.rollback();
//     // }
//   }
// };

export const insertDataRLTigaTitikTiga = async (req, res) => {
  const schema = Joi.object({
    tahun: Joi.number().required(),
    bulan: Joi.number().required(),
    data: Joi.array()
      .items(
        Joi.object().keys({
          jenisPelayananTigaTitikTigaId: Joi.number().required(),
          total_pasien_rujukan: Joi.number().min(0).optional(),
          total_pasien_non_rujukan: Joi.number().min(0).optional(),
          tlp_dirawat: Joi.number().min(0).optional(),
          tlp_dirujuk: Joi.number().min(0).optional(),
          tlp_pulang: Joi.number().min(0).optional(),
          m_igd_laki: Joi.number().min(0).optional(),
          m_igd_perempuan: Joi.number().min(0).optional(),
          doa_laki: Joi.number().min(0).optional(),
          doa_perempuan: Joi.number().min(0).optional(),
          luka_laki: Joi.number().min(0).optional(),
          luka_perempuan: Joi.number().min(0).optional(),
          false_emergency: Joi.number().min(0).optional(),
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

  const transaction = await databaseSIRS.transaction()
  try {
    const resultInsertHeader = await rlTigaTitikTiga.create(
      {
        rs_id: req.user.rsId,
        tahun: req.body.tahun,
        user_id: req.user.id,
        rs_id: req.user.satKerId,
        bulan: req.body.bulan,
      },
      { transaction }
    );

    const dataDetail = req.body.data.map((value, index) => {
      const now = new Date();
      const bulan = req.body.bulan < 10 ? `0${req.body.bulan}` : req.body.bulan;
      return {
        tahun: `${req.body.tahun}-${bulan}-01`,
        bulan: req.body.bulan,
        rs_id: req.user.satKerId,
        rl_tiga_titik_tiga_id: resultInsertHeader.id,
        jenis_pelayanan_rl_tiga_titik_tiga_id:
          value.jenisPelayananTigaTitikTigaId,
        total_pasien_rujukan: value.total_pasien_rujukan,
        total_pasien_non_rujukan: value.total_pasien_non_rujukan,
        tlp_dirawat: value.tlp_dirawat,
        tlp_dirujuk: value.tlp_dirujuk,
        tlp_pulang: value.tlp_pulang,
        m_igd_laki: value.m_igd_laki,
        m_igd_perempuan: value.m_igd_perempuan,
        doa_laki: value.doa_laki,
        doa_perempuan: value.doa_perempuan,
        luka_laki: value.luka_laki,
        luka_perempuan: value.luka_perempuan,
        false_emergency: value.false_emergency,
        user_id: req.user.id,
      };
    });

    await rlTigaTitikTigaDetail.bulkCreate(
      dataDetail,
      {
        transaction: transaction,
        updateOnDuplicate: [
          "total_pasien_rujukan",
          "total_pasien_non_rujukan",
          "tlp_dirawat",
          "tlp_dirujuk",
          "tlp_pulang",
          "m_igd_laki",
          "m_igd_perempuan",
          "doa_laki",
          "doa_perempuan",
          "luka_laki",
          "luka_perempuan",
          "false_emergency",
        ],
      }
    );

    await transaction.commit();
    res.status(201).send({
      status: true,
      message: "data created",
      data: {
        id: resultInsertHeader.id,
      },
    });
  } catch (error) {
    console.log(error)
    await transaction.rollback()
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).send({
        status: false,
        message: "Duplicate Entry"
      })
    } else {
      res.status(400).send({
        status: false,
        message: error
      })
    }
  }
}

// Done
// export const updateDataRLTigaTitikTiga = async (req, res) => {
//   const schema = Joi.object({
//     total_pasien_rujukan: Joi.number().required(),
//     total_pasien_non_rujukan: Joi.number().required(),
//     tlp_dirawat: Joi.number().required(),
//     tlp_dirujuk: Joi.number().required(),
//     tlp_pulang: Joi.number().required(),
//     m_igd_laki: Joi.number().required(),
//     m_igd_perempuan: Joi.number().required(),
//     doa_laki: Joi.number().required(),
//     doa_perempuan: Joi.number().required(),
//     luka_laki: Joi.number().required(),
//     luka_perempuan: Joi.number().required(),
//     false_emergency: Joi.number().required(),
//   });

//   const { error, value } = schema.validate(req.body);

//   if (error) {
//     res.status(404).send({
//       status: false,
//       message: error.details[0].message,
//     });
//     return;
//   }

//   let transaction;
//   try {
//     transaction = await databaseSIRS.transaction();

//     const existingData = await rlTigaTitikTigaDetail.findOne({
//       where: {
//         id: req.params.id,
//         rs_id: req.user.satKerId,
//       },
//     });

//     if (existingData) {
//       if (existingData.total_pasien_rujukan !== req.body.total_pasien_rujukan)
//         existingData.total_pasien_rujukan = req.body.total_pasien_rujukan;
//       if (
//         existingData.total_pasien_non_rujukan !==
//         req.body.total_pasien_non_rujukan
//       )
//         existingData.total_pasien_non_rujukan =
//           req.body.total_pasien_non_rujukan;
//       if (existingData.tlp_dirawat !== req.body.tlp_dirawat)
//         existingData.tlp_dirawat = req.body.tlp_dirawat;
//       if (existingData.tlp_dirujuk !== req.body.tlp_dirujuk)
//         existingData.tlp_dirujuk = req.body.tlp_dirujuk;
//       if (existingData.tlp_pulang !== req.body.tlp_pulang)
//         existingData.tlp_pulang = req.body.tlp_pulang;
//       if (existingData.m_igd_laki !== req.body.m_igd_laki)
//         existingData.m_igd_laki = req.body.m_igd_laki;
//       if (existingData.m_igd_perempuan !== req.body.m_igd_perempuan)
//         existingData.m_igd_perempuan = req.body.m_igd_perempuan;
//       if (existingData.doa_laki !== req.body.doa_laki)
//         existingData.doa_laki = req.body.doa_laki;
//       if (existingData.doa_perempuan !== req.body.doa_perempuan)
//         existingData.doa_perempuan = req.body.doa_perempuan;
//       if (existingData.luka_laki !== req.body.luka_laki)
//         existingData.luka_laki = req.body.luka_laki;
//       if (existingData.luka_perempuan !== req.body.luka_perempuan)
//         existingData.luka_perempuan = req.body.luka_perempuan;
//       if (existingData.false_emergency !== req.body.false_emergency)
//         existingData.false_emergency = req.body.false_emergency;

//       await existingData.save();
//       await transaction.commit();

//       res.status(201).send({
//         status: true,
//         message: "Data berhasil diperbaharui.",
//       });
//     } else {
//       await transaction.rollback();
//       res.status(400).send({
//         status: false,
//         message: "Data tidak ditemukan",
//       });
//     }
//   } catch (error) {
//     if (transaction) {
//       await transaction.rollback();
//     }
//     res.status(500).send({
//       status: false,
//       message: "Gagal Memperbaharui Data",
//     });
//   }
// };

export const updateDataRLTigaTitikTiga = async (req, res) => {
  const schema = Joi.object({
    total_pasien_rujukan: Joi.number().required(),
    total_pasien_non_rujukan: Joi.number().required(),
    tlp_dirawat: Joi.number().required(),
    tlp_dirujuk: Joi.number().required(),
    tlp_pulang: Joi.number().required(),
    m_igd_laki: Joi.number().required(),
    m_igd_perempuan: Joi.number().required(),
    doa_laki: Joi.number().required(),
    doa_perempuan: Joi.number().required(),
    luka_laki: Joi.number().required(),
    luka_perempuan: Joi.number().required(),
    false_emergency: Joi.number().required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    res.status(404).send({
      status: false,
      message: error.details[0].message,
    });
    return;
  }

  try {
    const update = await rlTigaTitikTigaDetail.update(
      {
        total_pasien_rujukan: req.body.totalPasienRujukan,
        total_pasien_non_rujukan: req.body.totalPasienNonRujukan,
        tlp_dirawat: req.body.tlpDirawat,
        tlp_dirujuk: req.body.tlpDirujuk,
        tlp_pulang: req.body.tlpPulang,
        m_igd_laki: req.body.mIgdLaki,
        m_igd_perempuan: req.body.mIgdPerempuan,
        doa_laki: req.body.doaLaki,
        doa_perempuan: req.body.doaPerempuan,
        luka_laki: req.body.lukaLaki,
        luka_perempuan: req.body.lukaPerempuan,
        false_emergency: req.body.falseEmergency,
        user_id: req.user.id,
      },
      {
        where: {
          id: req.params.id,
          rs_id: req.user.satKerId,
        },
      }
    );

    res.status(201).send({
      status: true,
      message: update,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Gagal Memperbaharui Data",
    });
  }
};


// Done
export const deleteDataRLTigaTitikTiga = async (req, res) => {
  try {
    const count = await rlTigaTitikTigaDetail.destroy({
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
    res.status(500).send({
      status: false,
      message: error,
    });
  }
};

//old-----------------------------------------------------------------------------------------------------------
// export const getDataRLTigaTitikTiga = (req, res) => {
//   rlTigaTitikTigaHeader
//     .findAll({
//       attributes: ["id", "tahun"],
//       where: {
//         rs_id: req.user.rsId,
//         tahun: req.query.tahun,
//       },
//       include: {
//         model: rlTigaTitikTigaDetail,
//         include: {
//           model: jenisKegiatan,
//         },
//       },
//       order: [[{ model: rlTigaTitikTigaDetail }, "jenis_kegiatan_id", "ASC"]],
//     })
//     .then((results) => {
//       res.status(200).send({
//         status: true,
//         message: "data found",
//         data: results,
//       });
//     })
//     .catch((err) => {
//       res.status(422).send({
//         status: false,
//         message: err,
//       });
//       return;
//     });
// };

// export const getDataRLTigaTitikTigaDetail = (req, res) => {
//   rlTigaTitikTigaDetail
//     .findAll({
//       attributes: [
//         "id",
//         "rl_tiga_titik_tiga_id",
//         "user_id",
//         "jenis_kegiatan_id",
//         "jumlah",
//       ],
//     })
//     .then((results) => {
//       res.status(200).send({
//         status: true,
//         message: "data found",
//         data: results,
//       });
//     })
//     .catch((err) => {
//       res.status(422).send({
//         status: false,
//         message: err,
//       });
//       return;
//     });
// };

// export const getRLTigaTitikTigaById = async (req, res) => {
//   rlTigaTitikTigaDetail
//     .findOne({
//       where: {
//         // rs_id: req.user.rsId,
//         // tahun: req.query.tahun
//         id: req.params.id,
//       },
//       include: {
//         model: jenisKegiatan,
//         // include: {
//         //     model: jenisKegiatan
//         // }
//       },
//     })
//     .then((results) => {
//       res.status(200).send({
//         status: true,
//         message: "data found",
//         data: results,
//       });
//     })
//     .catch((err) => {
//       res.status(422).send({
//         status: false,
//         message: err,
//       });
//       return;
//     });
// };

// export const insertDataRLTigaTitikTiga = async (req, res) => {
//   const schema = Joi.object({
//     tahun: Joi.number().required(),
//     data: Joi.array()
//       .items(
//         Joi.object()
//           .keys({
//             jenisKegiatanId: Joi.number().required(),
//             jumlah: Joi.number().required(),
//           })
//           .required()
//       )
//       .required(),
//   });

//   const { error, value } = schema.validate(req.body);
//   if (error) {
//     res.status(404).send({
//       status: false,
//       message: error.details[0].message,
//     });
//     return;
//   }
//   // console.log(req.user);
//   let transaction;
//   try {
//     transaction = await databaseSIRS.transaction();
//     const resultInsertHeader = await rlTigaTitikTigaHeader.create(
//       {
//         rs_id: req.user.rsId,
//         tahun: req.body.tahun,
//         user_id: req.user.id,
//       },
//       {
//         transaction,
//       }
//     );

//     const dataDetail = req.body.data.map((value, index) => {
//       return {
//         rs_id: req.user.rsId,
//         tahun: req.body.tahun,
//         rl_tiga_titik_tiga_id: resultInsertHeader.id,
//         jenis_kegiatan_id: value.jenisKegiatanId,
//         jumlah: value.jumlah,
//         user_id: req.user.id,
//       };
//     });

//     const resultInsertDetail = await rlTigaTitikTigaDetail.bulkCreate(
//       dataDetail,
//       {
//         transaction,
//         updateOnDuplicate: ["jumlah"],
//       }
//     );

//     await transaction.commit();
//     res.status(201).send({
//       status: true,
//       message: "data created",
//       data: {
//         id: resultInsertHeader.id,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     if (transaction) {
//       await transaction.rollback();
//     }
//   }
// };

// export const deleteDataRLTigaTitikTiga = async (req, res) => {
//   try {
//     const count = await rlTigaTitikTigaDetail.destroy({
//       where: {
//         id: req.params.id,
//       },
//     });
//     res.status(201).send({
//       status: true,
//       message: "data deleted successfully",
//       data: {
//         deleted_rows: count,
//       },
//     });
//   } catch (error) {
//     res.status(404).send({
//       status: false,
//       message: error,
//     });
//   }
// };

// export const updateDataRLTigaTitikTiga = async (req, res) => {
//   try {
//     const data = req.body;
//     try {
//       const update = await rlTigaTitikTigaDetail.update(data, {
//         where: {
//           id: req.params.id,
//         },
//       });
//       res.status(201).send({
//         status: true,
//         message: "Data Diperbaharui",
//       });
//     } catch (error) {
//       res.status(400).send({
//         status: false,
//         message: "Gagal Memperbaharui Data",
//       });
//     }
//   } catch (error) {
//     console.log(error.message);
//     res.status(400).send({
//       status: false,
//       message: "Gagal Memperbaharui Data",
//     });
//   }
// };
