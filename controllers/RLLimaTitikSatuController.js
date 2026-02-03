import { databaseSIRS } from "../config/Database.js";
import Joi from "joi";
import { IcdRLLimaTitikSatu } from "../models/IcdRLLimaTitikSatuModel.js";
import joiDate from "@joi/date";
import {
  rlLimaTitikSatuDetail,
  rlLimaTitikSatuHeader,
  rlLimaTitikSatuSatuSehat
} from "../models/RLLimaTitikSatuModel.js";
import { satu_sehat_id, users_sso } from "../models/UserModel.js";
import axios from "axios";
import dotenv from "dotenv";
import { AgeGroups } from "../models/AgeGroups.js";
import { Op } from "sequelize";
import { icd } from "../models/ICDModel.js";
dotenv.config();

export const getDataRLLimaTitikSatu = (req, res) => {
  const joi = Joi.extend(joiDate);
  const schema = joi.object({
    rsId: joi.string().required(),
    periode: joi.date().format("YYYY-M").required(),
    page: joi.number(),
    limit: joi.number(),
  });
  const { error, value } = schema.validate(req.query);
  if (error) {
    res.status(404).send({
      status: false,
      message: error.details[0].message,
    });
    return;
  }
  let whereClause = {};
  if (req.user.jenisUserId == 4) {
    if (req.query.rsId != req.user.satKerId) {
      res.status(404).send({
        status: false,
        message: "Kode RS Tidak Sesuai",
      });
      return;
    }
    whereClause = {
      rs_id: req.user.satKerId,
      periode: req.query.periode,
    };
  } else {
    whereClause = {
      rs_id: req.query.rsId,
      periode: req.query.periode,
    };
  }

  rlLimaTitikSatuDetail
    .findAll({
      include: {
        model: IcdRLLimaTitikSatu,
        attributes: [
          "icd_code",
          "description_code",
          "icd_code_group",
          "description_code_group",
        ],
      },
      where: whereClause,
      raw: true,
      nest: true,
    })
    .then((results) => {
      // const plainResults = results.map(r => r.toJSON()); // <-- ini penting
      const jsonString = JSON.stringify(results);
      const size = Buffer.byteLength(jsonString, 'utf8');

      res.status(200).send({
        status: true,
        message: "data found",
        length: results.length,
        size_bytes: size,
        size_kb: (size / 1024).toFixed(2),
        size_mb: (size / (1024 * 1024)).toFixed(2),
        data: results, // <-- kirim plain object
      });
    })
    .catch((err) => {
      console.error("SEQUELIZE ERROR:", err); // <-- log error ke console
      res.status(422).send({
        status: false,
        message: err,
      });
      return;
    });
};

