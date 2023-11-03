import {
  GetAllUser,
  GetConnexion,
  PostNewUser,
  PostUserIntoPostulant,
  PostUserIntoResponsable,
  GetUserByEmail,
  UpdateUser,
  DeleteUser,
} from "../models/userModel.js";

export const AllUser = (req, res) => {
  GetAllUser((err, results) => {
    if (err) {
      res.send(err);
    } else {
      console.log(req.session.UserEmail);
      res.json(results);
    }
  });
};
export const UserByEmail = (req, res) => {
  const email = req.body;
  GetUserByEmail(email, (results) => {
    const id = results[0].id;
    console.log(id);
    res.send(results[0]);
  });
};
export const Connexion = (req, res) => {
  const { email, password } = req.body;
  GetConnexion(email, password, (err, results) => {
    if (err) {
      res.send(err);
    } else if (results === undefined) {
      res.json("Email ou password incorrect");
    } else {
      req.session.UserID = results.id;
      req.session.UserEmail = results.email;
      req.session.UserName = results.name;
      req.session.isAdmin = results.isAdmin
      res.json(req.session);
    }
  });
};
export const AddUser = (req, res) => {
  const { name, email, password } = req.body;
  PostNewUser(name, email, password, (err, results) => {
    if (err) {
      res.send(results);
    } else {
      // GetUserIDByEmail(email, (resultID) => {
      //   const id = resultID[0].id;
      //   console.log(id);
      //   if (role) {
      //     PostUserIntoResponsable(id);
      //   } else {
      //     PostUserIntoPostulant(id);
      //   }
      // });
    }
    res.json(results);
  });
};

export const ModifyUser = (req, res) => {
  const { id, name, email, password } = req.body;
  UpdateUser(id, name, email, password, (err, results) => {
    if (err) {
      res.Send(err);
    } else {
      res.json(results);
    }
  });
};

export const RemoveUser = (req, res) => {
  const id = req.body;
  DeleteUser(id, (err, results) => {
    if (err) {
      res.Send(err);
    } else {
      res.json(results);
    }
  });
};
