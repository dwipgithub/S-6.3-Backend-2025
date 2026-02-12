import { get } from '../models/AbsensiModel.js'
import Joi from 'joi'
import joiDate from "@joi/date"
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

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

export const getAbsensiNew = async (req, res) => {
  const joi = Joi.extend(joiDate);

  const schema = joi.object({
    provinsiId: joi.string().required(),
    kabKotaId: joi.string().allow("").optional(),
    nama: joi.string().allow("").optional(),
    tahun: joi.string().required(),
  });

  const { error, value } = schema.validate(req.query);

  if (error) {
    res.status(400).send({
      status: false,
      message: error.details[0].message,
    });
    return;
  }

  try {
    const baseUrl = process.env.API_FASKES;
    const username = process.env.username_API_FASKES;
    const password = process.env.password_API_FASKES;

    const loginResponse = await axios.post(
      `${baseUrl}/faskes/login`,
      {
        userName: username,
        password: password,
      },
      {
        headers: { "Content-Type": "application/json" },
      },
    );
    const token =
      loginResponse.data.access_token || loginResponse.data.data.access_token;

    const response = await axios.get(`${baseUrl}/faskes/rumahsakit`, {
      params: {
        provinsiId: value.provinsiId,
        kabKotaId: value.kabKotaId,
        nama: value.nama,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const rsList = response.data.data;

    if (!rsList || rsList.length === 0) {
      return res.status(200).send({
        status: true,
        message: "data not found",
        data: [],
      });
    }

    const rsIds = rsList.map((item) => item.kode);
    req.query.rsId = rsIds.join(";");
    delete req.query.provinsiId;
    delete req.query.kabKotaId;
    delete req.query.nama;

    get(req, (err, results) => {
      const message = results.length ? "data found" : "data not found";

      const data = results.map((result) => {
        const rs = rsList.find((item) => item.kode == result.rs_id);
        return {
          nama_rs: rs ? rs.nama : result.nama_rs,
          provinsi_nama: rs ? rs.provinsiNama : null,
          kab_kota: rs ? rs.kabKotaNama : result.kab_kota,
          ...result,
        };
      });

      res.status(200).send({
        status: true,
        message: message,
        data: data,
      });
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error,
    });
  }
};
