import express from "express";

// Token Generate
import {
  getUser,
  showUser,
  insertUser,
  login,
  loginSSO,
  loginSSOAdmin,
  logout,
  changePassword,
} from "../controllers/UsersController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { verifyCsrfToken } from "../middleware/VerifyCsrfToken.js";
import { refreshToken } from "../controllers/RefreshTokenController.js";

// Absensi
import { getAbsensi } from "../controllers/AbsensiController.js";

//Punya Bibo Ganteng

import { getDataJenisPengunjung } from "../controllers/JenisPengunjungRLTigaTitikEmpatController.js";
import { getDataJenisKegiatanRLTigaTitikLima } from "../controllers/JenisKegiatanRLTigaTitikLimaController.js";
import { getDataJenisKegiatanRLTigaTitikEnam } from "../controllers/JenisKegiatanRLTigaTitikEnamController.js";
import { getDataJenisKegiatanRLTigaTitikTujuh } from "../controllers/JenisKegiatanRLTigaTitikTujuhController.js";

// RL3.3
import {
  getDataRLTigaTitikTiga,
  insertDataRLTigaTitikTiga,
  updateDataRLTigaTitikTiga,
  deleteDataRLTigaTitikTiga,
  getDataRLTigaTitikTigaDetails,
  getDataRLTigaTitikTigaById,
} from "../controllers/RLTigaTitikTigaController.js";

// RL 3.4
import {
  getDataRLTigaTitikEmpat,
  getRLTigaTitikEmpatById,
  insertDataRLTigaTitikEmpat,
  updateDataRLTigaTitikEmpat,
  deleteDataRLTigaTitikEmpat,
  getDataRLTigaTitikEmpatSatuSehat,
  getDataRLTigaTitikEmpatSatusehatLocal,
} from "../controllers/RLTigaTitikEmpatController.js";

// RL 3.5
import {
  getDataRLTigaTitikLima,
  getRLTigaTitikLimaById,
  insertDataRLTigaTitikLima,
  updateDataRLTigaTitikLima,
  deleteDataRLTigaTitikLima,
} from "../controllers/RLTigaTitikLimaController.js";

// RL 3.6
import {
  getDataRLTigaTitikEnam,
  getRLTigaTitikEnamById,
  insertDataRLTigaTitikEnam,
  updateDataRLTigaTitikEnam,
  deleteDataRLTigaTitikEnam,
} from "../controllers/RLTigaTitikEnamController.js";

// RL 3.7
import {
  getDataRLTigaTitikTujuh,
  getRLTigaTitikTujuhById,
  insertDataRLTigaTitikTujuh,
  updateDataRLTigaTitikTujuh,
  deleteDataRLTigaTitikTujuh,
} from "../controllers/RLTigaTitikTujuhController.js";

//Jenis Spesialisasi 3.10
import { getDataJenisSpesialisTigaTitikSepuluh } from "../controllers/JenisSpesialisTigaTitikSepuluhController.js";

// Rumah Sakit
import {
  showRumahSakit,
  getRumahSakit,
} from "../controllers/RumahSakitController.js";

// Jenis Pelayanan
import { getRLTigaTitikDuaJenisPelayanan } from "../controllers/RLTigaTitikDuaJenisPelayananController.js";

// Jenis Kegiatan 3.11
import { getDataJenisKegiatanRLTigaTitikSebelas } from "../controllers/JenisKegiatanRLTigaTitikSebelasController.js";

// Jenis Spesialisasi 3.12
import { getDataSpesialisasiRLTigaTitikDuaBelas } from "../controllers/RLTigaTitikDuaBelasSpesialisasiController.js";

//ICD
import {
  getIcdRanap,
  getIcdRanapbyId,
  getIcdRanapbySearch,
} from "../controllers/ICDController.js";

//Jenis Pemeriksaan RL 3.8
import {
  getDataPemeriksaanRlTigaTitikDelapan,
  getDataPemeriksaanDetailRlTigaTitikDelapan,
} from "../controllers/RLTigaTitikDelapanPemeriksaanController.js";

//Jenis Kegiatan RL 3.14
import { getDataJenisKegiatanRLTigaTitikEmpatBelas } from "../controllers/RLTigaTitikEmpatBelasJenisKegiatanController.js";

//Jenis Pelayanan 3.3
import { getDataJenisPelayananTigaTitikTiga } from "../controllers/JenisPelayananTigaTitikTigaController.js";

//Golongan Obat RL 3.17
import { getGolonganObatRLTigaTitikTujuhBelas } from "../controllers/RLTigaTitikTujuhBelasGolonganObatController.js";

//Golongan Obat RL 3.18
import { getGolonganObatRLTigaTitikDelapanBelas } from "../controllers/RLTigaTitikDelapanBelasGolonganObatController.js";

