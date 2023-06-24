import bcrypt from "bcrypt";
import dbs from "../models/index.js";
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
    try {
        const user = await dbs.user.findAll();
        res.send({
            status: 202,
            message: "Success",
            data: user,
        });
    } catch (error) {
        res.send({
            status: 500,
            message:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const registrasiUser = async (req, res) => {
    try {
        const { nama, email, password } = req.body;
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password.toString(), salt);
        await dbs.user.create({ nama: nama, email: email, password: hashPassword });
        res.send({
            status: 200,
            message: "Success",
        });
    } catch (error) {
        res.send({
            status: 500,
            message:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await dbs.user.findOne({
            where: {
                email: email,
            }
        });

        if (!user) return res.send({ status: 400, message: "User Tidak Ada" });
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.send({ status: 400, message: "Password salah" });

        const token = jwt.sign(
            {
                id: user.id,
                nama: user.nama,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );
        res.status(200).send({
            status: 200,
            token: token,
            message: "success",
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
};