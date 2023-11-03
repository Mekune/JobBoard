import {
  DeleteApplication,
  GetAllApplication,
  PostApplication,
  PutApplication,
} from "../models/applicationModele.js";

export const AllApplication = (req, res) => {
  GetAllApplication((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });
};

export const AddApplication = (req, res) => {
  const { id_postulant, id_advertisement, email_subject, email_body } =
    req.body;
  PostApplication(
    id_postulant,
    id_advertisement,
    email_subject,
    email_body,
    (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.send(results);
      }
    }
  );
};

export const ModifyApplication = (req, res) => {
  const { id_postulant, id_advertisement, email_subject, email_body } =
    req.body;
  PutApplication(
    id_postulant,
    id_advertisement,
    email_subject,
    email_body,
    (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.send(results);
      }
    }
  );
};

export const RemoveApplication = (req, res) => {
  const id = req.body;
  DeleteApplication(id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });
};