// Golongan Obat 3.19
import { getDataGolonganObatTigaTitikSembilanBelas } from "../controllers/GolonganObatTigaTitikSembilanBelasController.js";

// MASTER 3.13
import {
  getDataJenisTindakanRLTigaTitikTigaBelas,
  getDataJenisTindakanHeaderRLTigaTitikTigaBelas,
} from "../controllers/RLTigaTitikTigaBelasJenisTindakanController.js";

// MASTER 5.1
import {
  getDataIcdRLLimaTitikSatu,
  getIcdRajalbySearch,
  getIcdRajalbyId,
} from "../controllers/IcdRLLimaTitikSatuController.js";

// Provinsi
import {
  getProvinsi,
  showProvinsi,
} from "../controllers/ProvinsiController.js";

// KabKota
import { getKabKota, showKabKota } from "../controllers/KabKotaController.js";

// RL 3.1
import {
  getRLTigaTitikSatu,
  showRLTigaTitikSatu,
} from "../controllers/RLTigaTitikSatuController.js";

// RL 3.2
import {
  getRLTigaTitikDua,
  showRLTigaTitikDua,
  insertRLTigaTitikDua,
  deleteRLTigaTitikDua,
  updateRLTigaTitikDua,
} from "../controllers/RLTigaTitikDuaController.js";

//Jenis Kegiatan RL 3.9
import { getDataJenisKegiatanTigaTitikSembilan } from "../controllers/RLTigaTitikSembilanJenisKegiatanController.js";

//Jenis Kegiatan 3.15
import { getDataJenisKegiatanTigaTitikLimaBelas } from "../controllers/JenisKegiatanTigaTitikLimaBelasController.js";

// RL 3.16 Metoda
import { getDataJenisPelayananKeluargaBerencana } from "../controllers/RLTigaTitikEnamBelasMetodaController.js";

// RL 3.9 baru
import {
  getRLTigaTitikSembilan,
  showRLTigaTitikSembilan,
  insertRLTigaTitikSembilan,
  deleteRLTigaTitikSembilan,
  updateRLTigaTitikSembilan,
} from "../controllers/RLTigaTitikSembilanController.js";

//RL3.10
import {
  getDataRLTigaTitikSepuluh,
  insertDataRLTigaTitikSepuluh,
  updateDataRLTigaTitikSepuluh,
  deleteDataRLTigaTitikSepuluh,
  getDataRLTigaTitikSepuluhDetails,
  getDataRLTigaTitikSepuluhById,
} from "../controllers/RLTigaTitikSepuluhController.js";

// RL 3.11
import {
  insertDataRLTigaTitikSebelas,
  getDataRLTigaTitikSebelas,
  getDataRLTigaTitikSebelasDetail,
  getRLTigaTitikSebelas,
  showRLTigaTitikSebelas,
  getRLTigaTitikSebelasById,
  updateDataRLTigaTitikSebelas,
  deleteDataRLTigaTitikSebelas,
} from "../controllers/RLTigaTitikSebelasController.js";

// RL 3.12
import {
  insertDataRLTigaTitikDuaBelas,
  getDataRLTigaTitikDuaBelas,
  getRLTigaTitikDuaBelasById,
  updateDataRLTigaTitikDuaBelas,
  deleteDataRLTigaTitikDuaBelas,
  getRLTigaTitikDuaBelas,
  showRLTigaTitikDuaBelas,
} from "../controllers/RLTigaTitikDuaBelasController.js";

// RL3.15
import {
  getDataRLTigaTitikLimaBelas,
  insertDataRLTigaTitikLimaBelas,
  updateDataRLTigaTitikLimaBelas,
  deleteDataRLTigaTitikLimaBelas,
  getDataRLTigaTitikLimaBelasDetails,
  getDataRLTigaTitikLimaBelasById,
} from "../controllers/RLTigaTitikLimaBelasController.js";

// RL 3.16
import {
  insertDataRLTigaTitikEnamBelas,
  getDataRLTigaTitikEnamBelas,
  getRLTigaTitikEnamBelasById,
  getRLTigaTitikEnamBelas,
  showRLTigaTitikEnamBelas,
  updateDataRLTigaTitikEnamBelas,
  deleteDataRLTigaTitikEnamBelas,
} from "../controllers/RLTigaTitikEnamBelasController.js";

// RL 3.17 baru
import {
  getRLTigaTitikTujuhBelas,
  showRLTigaTitikTujuhBelas,
  insertDataRLTigaTitikTujuhBelas,
  deleteRLTigaTitikTujuhBelas,
  updateRLTigaTitikTujuhBelas,
} from "../controllers/RLTigaTitikTujuhBelasController.js";

