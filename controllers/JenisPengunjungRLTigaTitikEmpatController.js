import { jenisPengunjung } from '../models/JenisPengunjungRLTigaTitikEmpatModel.js'
export const getDataJenisPengunjung = (req, res) => {
    jenisPengunjung.findAll({
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

