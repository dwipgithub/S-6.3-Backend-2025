import { StatusSatset } from "../models/StatusSatset.js";

export const getStatusSatset = async (req, res) => {
  try {
    const data = await StatusSatset.findOne({
      attributes: ["status_satset"],
    });

    // Kalau tidak ada data
    if (!data) {
      return res.status(200).json({
        status: true,
        status_satset: 0, // default kalau tidak ada data
      });
    }

    return res.status(200).json({
      status: true,
      status_satset: data.status_satset,
    });
  } catch (error) {
    console.error("Error getStatusSatset:", error);
    return res.status(500).json({
      status: false,
      message: "Gagal mengambil status satset",
    });
  }
};