// RL 3.18 baru
import {
  getRLTigaTitikDelapanBelas,
  showRLTigaTitikDelapanBelas,
  insertDataRLTigaTitikDelapanBelas,
  deleteRLTigaTitikDelapanBelas,
  updateRLTigaTitikDelapanBelas,
} from "../controllers/RLTigaTitikDelapanBelasController.js";

//RL3.19
import {
  getDataRLTigaTitikSembilanBelas,
  insertDataRLTigaTitikSembilanBelas,
  updateDataRLTigaTitikSembilanBelas,
  deleteDataRLTigaTitikSembilanBelas,
  getDataRLTigaTitikSembilanBelasDetails,
  getDataRLTigaTitikSembilanBelasById,
} from "../controllers/RLTigaTitikSembilanBelasController.js";

// RL 3.8
import {
  deleteDataRLTigaTitikDelapan,
  getDataRLTigaTitikDelapan,
  getDataRLTigaTitikDelapanById,
  getDataRLTigaTitikDelapanDetailPemeriksaan,
  insertDataRLTigaTitikDelapan,
  updateDataRLTigaTitikDelapan,
} from "../controllers/RLTigaTitikDelapanController.js";

// RL 4.1
import {
  deleteDataRLEmpatTitikSatu,
  getDataRLEmpatTitikSatu,
  getDataRLEmpatTitikSatuById,
  // getRLEmpatTitikDua,
  // getRLEmpatTitikTiga,
  insertDataRLEmpatTitikSatu,
  updateDataRLEmpatTitikSatu,
} from "../controllers/RLEmpatTitikSatuController.js";

// RL 4.2
import { getRLEmpatTitikDua } from "../controllers/RLEmpatTitikDuaController.js";

// RL 4.3
import { getRLEmpatTitikTiga } from "../controllers/RLEmpatTitikTigaController.js";

// RL 3.13 NEW
import {
  insertDataRLTigaTitikTigaBelas,
  getDataRLTigaTitikTigaBelas,
  getRLTigaTitikTigaBelasById,
  getRLTigaTitikTigaBelas,
  showRLTigaTitikTigaBelas,
  updateDataRLTigaTitikTigaBelas,
  deleteDataRLTigaTitikTigaBelas,
} from "../controllers/RLTigaTitikTigaBelasController.js";

// RL 5.1
import {
  deleteDataRLLimaTitikSatu,
  getDataRLLimaTitikSatu,
  getDataRLLimaTitikSatuById,
  insertdataRLLimaTitikSatu,
  updateDataRLLimaTitikSatu,
  getDataRLLimaTitikSatuSatuSehat,
  getDataRLLimaTitikSatuSatuSehatShow,
  getDataRLLimaTitikSatuSatuSehatShowPaging,
  getMasterumursatusehat,
} from "../controllers/RLLimaTitikSatuController.js";

// RL 3.14
import {
  deleteDataRLTigaTitikEmpatBelas,
  getDataRLTigaTitikEmpatBelasById,
  getDataRLTigaTitikEmpatBelasDetailKegiatan,
  insertDataRLTigaTitikEmpatBelas,
  updateDataRLTigaTitikEmpatBelas,
} from "../controllers/RLTigaTitikEmpatBelasController.js";

// RL 5.2
import { getRLLimaTitikDua } from "../controllers/RLLimaTitikDuaController.js";

// RL 5.3
import { getRLLimatitikTiga } from "../controllers/RLLimaTitikTigaController.js";

// Absensi

import { insertValidasi } from "../controllers/ValidasiController.js";

import { getStatusSatset } from "../controllers/StatusSatset.js";

const router = express.Router();

// Validasi
router.post("/apisirs6v2/validasi", verifyToken, insertValidasi);

// Token
// router.post("/apisirs6v2/login", login);
router.delete("/apisirs6v2/logout", verifyCsrfToken, logout);
router.get("/apisirs6v2/token", refreshToken);

router.get("/apisirs6v2/login", loginSSO);
router.get("/apisirs6v2/loginadmin", loginSSOAdmin);

// Absensi
router.get("/apisirs6v2/absensi", verifyToken, getAbsensi);

// User
router.get("/apisirs/users", verifyToken, getUser);
router.get("/apisirs/users/:id", verifyToken, showUser);
router.post("/apisirs/users", verifyToken, insertUser);
router.patch("/apisirs/users/:id/admin", verifyToken, changePassword);

// Rumah Sakit
router.get("/apisirs6v2/rumahsakit/:id", verifyToken, showRumahSakit);
router.get("/apisirs6v2/rumahsakit", verifyToken, getRumahSakit);

// Provinsi
router.get("/apisirs6v2/provinsi", verifyToken, getProvinsi);
router.get("/apisirs6v2/provinsi/:id", verifyToken, showProvinsi);

// KabKota
router.get("/apisirs6v2/kabkota", verifyToken, getKabKota);
router.get("/apisirs6v2/kabkota/:id", verifyToken, showKabKota);

