import { databaseSIRS } from "../config/Database.js";
import {
  rlTigaTitikEnamBelasDetail,
  rlTigaTitikEnamBelasHeader,
  get,
  show,
} from "../models/RLTigaTitikEnamBelas.js";
import {
  JenisPelayananKeluargaberencana,
  MetodaRLTigaTitikEnamBelas,
} from "../models/RLTigaTitikEnamBelasMetoda.js";
import Joi from "joi";

export const insertDataRLTigaTitikEnamBelas = async (req, res) => {
  const schema = Joi.object({
    tahun: Joi.number().required(),
    data: Joi.array()
      .items(
        Joi.object()
          .keys({
            JenisPelayananKeluargaBerencanaId: Joi.number().required(),
            pelayananKbPaskaPersalinan: Joi.number().required(),
            pelayananKbPaskaKeguguran: Joi.number().required(),
            pelayananKbInterval: Joi.number().required(),
            komplikasiKB: Joi.number().required(),
            kegagalanKB: Joi.number().required(),
            efekSamping: Joi.number().required(),
            dropOut: Joi.number().required(),
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
    const resultInsertHeader = await rlTigaTitikEnamBelasHeader.create(
      {
        rs_id: req.user.satKerId,
        periode: req.body.tahun,
        user_id: req.user.id,
      },
      {
        transaction,
      }
    );

    const dataDetail = req.body.data.map((value, index) => {
      let pelayanan_Kbtotal =
        value.pelayananKbPaskaPersalinan +
        value.pelayananKbPaskaKeguguran +
        value.pelayananKbInterval;
      return {
        rs_id: req.user.satKerId,
        periode: req.body.tahun,
        rl_tiga_titik_enam_belas_id: resultInsertHeader.id,
        rl_tiga_titik_enam_belas_metoda_id:
          value.JenisPelayananKeluargaBerencanaId,
        pelayanan_kb_paska_persalinan: value.pelayananKbPaskaPersalinan,
        pelayanan_kb_paska_keguguran: value.pelayananKbPaskaKeguguran,
        pelayanan_kb_interval: value.pelayananKbInterval,
        pelayanan_kb_total: pelayanan_Kbtotal,
        komplikasi_kb: value.komplikasiKB,
        kegagalan_kb: value.kegagalanKB,
        efek_samping: value.efekSamping,
        drop_out: value.dropOut,
        user_id: req.user.id,
      };
    });

    const resultInsertDetail = await rlTigaTitikEnamBelasDetail.bulkCreate(
      dataDetail,
      {
        transaction,
        updateOnDuplicate: [
          "pelayanan_kb_paska_persalinan",
          "pelayanan_kb_paska_keguguran",
          "pelayanan_kb_interval",
          "pelayanan_kb_total",
          "komplikasi_kb",
          "kegagalan_kb",
          "efek_samping",
          "drop_out",
        ],
      }
    );

    await transaction.commit();
    res.status(201).send({
      status: true,
      data: {
        id: resultInsertHeader,
      },
    });
  } catch (error) {
    if (transaction) {
      if (error.name == "SequelizeForeignKeyConstraintError") {
        res.status(400).send({
          status: false,
          message: "Gagal Input Data, Metoda Salah.",
        });
      } else {
        res.status(400).send({
          status: false,
          message: "Gagal Input Data.",
          error: error.name,
        });
        console.log(error);
      }
      await transaction.rollback();
    }
  }
};

export const getRLTigaTitikEnamBelas = (req, res) => {
  const schema = Joi.object({
    rsId: Joi.string().required(),
    periode: Joi.number().required(),
    page: Joi.number(),
    limit: Joi.number(),
  });

  const { error, value } = schema.validate(req.query);

  if (error) {
    res.status(400).send({
      status: false,
      message: error.details[0].message,
    });
    return;
  }

  get(req, (err, results) => {
    //console.log(results);
    const message = results.length ? "data found" : "data not found";
    res.status(200).send({
      status: true,
      message: message,
      data: results,
    });
  });
};

export const showRLTigaTitikEnamBelas = (req, res) => {
  show(req.params.id, (err, results) => {
    if (err) {
      res.status(422).send({
        status: false,
        message: err,
      });
      return;
    }

    const message = results.length ? "data found" : "data not found";
    const data = results.length ? results[0] : null;

    res.status(200).send({
      status: true,
      message: message,
      data: data,
    });
  });
};

export const getDataRLTigaTitikEnamBelas = async (req, res) => {
  rlTigaTitikEnamBelasHeader
    .findAll({
      attributes: ["id", "tahun"],
      where: {
        rs_id: req.user.rsId,
        tahun: req.query.tahun,
      },
      include: {
        model: rlTigaTitikEnamBelasDetail,
        attributes: [
          "id",
          "rs_id",
          "tahun",
          "rl_tiga_titik_enam_belas_Metoda_id",
          "pelayanan_kb_paska_persalinan",
          "pelayanan_kb_paska_keguguran",
          "pelayanan_kb_interval",
          "pelayanan_kb_total",
          "komplikasi_kb",
          "kegagalan_kb",
          "efek_samping",
          "drop_out",
        ],
        include: {
          model: MetodaRLTigaTitikEnamBelas,
        },
      },
      order: [
        [
          {
            model: rlTigaTitikEnamBelasDetail,
          },
          "rl_tiga_titik_enam_belas_metoda_id",
          "ASC",
        ],
      ],
    })
    .then((results) => {
      res.status(200).send({
        status: true,
        message: "Data Found",
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

export const getRLTigaTitikEnamBelasById = async (req, res) => {
  rlTigaTitikEnamBelasDetail
    .findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: JenisPelayananKeluargaberencana,
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

export const updateDataRLTigaTitikEnamBelas = async (req, res) => {
  const schema = Joi.object({
    // noMetoda: Joi.number().required(),
    pelayanan_kb_paska_persalinan: Joi.number().required(),
    pelayanan_kb_paska_keguguran: Joi.number().required(),
    pelayanan_kb_interval: Joi.number().required(),
    komplikasi_kb: Joi.number().required(),
    kegagalan_kb: Joi.number().required(),
    efek_samping: Joi.number().required(),
    drop_out: Joi.number().required(),
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
    const data = req.body;
    data["pelayanan_kb_total"] =
      data.pelayanan_kb_paska_persalinan +
      data.pelayanan_kb_paska_keguguran +
      data.pelayanan_kb_interval;
    try {
      transaction = await databaseSIRS.transaction();
      const update = await rlTigaTitikEnamBelasDetail.update(data, {
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
          message: "Gagal Memperbaharui Data",
        });
      }
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      res.status(400).send({
        status: false,
        message: "Gagal Memperbaharui Data",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).send({
      status: false,
      message: "Gagal Memperbaharui Data",
    });
  }
};

export const deleteDataRLTigaTitikEnamBelas = async (req, res) => {
  let transaction;
  try {
    transaction = await databaseSIRS.transaction();
    const count = await rlTigaTitikEnamBelasDetail.destroy({
      where: {
        id: req.params.id,
        rs_id: req.user.satKerId,
      },
    });
    if (count != 0) {
      // console.log("atas");
      await transaction.commit();
      res.status(201).send({
        status: true,
        message: "data deleted successfully",
        data: {
          deleted_rows: count,
        },
      });
    } else {
      await transaction.rollback();
      res.status(404).send({
        status: false,
        message: "Gagal Menghapus Data",
      });
    }
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    res.status(404).send({
      status: false,
      message: error,
    });
  }
};
