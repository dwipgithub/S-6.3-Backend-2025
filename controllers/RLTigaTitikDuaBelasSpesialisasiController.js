import { SpesialisasiRLTigaTitikDuaBelas } from "../models/RLTigaTitikDuaBelasSpesialisasiModel.js";
import { Op } from "sequelize";

export const getDataSpesialisasiRLTigaTitikDuaBelas = (req, res) => {
  SpesialisasiRLTigaTitikDuaBelas.findAll({
    attributes: ["id", "no", "nama_spesialisasi"],
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
