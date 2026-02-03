import { icd } from "../models/ICDModel.js";
import { or, Sequelize } from "sequelize";
const Op = Sequelize.Op;

export const getIcdRanap = (req, res) => {
  icd
    .findAll({
      attributes: ["id", "icd_code", "nama", "description_code", "icd_code_group", "description_code_group", "status_top_10", "status_rawat_inap", "status_rawat_jalan", "status_laki", "status_perempuan", "is_active"],
      where: {
        is_active: 1,
        status_rawat_inap:1,
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

export const getIcdRanapbySearch = (req, res) => {
  icd
    .findAll({
      attributes: ["id", "icd_code", "description_code", "icd_code_group", "description_code_group", "status_top_10", "status_rawat_inap", "status_rawat_jalan", "status_laki", "status_perempuan", "is_active"],
      where: {
        is_active: 1,
        status_rawat_inap:1,
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
        // {
        //   "penyakit" : results,
        // }
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

export const getIcdRanapbyId = (req, res) => {
  icd
    .findOne({
      attributes: ["id", "icd_code", "description_code", "icd_code_group", "description_code_group", "status_top_10", "status_rawat_inap", "status_rawat_jalan", "status_laki", "status_perempuan", "is_active"],
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

//rawat jalan
export const getIcdRajal = (req, res) => {
  icd
    .findAll({
      attributes: ["id", "icd_code", "nama", "description_code", "icd_code_group", "description_code_group", "status_top_10", "status_rawat_inap", "status_rawat_jalan", "status_laki", "status_perempuan", "is_active"],
      where: {
        is_active: 1,
        status_rawat_jalan:1,
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

export const getIcdRajalbySearch = (req, res) => {
  icd
    .findAll({
      attributes: ["id", "icd_code", "description_code", "icd_code_group", "description_code_group", "status_top_10", "status_rawat_inap", "status_rawat_jalan", "status_laki", "status_perempuan", "is_active"],
      where: {
        is_active: 1,
        status_rawat_jalan:1,
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
        // {
        //   "penyakit" : results,
        // }
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
  icd
    .findOne({
      attributes: ["id", "icd_code", "description_code", "icd_code_group", "description_code_group", "status_top_10", "status_rawat_inap", "status_rawat_jalan", "status_laki", "status_perempuan", "is_active"],
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
