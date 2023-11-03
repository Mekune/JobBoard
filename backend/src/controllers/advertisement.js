import {
  GetAllAdvertisement,
  PostAdvertisement,
  PutAdvertisement,
  DeleteAdvertisement,
} from "../models/advertisementModel.js";

export const AllAdvertisement = (req, res) => {
  GetAllAdvertisement((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });
};

export const AddAdvertisement = (req, res) => {
  const { title, description, salary, id_responsable } = req.body;
  PostAdvertisement(
    title,
    description,
    salary,
    id_responsable,
    (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.send(results);
      }
    }
  );
};

export const ModifyAdvertisement = (req, res) => {
  const { id, title, description, salary, id_responsable } = req.body;
  PutAdvertisement(
      id,
    title,
    description,
    salary,
    id_responsable,
    (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.send(results);
      }
    }
  );
};

export const RemoveAdvertisement = (req, res) => {
  const { id } = req.body;
  DeleteAdvertisement(id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });
};