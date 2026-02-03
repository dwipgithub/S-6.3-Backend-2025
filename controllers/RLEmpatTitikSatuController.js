import { databaseSIRS } from "../config/Database.js";
import {
  rlEmpatTitikSatuHeader,
  rlEmpatTitikSatuDetail,
  // get42,
  // get43,
} from "../models/RLEmpatTitikSatuModel.js";
import Joi from "joi";
import joiDate from "@joi/date"
import { icd } from "../models/ICDModel.js";

export const getDataRLEmpatTitikSatu = (req, res) => {
  const joi = Joi.extend(joiDate) 
  const schema = joi.object({
    rsId: joi.string().required(),
    periode: joi.date().format("YYYY-MM").required(),
    page: joi.number(),
    limit: joi.number()
})
const { error, value } = schema.validate(req.query);
if (error) {
  res.status(404).send({
    status: false,
    message: error.details[0].message,
  });
  return;
}


let whereClause = {}
if(req.user.jenisUserId == 4){
  if(req.query.rsId != req.user.satKerId){
    res.status(404).send({
      status: false,
      message: "Kode RS Tidak Sesuai",
    });
    return;
  }
  whereClause = {
    rs_id: req.user.satKerId,
    periode: req.query.periode,
  }
}else{
  whereClause = {
    rs_id: req.query.rsId,
    periode: req.query.periode,
  }
}

rlEmpatTitikSatuDetail
    .findAll({
        include: {
          model: icd,
          attributes: ["icd_code", "description_code", "icd_code_group", "description_code_group"],
        },  
        where : whereClause,
    })
    .then((results) => {
      res.status(200).send({
        status: true,
        message: "data found",
        data: results,
      });
    })
    .catch((err) => {
      res.status(422).send({
        status: false,
        message: err,
      });
      return;
    });
};

export const getDataRLEmpatTitikSatuById = (req, res) => {
  rlEmpatTitikSatuDetail
    .findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: icd,
        attributes: ["icd_code", "description_code", "icd_code_group", "description_code_group"],
      },
    })
    .then((results) => {
      res.status(200).send({
        status: true,
        message: "data found",
        data: results,
      });
    })
    .catch((err) => {
      res.status(422).send({
        status: false,
        message: err,
      });
      return;
    });
};

