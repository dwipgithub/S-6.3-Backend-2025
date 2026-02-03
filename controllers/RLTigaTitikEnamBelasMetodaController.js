import {
  MetodaRLTigaTitikEnamBelas,
  JenisPelayananKeluargaberencana,
} from "../models/RLTigaTitikEnamBelasMetoda.js";
import { Op } from "sequelize";

export const getDataMetodaRLTigaTitikEnamBelas = (req, res) => {
  MetodaRLTigaTitikEnamBelas.findAll({
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

export const getDataJenisPelayananKeluargaBerencana = (req, res) => {
  JenisPelayananKeluargaberencana.findAll({
    attributes: ["id", "nama"],
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
