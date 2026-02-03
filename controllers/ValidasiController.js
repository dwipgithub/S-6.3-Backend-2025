import { databaseSIRS } from '../config/Database.js'
import Joi from 'joi'
import joiDate from "@joi/date"
import { validasi } from '../models/ValidasiModel.js'

export const insertValidasi =  async (req, res) => {
    const schema = Joi.object({
        rsId: Joi.string().required(),
        rlId: Joi.string().required(),
        periodeBulan: Joi.number().greater(0).less(13).required(),
        periodeTahun: Joi.number().greater(2022).required(),
        statusId: Joi.number().required(),
        keterangan: Joi.string().when('statusId',{
            is: 2,
            then: Joi.required(),
            otherwise: Joi.optional()
        }
        )
    })

    const { error, value } =  schema.validate(req.body)
    if (error) {
        res.status(400).send({
            status: false,
            message: error.details[0].message
        })
        return
    }

    const periodeBulan = String(req.body.periodeBulan)
    const periodeTahun = String(req.body.periodeTahun)
    const periode = periodeTahun.concat("-").concat(periodeBulan).concat("-").concat("1")

    try {
        const newValidasi = await validasi.create({
            rs_id: req.body.rsId,
            rl_id: req.body.rlId,
            periode: periode,
            status_id: req.body.statusId,
            keterangan: req.body.keterangan,
            user_id: req.user.id
        })

        res.status(201).send({
            status: true,
            message: "data created",
            data: {
                id: newValidasi.id
            }
        })
    } catch (error) {
        console.log(error)
        if(error.name === 'SequelizeUniqueConstraintError'){
            res.status(400).send({
                status: false,
                message: "Duplicate Entry"
            })
        } else {
            res.status(400).send({
                status: false,
                message: error
            })
        }
    }
}