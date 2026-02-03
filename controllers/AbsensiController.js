import { get } from '../models/AbsensiModel.js'
import Joi from 'joi'
import joiDate from "@joi/date"

export const getAbsensi = (req, res) => {
    const joi = Joi.extend(joiDate) 

    const schema = joi.object({
        provinsiId: joi.string().required(),
        kabKotaId: joi.string(),
        namaRS: joi.string()
    })

    const { error, value } =  schema.validate(req.query)

    if (error) {
        res.status(400).send({
            status: false,
            message: error.details[0].message
        })
        return
    }

    get(req, (err, results) => {
        const message = results.length ? 'data found' : 'data not found'
        res.status(200).send({
            status: true,
            message: message,
            data: results
        })
    })
}