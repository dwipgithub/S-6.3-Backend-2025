import { IcdRLLimaTitikSatu } from "../models/IcdRLLimaTitikSatuModel.js";
import { Op } from "sequelize";

export const getDataIcdRLLimaTitikSatu = (req, res) => {
  IcdRLLimaTitikSatu.findAll({
    attributes: [
      "id",
      "icd_code",
      "description_code",
      "icd_code_group",
      "icd_code_group",
      "status_top_10",
      "status_rawat_inap",
      "status_rawat_jalan",
      "status_rawat_jalan",
      "status_laki",
      "status_perempuan",
      "is_active",
    ],
    where: {
      is_active: 1,
      status_rawat_jalan: 1,
    },
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

export const getIcdRajalbySearch = (req, res) => {
  IcdRLLimaTitikSatu.findAll({
    attributes: [
      "id",
      "icd_code",
      "description_code",
      "icd_code_group",
      "description_code_group",
      "status_top_10",
      "status_rawat_jalan",
      "status_laki",
      "status_perempuan",
    ],
    where: {
      is_active: 1,
      status_rawat_jalan: 1,
      [Op.or]: {
        description_code: {
          [Op.like]: "%" + req.query.search + "%",
        },
        icd_code: {
          [Op.like]: "%" + req.query.search + "%",
        },
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

export const getIcdRajalbyId = (req, res) => {
  IcdRLLimaTitikSatu.findOne({
    attributes: [
      "id",
      "icd_code",
      "description_code",
      "icd_code_group",
      "description_code_group",
      "status_top_10",
      "status_rawat_jalan",
      "status_laki",
      "status_perempuan",
    ],
    where: {
      id: req.query.id,
    },
  })
    .then((results) => {
      res.status(200).send({
        status: true,
        message: "data found",
        data: [results],
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

// export const getIcdRajalbySearch = (req, res) => {
//   const sqlSelect =
//     "SELECT icd.`id`, " +
//     "icd.icd_code, " +
//     "icd.`description_code`, " +
//     "icd.`icd_code_group`, " +
//     "icd.`description_code_group`, " +
//     "icd.`status_top_10`, " +
//     "icd.`status_laki`, " +
//     "icd.`status_perempuan`";

//   const sqlFrom = "FROM " + "icd";

//   const sqlWhere = 'WHERE '

//   const sqlOrder = 'ORDER BY icd.`icd_code`'
//   const filter = []
//   const sqlFilterValue = []

//   const IcdCode = req.query.icdCode || null
//   const description_code =

// };

// export const getIcdRajalbyId = (req, res) => {
//   icd
//     .findOne({
//       attributes: [
//         "id",
//         "icd_code",
//         "description_code",
//         "icd_code_group",
//         "description_code_group",
//         "status_top_10",
//         "status_rawat_inap",
//         "status_rawat_jalan",
//         "status_laki",
//         "status_perempuan",
//         "is_active",
//       ],
//       where: {
//         id: req.query.id,
//       },
//     })
//     .then((results) => {
//       res.status(200).send({
//         status: true,
//         message: "data found",
//         data: [results],
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