router.get("/apisirs6v2/status-satset", verifyToken, getStatusSatset);

// RL 3.1
router.get("/apisirs6v2/rltigatitiksatu", verifyToken, getRLTigaTitikSatu);
router.get("/apisirs6v2/rltigatitiksatu/:id", verifyToken, showRLTigaTitikSatu);

// RL 3.2
router.post(
  "/apisirs6v2/rltigatitikdua",
  verifyCsrfToken,
  verifyToken,
  insertRLTigaTitikDua
);
router.get("/apisirs6v2/rltigatitikdua", verifyToken, getRLTigaTitikDua);
router.delete(
  "/apisirs6v2/rltigatitikdua/:id",
  verifyCsrfToken,
  verifyToken,
  deleteRLTigaTitikDua
);
router.get("/apisirs6v2/rltigatitikdua/:id", verifyToken, showRLTigaTitikDua);
router.patch(
  "/apisirs6v2/rltigatitikdua/:id",
  verifyCsrfToken,
  verifyToken,
  updateRLTigaTitikDua
);

// RL 3.3
router.post(
  "/apisirs6v2/rltigatitiktiga",
  verifyToken,
  insertDataRLTigaTitikTiga
);
router.get("/apisirs6v2/rltigatitiktiga", verifyToken, getDataRLTigaTitikTiga);
router.delete(
  "/apisirs6v2/rltigatitiktiga/:id",
  verifyToken,
  deleteDataRLTigaTitikTiga
);
router.get(
  "/apisirs6v2/rltigatitiktigadetail/:id",
  verifyToken,
  getDataRLTigaTitikTigaById
);
router.get(
  "/apisirs6v2/cekrltigatitiktigadetail/",
  verifyToken,
  getDataRLTigaTitikTigaDetails
);
router.patch(
  "/apisirs6v2/rltigatitiktigadetail/:id",
  verifyToken,
  updateDataRLTigaTitikTiga
);

// Jenis Pelayanan RL 3.2
router.get(
  "/apisirs6v2/rltigatitikduajenispelayanan",
  verifyToken,
  getRLTigaTitikDuaJenisPelayanan
);

// Jenis Pelayanan 3.3
router.get(
  "/apisirs6v2/jenispelayanantigatitiktiga",
  verifyToken,
  getDataJenisPelayananTigaTitikTiga
);

// Jenis Pengunjung
router.get("/apisirs6v2/jenispengunjung", verifyToken, getDataJenisPengunjung);

// RL 3.4
router.post(
  "/apisirs6v2/rltigatitikempat",
  verifyCsrfToken,
  verifyToken,
  insertDataRLTigaTitikEmpat
);
router.get(
  "/apisirs6v2/rltigatitikempat",
  verifyToken,
  getDataRLTigaTitikEmpat
);
router.get(
  "/apisirs6v2/rltigatitikempatdetail/:id",
  verifyToken,
  getRLTigaTitikEmpatById
);
router.delete(
  "/apisirs6v2/rltigatitikempat/:id",
  verifyCsrfToken,
  verifyToken,
  deleteDataRLTigaTitikEmpat
);
router.patch(
  "/apisirs6v2/rltigatitikempatdetail/:id",
  verifyCsrfToken,
  verifyToken,
  updateDataRLTigaTitikEmpat
);

router.get(
  "/apisirs6v2/rltigatitikempatsatusehat",
  verifyToken,
  getDataRLTigaTitikEmpatSatuSehat
);

router.get(
  "/apisirs6v2/getDataRLTigaTitikEmpatSatusehatLocal",
  verifyToken,
  getDataRLTigaTitikEmpatSatusehatLocal
);

// Jenis Kegiatan
router.get(
  "/apisirs6v2/jeniskegiatanrltigatitiklima",
  verifyToken,
  getDataJenisKegiatanRLTigaTitikLima
);

// RL 3.5
router.post(
  "/apisirs6v2/rltigatitiklima",
  verifyCsrfToken,
  verifyToken,
  insertDataRLTigaTitikLima
);
router.get("/apisirs6v2/rltigatitiklima", verifyToken, getDataRLTigaTitikLima);
router.get(
  "/apisirs6v2/rltigatitiklimadetail/:id",
  verifyToken,
  getRLTigaTitikLimaById
);
router.delete(
  "/apisirs6v2/rltigatitiklima/:id",
  verifyCsrfToken,
  verifyToken,
  deleteDataRLTigaTitikLima
);
router.patch(
  "/apisirs6v2/rltigatitiklimadetail/:id",
  verifyCsrfToken,
  verifyToken,
  updateDataRLTigaTitikLima
);

// Jenis Kegiatan
router.get(
  "/apisirs6v2/jeniskegiatanrltigatitikenam",
  verifyToken,
  getDataJenisKegiatanRLTigaTitikEnam
);

