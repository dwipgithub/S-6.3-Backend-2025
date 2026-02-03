import {
  JenisTindakanRLTigaTitikTigaBelas,
  JenisTindakanRLTigaTitikTigaBelasHeader,
} from "../models/RLTigaTitikTigaBelasJenisTindakanModel.js";
import { Op } from "sequelize";

export const getDataJenisTindakanRLTigaTitikTigaBelas = (req, res) => {
  JenisTindakanRLTigaTitikTigaBelas.findAll({
    attributes: [
      "id",
      "rl_tiga_titik_tiga_belas_jenis_tindakan_header_id",
      "no",
      "nama",
    ],
    include: {
      model: JenisTindakanRLTigaTitikTigaBelasHeader,
      attributes: ["no", "nama"],
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

export const getDataJenisTindakanHeaderRLTigaTitikTigaBelas = (req, res) => {
  JenisTindakanRLTigaTitikTigaBelasHeader.findAll({
    attributes: ["id", "no", "nama"],
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