export const getDataRLLimaTitikSatuById = (req, res) => {
  rlLimaTitikSatuDetail
    .findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: IcdRLLimaTitikSatu,
        attributes: [
          "icd_code",
          "description_code",
          "icd_code_group",
          "description_code_group",
        ],
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

export const insertdataRLLimaTitikSatu = async (req, res) => {
  const schema = Joi.object({
    periodeBulan: Joi.number().greater(0).less(13).required(),
    periodeTahun: Joi.number().greater(2022).required(),
    data: Joi.array()
      .items(
        Joi.object()
          .keys({
            icdId: Joi.number().required(),
            jumlah_L_dibawah_1_jam: Joi.number().min(0).required(),
            jumlah_P_dibawah_1_jam: Joi.number().min(0).required(),
            jumlah_L_1_sampai_23_jam: Joi.number().min(0).required(),
            jumlah_P_1_sampai_23_jam: Joi.number().min(0).required(),
            jumlah_L_1_sampai_7_hari: Joi.number().min(0).required(),
            jumlah_P_1_sampai_7_hari: Joi.number().min(0).required(),
            jumlah_L_8_sampai_28_hari: Joi.number().min(0).required(),
            jumlah_P_8_sampai_28_hari: Joi.number().min(0).required(),
            jumlah_L_29_hari_sampai_dibawah_3_bulan: Joi.number()
              .min(0)
              .required(),
            jumlah_P_29_hari_sampai_dibawah_3_bulan: Joi.number()
              .min(0)
              .required(),
            jumlah_L_3_bulan_sampai_dibawah_6_bulan: Joi.number()
              .min(0)
              .required(),
            jumlah_P_3_bulan_sampai_dibawah_6_bulan: Joi.number()
              .min(0)
              .required(),
            jumlah_L_6_bulan_sampai_11_bulan: Joi.number().min(0).required(),
            jumlah_P_6_bulan_sampai_11_bulan: Joi.number().min(0).required(),
            jumlah_L_1_sampai_4_tahun: Joi.number().min(0).required(),
            jumlah_P_1_sampai_4_tahun: Joi.number().min(0).required(),
            jumlah_L_5_sampai_9_tahun: Joi.number().min(0).required(),
            jumlah_P_5_sampai_9_tahun: Joi.number().min(0).required(),
            jumlah_L_10_sampai_14_tahun: Joi.number().min(0).required(),
            jumlah_P_10_sampai_14_tahun: Joi.number().min(0).required(),
            jumlah_L_15_sampai_19_tahun: Joi.number().min(0).required(),
            jumlah_P_15_sampai_19_tahun: Joi.number().min(0).required(),
            jumlah_L_20_sampai_24_tahun: Joi.number().min(0).required(),
            jumlah_P_20_sampai_24_tahun: Joi.number().min(0).required(),
            jumlah_L_25_sampai_29_tahun: Joi.number().min(0).required(),
            jumlah_P_25_sampai_29_tahun: Joi.number().min(0).required(),
            jumlah_L_30_sampai_34_tahun: Joi.number().min(0).required(),
            jumlah_P_30_sampai_34_tahun: Joi.number().min(0).required(),
            jumlah_L_35_sampai_39_tahun: Joi.number().min(0).required(),
            jumlah_P_35_sampai_39_tahun: Joi.number().min(0).required(),
            jumlah_L_40_sampai_44_tahun: Joi.number().min(0).required(),
            jumlah_P_40_sampai_44_tahun: Joi.number().min(0).required(),
            jumlah_L_45_sampai_49_tahun: Joi.number().min(0).required(),
            jumlah_P_45_sampai_49_tahun: Joi.number().min(0).required(),
            jumlah_L_50_sampai_54_tahun: Joi.number().min(0).required(),
            jumlah_P_50_sampai_54_tahun: Joi.number().min(0).required(),
            jumlah_L_55_sampai_59_tahun: Joi.number().min(0).required(),
            jumlah_P_55_sampai_59_tahun: Joi.number().min(0).required(),
            jumlah_L_60_sampai_64_tahun: Joi.number().min(0).required(),
            jumlah_P_60_sampai_64_tahun: Joi.number().min(0).required(),
            jumlah_L_65_sampai_69_tahun: Joi.number().min(0).required(),
            jumlah_P_65_sampai_69_tahun: Joi.number().min(0).required(),
            jumlah_L_70_sampai_74_tahun: Joi.number().min(0).required(),
            jumlah_P_70_sampai_74_tahun: Joi.number().min(0).required(),
            jumlah_L_75_sampai_79_tahun: Joi.number().min(0).required(),
            jumlah_P_75_sampai_79_tahun: Joi.number().min(0).required(),
            jumlah_L_80_sampai_84_tahun: Joi.number().min(0).required(),
            jumlah_P_80_sampai_84_tahun: Joi.number().min(0).required(),
            jumlah_L_diatas_85_tahun: Joi.number().min(0).required(),
            jumlah_P_diatas_85_tahun: Joi.number().min(0).required(),
            jumlah_kunjungan_L: Joi.number().min(0).required(),
            jumlah_kunjungan_P: Joi.number().min(0).required(),
          })
          .required()
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
    const periode =
      String(req.body.periodeTahun) +
      "-" +
      String(req.body.periodeBulan) +
      "-1";

    transaction = await databaseSIRS.transaction();
    const resultInsertHeader = await rlLimaTitikSatuHeader.create(
      {
        rs_id: req.user.satKerId,
        periode: periode,
        user_id: req.user.id,
      },
      { transaction }
    );

    const dataDetail = req.body.data.map((value, index) => {
      let totalL =
        value.jumlah_L_dibawah_1_jam +
        value.jumlah_L_1_sampai_23_jam +
        value.jumlah_L_1_sampai_7_hari +
        value.jumlah_L_8_sampai_28_hari +
        value.jumlah_L_29_hari_sampai_dibawah_3_bulan +
        value.jumlah_L_3_bulan_sampai_dibawah_6_bulan +
        value.jumlah_L_6_bulan_sampai_11_bulan +
        value.jumlah_L_1_sampai_4_tahun +
        value.jumlah_L_5_sampai_9_tahun +
        value.jumlah_L_10_sampai_14_tahun +
        value.jumlah_L_15_sampai_19_tahun +
        value.jumlah_L_20_sampai_24_tahun +
        value.jumlah_L_25_sampai_29_tahun +
        value.jumlah_L_30_sampai_34_tahun +
        value.jumlah_L_35_sampai_39_tahun +
        value.jumlah_L_40_sampai_44_tahun +
        value.jumlah_L_45_sampai_49_tahun +
        value.jumlah_L_50_sampai_54_tahun +
        value.jumlah_L_55_sampai_59_tahun +
        value.jumlah_L_60_sampai_64_tahun +
        value.jumlah_L_65_sampai_69_tahun +
        value.jumlah_L_70_sampai_74_tahun +
        value.jumlah_L_75_sampai_79_tahun +
        value.jumlah_L_80_sampai_84_tahun +
        value.jumlah_L_diatas_85_tahun;

      let totalP =
        value.jumlah_P_dibawah_1_jam +
        value.jumlah_P_1_sampai_23_jam +
        value.jumlah_P_1_sampai_7_hari +
        value.jumlah_P_8_sampai_28_hari +
        value.jumlah_P_29_hari_sampai_dibawah_3_bulan +
        value.jumlah_P_3_bulan_sampai_dibawah_6_bulan +
        value.jumlah_P_6_bulan_sampai_11_bulan +
        value.jumlah_P_1_sampai_4_tahun +
        value.jumlah_P_5_sampai_9_tahun +
        value.jumlah_P_10_sampai_14_tahun +
        value.jumlah_P_15_sampai_19_tahun +
        value.jumlah_P_20_sampai_24_tahun +
        value.jumlah_P_25_sampai_29_tahun +
        value.jumlah_P_30_sampai_34_tahun +
        value.jumlah_P_35_sampai_39_tahun +
        value.jumlah_P_40_sampai_44_tahun +
        value.jumlah_P_45_sampai_49_tahun +
        value.jumlah_P_50_sampai_54_tahun +
        value.jumlah_P_55_sampai_59_tahun +
        value.jumlah_P_60_sampai_64_tahun +
        value.jumlah_P_65_sampai_69_tahun +
        value.jumlah_P_70_sampai_74_tahun +
        value.jumlah_P_75_sampai_79_tahun +
        value.jumlah_P_80_sampai_84_tahun +
        value.jumlah_P_diatas_85_tahun;

      let total = totalL + totalP;

      let totalkunjungan = value.jumlah_kunjungan_L + value.jumlah_kunjungan_P;

      return {
        rl_lima_titik_satu_id: resultInsertHeader.id,
        rs_id: req.user.satKerId,
        periode: periode,
        icd_id: value.icdId,
        jumlah_L_dibawah_1_jam: value.jumlah_L_dibawah_1_jam,
        jumlah_P_dibawah_1_jam: value.jumlah_P_dibawah_1_jam,
        jumlah_L_1_sampai_23_jam: value.jumlah_L_1_sampai_23_jam,
        jumlah_P_1_sampai_23_jam: value.jumlah_P_1_sampai_23_jam,
        jumlah_L_1_sampai_7_hari: value.jumlah_L_1_sampai_7_hari,
        jumlah_P_1_sampai_7_hari: value.jumlah_P_1_sampai_7_hari,
        jumlah_L_8_sampai_28_hari: value.jumlah_L_8_sampai_28_hari,
        jumlah_P_8_sampai_28_hari: value.jumlah_P_8_sampai_28_hari,
        jumlah_L_29_hari_sampai_dibawah_3_bulan:
          value.jumlah_L_29_hari_sampai_dibawah_3_bulan,
        jumlah_P_29_hari_sampai_dibawah_3_bulan:
          value.jumlah_P_29_hari_sampai_dibawah_3_bulan,
        jumlah_L_3_bulan_sampai_dibawah_6_bulan:
          value.jumlah_L_3_bulan_sampai_dibawah_6_bulan,
        jumlah_P_3_bulan_sampai_dibawah_6_bulan:
          value.jumlah_P_3_bulan_sampai_dibawah_6_bulan,
        jumlah_L_6_bulan_sampai_11_bulan:
          value.jumlah_L_6_bulan_sampai_11_bulan,
        jumlah_P_6_bulan_sampai_11_bulan:
          value.jumlah_P_6_bulan_sampai_11_bulan,
        jumlah_L_1_sampai_4_tahun: value.jumlah_L_1_sampai_4_tahun,
        jumlah_P_1_sampai_4_tahun: value.jumlah_P_1_sampai_4_tahun,
        jumlah_L_5_sampai_9_tahun: value.jumlah_L_5_sampai_9_tahun,
        jumlah_P_5_sampai_9_tahun: value.jumlah_P_5_sampai_9_tahun,
        jumlah_L_10_sampai_14_tahun: value.jumlah_L_10_sampai_14_tahun,
        jumlah_P_10_sampai_14_tahun: value.jumlah_P_10_sampai_14_tahun,
        jumlah_L_15_sampai_19_tahun: value.jumlah_L_15_sampai_19_tahun,
        jumlah_P_15_sampai_19_tahun: value.jumlah_P_15_sampai_19_tahun,
        jumlah_L_20_sampai_24_tahun: value.jumlah_L_20_sampai_24_tahun,
        jumlah_P_20_sampai_24_tahun: value.jumlah_P_20_sampai_24_tahun,
        jumlah_L_25_sampai_29_tahun: value.jumlah_L_25_sampai_29_tahun,
        jumlah_P_25_sampai_29_tahun: value.jumlah_P_25_sampai_29_tahun,
        jumlah_L_30_sampai_34_tahun: value.jumlah_L_30_sampai_34_tahun,
        jumlah_P_30_sampai_34_tahun: value.jumlah_P_30_sampai_34_tahun,
        jumlah_L_35_sampai_39_tahun: value.jumlah_L_35_sampai_39_tahun,
        jumlah_P_35_sampai_39_tahun: value.jumlah_P_35_sampai_39_tahun,
        jumlah_L_40_sampai_44_tahun: value.jumlah_L_40_sampai_44_tahun,
        jumlah_P_40_sampai_44_tahun: value.jumlah_P_40_sampai_44_tahun,
        jumlah_L_45_sampai_49_tahun: value.jumlah_L_45_sampai_49_tahun,
        jumlah_P_45_sampai_49_tahun: value.jumlah_P_45_sampai_49_tahun,
        jumlah_L_50_sampai_54_tahun: value.jumlah_L_50_sampai_54_tahun,
        jumlah_P_50_sampai_54_tahun: value.jumlah_P_50_sampai_54_tahun,
        jumlah_L_55_sampai_59_tahun: value.jumlah_L_55_sampai_59_tahun,
        jumlah_P_55_sampai_59_tahun: value.jumlah_P_55_sampai_59_tahun,
        jumlah_L_60_sampai_64_tahun: value.jumlah_L_60_sampai_64_tahun,
        jumlah_P_60_sampai_64_tahun: value.jumlah_P_60_sampai_64_tahun,
        jumlah_L_65_sampai_69_tahun: value.jumlah_L_65_sampai_69_tahun,
        jumlah_P_65_sampai_69_tahun: value.jumlah_P_65_sampai_69_tahun,
        jumlah_L_70_sampai_74_tahun: value.jumlah_L_70_sampai_74_tahun,
        jumlah_P_70_sampai_74_tahun: value.jumlah_P_70_sampai_74_tahun,
        jumlah_L_75_sampai_79_tahun: value.jumlah_L_75_sampai_79_tahun,
        jumlah_P_75_sampai_79_tahun: value.jumlah_P_75_sampai_79_tahun,
        jumlah_L_80_sampai_84_tahun: value.jumlah_L_80_sampai_84_tahun,
        jumlah_P_80_sampai_84_tahun: value.jumlah_P_80_sampai_84_tahun,
        jumlah_L_diatas_85_tahun: value.jumlah_L_diatas_85_tahun,
        jumlah_P_diatas_85_tahun: value.jumlah_P_diatas_85_tahun,
        jumlah_kasus_baru_L: totalL,
        jumlah_kasus_baru_P: totalP,
        total_kasus_baru: total,
        jumlah_kunjungan_L: value.jumlah_kunjungan_L,
        jumlah_kunjungan_P: value.jumlah_kunjungan_P,
        total_jumlah_kunjungan: totalkunjungan,
        user_id: req.user.id,
      };
    });

    if (
      dataDetail[0].total_kasus_baru <= dataDetail[0].total_jumlah_kunjungan
    ) {
      if (
        dataDetail[0].jumlah_kasus_baru_L <= dataDetail[0].jumlah_kunjungan_L
      ) {
        if (
          dataDetail[0].jumlah_kasus_baru_P <= dataDetail[0].jumlah_kunjungan_P
        ) {
          try {
            const resultInsertDetail = await rlLimaTitikSatuDetail.bulkCreate(
              dataDetail,
              {
                transaction,
                updateOnDuplicate: [
                  "rl_lima_titik_satu_id",
                  "jumlah_L_dibawah_1_jam",
                  "jumlah_P_dibawah_1_jam",
                  "jumlah_L_1_sampai_23_jam",
                  "jumlah_P_1_sampai_23_jam",
                  "jumlah_L_1_sampai_7_hari",
                  "jumlah_P_1_sampai_7_hari",
                  "jumlah_L_8_sampai_28_hari",
                  "jumlah_P_8_sampai_28_hari",
                  "jumlah_L_29_hari_sampai_dibawah_3_bulan",
                  "jumlah_P_29_hari_sampai_dibawah_3_bulan",
                  "jumlah_L_3_bulan_sampai_dibawah_6_bulan",
                  "jumlah_P_3_bulan_sampai_dibawah_6_bulan",
                  "jumlah_L_6_bulan_sampai_11_bulan",
                  "jumlah_P_6_bulan_sampai_11_bulan",
                  "jumlah_L_1_sampai_4_tahun",
                  "jumlah_P_1_sampai_4_tahun",
                  "jumlah_L_5_sampai_9_tahun",
                  "jumlah_P_5_sampai_9_tahun",
                  "jumlah_L_10_sampai_14_tahun",
                  "jumlah_P_10_sampai_14_tahun",
                  "jumlah_L_15_sampai_19_tahun",
                  "jumlah_P_15_sampai_19_tahun",
                  "jumlah_L_20_sampai_24_tahun",
                  "jumlah_P_20_sampai_24_tahun",
                  "jumlah_L_25_sampai_29_tahun",
                  "jumlah_P_25_sampai_29_tahun",
                  "jumlah_L_30_sampai_34_tahun",
                  "jumlah_P_30_sampai_34_tahun",
                  "jumlah_L_35_sampai_39_tahun",
                  "jumlah_P_35_sampai_39_tahun",
                  "jumlah_L_40_sampai_44_tahun",
                  "jumlah_P_40_sampai_44_tahun",
                  "jumlah_L_45_sampai_49_tahun",
                  "jumlah_P_45_sampai_49_tahun",
                  "jumlah_L_50_sampai_54_tahun",
                  "jumlah_P_50_sampai_54_tahun",
                  "jumlah_L_55_sampai_59_tahun",
                  "jumlah_P_55_sampai_59_tahun",
                  "jumlah_L_60_sampai_64_tahun",
                  "jumlah_P_60_sampai_64_tahun",
                  "jumlah_L_65_sampai_69_tahun",
                  "jumlah_P_65_sampai_69_tahun",
                  "jumlah_L_70_sampai_74_tahun",
                  "jumlah_P_70_sampai_74_tahun",
                  "jumlah_L_75_sampai_79_tahun",
                  "jumlah_P_75_sampai_79_tahun",
                  "jumlah_L_80_sampai_84_tahun",
                  "jumlah_P_80_sampai_84_tahun",
                  "jumlah_L_diatas_85_tahun",
                  "jumlah_P_diatas_85_tahun",
                  "jumlah_kasus_baru_L",
                  "jumlah_kasus_baru_P",
                  "total_kasus_baru",
                  "jumlah_kunjungan_L",
                  "jumlah_kunjungan_P",
                  "total_jumlah_kunjungan",
                ],
              }
            );
            await transaction.commit();
            res.status(201).send({
              status: true,
              message: "data created",
              data: {
                id: resultInsertHeader.id,
              },
            });
          } catch (error) {
            res.status(400).send({
              status: false,
              message: "Gagal Input Data.",
            });
            console.log(error);
            await transaction.rollback();
          }
        } else {
          res.status(400).send({
            status: false,
            message:
              "Data Jumlah Kasus Baru Perempuan Lebih Dari Jumlah Kunjungan Pasien Perempuan",
          });
          await transaction.rollback();
        }
      } else {
        res.status(400).send({
          status: false,
          message:
            "Data Jumlah Kasus Baru Laki - Laki Lebih Dari Jumlah Kunjungan Pasien Laki Laki",
        });
        await transaction.rollback();
      }
    } else {
      res.status(400).send({
        status: false,
        message: "Data Jumlah Kasus Baru Lebih Dari Jumlah Kunjungan",
      });
      await transaction.rollback();
    }
  } catch (error) {
    if (transaction) {
      if (error.name == "SequelizeForeignKeyConstraintError") {
        res.status(400).send({
          status: false,
          message: "Gagal Input Data, Jenis Kegiatan Salah.",
        });
      } else {
        res.status(400).send({
          status: false,
          message: "Gagal Input Data.",
        });
      }
      await transaction.rollback();
    }
  }
};

export const updateDataRLLimaTitikSatu = async (req, res) => {
  const schema = Joi.object({
    jumlah_L_dibawah_1_jam: Joi.number().min(0).required(),
    jumlah_P_dibawah_1_jam: Joi.number().min(0).required(),
    jumlah_L_1_sampai_23_jam: Joi.number().min(0).required(),
    jumlah_P_1_sampai_23_jam: Joi.number().min(0).required(),
    jumlah_L_1_sampai_7_hari: Joi.number().min(0).required(),
    jumlah_P_1_sampai_7_hari: Joi.number().min(0).required(),
    jumlah_L_8_sampai_28_hari: Joi.number().min(0).required(),
    jumlah_P_8_sampai_28_hari: Joi.number().min(0).required(),
    jumlah_L_29_hari_sampai_dibawah_3_bulan: Joi.number().min(0).required(),
    jumlah_P_29_hari_sampai_dibawah_3_bulan: Joi.number().min(0).required(),
    jumlah_L_3_bulan_sampai_dibawah_6_bulan: Joi.number().min(0).required(),
    jumlah_P_3_bulan_sampai_dibawah_6_bulan: Joi.number().min(0).required(),
    jumlah_L_6_bulan_sampai_11_bulan: Joi.number().min(0).required(),
    jumlah_P_6_bulan_sampai_11_bulan: Joi.number().min(0).required(),
    jumlah_L_1_sampai_4_tahun: Joi.number().min(0).required(),
    jumlah_P_1_sampai_4_tahun: Joi.number().min(0).required(),
    jumlah_L_5_sampai_9_tahun: Joi.number().min(0).required(),
    jumlah_P_5_sampai_9_tahun: Joi.number().min(0).required(),
    jumlah_L_10_sampai_14_tahun: Joi.number().min(0).required(),
    jumlah_P_10_sampai_14_tahun: Joi.number().min(0).required(),
    jumlah_L_15_sampai_19_tahun: Joi.number().min(0).required(),
    jumlah_P_15_sampai_19_tahun: Joi.number().min(0).required(),
    jumlah_L_20_sampai_24_tahun: Joi.number().min(0).required(),
    jumlah_P_20_sampai_24_tahun: Joi.number().min(0).required(),
    jumlah_L_25_sampai_29_tahun: Joi.number().min(0).required(),
    jumlah_P_25_sampai_29_tahun: Joi.number().min(0).required(),
    jumlah_L_30_sampai_34_tahun: Joi.number().min(0).required(),
    jumlah_P_30_sampai_34_tahun: Joi.number().min(0).required(),
    jumlah_L_35_sampai_39_tahun: Joi.number().min(0).required(),
    jumlah_P_35_sampai_39_tahun: Joi.number().min(0).required(),
    jumlah_L_40_sampai_44_tahun: Joi.number().min(0).required(),
    jumlah_P_40_sampai_44_tahun: Joi.number().min(0).required(),
    jumlah_L_45_sampai_49_tahun: Joi.number().min(0).required(),
    jumlah_P_45_sampai_49_tahun: Joi.number().min(0).required(),
    jumlah_L_50_sampai_54_tahun: Joi.number().min(0).required(),
    jumlah_P_50_sampai_54_tahun: Joi.number().min(0).required(),
    jumlah_L_55_sampai_59_tahun: Joi.number().min(0).required(),
    jumlah_P_55_sampai_59_tahun: Joi.number().min(0).required(),
    jumlah_L_60_sampai_64_tahun: Joi.number().min(0).required(),
    jumlah_P_60_sampai_64_tahun: Joi.number().min(0).required(),
    jumlah_L_65_sampai_69_tahun: Joi.number().min(0).required(),
    jumlah_P_65_sampai_69_tahun: Joi.number().min(0).required(),
    jumlah_L_70_sampai_74_tahun: Joi.number().min(0).required(),
    jumlah_P_70_sampai_74_tahun: Joi.number().min(0).required(),
    jumlah_L_75_sampai_79_tahun: Joi.number().min(0).required(),
    jumlah_P_75_sampai_79_tahun: Joi.number().min(0).required(),
    jumlah_L_80_sampai_84_tahun: Joi.number().min(0).required(),
    jumlah_P_80_sampai_84_tahun: Joi.number().min(0).required(),
    jumlah_L_diatas_85_tahun: Joi.number().min(0).required(),
    jumlah_P_diatas_85_tahun: Joi.number().min(0).required(),
    jumlah_kunjungan_L: Joi.number().min(0).required(),
    jumlah_kunjungan_P: Joi.number().min(0).required(),
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
    let totalL =
      req.body.jumlah_L_dibawah_1_jam +
      req.body.jumlah_L_1_sampai_23_jam +
      req.body.jumlah_L_1_sampai_7_hari +
      req.body.jumlah_L_8_sampai_28_hari +
      req.body.jumlah_L_29_hari_sampai_dibawah_3_bulan +
      req.body.jumlah_L_3_bulan_sampai_dibawah_6_bulan +
      req.body.jumlah_L_6_bulan_sampai_11_bulan +
      req.body.jumlah_L_1_sampai_4_tahun +
      req.body.jumlah_L_5_sampai_9_tahun +
      req.body.jumlah_L_10_sampai_14_tahun +
      req.body.jumlah_L_15_sampai_19_tahun +
      req.body.jumlah_L_20_sampai_24_tahun +
      req.body.jumlah_L_25_sampai_29_tahun +
      req.body.jumlah_L_30_sampai_34_tahun +
      req.body.jumlah_L_35_sampai_39_tahun +
      req.body.jumlah_L_40_sampai_44_tahun +
      req.body.jumlah_L_45_sampai_49_tahun +
      req.body.jumlah_L_50_sampai_54_tahun +
      req.body.jumlah_L_55_sampai_59_tahun +
      req.body.jumlah_L_60_sampai_64_tahun +
      req.body.jumlah_L_65_sampai_69_tahun +
      req.body.jumlah_L_70_sampai_74_tahun +
      req.body.jumlah_L_75_sampai_79_tahun +
      req.body.jumlah_L_80_sampai_84_tahun +
      req.body.jumlah_L_diatas_85_tahun;

    let totalP =
      req.body.jumlah_P_dibawah_1_jam +
      req.body.jumlah_P_1_sampai_23_jam +
      req.body.jumlah_P_1_sampai_7_hari +
      req.body.jumlah_P_8_sampai_28_hari +
      req.body.jumlah_P_29_hari_sampai_dibawah_3_bulan +
      req.body.jumlah_P_3_bulan_sampai_dibawah_6_bulan +
      req.body.jumlah_P_6_bulan_sampai_11_bulan +
      req.body.jumlah_P_1_sampai_4_tahun +
      req.body.jumlah_P_5_sampai_9_tahun +
      req.body.jumlah_P_10_sampai_14_tahun +
      req.body.jumlah_P_15_sampai_19_tahun +
      req.body.jumlah_P_20_sampai_24_tahun +
      req.body.jumlah_P_25_sampai_29_tahun +
      req.body.jumlah_P_30_sampai_34_tahun +
      req.body.jumlah_P_35_sampai_39_tahun +
      req.body.jumlah_P_40_sampai_44_tahun +
      req.body.jumlah_P_45_sampai_49_tahun +
      req.body.jumlah_P_50_sampai_54_tahun +
      req.body.jumlah_P_55_sampai_59_tahun +
      req.body.jumlah_P_60_sampai_64_tahun +
      req.body.jumlah_P_65_sampai_69_tahun +
      req.body.jumlah_P_70_sampai_74_tahun +
      req.body.jumlah_P_75_sampai_79_tahun +
      req.body.jumlah_P_80_sampai_84_tahun +
      req.body.jumlah_P_diatas_85_tahun;

    let total = totalL + totalP;

    let totalkunjungan =
      req.body.jumlah_kunjungan_L + req.body.jumlah_kunjungan_P;

    const dataUpdate = {
      jumlah_L_dibawah_1_jam: req.body.jumlah_L_dibawah_1_jam,
      jumlah_P_dibawah_1_jam: req.body.jumlah_P_dibawah_1_jam,
      jumlah_L_1_sampai_23_jam: req.body.jumlah_L_1_sampai_23_jam,
      jumlah_P_1_sampai_23_jam: req.body.jumlah_P_1_sampai_23_jam,
      jumlah_L_1_sampai_7_hari: req.body.jumlah_L_1_sampai_7_hari,
      jumlah_P_1_sampai_7_hari: req.body.jumlah_P_1_sampai_7_hari,
      jumlah_L_8_sampai_28_hari: req.body.jumlah_L_8_sampai_28_hari,
      jumlah_P_8_sampai_28_hari: req.body.jumlah_P_8_sampai_28_hari,
      jumlah_L_29_hari_sampai_dibawah_3_bulan:
        req.body.jumlah_L_29_hari_sampai_dibawah_3_bulan,
      jumlah_P_29_hari_sampai_dibawah_3_bulan:
        req.body.jumlah_P_29_hari_sampai_dibawah_3_bulan,
      jumlah_L_3_bulan_sampai_dibawah_6_bulan:
        req.body.jumlah_L_3_bulan_sampai_dibawah_6_bulan,
      jumlah_P_3_bulan_sampai_dibawah_6_bulan:
        req.body.jumlah_P_3_bulan_sampai_dibawah_6_bulan,
      jumlah_L_6_bulan_sampai_11_bulan:
        req.body.jumlah_L_6_bulan_sampai_11_bulan,
      jumlah_P_6_bulan_sampai_11_bulan:
        req.body.jumlah_P_6_bulan_sampai_11_bulan,
      jumlah_L_1_sampai_4_tahun: req.body.jumlah_L_1_sampai_4_tahun,
      jumlah_P_1_sampai_4_tahun: req.body.jumlah_P_1_sampai_4_tahun,
      jumlah_L_5_sampai_9_tahun: req.body.jumlah_L_5_sampai_9_tahun,
      jumlah_P_5_sampai_9_tahun: req.body.jumlah_P_5_sampai_9_tahun,
      jumlah_L_10_sampai_14_tahun: req.body.jumlah_L_10_sampai_14_tahun,
      jumlah_P_10_sampai_14_tahun: req.body.jumlah_P_10_sampai_14_tahun,
      jumlah_L_15_sampai_19_tahun: req.body.jumlah_L_15_sampai_19_tahun,
      jumlah_P_15_sampai_19_tahun: req.body.jumlah_P_15_sampai_19_tahun,
      jumlah_L_20_sampai_24_tahun: req.body.jumlah_L_20_sampai_24_tahun,
      jumlah_P_20_sampai_24_tahun: req.body.jumlah_P_20_sampai_24_tahun,
      jumlah_L_25_sampai_29_tahun: req.body.jumlah_L_25_sampai_29_tahun,
      jumlah_P_25_sampai_29_tahun: req.body.jumlah_P_25_sampai_29_tahun,
      jumlah_L_30_sampai_34_tahun: req.body.jumlah_L_30_sampai_34_tahun,
      jumlah_P_30_sampai_34_tahun: req.body.jumlah_P_30_sampai_34_tahun,
      jumlah_L_35_sampai_39_tahun: req.body.jumlah_L_35_sampai_39_tahun,
      jumlah_P_35_sampai_39_tahun: req.body.jumlah_P_35_sampai_39_tahun,
      jumlah_L_40_sampai_44_tahun: req.body.jumlah_L_40_sampai_44_tahun,
      jumlah_P_40_sampai_44_tahun: req.body.jumlah_P_40_sampai_44_tahun,
      jumlah_L_45_sampai_49_tahun: req.body.jumlah_L_45_sampai_49_tahun,
      jumlah_P_45_sampai_49_tahun: req.body.jumlah_P_45_sampai_49_tahun,
      jumlah_L_50_sampai_54_tahun: req.body.jumlah_L_50_sampai_54_tahun,
      jumlah_P_50_sampai_54_tahun: req.body.jumlah_P_50_sampai_54_tahun,
      jumlah_L_55_sampai_59_tahun: req.body.jumlah_L_55_sampai_59_tahun,
      jumlah_P_55_sampai_59_tahun: req.body.jumlah_P_55_sampai_59_tahun,
      jumlah_L_60_sampai_64_tahun: req.body.jumlah_L_60_sampai_64_tahun,
      jumlah_P_60_sampai_64_tahun: req.body.jumlah_P_60_sampai_64_tahun,
      jumlah_L_65_sampai_69_tahun: req.body.jumlah_L_65_sampai_69_tahun,
      jumlah_P_65_sampai_69_tahun: req.body.jumlah_P_65_sampai_69_tahun,
      jumlah_L_70_sampai_74_tahun: req.body.jumlah_L_70_sampai_74_tahun,
      jumlah_P_70_sampai_74_tahun: req.body.jumlah_P_70_sampai_74_tahun,
      jumlah_L_75_sampai_79_tahun: req.body.jumlah_L_75_sampai_79_tahun,
      jumlah_P_75_sampai_79_tahun: req.body.jumlah_P_75_sampai_79_tahun,
      jumlah_L_80_sampai_84_tahun: req.body.jumlah_L_80_sampai_84_tahun,
      jumlah_P_80_sampai_84_tahun: req.body.jumlah_P_80_sampai_84_tahun,
      jumlah_L_diatas_85_tahun: req.body.jumlah_L_diatas_85_tahun,
      jumlah_P_diatas_85_tahun: req.body.jumlah_P_diatas_85_tahun,
      jumlah_kasus_baru_L: totalL,
      jumlah_kasus_baru_P: totalP,
      total_kasus_baru: total,
      jumlah_kunjungan_L: req.body.jumlah_kunjungan_L,
      jumlah_kunjungan_P: req.body.jumlah_kunjungan_P,
      total_jumlah_kunjungan: totalkunjungan,
    };
    transaction = await databaseSIRS.transaction();
    if (total <= totalkunjungan) {
      const update = await rlLimaTitikSatuDetail.update(dataUpdate, {
        where: {
          id: req.params.id,
          rs_id: req.user.satKerId,
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
        message: "Data Jumlah Kasus Baru Lebih Dari Jumlah Kunjungan",
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

export const deleteDataRLLimaTitikSatu = async (req, res) => {
  let transaction;
  try {
    transaction = await databaseSIRS.transaction();
    const count = await rlLimaTitikSatuDetail.destroy({
      where: {
        id: req.params.id,
        rs_id: req.user.satKerId,
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

export const getDataRLLimaTitikSatuSatuSehat = async (req, res) => {
  const joi = Joi.extend(joiDate);
  const schema = joi.object({
    rsId: joi.string().required(),
    periode: joi.date().format("YYYY-MM").required(),
    page: joi.number(),
    limit: joi.number(),
  });

  const { error, value } = schema.validate(req.query);
  if (error) {
    return res.status(404).send({
      status: false,
      message: error.details[0].message,
    });
  }

  if (req.user.jenisUserId == 4) {
    if (req.query.rsId != req.user.satKerId) {
      return res.status(404).send({
        status: false,
        message: "Kode RS Tidak Sesuai",
      });
    }

    // USER RS
    const koders = req.user.satKerId;
    const periodeget = req.query.periode;

    try {
      const satuSehat = await satu_sehat_id.findOne({
        where: { kode_baru_faskes: koders },
        attributes: ["organization_id"],
      });

      if (!satuSehat) {
        return res.status(404).send({
          status: false,
          message: "OrganizationId Tidak Ada",
        });
      }

      const organization_id = satuSehat.organization_id;

      const response = await axios.get(
        `${process.env.SATUSEHAT_BASE_URL}/rl51?month=${periodeget}&organization_id=${organization_id}`,
        {
          headers: {
            "X-API-Key": process.env.SATUSEHAT_API_KEY,
          },
        }
      );
      const records = response.data?.data?.records;
      // // SAVE DATA KE DB
      await saveRecords(records, organization_id, `${periodeget}-01`);

      res.status(200).send({
        status: true,
        message: "Data berhasil diambil dan disimpan",
        // data: responseData,
      });
    } catch (err) {
      console.log(err);
      // Kalau error dari axios (seperti 404)
      if (err.response) {
        const statusCode = err.response.status;
        const errorMessage =
          err.response.data?.message || "Error from external API";
        if (statusCode === 404) {
          return res.status(404).json({
            status: false,
            message: errorMessage,
            detail: "Data tidak ditemukan dari API Satusehat",
          });
        }
        // Untuk error lain dari API
        return res.status(statusCode).json({
          status: false,
          message: errorMessage,
          detail: "Error dari Satusehat",
        });
      }
    }
  } else {
    return res.status(404).send({
      status: false,
      message: "Untuk Dinkes belum bisa menarik data",
    });
  }
};

// fungsi delay pakai Promise agar bisa di-await
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const getDataRLLimaTitikSatuSatuSehatShow = async (req, res) => {
  const joi = Joi.extend(joiDate);
  const schema = joi.object({
    rsId: joi.string().required(),
    periode: joi.date().format("YYYY-MM").required(),
    page: joi.number(),
    limit: joi.number(),
  });
  const { error, value } = schema.validate(req.query);
  if (error) {
    return res.status(404).send({
      status: false,
      message: error.details[0].message,
    });
  }

  let koders;
  let periodeget;

  if (req.user.jenisUserId == 4) {
    if (req.query.rsId != req.user.satKerId) {
      return res.status(404).send({
        status: false,
        message: "Kode RS Tidak Sesuai",
      });
    }

    // USER RS
    koders = req.user.satKerId;
    periodeget = req.query.periode;
  } else {
    // return res.status(404).send({
    //   status: false,
    //   message: "Untuk Dinkes belum bisa menarik data",
    // });

    koders = req.query.rsId;
    periodeget = req.query.periode;
  }

  try {
    const satuSehat = await satu_sehat_id.findOne({
      where: { kode_baru_faskes: koders },
      attributes: ["organization_id"],
    });

    if (!satuSehat) {
      return res.status(404).send({
        status: false,
        message: "OrganizationId Tidak Ada",
      });
    }

    const organization_id = satuSehat.organization_id;

    const result = await rlLimaTitikSatuSatuSehat.findAll({
      where: {
        organization_id: organization_id, // bisa string atau number, sesuaikan tipe data db
        periode: periodeget,
      },
      attributes: [
        "icd_10",
        "diagnosis",
        "periode",
        "male_new_cases",
        "females_new_cases",
        "total_new_cases",
        "male_visits",
        "female_visits",
        "total_visits",
        "age_id",
      ],
      include: [
        {
          model: AgeGroups,
          attributes: ["name"], // alias 'age' nanti bisa rename di client
          required: false,
        },
        {
          model: satu_sehat_id,
          attributes: ["organization_id", "kode_baru_faskes"],
          required: false,
          include: [
            {
              model: users_sso,
              attributes: ["nama", "rs_id"],
              required: false,
            },
          ],
        },
      ],
      order: [
        ["icd_10", "ASC"],
        ["age_id", "ASC"],
      ],
    });

    result.sort((a, b) => {
      if (a.icd_10 === b.icd_10) {
        return a.age_id - b.age_id;
      }
      return a.icd_10.localeCompare(b.icd_10, undefined, { numeric: true });
    });
    // const nestedData = groupByRSandAge(result);
    res.status(200).send({
      status: true,
      message: "data found",
      data: result,
    });
  } catch (err) {
    res.status(422).send({
      status: false,
      message: err,
    });
    return;
  }
};

export const getDataRLLimaTitikSatuSatuSehatShowPaging = async (req, res) => {
  const joi = Joi.extend(joiDate);
  const schema = joi.object({
    rsId: joi.string().required(),
    periode: joi
      .string()
      .pattern(/^\d{4}-\d{2}$/)
      .required(), // format YYYY-MM
    page: joi.number().integer().min(1).default(1),
    limit: joi.number().integer().min(1).max(20).default(20),
  });

  const { error, value } = schema.validate(req.query);
  if (error) {
    return res.status(400).send({
      status: false,
      message: error.details[0].message,
    });
  }

  let koders;
  let periodeget;

  if (req.user.jenisUserId === 4) {
    if (req.query.rsId !== req.user.satKerId) {
      return res.status(403).send({
        status: false,
        message: "Kode RS Tidak Sesuai",
      });
    }
    koders = req.user.satKerId;
    periodeget = req.query.periode;
  } else {
    koders = req.query.rsId;
    periodeget = req.query.periode;
  }

  try {
    const satuSehat = await satu_sehat_id.findOne({
      where: { kode_baru_faskes: koders },
      attributes: ["organization_id"],
    });

    if (!satuSehat) {
      return res.status(404).send({
        status: false,
        message: "OrganizationId Tidak Ada",
      });
    }

    const organization_id = satuSehat.organization_id;
    const page = value.page;
    const limit = value.limit;
    const offset = (page - 1) * limit;

    // 1️⃣ Ambil ICD unik dulu
    const icdList = await rlLimaTitikSatuSatuSehat.findAll({
      where: {
        organization_id,
        periode: periodeget,
      },
      attributes: ["icd_10"],
      group: ["icd_10"],
      order: [["icd_10", "ASC"]],
      limit,
      offset,
      raw: true,
    });

    const icdCodes = icdList.map((item) => item.icd_10);

    if (icdCodes.length === 0) {
      return res.status(200).send({
        status: true,
        message: "data found",
        satu_sehat_id: null,
        data: [],
        pagination: {
          total: 0,
          page,
          limit,
          pages: 0,
        },
      });
    }

    // Hitung total ICD unik untuk pagination
    const totalIcd = await rlLimaTitikSatuSatuSehat.count({
      where: { organization_id, periode: periodeget },
      distinct: true,
      col: "icd_10",
    });

    // 2️⃣ Ambil data lengkap untuk ICD yang terpilih
    const resultRaw = await rlLimaTitikSatuSatuSehat.findAll({
      where: {
        organization_id,
        periode: periodeget,
        icd_10: icdCodes,
      },
      attributes: [
        "icd_10",
        "diagnosis",
        "periode",
        "male_new_cases",
        "females_new_cases",
        "total_new_cases",
        "male_visits",
        "female_visits",
        "total_visits",
        "age_id",
      ],
      include: [
        {
          model: AgeGroups,
          attributes: ["name"],
          required: false,
        },
        {
          model: satu_sehat_id,
          attributes: ["organization_id", "kode_baru_faskes"],
          required: false,
          include: [
            {
              model: users_sso,
              attributes: ["nama", "rs_id"],
              required: false,
            },
          ],
        },
      ],
      order: [
        ["icd_10", "ASC"],
        ["age_id", "ASC"],
      ],
      subQuery: false,
    });

    // Ambil satu_sehat_id dari data pertama (kalau ada)
    const satuSehatData = resultRaw[0]?.satu_sehat_id ?? null;

    // Ubah ke plain object
    const data = resultRaw.map((item) => {
      const plain = item.get({ plain: true });
      delete plain.satu_sehat_id;
      return plain;
    });

    // 3️⃣ Kirim response
    res.status(200).send({
      status: true,
      message: "data found",
      satu_sehat_id: satuSehatData,
      data,
      pagination: {
        total: totalIcd, // total ICD unik
        page,
        limit,
        pages: Math.ceil(totalIcd / limit),
      },
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({
      status: false,
      message: err.message || "internal server error",
    });
  }
};

function groupByRSandAge(data) {
  const rsMap = new Map();

  data.forEach((item) => {
    const orgId = item.satu_sehat_id.organization_id;
    const rsName = item.satu_sehat_id.users_sso.nama;
    const rsId = item.satu_sehat_id.users_sso.rs_id;
    const ageId = item.age_id;
    const ageName = item.age_groups_satusehat.name;

    if (!rsMap.has(orgId)) {
      rsMap.set(orgId, {
        organization_id: orgId,
        rs_id: rsId,
        rs_name: rsName,
        age_groups: new Map(),
      });
    }

    const rs = rsMap.get(orgId);

    if (!rs.age_groups.has(ageId)) {
      rs.age_groups.set(ageId, {
        age_id: ageId,
        age_name: ageName,
        records: [],
      });
    }

    const ageGroup = rs.age_groups.get(ageId);

    ageGroup.records.push({
      icd_10: item.icd_10,
      diagnosis: item.diagnosis,
      periode: item.periode,
      male_new_cases: item.male_new_cases,
      females_new_cases: item.females_new_cases,
      total_new_cases: item.total_new_cases,
      male_visits: item.male_visits,
      female_visits: item.female_visits,
      total_visits: item.total_visits,
    });
  });

  // Convert Map to Array with nested arrays
  return Array.from(rsMap.values()).map((rs) => ({
    organization_id: rs.organization_id,
    rs_id: rs.rs_id,
    rs_name: rs.rs_name,
    age_groups: Array.from(rs.age_groups.values()),
  }));
}

async function saveRecords(records, organization_id, periode) {
  // 1. Load all existing AgeGroups once
  const existingAges = await AgeGroups.findAll();
  const ageMap = new Map(existingAges.map((age) => [age.id, age.name]));

  // 2. Prepare new AgeGroups (if needed)
  const newAgeGroups = [];
  const dataToUpsert = [];

  for (const record of records) {
    for (const newCase of record.new_cases) {
      const age_id = newCase.age_id;
      const age_name = newCase.age_name;

      // Add missing age groups
      if (!ageMap.has(age_id)) {
        newAgeGroups.push({ id: age_id, name: age_name });
        ageMap.set(age_id, age_name);
      }

      const total_new = newCase.male_new_cases + newCase.female_new_cases;

      dataToUpsert.push({
        organization_id,
        periode,
        icd_10: record.icd10,
        age_id: age_id,
        diagnosis: record.diagnosis,
        male_new_cases: newCase.male_new_cases,
        females_new_cases: newCase.female_new_cases,
        total_new_cases: total_new,
        male_visits: record.male_visits,
        female_visits: record.female_visits,
        total_visits: record.total_visits,
      });
    }
  }

  // 3. Bulk insert missing age groups
  if (newAgeGroups.length > 0) {
    await AgeGroups.bulkCreate(newAgeGroups, {
      ignoreDuplicates: true,
    });
  }

  // 4. Bulk upsert records
  if (dataToUpsert.length > 0) {
    await rlLimaTitikSatuSatuSehat.bulkCreate(dataToUpsert, {
      updateOnDuplicate: [
        "diagnosis",
        "male_new_cases",
        "females_new_cases",
        "total_new_cases",
        "male_visits",
        "female_visits",
        "total_visits",
      ],
    });
  }

  // console.log(`✅ ${dataToUpsert.length} records saved/updated`);
}

export const getMasterumursatusehat = async (req, res) => {
  try {
    const data = await AgeGroups.findAll({
      order: [["id", "ASC"]],
    });

    res.status(200).send({
      status: true,
      message: "data found",
      data,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "internal server error",
      error: error.message,
    });
  }
};

function groupByICDandAge(results) {
  const grouped = {};

  for (const item of results) {
    const icd = item.icd_10;

    if (!grouped[icd]) {
      grouped[icd] = {
        icd_10: icd,
        diagnosis: item.diagnosis,
        periode: item.periode,
        records: [],
      };
    }

    grouped[icd].records.push({
      age_id: item.age_id,
      age_name: item.AgeGroup?.name || "-",
      male_new_cases: item.male_new_cases,
      female_new_cases: item.females_new_cases,
      total_new_cases: item.total_new_cases,
      male_visits: item.male_visits,
      female_visits: item.female_visits,
      total_visits: item.total_visits,
    });
  }

  // Ubah object ke array, dan urutkan age_id
  return Object.values(grouped).map((group) => {
    group.records.sort((a, b) => a.age_id - b.age_id);
    return group;
  });
}