// RL 3.6
router.post(
  "/apisirs6v2/rltigatitikenam",
  verifyCsrfToken,
  verifyToken,
  insertDataRLTigaTitikEnam
);
router.get("/apisirs6v2/rltigatitikenam", verifyToken, getDataRLTigaTitikEnam);
router.get(
  "/apisirs6v2/rltigatitikenamdetail/:id",
  verifyToken,
  getRLTigaTitikEnamById
);
router.delete(
  "/apisirs6v2/rltigatitikenam/:id",
  verifyCsrfToken,
  verifyToken,
  deleteDataRLTigaTitikEnam
);
router.patch(
  "/apisirs6v2/rltigatitikenamdetail/:id",
  verifyCsrfToken,
  verifyToken,
  updateDataRLTigaTitikEnam
);

// Jenis Kegiatan
router.get(
  "/apisirs6v2/jeniskegiatanrltigatitiktujuh",
  verifyToken,
  getDataJenisKegiatanRLTigaTitikTujuh
);

// RL 3.7
router.post(
  "/apisirs6v2/rltigatitiktujuh",
  verifyCsrfToken,
  verifyToken,
  insertDataRLTigaTitikTujuh
);
router.get(
  "/apisirs6v2/rltigatitiktujuh",
  verifyToken,
  getDataRLTigaTitikTujuh
);
router.get(
  "/apisirs6v2/rltigatitiktujuhdetail/:id",
  verifyToken,
  getRLTigaTitikTujuhById
);
router.delete(
  "/apisirs6v2/rltigatitiktujuh/:id",
  verifyCsrfToken,
  verifyToken,
  deleteDataRLTigaTitikTujuh
);
router.patch(
  "/apisirs6v2/rltigatitiktujuhdetail/:id",
  verifyCsrfToken,
  verifyToken,
  updateDataRLTigaTitikTujuh
);

//Jenis Pemeriksaan RL3.8
router.get(
  "/apisirs6v2/rltigatitikdelapanpemeriksaan",
  verifyToken,
  getDataPemeriksaanRlTigaTitikDelapan
);
router.get(
  "/apisirs6v2/rltigatitikdelapanpemeriksaandetail",
  verifyToken,
  getDataPemeriksaanDetailRlTigaTitikDelapan
);

// Jenis Kegiatan RL 3.9
router.get(
  "/apisirs6v2/rltigatitiksembilanjeniskegiatan",
  verifyToken,
  getDataJenisKegiatanTigaTitikSembilan
);

// Jenis Spesialisasi 3.10
router.get(
  "/apisirs6v2/jenisspesialistigatitiksepuluh",
  verifyToken,
  getDataJenisSpesialisTigaTitikSepuluh
);

// Jenis Kegiatan RL 3.11
router.get(
  "/apisirs6v2/jeniskegiatanrltigatitiksebelas",
  verifyToken,
  getDataJenisKegiatanRLTigaTitikSebelas
);

// JENIS TINDAKAN RL 3.13
router.get(
  "/apisirs6v2/jenistindakanrltigatitiktigabelas",
  verifyToken,
  getDataJenisTindakanRLTigaTitikTigaBelas
);

// JENIS TINDAKAN HEADER RL 3.13
router.get(
  "/apisirs6v2/jenistindakanheaderrltigatitiktigabelas",
  verifyToken,
  getDataJenisTindakanHeaderRLTigaTitikTigaBelas
);

// Golongan Obat 3.17
router.get(
  "/apisirs6v2/rltigatitiktujuhbelasgolonganobat",
  verifyToken,
  getGolonganObatRLTigaTitikTujuhBelas
);

// Golongan Obat 3.18
router.get(
  "/apisirs6v2/rltigatitikdelapanbelasgolonganobat",
  verifyToken,
  getGolonganObatRLTigaTitikDelapanBelas
);

// Golongan Obat 3.19 new
router.get(
  "/apisirs6v2/golonganobattigatitiksembilanbelas",
  verifyToken,
  getDataGolonganObatTigaTitikSembilanBelas
);

// Spesialisasi RL 3.12
router.get(
  "/apisirs6v2/spesialisasirltigatitikduabelas",
  verifyToken,
  getDataSpesialisasiRLTigaTitikDuaBelas
);

// jenis kegiatan RL 314
router.get(
  "/apisirs6v2/rltigatitikempatbelasjeniskegiatan",
  verifyToken,
  getDataJenisKegiatanRLTigaTitikEmpatBelas
);

// Jenis Kegiatan 3.15
router.get(
  "/apisirs6v2/jeniskegiatantigatitiklimabelas",
  verifyToken,
  getDataJenisKegiatanTigaTitikLimaBelas
);

