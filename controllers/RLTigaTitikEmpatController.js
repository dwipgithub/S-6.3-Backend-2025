import { databaseSIRS } from "../config/Database.js";
import {
  rlTigaTitikEmpatHeader,
  rlTigaTitikEmpatDetail,
  jenisPengunjung,
} from "../models/RLTigaTitikEmpatModel.js";
import Joi from "joi";
import { RLTigaTitikEmpatSatusehat } from "../models/RLTigaTitikEmpatModel.js";
import axios from "axios";
import { satu_sehat_id, users_sso } from "../models/UserModel.js";
import joiDate from "@joi/date";

export const getDataRLTigaTitikEmpat = (req, res) => {
  rlTigaTitikEmpatHeader
    .findAll({
      attributes: ["id", "tahun"],
      where: {
        rs_id: req.query.rsId,
        tahun: req.query.tahun,
      },
      include: {
        model: rlTigaTitikEmpatDetail,
        include: {
          model: jenisPengunjung,
        },
      },
      order: [
        [{ model: rlTigaTitikEmpatDetail }, "jenis_pengunjung_id", "ASC"],
      ],
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

export const getDataRLTigaTitikEmpatSatuSehat = async (req, res) => {
  try {
    const periode = req.query.periode;
    if (!periode) {
      return res.status(400).json({
        status: false,
        message: "Parameter 'periode' (format: YYYY-MM) wajib diisi.",
      });
    }

    // Ambil organization_id dari satu_sehat_id berdasarkan req.user.satKerId
    const koders = req.user.satKerId;
    const satuSehat = await satu_sehat_id.findOne({
      where: { kode_baru_faskes: koders },
      attributes: ["organization_id"],
    });

    if (!satuSehat) {
      return res.status(404).json({
        status: false,
        message: "OrganizationId Tidak Ada",
      });
    }
    const organization_id = satuSehat.organization_id;

    const baseUrl =
      (req.query.baseUrl && req.query.baseUrl.trim()) ||
      process.env.SATUSEHAT_BASE_URL ||
      "https://fhir-sirs-dev.dto.kemkes.go.id";

    const apiKey =
      (req.query.apiKey && req.query.apiKey.trim()) ||
      process.env.SATUSEHAT_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        status: false,
        message:
          "API key tidak tersedia. Silakan set process.env.SATUSEHAT_API_KEY atau kirim lewat query apiKey untuk testing.",
      });
    }

    // Pastikan baseUrl tidak mengandung /v1/rlreport
    let cleanBaseUrl = baseUrl
      .replace(/\/?v1\/rlreport\/?$/, "")
      .replace(/\/$/, "");
    const url = `${cleanBaseUrl}/v1/rlreport/rl34?month=${encodeURIComponent(
      periode
    )}&organization_id=${encodeURIComponent(organization_id)}`;

    const options = {
      method: "GET",
      url: url,
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
    };

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
        },
      });

      console.log("URL:", url);
      console.log("Headers:", options.headers);
      console.log("StatusCode:", response.status);
      console.log("Response body:", response.data);

      const data = response.data;

      // Insert or update data RL 3.4 Satusehat
      if (data && data.data && data.data.month) {
        const payload = {
          month: data.data.month,
          organization_id: data.data.organization_id,
          new_visitors: data.data.new_visitors,
          returning_visitors: data.data.returning_visitors,
          total_visitors: data.data.total_visitors,
        };
        console.log("Payload yang akan disimpan:", payload);
        RLTigaTitikEmpatSatusehat.findOne({
          where: {
            month: payload.month,
            organization_id: payload.organization_id,
          },
        }).then((existing) => {
          if (existing) {
            // update
            existing
              .update({
                new_visitors: payload.new_visitors,
                returning_visitors: payload.returning_visitors,
                total_visitors: payload.total_visitors,
              })
              .then(() => {
                console.log("Berhasil update rl_tiga_titik_empat_satusehat");
              })
              .catch((err) => {
                console.log(
                  "Gagal update rl_tiga_titik_empat_satusehat:",
                  err
                );
              });
          } else {
            // insert
            RLTigaTitikEmpatSatusehat.create(payload)
              .then(() => {
                console.log("Berhasil insert rl_tiga_titik_empat_satusehat");
              })
              .catch((err) => {
                console.log(
                  "Gagal insert rl_tiga_titik_empat_satusehat:",
                  err
                );
              });
          }
        });
      }

      return res.status(200).json({
        status: true,
        message: "data found",
        data: data,
      });
    } catch (error) {
      console.log("Request error:", error.message);
      if (error.response) {
        const statusCode = error.response.status;
        const data = error.response.data;
        if (statusCode === 404) {
          return res.status(404).json({
            status: false,
            message: data.message || "Not Found",
            detail: "Data tidak ditemukan dari API Satusehat",
          });
        }
        if (statusCode >= 400) {
          return res.status(statusCode).json({
            status: false,
            message: data.message || "Error dari Satusehat",
            detail: data.detail || null,
          });
        }
      }
      return res.status(500).json({
        status: false,
        message: "Gagal mengambil data dari Satusehat",
        detail: error.message,
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Gagal mengambil organization_id",
      detail: err.message,
    });
  }
};

