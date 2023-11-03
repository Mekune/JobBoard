import { GetAllResponsable } from "../models/responsableModel.js";

export const AllResponsable = (req, res) => {
    GetAllResponsable((err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.send(results);
        }
    });
};