// ICD RL 4
router.get("/apisirs6v2/icd/rawat_inap", verifyToken, getIcdRanap);
router.get("/apisirs6v2/icd/rawat_inap/find", verifyToken, getIcdRanapbySearch);
router.get("/apisirs6v2/icd/rawat_inap/id", verifyToken, getIcdRanapbyId);

// RL 3.8
router.post(
  "/apisirs6v2/rltigatitikdelapan",
  verifyCsrfToken,
  verifyToken,
  insertDataRLTigaTitikDelapan
);
router.get(
  "/apisirs6v2/rltigatitikdelapan",
  verifyToken,
  getDataRLTigaTitikDelapanDetailPemeriksaan
);
router.get(
  "/apisirs6v2/rltigatitikdelapan/:id",
  verifyToken,
  getDataRLTigaTitikDelapanById
);
router.delete(
  "/apisirs6v2/rltigatitikdelapan/:id",
  verifyCsrfToken,
  verifyToken,
  deleteDataRLTigaTitikDelapan
);
router.patch(
  "/apisirs6v2/rltigatitikdelapan/:id",
  verifyCsrfToken,
  verifyToken,
  updateDataRLTigaTitikDelapan
);

// RL 3.9 Baru
router.post(
  "/apisirs6v2/rltigatitiksembilan",
  verifyCsrfToken,
  verifyToken,
  insertRLTigaTitikSembilan
);
router.get(
  "/apisirs6v2/rltigatitiksembilan",
  verifyToken,
  getRLTigaTitikSembilan
);
router.delete(
  "/apisirs6v2/rltigatitiksembilan/:id",
  verifyCsrfToken,
  verifyToken,
  deleteRLTigaTitikSembilan
);
router.get(
  "/apisirs6v2/rltigatitiksembilan/:id",
  verifyToken,
  showRLTigaTitikSembilan
);
router.patch(
  "/apisirs6v2/rltigatitiksembilan/:id",
  verifyCsrfToken,
  verifyToken,
  updateRLTigaTitikSembilan
);

// RL 3.10
router.get(
  "/apisirs6v2/rltigatitiksepuluh",
  verifyToken,
  getDataRLTigaTitikSepuluh
);
router.post(
  "/apisirs6v2/rltigatitiksepuluh",
  verifyCsrfToken,
  verifyToken,
  insertDataRLTigaTitikSepuluh
);
router.delete(
  "/apisirs6v2/rltigatitiksepuluh/:id",
  verifyCsrfToken,
  verifyToken,
  deleteDataRLTigaTitikSepuluh
);
router.get(
  "/apisirs6v2/rltigatitiksepuluhdetail/:id",
  verifyToken,
  getDataRLTigaTitikSepuluhById
);
router.patch(
  "/apisirs6v2/rltigatitiksepuluhdetail/:id",
  verifyCsrfToken,
  verifyToken,
  updateDataRLTigaTitikSepuluh
);

// RL 3.11
router.post(
  "/apisirs6v2/rltigatitiksebelas",
  verifyCsrfToken,
  verifyToken,
  insertDataRLTigaTitikSebelas
);
router.get(
  "/apisirs6v2/rltigatitiksebelas",
  verifyToken,
  getRLTigaTitikSebelas
);
router.get(
  "/apisirs6v2/rltigatitiksebelas/:id",
  verifyToken,
  showRLTigaTitikSebelas
);
router.patch(
  "/apisirs6v2/rltigatitiksebelas/:id",
  verifyCsrfToken,
  verifyToken,
  updateDataRLTigaTitikSebelas
);
router.delete(
  "/apisirs6v2/rltigatitiksebelas/:id",
  verifyCsrfToken,
  verifyToken,
  deleteDataRLTigaTitikSebelas
);

// RL 3.12
router.post(
  "/apisirs6v2/rltigatitikduabelas",
  verifyCsrfToken,
  verifyToken,
  insertDataRLTigaTitikDuaBelas
);
router.get(
  "/apisirs6v2/rltigatitikduabelas",
  verifyToken,
  getRLTigaTitikDuaBelas
);
router.get(
  "/apisirs6v2/rltigatitikduabelas/:id",
  verifyToken,
  showRLTigaTitikDuaBelas
);
router.patch(
  "/apisirs6v2/rltigatitikduabelas/:id",
  verifyCsrfToken,
  verifyToken,
  updateDataRLTigaTitikDuaBelas
);
router.delete(
  "/apisirs6v2/rltigatitikduabelas/:id",
  verifyCsrfToken,
  verifyToken,
  deleteDataRLTigaTitikDuaBelas
);

// RL 3.13
router.post(
  "/apisirs6v2/rltigatitiktigabelas",
  verifyCsrfToken,
  verifyToken,
  insertDataRLTigaTitikTigaBelas
);

router.get(
  "/apisirs6v2/rltigatitiktigabelas/",
  verifyToken,
  getRLTigaTitikTigaBelas
);

