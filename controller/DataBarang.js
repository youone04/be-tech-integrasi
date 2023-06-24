import dbs from "../models/index.js";
import cloudinary from "cloudinary";
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET

});

export const postBarang = async (req, res) => {
    try {
        const { nama_barang, harga_beli, harga_jual, stok } = req.body;
        const cekBarang = await dbs.barang.findAll({
            where: {
                nama_barang: nama_barang
            }
        });

        if (cekBarang.length > 0) {
            return res.status(400).send({
                status: 400,
                message: "Nama sudah ada",
            })
        } else {
            const hsl = new Promise((resolve, reject) => {
                cloudinary.v2.uploader.upload(req.file.path, async (err, result) => {
                    if (err) throw err;
                    try {
                        await dbs.barang.create({
                            foto_barang: result.url,
                            nama_barang,
                            harga_beli,
                            harga_jual,
                            stok

                        })
                    } catch (error) {
                        return res.status(400).send({
                            status: 400,
                            message:
                                error.response && error.response.data.message
                                    ? error.response.data.message
                                    : error.message,
                        });
                    }
                    resolve(result.url);
                });
            });
            const data = await hsl;
            return res.status(200).send({
                status: 200,
                message: "Success",
                data
            })

        }

    } catch (error) {
        res.status(500).send({
            status: 500,
            message:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

export const getBarang = async (req, res) => {
    try {
        const barang = await dbs.barang.findAll();
        res.status(200).send({
            status: 200,
            message: "success",
            barang
        })

    } catch (error) {
        res.status(500).send({
            status: 500,
            message:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

export const deletebarang = async (req, res) => {
    try {
        const { id } = req.params
        const dataId = await dbs.barang.findOne({
            where: {
                id: id
            }
        })

        if (dataId) {
            await dbs.barang.destroy({
                where: {
                    id
                }
            });
            res.send({
                status: 200,
                message: "Berhasil di Hapus",
                dataId
            })
        } else {
            res.send({
                status: 400,
                message: "Data Tidak di Temukan",
                dataId
            })
        }

    } catch (error) {
        res.status(500).send({
            status: 500,
            message:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

export const getSatuBarang = async (req, res) => {
    try {
        const { id } = req.params
        const barang = await dbs.barang.findAll({
            where: {
                id
            }
        });
        res.status(200).send({
            status: 200,
            message: "success",
            barang
        })

    } catch (error) {
        res.status(500).send({
            status: 500,
            message:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}
export const updateBarang = async (req, res) => {
    try {

        const { nama_barang, harga_beli, harga_jual, stok } = req.body;
        const { id } = req.params;

        if (!req.file) {
            await dbs.barang.update(
                { nama_barang, harga_beli, harga_jual, stok },
                { where: { id } }
            );
            res.send({
                status: 200,
                message: "Berhasil Update"
            })
        }else{
            new Promise((resolve, reject) => {
                cloudinary.v2.uploader.upload(req.file.path, async (err, result) => {
                    if (err) throw err;
                    try {
                        await dbs.barang.update({
                            foto_barang: result.url,
                            nama_barang,
                            harga_beli,
                            harga_jual,
                            stok

                        }, { where: { id } })

                    } catch (error) {
                        return res.status(400).send({
                            status: 400,
                            message:
                                error.response && error.response.data.message
                                    ? error.response.data.message
                                    : error.message,
                        });
                    }
                    resolve(result.url);
                });
            });

            return res.status(200).send({
                status: 200,
                message: "Success",
            })
        }

    
    } catch (error) {
        return res.status(500).send({
            status: 500,
            message:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}