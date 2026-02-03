
import Joi from "joi";
import joiDate from "@joi/date"
import { get } from "../models/RLEmpatTitikTigaModel.js";

export const getRLEmpatTitikTiga = (req, res) => {
  const joi = Joi.extend(joiDate) 

  const schema = joi.object({
    rsId: joi.string().required(),
    periode: joi.date().format("YYYY-MM").required(),
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

  
  req.query.periode = req.query.periode+'-01'

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