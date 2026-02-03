import { databaseSIRS } from '../config/Database.js'
import { rlLimaTitikDua , rlLimaTitikDuaDetail, get } from '../models/RLLimaTitikDuaModel.js'
import Joi from "joi";
import joiDate from "@joi/date"
import { icd } from "../models/ICDModel.js";

export const getRLLimaTitikDua = (req, res) => {
    const joi = Joi.extend(joiDate) 
  
    const schema = joi.object({
        rsId: joi.string().required(),
        periode: joi.date().required(),
    })
  
    const { error, value } =  schema.validate(req.query)
  
    if (error) {
        res.status(400).send({
            status: false,
            message: error.details[0].message
        })
        return
    }
    if(req.user.jenisUserId == 4){
      if(req.query.rsId != req.user.satKerId){
        res.status(404).send({
          status: false,
          message: "Kode RS Tidak Sesuai",
        });
        return;
      }
    }
  
    get(req, (err, results) => {
        // console.log(req.user)
        const message = results.length ? 'data found' : 'data not found'
        res.status(200).send({
            status: true,
            message: message,
            data: results
        })
    })
  }