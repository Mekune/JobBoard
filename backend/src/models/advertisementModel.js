import db from "../config/mysql.js";

export const GetAllAdvertisement = (result) => {
  db.query(
    "SELECT Advertisements.id, title,Advertisements.description,salary,date_posted,User.name as responsable_name,Companies.name as companie_name,location FROM Advertisements,Companies,Responsable,User WHERE User.id = Responsable.id and Responsable.id = Advertisements.id_responsable and Responsable.id_comp = Companies.id",
    (err, results) => {
      if (err) {
        result(err, null);
      } else {
        results.forEach((element) => {
          element.date_posted = formatDate(element.date_posted);
        });
        result(null, results);
      }
    }
  );
};

export const GetAdvertisementByTitle = (title, result) => {
  db.query(
    "SELECT * FROM Advertisements WHERE title = '" + title + "'",
    (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results[0]);
      }
    }
  );
};

export const PostAdvertisement = (
  title,
  description,
  salary,
  id_responsable,
  result
) => {
  if (!title || !description || !salary || !id_responsable) {
    const mess_err = "parametre manquant";
    result(mess_err, null);
  } else {
    db.query(
      "INSERT INTO Advertisements(title, description, salary, id_responsable) VALUES ('" +
        title +
        "','" +
        description +
        "','" +
        salary +
        "','" +
        id_responsable +
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

export const PutAdvertisement = (
  id,
  title,
  description,
  salary,
  id_responsable,
  result
) => {
  if (!id || !title || !description || !salary || !id_responsable) {
    const mess_err = "parametre manquant";
    result(mess_err, null);
  } else {
    db.query(
      "UPDATE Advertisements SET title = '" +
        title +
        "', description ='" +
        description +
        "',salary='" +
        salary +
        "', id_responsable = '" +
        id_responsable +
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

export const DeleteAdvertisement = (id, result) => {
    if (!id) {
        const mess_err = "parametre manquant";
        result(mess_err, null);
    } else {
        db.query(
            'DELETE FROM Advertisements WHERE id = "' + id + '"',
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

function formatDate(dateString) {
  const date = dateString;

  // Obtenez le jour, le mois, l'année, l'heure et les minutes
  const day = date.getDate();
  const month = date.getMonth() + 1; // Ajoutez 1 car les mois sont indexés à partir de 0
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Formatez la date
  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

  return formattedDate;
}

export default {
  PostAdvertisement,
  PutAdvertisement,
  DeleteAdvertisement,
  GetAdvertisementByTitle,
};
