
import { Op } from "sequelize";
import { RLTigaTitikEmpatBelasJenisKegiatan } from '../models/RLTigaTitikEmpatBelasJenisKegiatanModel.js';
// import { jenisGroupKegiatanHeader } from '../models/RLTigaTitikTujuh.js'
export const getDataJenisKegiatanRLTigaTitikEmpatBelas = (req, res) => {
    RLTigaTitikEmpatBelasJenisKegiatan.findAll({
        attributes: ['id','no','nama'],
    })
    .then((results) => {
        res.status(200).send({
            status: true,
            message: "data found",
            data: results
        })
    })
    .catch((err) => {
        res.status(422).send({
            status: false,
            message: err
        })
        return
    })
}