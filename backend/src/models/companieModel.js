import db from "../config/mysql.js";

export const GetAllCompanie = (result) => {
  db.query("SELECT * FROM Companies", (err, results) => {
    if (err) {
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const GetCompanieByName = (name, result) => {
  db.query(
    "SELECT * FROM Companies WHERE name = '" + name + "'",
    (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results[0]);
      }
    }
  );
};

export const PostCompanie = (name, description, location, result) => {
  if (!name || !description || !location) {
    const mess_err = "parametre manquant";
    result(mess_err, null);
  } else {
    db.query(
      'INSERT INTO Companies (name, description, location) VALUES ( "' +
        name +
        '","' +
        description +
        '","' +
        location +
        '")',
      (err, results) => {
        if (err) {
          result(err, null);
        } else {
          result(null, results);
        }
      }
    );
  }
};

export const UpdateCompanie = (id, name, description, location, result) => {
  if (!id || !name || !description || !location) {
    const mess_err = "parametre manquant";
    result(mess_err, null);
  } else {
    db.query(
      'UPDATE Companies SET name = "' +
        name +
        '", description = "' +
        description +
        '",location="' +
        location +
        '"WHERE id="' +
        id +
        '"',
      (err, results) => {
        if (err) {
          result(err, null);
        } else {
          result(null, results);
        }
      }
    );
  }
};

export const DeleteCompanie = (id, result) => {
  if (!id) {
    const mess_err = "parametre manquant";
    result(mess_err, null);
  } else {
    db.query(
      'DELETE FROM Companies WHERE id = "' + id + '"',
      (err, results) => {
        if (err) {
          result(err, null);
        } else {
          result(null, results);
        }
      }
    );
  }
};

export default {
  PostCompanie,
  UpdateCompanie,
  DeleteCompanie,
  GetCompanieByName,
};
