import { get } from '../models/RLTigaTitikDuaJenisPelayananModel.js'

export const getRLTigaTitikDuaJenisPelayanan = (req, res) => {
    get(req, (err, results) => {
        const message = results.length ? 'data found' : 'data not found'
        res.status(200).send({
            status: true,
            message: message,
            data: results
        })
    })
}