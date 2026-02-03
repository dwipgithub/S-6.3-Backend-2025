import { jenisKegiatan } from '../models/JenisKegiatanRLTigaTitikEnamModel.js'
export const getDataJenisKegiatanRLTigaTitikEnam = (req, res) => {
    jenisKegiatan.findAll({
        attributes: ['id','no','nama']
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

