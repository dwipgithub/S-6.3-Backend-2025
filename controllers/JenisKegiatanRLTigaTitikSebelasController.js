import { JenisKegiatanRLTigaTitikSebelas } from "../models/JenisKegiatanRLTigaTitikSebelasModel.js";
import { Op } from "sequelize";

export const getDataJenisKegiatanRLTigaTitikSebelas = (req, res) => {
  JenisKegiatanRLTigaTitikSebelas.findAll({
    attributes: ["id", "no", "nama_jenis_kegiatan"],
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
