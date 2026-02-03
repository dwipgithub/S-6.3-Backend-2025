import { databaseSIRS } from '../config/Database.js'
import {  get, show, rlTigaTitikSembilan, rlTigaTitikSembilanDetail } from '../models/RLTigaTitikSembilanModel.js'
import Joi from 'joi'
import joiDate from "@joi/date"
// import { jenisKegiatan } from '../../models/RLTigaTitikSembilanJenisKegiatanModel.js'


export const getRLTigaTitikSembilan = (req, res) => {
    const joi = Joi.extend(joiDate) 

    const schema = joi.object({
        rsId: joi.string().required(),
        periode: joi.date().format("YYYY-D").required(),
        page: joi.number(),
        limit: joi.number()
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
        console.log(req.user)
        const message = results.length ? 'data found' : 'data not found'
        res.status(200).send({
            status: true,
            message: message,
            data: results
        })
    })
}

export const showRLTigaTitikSembilan = (req, res) => {
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

export const insertRLTigaTitikSembilan =  async (req, res) => {
    const schema = Joi.object({
        periodeBulan: Joi.number().greater(0).less(13).required(),
        periodeTahun: Joi.number().greater(2022).required(),
        data: Joi.array()
            .items(
                Joi.object().keys({
                    jenisKegiatanId: Joi.number().required(),

                    jumlah: Joi.number().required(),
                    // rlTigaTitikSembilanGroupJenisKegiatanId: Joi.number().required()
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

    const periodeBulan = String(req.body.periodeBulan)
    const periodeTahun = String(req.body.periodeTahun)
    const periode = periodeTahun.concat("-").concat(periodeBulan).concat("-").concat("1")

    const transaction = await databaseSIRS.transaction()
    try {
        const resultInsertHeader = await rlTigaTitikSembilan.create({
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
                rl_tiga_titik_sembilan_id: resultInsertHeader.id,
                jenis_kegiatan_id: value.jenisKegiatanId,
               
                jumlah: value.jumlah,
                // rl_tiga_titik_sembilan_group_jenis_kegiatan_id: value.rlTigaTitikSembilanGroupJenisKegiatanId,
                user_id: req.user.id
            }
        })

        await rlTigaTitikSembilanDetail.bulkCreate(dataDetail, { 
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

export const updateRLTigaTitikSembilan = async(req,res)=>{
    try{
        const update = await rlTigaTitikSembilanDetail.update(
            {
                
                jumlah: req.body.jumlah,
                
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

export const deleteRLTigaTitikSembilan = async(req, res) => {
    try {
        const count = await rlTigaTitikSembilanDetail.destroy({
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