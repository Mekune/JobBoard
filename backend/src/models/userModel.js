import db from "../config/mysql.js";
import crypto from "crypto";

const HashPassword = (results) => {
  const hash = crypto.createHash("sha256");
  hash.update(password);
  const hashPassword = hash.digest("hex");
  results;
};

export const GetAllUser = (result) => {
  db.query("SELECT * FROM User", (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};
export const GetUserByEmail = (email, result) => {
  db.query(
    "SELECT * FROM User WHERE email = '" + email + "'",
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results[0]);
      }
    }
  );
};

export const GetConnexion = (email, password, result) => {
  const hash = crypto.createHash("sha256");
  hash.update(password);
  const hashPassword = hash.digest("hex");
  db.query(
    'SELECT * FROM User WHERE email = "' +
      email +
      '"' +
      ' and password = "' +
      hashPassword +
      '"',
    (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results[0]);
      }
    }
  );
};

export const PostNewUser = (name, email, password, result) => {
  // Vérifiez que toutes les informations sont présentes
  if (!name || !email || !password) {
    const errorMessage =
      "Paramètres manquants : name, email et password sont requis.";
    return result(errorMessage, null);
  }

  const hash = crypto.createHash("sha256");
  hash.update(password);
  const hashPassword = hash.digest("hex");

  db.query(
    'INSERT into User (name, email, password, isAdmin) VALUES ("' +
      name +
      '","' +
      email +
      '","' +
      hashPassword +
      '" , "' +
      0 +
      '")',
    (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results[0]);
      }
    }
  );
};

export const PostUserIntoPostulant = (id, result) => {
  db.query(
    'INSERT into User (name, email, password, isAdmin) VALUES ("' +
      name +
      '","' +
      email +
      '","' +
      hashPassword +
      '" , "' +
      0 +
      '")',
    (err, results) => {
      if (err) {
        result(err, "parametre manquant");
      } else if (
        name === undefined ||
        email === undefined ||
        password === undefined
      ) {
        return;
      } else {
        result(null, results[0]);
      }
    }
  );
};

export const PostUserIntoResponsable = (id, result) => {
  db.query(
    'INSERT into User (name, email, password, isAdmin) VALUES ("' +
      name +
      '","' +
      email +
      '","' +
      hashPassword +
      '" , "' +
      0 +
      '")',
    (err, results) => {
      if (err) {
        result(err, "parametre manquant");
      } else if (
        name === undefined ||
        email === undefined ||
        password === undefined
      ) {
        return;
      } else {
        result(null, results[0]);
      }
    }
  );
};

export const UpdateUser = (id, name, email, password, result) => {
  const hash = crypto.createHash("sha256");
  hash.update(password);
  const hashPassword = hash.digest("hex");
  if (!id || !name || !email || !password) {
    const mess_err = "Parametre manquant";
    result(mess_err, null);
  } else {
    db.query(
      'UPDATE User SET name = "' +
        name +
        '", password = "' +
        hashPassword +
        '",email = "' +
        email +
        '" WHERE id = "' +
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

export const DeleteUser = (id, result) => {
  if (!id) {
    const mess_err = "ID est non défini";
    result(mess_err, null);
  } else {
    db.query("DELETE FROM User WHERE id = " + id, (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    });
  }
};

export default {
  GetConnexion,
  PostNewUser,
  GetUserByEmail,
  DeleteUser,
  UpdateUser,
};
