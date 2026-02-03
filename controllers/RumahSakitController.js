import { get, show } from '../models/RumahSakitModel.js'

export const getRumahSakit = (req, res) => {
    get(req, (err, results) => {
        const message = results.length ? 'data found' : 'data not found'
        res.status(200).send({
            status: true,
            message: message,
            data: results
        })
    })
}

export const showRumahSakit = (req, res) => {
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