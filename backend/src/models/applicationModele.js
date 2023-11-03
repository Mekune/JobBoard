import db from "../config/mysql.js";

export const GetAllApplication = (result) => {
  db.query("SELECT * FROM Applications", (err, results) => {
    if (err) {
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const GetApplicationByIDPostIDRes = (id_post, id_adv, result) => {
  db.query(
    "SELECT * FROM Applications WHERE id_postulant = '" +
      id_post +
      "' and id_advertisement = '" +
      id_adv +
      "'",
    (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results[0]);
      }
    }
  );
};

export const PostApplication = (
  id_postulant,
  id_advertisement,
  email_subject,
  email_body,
  result
) => {
  if (!id_postulant || !id_advertisement || !email_subject || !email_body) {
    const mess_err = "parametre manquant";
    result(mess_err, null);
  } else {
    db.query(
      "INSERT INTO Applications(id_postulant, id_advertisement, email_subject, email_body) VALUES ('" +
        id_postulant +
        "','" +
        id_advertisement +
        "','" +
        email_subject +
        "','" +
        email_body +
        "')",
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

export const PutApplication = (
  id,
  id_postulant,
  id_advertisement,
  email_subject,
  email_body,
  result
) => {
  if (
    !id ||
    !id_postulant ||
    !id_advertisement ||
    !email_subject ||
    !email_body
  ) {
    const mess_err = "parametre manquant";
    result(mess_err, null);
  } else {
    db.query(
      "UPDATE Applications SET id_postulant = '" +
        id_postulant +
        "', id_advertisement ='" +
        id_advertisement +
        "',email_subject='" +
        email_subject +
        "', email_body = '" +
        email_body +
        "' WHERE id = " +
        id,
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

export const DeleteApplication = (id, result) => {
  if (!id) {
    const mess_err = "parametre manquant";
    result(mess_err, null);
  } else {
    db.query(
      'DELETE FROM Applications WHERE id = "' + id + '"',
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
  PostApplication,
  PutApplication,
  DeleteApplication,
  GetApplicationByIDPostIDRes,
};
