import express from "express";
import cors from "cors";
import session from "express-session";
// "[javascript]": {
//   "editor.formatOnSave": false
// }

const app = express();

const PORT = 3000;

import router from "./routes/routes.js";

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.options("*", cors());

app.use(
  session({
    secret: "clé secrete",
    resave: false, // ne pas sauvegarder si elle n'a pas changé
    saveUninitialized: true, // save new session même si vide
    cookie: { maxAge: 6000000000, httpOnly:false,}, // durée de vie du cookie session en ms
  })
);

app.use(
  cors({
    origin: "http://localhost:5173", // Remplacez par l'URL de votre frontend
  })
);

app.use(router);

app.listen(PORT, () => {
  console.log("server start on port " + PORT);
});
