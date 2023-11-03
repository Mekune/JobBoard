import db from "../config/mysql.js";

export const GetAllResponsable = (result) => {
    db.query("SELECT User.name as username, Responsable.id,Companies.name as companiesname FROM User,Responsable,Companies WHERE (User.id = Responsable.id) and (Responsable.id_comp=Companies.id)", (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};