export const insertDataRLEmpatTitikSatu = async (req, res) => {
  const schema = Joi.object({
    // periode: Joi.date().required(),
    periodeBulan: Joi.number().greater(0).less(13).required(),
    periodeTahun: Joi.number().greater(2022).required(),
    icdId: Joi.number(),
    data: Joi.array()
      .items(
        Joi.object().keys({
          jmlhPasHidupMatiUmurGen01JamL: Joi.number(),
          jmlhPasHidupMatiUmurGen01JamP: Joi.number(),
          jmlhPasHidupMatiUmurGen123JamL: Joi.number(),
          jmlhPasHidupMatiUmurGen123JamP: Joi.number(),
          jmlhPasHidupMatiUmurGen17hrL: Joi.number(),
          jmlhPasHidupMatiUmurGen17hrP: Joi.number(),
          jmlhPasHidupMatiUmurGen828hrL: Joi.number(),
          jmlhPasHidupMatiUmurGen828hrP: Joi.number(),
          jmlhPasHidupMatiUmurGen29hr3blnL: Joi.number(),
          jmlhPasHidupMatiUmurGen29hr3blnP: Joi.number(),
          jmlhPasHidupMatiUmurGen36blnL: Joi.number(),
          jmlhPasHidupMatiUmurGen36blnP: Joi.number(),
          jmlhPasHidupMatiUmurGen611blnL: Joi.number(),
          jmlhPasHidupMatiUmurGen611blnP: Joi.number(),
          jmlhPasHidupMatiUmurGen14thL: Joi.number(),
          jmlhPasHidupMatiUmurGen14thP: Joi.number(),
          jmlhPasHidupMatiUmurGen59thL: Joi.number(),
          jmlhPasHidupMatiUmurGen59thP: Joi.number(),
          jmlhPasHidupMatiUmurGen1014thL: Joi.number(),
          jmlhPasHidupMatiUmurGen1014thP: Joi.number(),
          jmlhPasHidupMatiUmurGen1519thL: Joi.number(),
          jmlhPasHidupMatiUmurGen1519thP: Joi.number(),
          jmlhPasHidupMatiUmurGen2024thL: Joi.number(),
          jmlhPasHidupMatiUmurGen2024thP: Joi.number(),
          jmlhPasHidupMatiUmurGen2529thL: Joi.number(),
          jmlhPasHidupMatiUmurGen2529thP: Joi.number(),
          jmlhPasHidupMatiUmurGen3034thL: Joi.number(),
          jmlhPasHidupMatiUmurGen3034thP: Joi.number(),
          jmlhPasHidupMatiUmurGen3539thL: Joi.number(),
          jmlhPasHidupMatiUmurGen3539thP: Joi.number(),
          jmlhPasHidupMatiUmurGen4044thL: Joi.number(),
          jmlhPasHidupMatiUmurGen4044thP: Joi.number(),
          jmlhPasHidupMatiUmurGen4549thL: Joi.number(),
          jmlhPasHidupMatiUmurGen4549thP: Joi.number(),
          jmlhPasHidupMatiUmurGen5054thL: Joi.number(),
          jmlhPasHidupMatiUmurGen5054thP: Joi.number(),
          jmlhPasHidupMatiUmurGen5559thL: Joi.number(),
          jmlhPasHidupMatiUmurGen5559thP: Joi.number(),
          jmlhPasHidupMatiUmurGen6064thL: Joi.number(),
          jmlhPasHidupMatiUmurGen6064thP: Joi.number(),
          jmlhPasHidupMatiUmurGen6569thL: Joi.number(),
          jmlhPasHidupMatiUmurGen6569thP: Joi.number(),
          jmlhPasHidupMatiUmurGen7074thL: Joi.number(),
          jmlhPasHidupMatiUmurGen7074thP: Joi.number(),
          jmlhPasHidupMatiUmurGen7579thL: Joi.number(),
          jmlhPasHidupMatiUmurGen7579thP: Joi.number(),
          jmlhPasHidupMatiUmurGen8084thL: Joi.number(),
          jmlhPasHidupMatiUmurGen8084thP: Joi.number(),
          jmlhPasHidupMatiUmurGenLebih85thL: Joi.number(),
          jmlhPasHidupMatiUmurGenLebih85thP: Joi.number(),
          jmlhPasKeluarMatiGenL: Joi.number(),
          jmlhPasKeluarMatiGenP: Joi.number(),
        })
      )
      .required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(404).send({
      status: false,
      message: error.details[0].message,
    });
    return;
  }

  let transaction;
  try {
    const periode = String(req.body.periodeTahun)+"-"+String(req.body.periodeBulan)+"-1"
    transaction = await databaseSIRS.transaction();
    const resultInsertHeader = await rlEmpatTitikSatuHeader.create(
      {
        rs_id: req.user.satKerId,
        periode: periode,
        user_id: req.user.id,
      },
      { transaction }
    );

    const dataDetail = req.body.data.map((value, index) => {
    
    let totalL = 
        value.jmlhPasHidupMatiUmurGen01JamL +
        value.jmlhPasHidupMatiUmurGen123JamL +
        value.jmlhPasHidupMatiUmurGen17hrL +
        value.jmlhPasHidupMatiUmurGen828hrL +
        value.jmlhPasHidupMatiUmurGen29hr3blnL +
        value.jmlhPasHidupMatiUmurGen36blnL +
        value.jmlhPasHidupMatiUmurGen611blnL +
        value.jmlhPasHidupMatiUmurGen14thL +
        value.jmlhPasHidupMatiUmurGen59thL +
        value.jmlhPasHidupMatiUmurGen1014thL +
        value.jmlhPasHidupMatiUmurGen1519thL +
        value.jmlhPasHidupMatiUmurGen2024thL +
        value.jmlhPasHidupMatiUmurGen2529thL +
        value.jmlhPasHidupMatiUmurGen3034thL +
        value.jmlhPasHidupMatiUmurGen3539thL +
        value.jmlhPasHidupMatiUmurGen4044thL +
        value.jmlhPasHidupMatiUmurGen4549thL +
        value.jmlhPasHidupMatiUmurGen5054thL +
        value.jmlhPasHidupMatiUmurGen5559thL +
        value.jmlhPasHidupMatiUmurGen6064thL +
        value.jmlhPasHidupMatiUmurGen6569thL +
        value.jmlhPasHidupMatiUmurGen7074thL +
        value.jmlhPasHidupMatiUmurGen7579thL +
        value.jmlhPasHidupMatiUmurGen8084thL +
        value.jmlhPasHidupMatiUmurGenLebih85thL 

      let totalP = 
        value.jmlhPasHidupMatiUmurGen01JamP +
        value.jmlhPasHidupMatiUmurGen123JamP +
        value.jmlhPasHidupMatiUmurGen17hrP +
        value.jmlhPasHidupMatiUmurGen828hrP +
        value.jmlhPasHidupMatiUmurGen29hr3blnP +
        value.jmlhPasHidupMatiUmurGen36blnP +
        value.jmlhPasHidupMatiUmurGen611blnP +
        value.jmlhPasHidupMatiUmurGen14thP +
        value.jmlhPasHidupMatiUmurGen59thP +
        value.jmlhPasHidupMatiUmurGen1014thP +
        value.jmlhPasHidupMatiUmurGen1519thP +
        value.jmlhPasHidupMatiUmurGen2024thP +
        value.jmlhPasHidupMatiUmurGen2529thP +
        value.jmlhPasHidupMatiUmurGen3034thP +
        value.jmlhPasHidupMatiUmurGen3539thP +
        value.jmlhPasHidupMatiUmurGen4044thP +
        value.jmlhPasHidupMatiUmurGen4549thP +
        value.jmlhPasHidupMatiUmurGen5054thP +
        value.jmlhPasHidupMatiUmurGen5559thP +
        value.jmlhPasHidupMatiUmurGen6064thP +
        value.jmlhPasHidupMatiUmurGen6569thP +
        value.jmlhPasHidupMatiUmurGen7074thP +
        value.jmlhPasHidupMatiUmurGen7579thP +
        value.jmlhPasHidupMatiUmurGen8084thP +
        value.jmlhPasHidupMatiUmurGenLebih85thP 


      let total = totalL + totalP

      let totalKeluar = value.jmlhPasKeluarMatiGenL + value.jmlhPasKeluarMatiGenP

      return {
        rl_empat_titik_satu_id: resultInsertHeader.id,
        rs_id: req.user.satKerId,
        periode: periode,
        icd_id: req.body.icdId,
        jmlh_pas_hidup_mati_umur_gen_0_1jam_l : value.jmlhPasHidupMatiUmurGen01JamL,
        jmlh_pas_hidup_mati_umur_gen_0_1jam_p : value.jmlhPasHidupMatiUmurGen01JamP,
        jmlh_pas_hidup_mati_umur_gen_1_23jam_l : value.jmlhPasHidupMatiUmurGen123JamL,
        jmlh_pas_hidup_mati_umur_gen_1_23jam_p : value.jmlhPasHidupMatiUmurGen123JamP,
        jmlh_pas_hidup_mati_umur_gen_1_7hr_l : value.jmlhPasHidupMatiUmurGen17hrL,
        jmlh_pas_hidup_mati_umur_gen_1_7hr_p : value.jmlhPasHidupMatiUmurGen17hrP,
        jmlh_pas_hidup_mati_umur_gen_8_28hr_l : value.jmlhPasHidupMatiUmurGen828hrL,
        jmlh_pas_hidup_mati_umur_gen_8_28hr_p : value.jmlhPasHidupMatiUmurGen828hrP,
        jmlh_pas_hidup_mati_umur_gen_29hr_3bln_l : value.jmlhPasHidupMatiUmurGen29hr3blnL,
        jmlh_pas_hidup_mati_umur_gen_29hr_3bln_p : value.jmlhPasHidupMatiUmurGen29hr3blnP,
        jmlh_pas_hidup_mati_umur_gen_3_6bln_l : value.jmlhPasHidupMatiUmurGen36blnL,
        jmlh_pas_hidup_mati_umur_gen_3_6bln_p : value.jmlhPasHidupMatiUmurGen36blnP,
        jmlh_pas_hidup_mati_umur_gen_6_11bln_l : value.jmlhPasHidupMatiUmurGen611blnL,
        jmlh_pas_hidup_mati_umur_gen_6_11bln_p : value.jmlhPasHidupMatiUmurGen611blnP,
        jmlh_pas_hidup_mati_umur_gen_1_4th_l : value.jmlhPasHidupMatiUmurGen14thL,
        jmlh_pas_hidup_mati_umur_gen_1_4th_p : value.jmlhPasHidupMatiUmurGen14thP,
        jmlh_pas_hidup_mati_umur_gen_5_9th_l : value.jmlhPasHidupMatiUmurGen59thL,
        jmlh_pas_hidup_mati_umur_gen_5_9th_p : value.jmlhPasHidupMatiUmurGen59thP,
        jmlh_pas_hidup_mati_umur_gen_10_14th_l : value.jmlhPasHidupMatiUmurGen1014thL,
        jmlh_pas_hidup_mati_umur_gen_10_14th_p : value.jmlhPasHidupMatiUmurGen1014thP,
        jmlh_pas_hidup_mati_umur_gen_15_19th_l : value.jmlhPasHidupMatiUmurGen1519thL,
        jmlh_pas_hidup_mati_umur_gen_15_19th_p : value.jmlhPasHidupMatiUmurGen1519thP,
        jmlh_pas_hidup_mati_umur_gen_20_24th_l : value.jmlhPasHidupMatiUmurGen2024thL,
        jmlh_pas_hidup_mati_umur_gen_20_24th_p : value.jmlhPasHidupMatiUmurGen2024thP,
        jmlh_pas_hidup_mati_umur_gen_25_29th_l : value.jmlhPasHidupMatiUmurGen2529thL,
        jmlh_pas_hidup_mati_umur_gen_25_29th_p : value.jmlhPasHidupMatiUmurGen2529thP,
        jmlh_pas_hidup_mati_umur_gen_30_34th_l : value.jmlhPasHidupMatiUmurGen3034thL,
        jmlh_pas_hidup_mati_umur_gen_30_34th_p : value.jmlhPasHidupMatiUmurGen3034thP,
        jmlh_pas_hidup_mati_umur_gen_35_39th_l : value.jmlhPasHidupMatiUmurGen3539thL,
        jmlh_pas_hidup_mati_umur_gen_35_39th_p : value.jmlhPasHidupMatiUmurGen3539thP,
        jmlh_pas_hidup_mati_umur_gen_40_44th_l : value.jmlhPasHidupMatiUmurGen4044thL,
        jmlh_pas_hidup_mati_umur_gen_40_44th_p : value.jmlhPasHidupMatiUmurGen4044thP,
        jmlh_pas_hidup_mati_umur_gen_45_49th_l : value.jmlhPasHidupMatiUmurGen4549thL,
        jmlh_pas_hidup_mati_umur_gen_45_49th_p : value.jmlhPasHidupMatiUmurGen4549thP,
        jmlh_pas_hidup_mati_umur_gen_50_54th_l : value.jmlhPasHidupMatiUmurGen5054thL,
        jmlh_pas_hidup_mati_umur_gen_50_54th_p : value.jmlhPasHidupMatiUmurGen5054thP,
        jmlh_pas_hidup_mati_umur_gen_55_59th_l : value.jmlhPasHidupMatiUmurGen5559thL,
        jmlh_pas_hidup_mati_umur_gen_55_59th_p : value.jmlhPasHidupMatiUmurGen5559thP,
        jmlh_pas_hidup_mati_umur_gen_60_64th_l : value.jmlhPasHidupMatiUmurGen6064thL,
        jmlh_pas_hidup_mati_umur_gen_60_64th_p : value.jmlhPasHidupMatiUmurGen6064thP,
        jmlh_pas_hidup_mati_umur_gen_65_69th_l : value.jmlhPasHidupMatiUmurGen6569thL,
        jmlh_pas_hidup_mati_umur_gen_65_69th_p : value.jmlhPasHidupMatiUmurGen6569thP,
        jmlh_pas_hidup_mati_umur_gen_70_74th_l : value.jmlhPasHidupMatiUmurGen7074thL,
        jmlh_pas_hidup_mati_umur_gen_70_74th_p : value.jmlhPasHidupMatiUmurGen7074thP,
        jmlh_pas_hidup_mati_umur_gen_75_79th_l : value.jmlhPasHidupMatiUmurGen7579thL,
        jmlh_pas_hidup_mati_umur_gen_75_79th_p : value.jmlhPasHidupMatiUmurGen7579thP,
        jmlh_pas_hidup_mati_umur_gen_80_84th_l : value.jmlhPasHidupMatiUmurGen8084thL,
        jmlh_pas_hidup_mati_umur_gen_80_84th_p : value.jmlhPasHidupMatiUmurGen8084thP,
        jmlh_pas_hidup_mati_umur_gen_lebih85th_l : value.jmlhPasHidupMatiUmurGenLebih85thL,
        jmlh_pas_hidup_mati_umur_gen_lebih85th_p : value.jmlhPasHidupMatiUmurGenLebih85thP,
        jmlh_pas_hidup_mati_gen_l : totalL,
        jmlh_pas_hidup_mati_gen_p : totalP,
        total_pas_hidup_mati : total,
        jmlh_pas_keluar_mati_gen_l : value.jmlhPasKeluarMatiGenL,
        jmlh_pas_keluar_mati_gen_p : value.jmlhPasKeluarMatiGenP,
        total_pas_keluar_mati : totalKeluar,
        user_id : req.user.id,
      };
    });

    if (dataDetail[0].total_pas_keluar_mati > dataDetail[0].total_pas_hidup_mati) {
		await transaction.rollback();
      res.status(400).send({
        status: false,
        message: "Data Jumlah Pasien Mati Lebih Dari Jumlah Pasien Hidup/Mati",
      });
    } else if (dataDetail[0].jmlh_pas_keluar_mati_gen_l > dataDetail[0].jmlh_pas_hidup_mati_gen_l){
		await transaction.rollback();
      res.status(400).send({
        status: false,
        message: "Data Jumlah Pasien Mati Laki-Laki Lebih Dari Jumlah Pasien Hidup/Mati Laki-Laki",
      });
    } else if (dataDetail[0].jmlh_pas_keluar_mati_gen_p > dataDetail[0].jmlh_pas_hidup_mati_gen_p){
		await transaction.rollback();
      res.status(400).send({
        status: false,
        message: "Data Jumlah Pasien Mati Perempuan Lebih Dari Jumlah Pasien Hidup/Mati Perempuan",
      });
    } else {
      const resultInsertDetail = await rlEmpatTitikSatuDetail.bulkCreate(dataDetail, {
        transaction,
        updateOnDuplicate: [
          "jmlh_pas_hidup_mati_umur_gen_0_1jam_l",
          "jmlh_pas_hidup_mati_umur_gen_0_1jam_p",
          "jmlh_pas_hidup_mati_umur_gen_1_23jam_l",
          "jmlh_pas_hidup_mati_umur_gen_1_23jam_p",
          "jmlh_pas_hidup_mati_umur_gen_1_7hr_l",
          "jmlh_pas_hidup_mati_umur_gen_1_7hr_p",
          "jmlh_pas_hidup_mati_umur_gen_8_28hr_l",
          "jmlh_pas_hidup_mati_umur_gen_8_28hr_p",
          "jmlh_pas_hidup_mati_umur_gen_29hr_3bln_l",
          "jmlh_pas_hidup_mati_umur_gen_29hr_3bln_p",
          "jmlh_pas_hidup_mati_umur_gen_3_6bln_l",
          "jmlh_pas_hidup_mati_umur_gen_3_6bln_p",
          "jmlh_pas_hidup_mati_umur_gen_6_11bln_l",
          "jmlh_pas_hidup_mati_umur_gen_6_11bln_p",
          "jmlh_pas_hidup_mati_umur_gen_1_4th_l",
          "jmlh_pas_hidup_mati_umur_gen_1_4th_p",
          "jmlh_pas_hidup_mati_umur_gen_5_9th_l",
          "jmlh_pas_hidup_mati_umur_gen_5_9th_p",
          "jmlh_pas_hidup_mati_umur_gen_10_14th_l",
          "jmlh_pas_hidup_mati_umur_gen_10_14th_p",
          "jmlh_pas_hidup_mati_umur_gen_15_19th_l",
          "jmlh_pas_hidup_mati_umur_gen_15_19th_p",
          "jmlh_pas_hidup_mati_umur_gen_20_24th_l",
          "jmlh_pas_hidup_mati_umur_gen_20_24th_p",
          "jmlh_pas_hidup_mati_umur_gen_25_29th_l",
          "jmlh_pas_hidup_mati_umur_gen_25_29th_p",
          "jmlh_pas_hidup_mati_umur_gen_30_34th_l",
          "jmlh_pas_hidup_mati_umur_gen_30_34th_p",
          "jmlh_pas_hidup_mati_umur_gen_35_39th_l",
          "jmlh_pas_hidup_mati_umur_gen_35_39th_p",
          "jmlh_pas_hidup_mati_umur_gen_40_44th_l",
          "jmlh_pas_hidup_mati_umur_gen_40_44th_p",
          "jmlh_pas_hidup_mati_umur_gen_45_49th_l",
          "jmlh_pas_hidup_mati_umur_gen_45_49th_p",
          "jmlh_pas_hidup_mati_umur_gen_50_54th_l",
          "jmlh_pas_hidup_mati_umur_gen_50_54th_p",
          "jmlh_pas_hidup_mati_umur_gen_55_59th_l",
          "jmlh_pas_hidup_mati_umur_gen_55_59th_p",
          "jmlh_pas_hidup_mati_umur_gen_60_64th_l",
          "jmlh_pas_hidup_mati_umur_gen_60_64th_p",
          "jmlh_pas_hidup_mati_umur_gen_65_69th_l",
          "jmlh_pas_hidup_mati_umur_gen_65_69th_p",
          "jmlh_pas_hidup_mati_umur_gen_70_74th_l",
          "jmlh_pas_hidup_mati_umur_gen_70_74th_p",
          "jmlh_pas_hidup_mati_umur_gen_75_79th_l",
          "jmlh_pas_hidup_mati_umur_gen_75_79th_p",
          "jmlh_pas_hidup_mati_umur_gen_80_84th_l",
          "jmlh_pas_hidup_mati_umur_gen_80_84th_p",
          "jmlh_pas_hidup_mati_umur_gen_lebih85th_l",
          "jmlh_pas_hidup_mati_umur_gen_lebih85th_p",
          "jmlh_pas_hidup_mati_gen_l",
          "jmlh_pas_hidup_mati_gen_p",
          "total_pas_hidup_mati",
          "jmlh_pas_keluar_mati_gen_l",
          "jmlh_pas_keluar_mati_gen_p",
          "total_pas_keluar_mati"
        ],
      });
      await transaction.commit();
      res.status(201).send({
        status: true,
        message: "data created",
        data: {
          id: resultInsertHeader.id,
        },
      })
    }
    // if (
    //   dataDetail[0].total_pas_keluar_mati <= dataDetail[0].total_pas_hidup_mati &&
    //   dataDetail[0].jmlh_pas_keluar_mati_gen_l <= dataDetail[0].jmlh_pas_hidup_mati_gen_l &&
    //   dataDetail[0].jmlh_pas_keluar_mati_gen_p <= dataDetail[0].jmlh_pas_hidup_mati_gen_p
      
    // ) {
    //   const resultInsertDetail = await rlEmpatTitikSatuDetail.bulkCreate(dataDetail, {
    //     transaction,
    //     updateOnDuplicate: [
    //       "jmlh_pas_hidup_mati_umur_gen_0_1jam_l",
    //       "jmlh_pas_hidup_mati_umur_gen_0_1jam_p",
    //       "jmlh_pas_hidup_mati_umur_gen_1_23jam_l",
    //       "jmlh_pas_hidup_mati_umur_gen_1_23jam_p",
    //       "jmlh_pas_hidup_mati_umur_gen_1_7hr_l",
    //       "jmlh_pas_hidup_mati_umur_gen_1_7hr_p",
    //       "jmlh_pas_hidup_mati_umur_gen_8_28hr_l",
    //       "jmlh_pas_hidup_mati_umur_gen_8_28hr_p",
    //       "jmlh_pas_hidup_mati_umur_gen_29hr_3bln_l",
    //       "jmlh_pas_hidup_mati_umur_gen_29hr_3bln_p",
    //       "jmlh_pas_hidup_mati_umur_gen_3_6bln_l",
    //       "jmlh_pas_hidup_mati_umur_gen_3_6bln_p",
    //       "jmlh_pas_hidup_mati_umur_gen_6_11bln_l",
    //       "jmlh_pas_hidup_mati_umur_gen_6_11bln_p",
    //       "jmlh_pas_hidup_mati_umur_gen_1_4th_l",
    //       "jmlh_pas_hidup_mati_umur_gen_1_4th_p",
    //       "jmlh_pas_hidup_mati_umur_gen_5_9th_l",
    //       "jmlh_pas_hidup_mati_umur_gen_5_9th_p",
    //       "jmlh_pas_hidup_mati_umur_gen_10_14th_l",
    //       "jmlh_pas_hidup_mati_umur_gen_10_14th_p",
    //       "jmlh_pas_hidup_mati_umur_gen_15_19th_l",
    //       "jmlh_pas_hidup_mati_umur_gen_15_19th_p",
    //       "jmlh_pas_hidup_mati_umur_gen_20_24th_l",
    //       "jmlh_pas_hidup_mati_umur_gen_20_24th_p",
    //       "jmlh_pas_hidup_mati_umur_gen_25_29th_l",
    //       "jmlh_pas_hidup_mati_umur_gen_25_29th_p",
    //       "jmlh_pas_hidup_mati_umur_gen_30_34th_l",
    //       "jmlh_pas_hidup_mati_umur_gen_30_34th_p",
    //       "jmlh_pas_hidup_mati_umur_gen_35_39th_l",
    //       "jmlh_pas_hidup_mati_umur_gen_35_39th_p",
    //       "jmlh_pas_hidup_mati_umur_gen_40_44th_l",
    //       "jmlh_pas_hidup_mati_umur_gen_40_44th_p",
    //       "jmlh_pas_hidup_mati_umur_gen_45_49th_l",
    //       "jmlh_pas_hidup_mati_umur_gen_45_49th_p",
    //       "jmlh_pas_hidup_mati_umur_gen_50_54th_l",
    //       "jmlh_pas_hidup_mati_umur_gen_50_54th_p",
    //       "jmlh_pas_hidup_mati_umur_gen_55_59th_l",
    //       "jmlh_pas_hidup_mati_umur_gen_55_59th_p",
    //       "jmlh_pas_hidup_mati_umur_gen_60_64th_l",
    //       "jmlh_pas_hidup_mati_umur_gen_60_64th_p",
    //       "jmlh_pas_hidup_mati_umur_gen_65_69th_l",
    //       "jmlh_pas_hidup_mati_umur_gen_65_69th_p",
    //       "jmlh_pas_hidup_mati_umur_gen_70_74th_l",
    //       "jmlh_pas_hidup_mati_umur_gen_70_74th_p",
    //       "jmlh_pas_hidup_mati_umur_gen_75_79th_l",
    //       "jmlh_pas_hidup_mati_umur_gen_75_79th_p",
    //       "jmlh_pas_hidup_mati_umur_gen_80_84th_l",
    //       "jmlh_pas_hidup_mati_umur_gen_80_84th_p",
    //       "jmlh_pas_hidup_mati_umur_gen_lebih85th_l",
    //       "jmlh_pas_hidup_mati_umur_gen_lebih85th_p",
    //       "jmlh_pas_hidup_mati_gen_l",
    //       "jmlh_pas_hidup_mati_gen_p",
    //       "total_pas_hidup_mati",
    //       "jmlh_pas_keluar_mati_gen_l",
    //       "jmlh_pas_keluar_mati_gen_p",
    //       "total_pas_keluar_mati"
    //     ],
    //   });
    //   await transaction.commit();
    //   res.status(201).send({
    //     status: true,
    //     message: "data created",
    //     data: {
    //       id: resultInsertHeader.id,
    //     },
    //   });
    // } else {
    //   res.status(400).send({
    //     status: false,
    //     message: "Data Jumlah Pasien Mati Lebih Dari Jumlah Pasien Hidup/Mati",
    //   });
    //   await transaction.rollback();
    // }
  } catch (error) {
    if (transaction) {
      if (error.name == "SequelizeForeignKeyConstraintError") {

        res.status(400).send({
          status: false,
          message: "Gagal Input Data, Jenis Kegiatan Salah.",
        });
      } else {
	//console.log(error)
        res.status(400).send({
          status: false,
          message: "Gagal Input Data.",
        });
      }
      
    }
	  await transaction.rollback();
  }
};

export const updateDataRLEmpatTitikSatu = async (req, res) => {
  const schema = Joi.object({
    jmlh_pas_hidup_mati_umur_gen_0_1jam_l: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_0_1jam_p: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_1_23jam_l: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_1_23jam_p: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_1_7hr_l: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_1_7hr_p: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_8_28hr_l: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_8_28hr_p: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_29hr_3bln_l: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_29hr_3bln_p: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_3_6bln_l: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_3_6bln_p: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_6_11bln_l: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_6_11bln_p: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_1_4th_l: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_1_4th_p: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_5_9th_l: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_5_9th_p: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_10_14th_l: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_10_14th_p: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_15_19th_l: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_15_19th_p: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_20_24th_l: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_20_24th_p: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_25_29th_l: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_25_29th_p: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_30_34th_l: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_30_34th_p: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_35_39th_l: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_35_39th_p: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_40_44th_l: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_40_44th_p: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_45_49th_l: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_45_49th_p: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_50_54th_l: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_50_54th_p: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_55_59th_l: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_55_59th_p: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_60_64th_l: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_60_64th_p: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_65_69th_l: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_65_69th_p: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_70_74th_l: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_70_74th_p: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_75_79th_l: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_75_79th_p: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_80_84th_l: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_80_84th_p: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_lebih85th_l: Joi.number().min(0),
          jmlh_pas_hidup_mati_umur_gen_lebih85th_p: Joi.number().min(0),
          jmlh_pas_keluar_mati_gen_l: Joi.number().min(0),
          jmlh_pas_keluar_mati_gen_p: Joi.number().min(0),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(404).send({
      status: false,
      message: error.details[0].message,
    });
    return;
  }
  let transaction;
  try {
    let jumlahL = req.body.jmlh_pas_hidup_mati_umur_gen_0_1jam_l +
    req.body.jmlh_pas_hidup_mati_umur_gen_1_23jam_l +
    req.body.jmlh_pas_hidup_mati_umur_gen_1_7hr_l +
    req.body.jmlh_pas_hidup_mati_umur_gen_8_28hr_l +
    req.body.jmlh_pas_hidup_mati_umur_gen_29hr_3bln_l +
    req.body.jmlh_pas_hidup_mati_umur_gen_3_6bln_l +
    req.body.jmlh_pas_hidup_mati_umur_gen_6_11bln_l +
    req.body.jmlh_pas_hidup_mati_umur_gen_1_4th_l +
    req.body.jmlh_pas_hidup_mati_umur_gen_5_9th_l +
    req.body.jmlh_pas_hidup_mati_umur_gen_10_14th_l +
    req.body.jmlh_pas_hidup_mati_umur_gen_15_19th_l +
    req.body.jmlh_pas_hidup_mati_umur_gen_20_24th_l +
    req.body.jmlh_pas_hidup_mati_umur_gen_25_29th_l +
    req.body.jmlh_pas_hidup_mati_umur_gen_30_34th_l +
    req.body.jmlh_pas_hidup_mati_umur_gen_35_39th_l +
    req.body.jmlh_pas_hidup_mati_umur_gen_40_44th_l +
    req.body.jmlh_pas_hidup_mati_umur_gen_45_49th_l +
    req.body.jmlh_pas_hidup_mati_umur_gen_50_54th_l +
    req.body.jmlh_pas_hidup_mati_umur_gen_55_59th_l +
    req.body.jmlh_pas_hidup_mati_umur_gen_60_64th_l +
    req.body.jmlh_pas_hidup_mati_umur_gen_65_69th_l +
    req.body.jmlh_pas_hidup_mati_umur_gen_70_74th_l +
    req.body.jmlh_pas_hidup_mati_umur_gen_75_79th_l +
    req.body.jmlh_pas_hidup_mati_umur_gen_80_84th_l +
    req.body.jmlh_pas_hidup_mati_umur_gen_lebih85th_l

    let jumlahP =req.body.jmlh_pas_hidup_mati_umur_gen_0_1jam_p +
    req.body.jmlh_pas_hidup_mati_umur_gen_1_23jam_p +
    req.body.jmlh_pas_hidup_mati_umur_gen_1_7hr_p +
    req.body.jmlh_pas_hidup_mati_umur_gen_8_28hr_p +
    req.body.jmlh_pas_hidup_mati_umur_gen_29hr_3bln_p +
    req.body.jmlh_pas_hidup_mati_umur_gen_3_6bln_p +
    req.body.jmlh_pas_hidup_mati_umur_gen_6_11bln_p +
    req.body.jmlh_pas_hidup_mati_umur_gen_1_4th_p +
    req.body.jmlh_pas_hidup_mati_umur_gen_5_9th_p +
    req.body.jmlh_pas_hidup_mati_umur_gen_10_14th_p +
    req.body.jmlh_pas_hidup_mati_umur_gen_15_19th_p +
    req.body.jmlh_pas_hidup_mati_umur_gen_20_24th_p +
    req.body.jmlh_pas_hidup_mati_umur_gen_25_29th_p +
    req.body.jmlh_pas_hidup_mati_umur_gen_30_34th_p +
    req.body.jmlh_pas_hidup_mati_umur_gen_35_39th_p +
    req.body.jmlh_pas_hidup_mati_umur_gen_40_44th_p +
    req.body.jmlh_pas_hidup_mati_umur_gen_45_49th_p +
    req.body.jmlh_pas_hidup_mati_umur_gen_50_54th_p +
    req.body.jmlh_pas_hidup_mati_umur_gen_55_59th_p +
    req.body.jmlh_pas_hidup_mati_umur_gen_60_64th_p +
    req.body.jmlh_pas_hidup_mati_umur_gen_65_69th_p +
    req.body.jmlh_pas_hidup_mati_umur_gen_70_74th_p +
    req.body.jmlh_pas_hidup_mati_umur_gen_75_79th_p +
    req.body.jmlh_pas_hidup_mati_umur_gen_80_84th_p +
    req.body.jmlh_pas_hidup_mati_umur_gen_lebih85th_p 

    let jumlahall = jumlahL + jumlahP;
    let totalKeluar = req.body.jmlh_pas_keluar_mati_gen_l + req.body.jmlh_pas_keluar_mati_gen_p

    const dataUpdate = {
      jmlh_pas_hidup_mati_umur_gen_0_1jam_l : req.body.jmlh_pas_hidup_mati_umur_gen_0_1jam_l,
        jmlh_pas_hidup_mati_umur_gen_0_1jam_p : req.body.jmlh_pas_hidup_mati_umur_gen_0_1jam_p,
        jmlh_pas_hidup_mati_umur_gen_1_23jam_l : req.body.jmlh_pas_hidup_mati_umur_gen_1_23jam_l,
        jmlh_pas_hidup_mati_umur_gen_1_23jam_p : req.body.jmlh_pas_hidup_mati_umur_gen_1_23jam_p,
        jmlh_pas_hidup_mati_umur_gen_1_7hr_l : req.body.jmlh_pas_hidup_mati_umur_gen_1_7hr_l,
        jmlh_pas_hidup_mati_umur_gen_1_7hr_p : req.body.jmlh_pas_hidup_mati_umur_gen_1_7hr_p,
        jmlh_pas_hidup_mati_umur_gen_8_28hr_l : req.body.jmlh_pas_hidup_mati_umur_gen_8_28hr_l,
        jmlh_pas_hidup_mati_umur_gen_8_28hr_p : req.body.jmlh_pas_hidup_mati_umur_gen_8_28hr_p,
        jmlh_pas_hidup_mati_umur_gen_29hr_3bln_l : req.body.jmlh_pas_hidup_mati_umur_gen_29hr_3bln_l,
        jmlh_pas_hidup_mati_umur_gen_29hr_3bln_p : req.body.jmlh_pas_hidup_mati_umur_gen_29hr_3bln_p,
        jmlh_pas_hidup_mati_umur_gen_3_6bln_l : req.body.jmlh_pas_hidup_mati_umur_gen_3_6bln_l,
        jmlh_pas_hidup_mati_umur_gen_3_6bln_p : req.body.jmlh_pas_hidup_mati_umur_gen_3_6bln_p,
        jmlh_pas_hidup_mati_umur_gen_6_11bln_l : req.body.jmlh_pas_hidup_mati_umur_gen_6_11bln_l,
        jmlh_pas_hidup_mati_umur_gen_6_11bln_p : req.body.jmlh_pas_hidup_mati_umur_gen_6_11bln_p,
        jmlh_pas_hidup_mati_umur_gen_1_4th_l : req.body.jmlh_pas_hidup_mati_umur_gen_1_4th_l,
        jmlh_pas_hidup_mati_umur_gen_1_4th_p : req.body.jmlh_pas_hidup_mati_umur_gen_1_4th_p,
        jmlh_pas_hidup_mati_umur_gen_5_9th_l : req.body.jmlh_pas_hidup_mati_umur_gen_5_9th_l,
        jmlh_pas_hidup_mati_umur_gen_5_9th_p : req.body.jmlh_pas_hidup_mati_umur_gen_5_9th_p,
        jmlh_pas_hidup_mati_umur_gen_10_14th_l : req.body.jmlh_pas_hidup_mati_umur_gen_10_14th_l,
        jmlh_pas_hidup_mati_umur_gen_10_14th_p : req.body.jmlh_pas_hidup_mati_umur_gen_10_14th_p,
        jmlh_pas_hidup_mati_umur_gen_15_19th_l : req.body.jmlh_pas_hidup_mati_umur_gen_15_19th_l,
        jmlh_pas_hidup_mati_umur_gen_15_19th_p : req.body.jmlh_pas_hidup_mati_umur_gen_15_19th_p,
        jmlh_pas_hidup_mati_umur_gen_20_24th_l : req.body.jmlh_pas_hidup_mati_umur_gen_20_24th_l,
        jmlh_pas_hidup_mati_umur_gen_20_24th_p : req.body.jmlh_pas_hidup_mati_umur_gen_20_24th_p,
        jmlh_pas_hidup_mati_umur_gen_25_29th_l : req.body.jmlh_pas_hidup_mati_umur_gen_25_29th_l,
        jmlh_pas_hidup_mati_umur_gen_25_29th_p : req.body.jmlh_pas_hidup_mati_umur_gen_25_29th_p,
        jmlh_pas_hidup_mati_umur_gen_30_34th_l : req.body.jmlh_pas_hidup_mati_umur_gen_30_34th_l,
        jmlh_pas_hidup_mati_umur_gen_30_34th_p : req.body.jmlh_pas_hidup_mati_umur_gen_30_34th_p,
        jmlh_pas_hidup_mati_umur_gen_35_39th_l : req.body.jmlh_pas_hidup_mati_umur_gen_35_39th_l,
        jmlh_pas_hidup_mati_umur_gen_35_39th_p : req.body.jmlh_pas_hidup_mati_umur_gen_35_39th_p,
        jmlh_pas_hidup_mati_umur_gen_40_44th_l : req.body.jmlh_pas_hidup_mati_umur_gen_40_44th_l,
        jmlh_pas_hidup_mati_umur_gen_40_44th_p : req.body.jmlh_pas_hidup_mati_umur_gen_40_44th_p,
        jmlh_pas_hidup_mati_umur_gen_45_49th_l : req.body.jmlh_pas_hidup_mati_umur_gen_45_49th_l,
        jmlh_pas_hidup_mati_umur_gen_45_49th_p : req.body.jmlh_pas_hidup_mati_umur_gen_45_49th_p,
        jmlh_pas_hidup_mati_umur_gen_50_54th_l : req.body.jmlh_pas_hidup_mati_umur_gen_50_54th_l,
        jmlh_pas_hidup_mati_umur_gen_50_54th_p : req.body.jmlh_pas_hidup_mati_umur_gen_50_54th_p,
        jmlh_pas_hidup_mati_umur_gen_55_59th_l : req.body.jmlh_pas_hidup_mati_umur_gen_55_59th_l,
        jmlh_pas_hidup_mati_umur_gen_55_59th_p : req.body.jmlh_pas_hidup_mati_umur_gen_55_59th_p,
        jmlh_pas_hidup_mati_umur_gen_60_64th_l : req.body.jmlh_pas_hidup_mati_umur_gen_60_64th_l,
        jmlh_pas_hidup_mati_umur_gen_60_64th_p : req.body.jmlh_pas_hidup_mati_umur_gen_60_64th_p,
        jmlh_pas_hidup_mati_umur_gen_65_69th_l : req.body.jmlh_pas_hidup_mati_umur_gen_65_69th_l,
        jmlh_pas_hidup_mati_umur_gen_65_69th_p : req.body.jmlh_pas_hidup_mati_umur_gen_65_69th_p,
        jmlh_pas_hidup_mati_umur_gen_70_74th_l : req.body.jmlh_pas_hidup_mati_umur_gen_70_74th_l,
        jmlh_pas_hidup_mati_umur_gen_70_74th_p : req.body.jmlh_pas_hidup_mati_umur_gen_70_74th_p,
        jmlh_pas_hidup_mati_umur_gen_75_79th_l : req.body.jmlh_pas_hidup_mati_umur_gen_75_79th_l,
        jmlh_pas_hidup_mati_umur_gen_75_79th_p : req.body.jmlh_pas_hidup_mati_umur_gen_75_79th_p,
        jmlh_pas_hidup_mati_umur_gen_80_84th_l : req.body.jmlh_pas_hidup_mati_umur_gen_80_84th_l,
        jmlh_pas_hidup_mati_umur_gen_80_84th_p : req.body.jmlh_pas_hidup_mati_umur_gen_80_84th_p,
        jmlh_pas_hidup_mati_umur_gen_lebih85th_l : req.body.jmlh_pas_hidup_mati_umur_gen_lebih85th_l,
        jmlh_pas_hidup_mati_umur_gen_lebih85th_p : req.body.jmlh_pas_hidup_mati_umur_gen_lebih85th_p,
        jmlh_pas_hidup_mati_gen_l : jumlahL,
        jmlh_pas_hidup_mati_gen_p : jumlahP,
        total_pas_hidup_mati : jumlahall,
        jmlh_pas_keluar_mati_gen_l : req.body.jmlh_pas_keluar_mati_gen_l,
        jmlh_pas_keluar_mati_gen_p : req.body.jmlh_pas_keluar_mati_gen_p,
        total_pas_keluar_mati : totalKeluar,
    };
    transaction = await databaseSIRS.transaction();
    if (totalKeluar<=jumlahall) {
     const update = await rlEmpatTitikSatuDetail.update(dataUpdate, {
        where: {
          id: req.params.id, 
          rs_id : req.user.satKerId
        },
      });
      if (update[0] != 0) {
        await transaction.commit();
        res.status(201).send({
          status: true,
          message: "Data Diperbaharui",
        });
      } else {
        await transaction.rollback();
        res.status(400).send({
          status: false,
          message: "Data Tidak Berhasil di Ubah",
        });
      }
    } else {
      await transaction.rollback();
      res.status(400).send({
        status: false,
        message: "Data Jumlah Pasien Mati Lebih Dari Jumlah Pasien Hidup/Mati",
      });
    }
  } catch (error) {
    await transaction.rollback();
    res.status(400).send({
      status: false,
      message: error,
    });
  }
};

export const deleteDataRLEmpatTitikSatu = async (req, res) => {
  let transaction;
  try {
    transaction = await databaseSIRS.transaction();
    const count = await rlEmpatTitikSatuDetail.destroy({
      where: {
        id: req.params.id, rs_id : req.user.satKerId
      },
    });
    if (count != 0) {
      await transaction.commit();
      res.status(201).send({
        status: true,
        message: "Data Berhasil di Hapus",
        data: {
          deleted_rows: count,
        },
      });
    } else {
      await transaction.rollback();
      res.status(404).send({
        status: false,
        message: "Data Tidak Berhasil di Hapus",
      });
    }
  } catch (error) {
    await transaction.rollback();
    res.status(404).send({
      status: false,
      message: error,
    });
  }
};


// export const getRLEmpatTitikDua = (req, res) => {
//   const joi = Joi.extend(joiDate) 
//   const schema = joi.object({
//     rsId: joi.string().required(),
//     periode: joi.date().format("YYYY-MM").required(),
//     page: joi.number(),
//     limit: joi.number()
// })

//   const { error, value } =  schema.validate(req.query)

//   if (error) {
//       res.status(400).send({
//           status: false,
//           message: error.details[0].message
//       })
//       return
//   }
//   if(req.user.jenisUserId == 4){
//     if(req.query.rsId != req.user.satKerId){
//       res.status(404).send({
//         status: false,
//         message: "Kode RS Tidak Sesuai",
//       });
//       return;
//     }
//   }

//   req.query.periode = req.query.periode+'-01'

//   get42(req, (err, results) => {
//       // console.log(results)
//       const message = results.length ? 'data found' : 'data not found'
//       res.status(200).send({
//           status: true,
//           message: message,
//           data: results
//       })
//   })
// }

// export const getRLEmpatTitikTiga = (req, res) => {
//   const joi = Joi.extend(joiDate) 

//   const schema = joi.object({
//     rsId: joi.string().required(),
//     periode: joi.date().format("YYYY-MM").required(),
// })
//   const { error, value } =  schema.validate(req.query)

//   if (error) {
//       res.status(400).send({
//           status: false,
//           message: error.details[0].message
//       })
//       return
//   }

//   if(req.user.jenisUserId == 4){
//     if(req.query.rsId != req.user.satKerId){
//       res.status(404).send({
//         status: false,
//         message: "Kode RS Tidak Sesuai",
//       });
//       return;
//     }
//   }

  
//   req.query.periode = req.query.periode+'-01'

//   get43(req, (err, results) => {
//       // console.log(req.user)
//       const message = results.length ? 'data found' : 'data not found'
//       res.status(200).send({
//           status: true,
//           message: message,
//           data: results
//       })
//   })
// }
