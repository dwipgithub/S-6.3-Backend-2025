import { get, show } from '../models/RumahSakitModel.js'
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

// export const getRumahSakit = (req, res) => {
//     get(req, (err, results) => {
//         const message = results.length ? 'data found' : 'data not found'
//         res.status(200).send({
//             status: true,
//             message: message,
//             data: results
//         })
//     })
// }

// export const showRumahSakit = (req, res) => {
//     show(req.params.id, (err, results) => {
//         if (err) {
//             res.status(422).send({
//                 status: false,
//                 message: err
//             })
//             return
//         }

//         const message = results.length ? 'data found' : 'data not found'
//         const data = results.length ? results[0] : null

//         res.status(200).send({
//             status: true,
//             message: message,
//             data: data
//         })
//     })
// }


export const getRumahSakit = (req, res) => {
  get(req, (err, results) => {
    const message = results.length ? "data found" : "data not found";
    res.status(200).send({
      status: true,
      message: message,
      data: results,
    });
  });
};

export const showRumahSakit = async (req, res) => {
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

    const response = await axios.get(
      `${baseUrl}/faskes/rumahsakit/${req.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const apiData = response.data.data;
    const data = {
      id: apiData.kode,
      nama: apiData.nama,
      alamat: apiData.alamat,
      provinsi_nama: apiData.provinsiNama,
      kab_kota_nama: apiData.kabKotaNama,
    };

    res.status(200).send({
      status: true,
      message: "data found",
      data: data,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};