router.get(
  "/apisirs6v2/rltigatitiktigabelas/:id",
  verifyToken,
  showRLTigaTitikTigaBelas
);

router.patch(
  "/apisirs6v2/rltigatitiktigabelas/:id",
  verifyCsrfToken,
  verifyToken,
  updateDataRLTigaTitikTigaBelas
);

router.delete(
  "/apisirs6v2/rltigatitiktigabelas/:id",
  verifyCsrfToken,
  verifyToken,
  deleteDataRLTigaTitikTigaBelas
);

// RL 3.14
router.post(
  "/apisirs6v2/rltigatitikempatbelas",
  verifyCsrfToken,
  verifyToken,
  insertDataRLTigaTitikEmpatBelas
);
router.get(
  "/apisirs6v2/rltigatitikempatbelas",
  verifyToken,
  getDataRLTigaTitikEmpatBelasDetailKegiatan
);
router.get(
  "/apisirs6v2/rltigatitikempatbelas/:id",
  verifyToken,
  getDataRLTigaTitikEmpatBelasById
);
router.delete(
  "/apisirs6v2/rltigatitikempatbelas/:id",
  verifyCsrfToken,
  verifyToken,
  deleteDataRLTigaTitikEmpatBelas
);
router.patch(
  "/apisirs6v2/rltigatitikempatbelas/:id",
  verifyCsrfToken,
  verifyToken,
  updateDataRLTigaTitikEmpatBelas
);

// RL 3.15
router.get(
  "/apisirs6v2/rltigatitiklimabelas",
  verifyToken,
  getDataRLTigaTitikLimaBelas
);
router.post(
  "/apisirs6v2/rltigatitiklimabelas",
  verifyCsrfToken,
  verifyToken,
  insertDataRLTigaTitikLimaBelas
);
router.delete(
  "/apisirs6v2/rltigatitiklimabelas/:id",
  verifyCsrfToken,
  verifyToken,
  deleteDataRLTigaTitikLimaBelas
);
router.get(
  "/apisirs6v2/rltigatitiklimabelasdetail/:id",
  verifyToken,
  getDataRLTigaTitikLimaBelasById
);
// router.get(
//   "/apisirs6v2/rltigatitiklimabelasdetail/:id",
//   verifyToken,
//   getDataRLTigaTitikLimaBelasDetails
// );
router.patch(
  "/apisirs6v2/rltigatitiklimabelasdetail/:id",
  verifyCsrfToken,
  verifyToken,
  updateDataRLTigaTitikLimaBelas
);

// RL 3.16
router.get(
  "/apisirs6v2/rltigatitikenambelasjenispelayanankeluargaberencana",
  verifyToken,
  getDataJenisPelayananKeluargaBerencana
);

router.post(
  "/apisirs6v2/rltigatitikenambelas",
  verifyCsrfToken,
  verifyToken,
  insertDataRLTigaTitikEnamBelas
);

router.get(
  "/apisirs6v2/rltigatitikenambelas/",
  verifyToken,
  getRLTigaTitikEnamBelas
);

router.get(
  "/apisirs6v2/rltigatitikenambelas/:id",
  verifyToken,
  showRLTigaTitikEnamBelas
);

router.patch(
  "/apisirs6v2/rltigatitikenambelas/:id",
  verifyCsrfToken,
  verifyToken,
  updateDataRLTigaTitikEnamBelas
);

router.delete(
  "/apisirs6v2/rltigatitikenambelas/:id",
  verifyCsrfToken,
  verifyToken,
  deleteDataRLTigaTitikEnamBelas
);

// RL 3.17
router.post(
  "/apisirs6v2/rltigatitiktujuhbelas",
  verifyCsrfToken,
  verifyToken,
  insertDataRLTigaTitikTujuhBelas
);
router.get(
  "/apisirs6v2/rltigatitiktujuhbelas",
  verifyToken,
  getRLTigaTitikTujuhBelas
);
router.delete(
  "/apisirs6v2/rltigatitiktujuhbelas/:id",
  verifyCsrfToken,
  verifyToken,
  deleteRLTigaTitikTujuhBelas
);
router.get(
  "/apisirs6v2/rltigatitiktujuhbelas/:id",
  verifyToken,
  showRLTigaTitikTujuhBelas
);
router.patch(
  "/apisirs6v2/rltigatitiktujuhbelas/:id",
  verifyCsrfToken,
  verifyToken,
  updateRLTigaTitikTujuhBelas
);

