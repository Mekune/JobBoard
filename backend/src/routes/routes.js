import express from "express";
const router = express.Router();

//#region User
import {
  AllUser,
  UserByEmail,
  Connexion,
  AddUser,
  ModifyUser,
  RemoveUser,
} from "../controllers/user.js";

router.get("/api/users", AllUser);
// router.get("/api/users/getid", UserByEmail);
router.post("/api/users/connexion", Connexion);
router.post("/api/users/add", AddUser);
router.put("/api/users/update", ModifyUser);
router.delete("/api/users/delete", RemoveUser);

//#endregion

//#region Compagnies
import {
  AllCompanie,
  AddCompanie,
  ModifyCompanie,
  RemoveCompanie,
} from "../controllers/companie.js";

router.get("/api/companie", AllCompanie);
router.post("/api/companie/add", AddCompanie);
router.put("/api/companie/update", ModifyCompanie);
router.delete("/api/companie/delete", RemoveCompanie);
//#endregion

//#region Applications
import {
  AllApplication,
  AddApplication,
  ModifyApplication,
  RemoveApplication,
} from "../controllers/application.js";
router.get("/api/application", AllApplication);
router.post("/api/application/add", AddApplication);
router.put("/api/application/update", ModifyApplication);
router.delete("/api/application/delete", RemoveApplication);
// add
// modify
// supp
//#endregion

//#region Advertisements
import {
  AllAdvertisement,
  AddAdvertisement,
  ModifyAdvertisement,
  RemoveAdvertisement,
} from "../controllers/advertisement.js";

router.get("/api/advertisement", AllAdvertisement);
router.post("/api/advertisement/add", AddAdvertisement);
router.put("/api/advertisement/update", ModifyAdvertisement);
router.delete("/api/advertisement/delete", RemoveAdvertisement);
// add
// mod
// supp
//#endregion

import { AllResponsable } from "../controllers/responsable.js";

router.get("/api/responsable", AllResponsable);

export default router;
