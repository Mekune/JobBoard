import {
  GetAllCompanie,
  PostCompanie,
  UpdateCompanie,
  DeleteCompanie,
} from "../models/companieModel.js";

export const AllCompanie = (req, res) => {
  GetAllCompanie((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });
};

export const AddCompanie = (req, res) => {
  const { name, description, location } = req.body;
  PostCompanie(name, description, location, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });
};

export const ModifyCompanie = (req, res) => {
  const { id, name, description, location } = req.body;
  UpdateCompanie(id, name, description, location, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });
};

export const RemoveCompanie = (req, res) => {
  const id = req.body;
  DeleteCompanie(id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });
};
