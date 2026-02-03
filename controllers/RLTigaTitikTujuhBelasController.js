import { databaseSIRS } from '../config/Database.js'
import { get, show, rlTigaTitikTujuhBelasDetail, rlTigaTitikTujuhBelas } from '../models/RLTigaTitikTitikTujuhBelasModel.js'
import Joi from 'joi'


export const getRLTigaTitikTujuhBelas = (req, res) => {
    // const joi = Joi.extend(joi) 

    const schema = Joi.object({
        rsId: Joi.string().required(),
        periode: Joi.number().required(),
        page: Joi.number(),
        limit: Joi.number()
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
        // console.log(req.user)
        // console.log(results)
        const message = results.length ? 'data found' : 'data not found'
        res.status(200).send({
            status: true,
            message: message,
            data: results
        })
    })
}

export const showRLTigaTitikTujuhBelas = (req, res) => {
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

export const insertDataRLTigaTitikTujuhBelas =  async (req, res) => {
    const schema = Joi.object({
        // periodeBulan: Joi.number().greater(0).less(13).required(),
        periodeTahun: Joi.number().greater(2022).required(),
        data: Joi.array()
            .items(
                Joi.object().keys({
                    golonganObatId: Joi.number(),
                    jumlahItemObat: Joi.number().min(0),
                    jumlahItemObatRs: Joi.number().min(0)
                }).required()
            ).required()
    })

    const { error, value } =  schema.validate(req.body)
    if (error) {
        res.status(404).send({
            status: false,
            message: error.details[0].message
        })
        return
    }

    // const periodeBulan = String(req.body.periodeBulan)
    const periode = String(req.body.periodeTahun)
    // const periode = periodeTahun

    const transaction = await databaseSIRS.transaction()
    try {
        const resultInsertHeader = await rlTigaTitikTujuhBelas.create({
            rs_id: req.user.satKerId,
            periode: periode,
            user_id: req.user.id
        }, { 
            transaction: transaction
        })

        const dataDetail = req.body.data.map((value, index) => {
            return {
                rs_id: req.user.satKerId,
                periode: periode,
                rl_tiga_titik_tujuh_belas_id: resultInsertHeader.id,
                golongan_obat_id: value.golonganObatId,
                jumlah_item_obat: value.jumlahItemObat,
                jumlah_item_obat_rs: value.jumlahItemObatRs,
                
                user_id: req.user.id
            }
        })

        await rlTigaTitikTujuhBelasDetail.bulkCreate(dataDetail, { 
            transaction: transaction
        })
        
        await transaction.commit()
        res.status(201).send({
            status: true,
            message: "data created",
            data: {
                id: resultInsertHeader.id
            }
        })
    } catch (error) {
        console.log(error)
        await transaction.rollback()
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

export const updateRLTigaTitikTujuhBelas = async(req,res)=>{
    // console.log(req)
    try{
        const update = await rlTigaTitikTujuhBelasDetail.update(
            {
                // rl_tiga_titik_tujuh_belas_id: resultInsertHeader.id,
                golongan_obat_id: req.body.golonganObatId,
                jumlah_item_obat: req.body.jumlahItemObat,
                jumlah_item_obat_rs: req.body.jumlahItemObatRs,
                // rs_id: req.user.rsId,
                // periode: req.body.periode,
                user_id: req.user.id
            },
            {
                where:{
                    id: req.params.id,
                    rs_id: req.user.satKerId
            }
        });
        res.status(200).json({
            status: true,
            message: update
        });
    }catch(error){
        console.log(error.message);
    }
}

export const deleteRLTigaTitikTujuhBelas = async(req, res) => {
    try {
        const count = await rlTigaTitikTujuhBelasDetail.destroy({
            where: {
                id: req.params.id,
                rs_id: req.user.satKerId
            }
        })
        if (count == 0) {
            res.status(404).send({
                status: true,
                message: "Data Not Found",
                data: {
                    'deleted_rows': count
                }
            })
        } else {
            res.status(201).send({
                status: true,
                message: "data deleted successfully",
                data: {
                    'deleted_rows': count
                }
            })
        }
    } catch (error) {
        res.status(404).send({
            status: false,
            message: error
        })
    }
}