// RL 3.18
router.post(
  "/apisirs6v2/rltigatitikdelapanbelas",
  verifyCsrfToken,
  verifyToken,
  insertDataRLTigaTitikDelapanBelas
);
router.get(
  "/apisirs6v2/rltigatitikdelapanbelas",
  verifyToken,
  getRLTigaTitikDelapanBelas
);
router.delete(
  "/apisirs6v2/rltigatitikdelapanbelas/:id",
  verifyCsrfToken,
  verifyToken,
  deleteRLTigaTitikDelapanBelas
);
router.get(
  "/apisirs6v2/rltigatitikdelapanbelas/:id",
  verifyToken,
  showRLTigaTitikDelapanBelas
);
router.patch(
  "/apisirs6v2/rltigatitikdelapanbelas/:id",
  verifyCsrfToken,
  verifyToken,
  updateRLTigaTitikDelapanBelas
);

// RL 3.19 new
router.post(
  "/apisirs6v2/rltigatitiksembilanbelas",
  verifyCsrfToken,
  verifyToken,
  insertDataRLTigaTitikSembilanBelas
);
router.get(
  "/apisirs6v2/rltigatitiksembilanbelas",
  verifyToken,
  getDataRLTigaTitikSembilanBelas
);
router.delete(
  "/apisirs6v2/rltigatitiksembilanbelas/:id",
  verifyCsrfToken,
  verifyToken,
  deleteDataRLTigaTitikSembilanBelas
);
router.get(
  "/apisirs6v2/rltigatitiksembilanbelasdetail/:id",
  verifyToken,
  getDataRLTigaTitikSembilanBelasById
);
router.get(
  "/apisirs6v2/cekrltigatitiksembilanbelasdetail/",
  verifyToken,
  getDataRLTigaTitikSembilanBelasDetails
);
router.patch(
  "/apisirs6v2/rltigatitiksembilanbelasdetail/:id",
  verifyCsrfToken,
  verifyToken,
  updateDataRLTigaTitikSembilanBelas
);

// RL 4.1
router.post(
  "/apisirs6v2/rlempattitiksatu",
  verifyCsrfToken,
  verifyToken,
  insertDataRLEmpatTitikSatu
);
router.get(
  "/apisirs6v2/rlempattitiksatu",
  verifyToken,
  getDataRLEmpatTitikSatu
);
router.delete(
  "/apisirs6v2/rlempattitiksatu/:id",
  verifyCsrfToken,
  verifyToken,
  deleteDataRLEmpatTitikSatu
);
router.get(
  "/apisirs6v2/rlempattitiksatu/:id",
  verifyToken,
  getDataRLEmpatTitikSatuById
);
router.patch(
  "/apisirs6v2/rlempattitiksatu/:id",
  verifyCsrfToken,
  verifyToken,
  updateDataRLEmpatTitikSatu
);

// RL 4.2
router.get("/apisirs6v2/rlempattitikdua", verifyToken, getRLEmpatTitikDua);

// RL 4.3
router.get("/apisirs6v2/rlempattitiktiga", verifyToken, getRLEmpatTitikTiga);

// ICD RL 5
// router.get("/apisirs6v2/icd/rawat_jalan", verifyToken, getIcdRajal)
router.get(
  "/apisirs6v2/icd/rawat_jalan/find",
  verifyToken,
  getIcdRajalbySearch
);
router.get("/apisirs6v2/icd/rawat_jalan/id", verifyToken, getIcdRajalbyId);

// RL 5.1
router.post(
  "/apisirs6v2/rllimatitiksatu",
  verifyCsrfToken,
  verifyToken,
  insertdataRLLimaTitikSatu
);

router.get("/apisirs6v2/rllimatitiksatu", verifyToken, getDataRLLimaTitikSatu);

router.get(
  "/apisirs6v2/rllimatitiksatu/:id",
  verifyToken,
  getDataRLLimaTitikSatuById
);

router.patch(
  "/apisirs6v2/rllimatitiksatu/:id",
  verifyCsrfToken,
  verifyToken,
  updateDataRLLimaTitikSatu
);

router.delete(
  "/apisirs6v2/rllimatitiksatu/:id",
  verifyCsrfToken,
  verifyToken,
  deleteDataRLLimaTitikSatu
);

router.get(
  "/apisirs6v2/rllimatitiksatusatusehat",
  verifyToken,
  getDataRLLimaTitikSatuSatuSehat
);

router.get(
  "/apisirs6v2/rllimatitiksatusatusehatshow",
  verifyToken,
  getDataRLLimaTitikSatuSatuSehatShow
);

router.get(
  "/apisirs6v2/rllimatitiksatusatusehatpage",
  verifyToken,
  getDataRLLimaTitikSatuSatuSehatShowPaging
);

router.get(
  "/apisirs6v2/getMasterumursatusehat",
  verifyToken,
  getMasterumursatusehat
);

// RL 5.3
router.get("/apisirs6v2/rllimatitikdua", verifyToken, getRLLimaTitikDua);

// RL 5.3
router.get("/apisirs6v2/rllimatitiktiga", verifyToken, getRLLimatitikTiga);

export default router;