// Endpoint untuk menampilkan data RL 3.4 Satusehat yang sudah tersimpan (Satusehat Local)
export const getDataRLTigaTitikEmpatSatusehatLocal = async (req, res) => {
  try {
    const where = {};
    if (req.query.month) where.month = req.query.month;
    if (req.query.organization_id)
      where.organization_id = req.query.organization_id;
    const data = await RLTigaTitikEmpatSatusehat.findAll({ where });
    res.status(200).json({
      status: true,
      message: "data found",
      data,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Gagal mengambil data RL 3.4 Satusehat lokal",
      detail: err.message,
    });
  }
};

export const insertDataRLTigaTitikEmpat = async (req, res) => {
  console.log(req.user);
  const schema = Joi.object({
    tahun: Joi.number().required(),
    tahunDanBulan: Joi.date().required(),
    data: Joi.array()
      .items(
        Joi.object()
          .keys({
            jenisPengunjungId: Joi.number().required(),
            jumlah: Joi.number().required(),
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
    transaction = await databaseSIRS.transaction();
    const resultInsertHeader = await rlTigaTitikEmpatHeader.create(
      {
        rs_id: req.user.satKerId,
        tahun: req.body.tahunDanBulan,
        user_id: req.user.id,
      },
      { transaction }
    );

    const dataDetail = req.body.data.map((value, index) => {
      return {
        rs_id: req.user.satKerId,
        tahun: req.body.tahunDanBulan,
        rl_tiga_titik_empat_id: resultInsertHeader.id,
        jenis_pengunjung_id: value.jenisPengunjungId,
        jumlah: value.jumlah,
        user_id: req.user.id,
      };
    });

    const resultInsertDetail = await rlTigaTitikEmpatDetail.bulkCreate(
      dataDetail,
      {
        transaction,
        updateOnDuplicate: ["jumlah"],
      }
    );
    // console.log(resultInsertDetail[0].id)
    await transaction.commit();
    res.status(201).send({
      status: true,
      message: "data created",
      data: {
        id: resultInsertHeader.id,
      },
    });
  } catch (error) {
    console.log(error);
    if (transaction) {
      await transaction.rollback();
    }
    res.status(400).send({
      status: false,
      message: "data not created",
      error: error,
    });
  }
};

export const updateDataRLTigaTitikEmpat = async (req, res) => {
  try {
    await rlTigaTitikEmpatDetail.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "RL Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteDataRLTigaTitikEmpat = async (req, res) => {
  try {
    const count = await rlTigaTitikEmpatDetail.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(201).send({
      status: true,
      message: "data deleted successfully",
      data: {
        deleted_rows: count,
      },
    });
  } catch (error) {
    res.status(404).send({
      status: false,
      message: error,
    });
  }
};

export const getRLTigaTitikEmpatById = async (req, res) => {
  rlTigaTitikEmpatDetail
    .findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: jenisPengunjung,
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
