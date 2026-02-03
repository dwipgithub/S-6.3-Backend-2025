import { databaseSIRS } from '../config/Database.js'
import { get, show, rlTigaTitikDuaHeader, rlTigaTitikDuaDetail } from '../models/RLTigaTitikSatuModel.js'
import Joi from 'joi'
import joiDate from "@joi/date"

// export const getRLTigaTitikSatu = (req, res) => {
//     const joi = Joi.extend(joiDate) 

//     const schema = joi.object({
//         provId: joi.string(),
//         KabKotId: joi.string(),
//         rsId: joi.string(),
//         periode: joi.date().format("YYYY-M"),
//         page: joi.number(),
//         limit: joi.number()
//     })

//     const { error, value } =  schema.validate(req.query)

//     if (error) {
//         res.status(400).send({
//             status: false,
//             message: error.details[0].message
//         })
//         return
//     }

//     get(req, (err, results) => {
//         const message = results.length ? 'data found' : 'data not found'
//         res.status(200).send({
//             status: true,
//             message: message,
//             data: results
//         })
//     })
// }

export const getRLTigaTitikSatu = (req, res) => {
    const joi = Joi.extend(joiDate);

    const schema = joi.object({
        provId: joi.string().allow(null, ''),       // boleh kosong dulu, nanti kita cek manual
        KabKotId: joi.string().allow(null, ''),
        rsId: joi.string().allow(null, ''),
        periode: joi.date().format("YYYY-M").allow(null, ''),
        page: joi.number(),
        limit: joi.number()
    });

    const { error, value } = schema.validate(req.query);

    if (error) {
        return res.status(400).send({
            status: false,
            message: error.details[0].message
        });
    }

    const { provId, KabKotId, rsId} = value;

    // ✅ Validasi: kabkota atau provinsi wajib dipilih salah satu
    if (!provId && !KabKotId && !rsId) {
        return res.status(400).send({
            status: false,
            message: "Wajib pilih minimal salah satu: provId atau KabKotId atau rsId"
        });
    }

    // ✅ Jika valid, lanjut ke model
    get(req, (err, results) => {
        if (err) {
            return res.status(500).send({
                status: false,
                message: "Terjadi kesalahan pada server",
                error: err.message
            });
        }

        const message = results.length ? 'data found' : 'data not found';
        res.status(200).send({
            status: true,
            message: message,
            data: results
        });
    });
};


export const showRLTigaTitikSatu = (req, res) => {
    show(req.params.id, (err, results) => {
        if (err) {
            res.status(422).send({
                status: false,
                message: err
            })
            return
        }

        const message = results.length ? 'data found' : 'data not found'
        const data = results.length ? results[0] : null

        res.status(200).send({
            status: true,
            message: message,
            data: data
        })
    })
}
