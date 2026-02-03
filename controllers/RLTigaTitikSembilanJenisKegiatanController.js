import { jenisKegiatan } from '../models/RLTigaTitikSembilanJenisKegiatanModel.js'
import { Op } from "sequelize";
import { jenisGroupKegiatanHeader } from '../models/RLTigaTitikSembilanModel.js'
export const getDataJenisKegiatanTigaTitikSembilan = (req, res) => {
    jenisKegiatan.findAll({
        attributes: ['id','no','nama'],
        // where: {
        //     rl_id: req.query.rlid
        // }
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

export const getDataGroupJenisKegiatanTigaTitikSembilan = (req, res) => {
  jenisKegiatan.findAll({
      attributes: ['id', 'no', 'nama'],
    //   where: {
    //       rl_id: req.query.rlid
    //   },
      include: {
          model: jenisGroupKegiatanHeader,
          
          
          required: false
      }
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

