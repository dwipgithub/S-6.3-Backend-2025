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

const generateEmptyTemplate = () => {
  const template = { persentase_pengisian: 0 };
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  // RL 3.1 - 3.10
  ["31", "32", "33", "34", "35", "36", "37", "38", "39", "310"].forEach(
    (rl) => {
      months.forEach((m) => (template[`rl_${rl}_bulan_${m}`] = 0));
    },
  );

  // RL 3.11
  template["rl_311"] = 0;

  // RL 3.12
  months.forEach((m) => (template[`rl_312_bulan_${m}`] = 0));

  // RL 3.13
  template["rl_313"] = 0;

  // RL 3.14
  months.forEach((m) => (template[`rl_314_bulan_${m}`] = 0));

  // RL 3.15 - 3.19
  ["315", "316", "317", "318", "319"].forEach(
    (rl) => (template[`rl_${rl}`] = 0),
  );

  // RL 4.1 - 4.3
  ["41", "42", "43"].forEach((rl) => {
    months.forEach((m) => (template[`rl_${rl}_bulan_${m}`] = 0));
  });

  // RL 5.1 - 5.3
  ["51", "52", "53"].forEach((rl) => {
    months.forEach((m) => (template[`rl_${rl}_bulan_${m}`] = 0));
  });

  return template;
};

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
        page: 1,
        limit: 1000,
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
      const message = rsList.length ? "data found" : "data not found";

      const template = generateEmptyTemplate();

      const data = rsList.map((rs) => {
        const result = results.find((item) => item.rs_id == rs.kode);
        if (result) {
          return {
            nama_rs: rs.nama,
            provinsi_nama: rs.provinsiNama,
            kab_kota: rs.kabKotaNama,
            ...result,
          };
        }
        return {
          rs_id: rs.kode,
          nama_rs: rs.nama,
          provinsi_nama: rs.provinsiNama,
          kab_kota: rs.kabKotaNama,
          ...template,
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
};;
