import { LoginUser, getUser, registrasiUser } from "../controller/Auth.js";
import { postBarang, getBarang ,deletebarang, getSatuBarang, updateBarang } from "../controller/DataBarang.js";
import UploadImageCloud from "../middleware/uploadImageCloud.js";
import express from "express";
const router = express.Router();

// barang
router.post('/barang',UploadImageCloud.single("foto_barang"), postBarang);
router.get('/barang',getBarang);
router.get('/barang/:id',getSatuBarang);
router.delete('/barang/:id',deletebarang);
router.put('/barang/:id',UploadImageCloud.single("foto_barang"), updateBarang);

// auth
router.post('/registrasi', registrasiUser);
router.post('/login', LoginUser);
router.get('/user', getUser);


export default router;