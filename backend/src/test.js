// TEST UNITAIRES
import chai from "chai";
const expect = chai.expect;
import crypto from "crypto";
import User from "./models/userModel.js";
import Companie from "./models/companieModel.js";
import Application from "./models/applicationModele.js";
import Advertisement from "./models/advertisementModel.js";

describe("User", () => {
  it("connexion réussit", (done) => {
    const email = "nans.diaz@epitech.eu";
    const password = "passNans";

    User.GetConnexion(email, password, (err, results) => {
      if (err) {
        done(err); // En cas d'erreur, signalez le test comme échoué
      } else {
        const hash = crypto.createHash("sha256");
        hash.update(password);
        const hashPassword = hash.digest("hex");
        expect(results).to.be.an("object"); // Vérifiez que l'util      console.log();isateur renvoyé est un objet
        expect(results.email).to.equal(email); // Vérifiez que l'email de l'utilisateur correspond à celui fourni
        expect(results.password).to.equal(hashPassword);
        done(); // Indiquez que le test est terminé
      }
    });
  });

  it("(erreur) connexion avec des informations érroné", (done) => {
    const email = "email_invalide";
    const password = "mot_de_passe_invalide";

    User.GetConnexion(email, password, (err, results) => {
      if (err) {
        done(err); // En cas d'erreur, signalez le test comme échoué
      } else {
        expect(results).to.be.undefined; // Vérifiez que l'utilisateur renvoyé est null en cas d'informations incorrectes
        done(); // Indiquez que le test est terminé
      }
    });
  });
  let ID = 0;

  it("validité insertion d'un user", (done) => {
    const name = "testname";
    const email = "testemail";
    const password = "testpass";

    User.PostNewUser(name, email, password, (err, result) => {
      const hash = crypto.createHash("sha256");
      hash.update(password);
      const hashPassword = hash.digest("hex");
      if (err) {
        done(err); // En cas d'erreur, signalez le test comme échoué
      } else {
        User.GetUserByEmail(email, (err, result) => {
          if (err) {
            done(err);
          } else {
            expect(result).to.be.an("object");
            expect(result.name).to.equal(name);
            expect(result.email).to.equal(email);
            expect(result.password).to.equal(hashPassword);
            ID = result.id;
            done(); // Indiquez que le test est terminé
          }
        });
      }
    });
  });

  it("(erreur) validité d'un user si il manque des informations)", (done) => {
    const name = "";
    const email = "";
    const password = "";
    User.PostNewUser(name, email, password, (err, result) => {
      if (err) {
        done(); // En cas d'erreur, c'est ce que vous attendez, donc signalez le test comme réussi
      } else {
        done("aurait du affiché une erreur"); // Indiquez que le test est terminé
      }
    });
  });

  it("(erreur) doublon", (done) => {
    const name = "test";
    const email = "nans.diaz@epitech.eu";
    const password = "mot_de_passe_invalide2";

    User.PostNewUser(name, email, password, (err, result) => {
      if (err) {
        done(); // En cas d'erreur, c'est ce que vous attendez, donc signalez le test comme réussi
      } else {
        done("aurait du affiché une erreur"); // Indiquez que le test est terminé
      }
    });
  });
  const name = "ModifyName";
  const email = "ModifyEmail";
  const password = "ModifyPass";
  it("Modify user", (done) => {
    User.UpdateUser(ID, name, email, password, (err, result) => {
      if (err) {
        done(err);
      } else {
        done();
      }
    });
  });
  it("(erreur) Modify user", (done) => {
    User.UpdateUser(ID, name, undefined, password, (err, result) => {
      if (err) {
        done();
      } else {
        done("aurait du affiché une erreur");
      }
    });
  });
  it("Suppresion réussit", (done) => {
    User.DeleteUser(ID, (err, result) => {
      if (err) {
        done(err); // En cas d'erreur, signalez le test comme échoué
      } else {
        done(); // Indiquez que le test est terminé
      }
    });
  });
  it("(erreur) id non defini requete suppression", (done) => {
    User.DeleteUser(undefined, (err, results) => {
      if (err) {
        done(); // En cas d'erreur, signalez le test comme échoué
      } else {
        done("erreur dans la requete"); // Indiquez que le test est terminé
      }
    });
  });
});

describe("Companie", () => {
  let ID;
  it("insertion companie", (done) => {
    const name = "Testname";
    const description = "test desc";
    const location = "testLoc";
    Companie.PostCompanie(name, description, location, (err, result) => {
      if (err) {
        done(err);
      } else {
        Companie.GetCompanieByName(name, (err, result) => {
          if (err) {
            done(err);
          } else {
            ID = result.id;
            done();
          }
        });
      }
    });
  });
  it("(error) insertion companie", (done) => {
    const description = "test desc";
    const location = "testLoc";
    Companie.PostCompanie(undefined, description, location, (err, result) => {
      if (err) {
        done();
      } else {
        done("erreur attendu");
      }
    });
  });
  it("modify companie", (done) => {
    const name = "Testname2";
    const description = "test desc2";
    const location = "testLoc2";
    Companie.UpdateCompanie(ID, name, description, location, (err, result) => {
      if (err) {
        done(err);
      } else {
        done();
      }
    });
  });
  it("(error) modify companie", (done) => {
    const name = "testname2";
    const location = "testLoc2";
    Companie.UpdateCompanie(ID, name, undefined, location, (err, result) => {
      if (err) {
        done();
      } else {
        done("erreur attendu");
      }
    });
  });
  it("delete companie", (done) => {
    Companie.DeleteCompanie(ID, (err, result) => {
      if (err) {
        done(err);
      } else {
        done();
      }
    });
  });
  it("(error) delete companie", (done) => {
    Companie.DeleteCompanie(undefined, (err, result) => {
      if (err) {
        done();
      } else {
        done("erreur attendu");
      }
    });
  });
});

describe("Application", () => {
  let ID;
  it("insertion application", (done) => {
    const id_postulant = 7;
    const id_advertisement = 3;
    const email_subject = "test subject";
    const email_body = "test body";
    Application.PostApplication(
      id_postulant,
      id_advertisement,
      email_subject,
      email_body,
      (err, result) => {
        if (err) {
          done(err);
        } else {
          Application.GetApplicationByIDPostIDRes(
            id_postulant,
            id_advertisement,
            (err, result) => {
              if (err) {
                done(err);
              } else {
                ID = result.id;
                done();
              }
            }
          );
        }
      }
    );
  });
  it("(error) insertion application", (done) => {
    const id_postulant = 7;
    const id_advertisement = 3;
    const email_subject = "test subject";
    Application.PostApplication(
      id_postulant,
      id_advertisement,
      email_subject,
      undefined,
      (err, result) => {
        if (err) {
          done();
        } else {
          done("erreur attendu");
        }
      }
    );
  });
  it("modify application", (done) => {
    const id_postulant = 7;
    const id_advertisement = 3;
    const email_subject = "test subject2";
    const email_body = "test body2";
    Application.PutApplication(
      ID,
      id_postulant,
      id_advertisement,
      email_subject,
      email_body,
      (err, result) => {
        if (err) {
          done(err);
        } else {
          done();
        }
      }
    );
  });
  it("(error) modify application", (done) => {
    const id_postulant = 7;
    const id_advertisement = 3;
    const email_subject = "test subject2";
    Application.PutApplication(
      ID,
      id_postulant,
      id_advertisement,
      email_subject,
      undefined,
      (err, result) => {
        if (err) {
          done();
        } else {
          done("erreur attendu");
        }
      }
    );
  });
  it("delete application", (done) => {
    Application.DeleteApplication(ID, (err, result) => {
      if (err) {
        done(err);
      } else {
        done();
      }
    });
  });
  it("(error) delete application", (done) => {
    Application.DeleteApplication(undefined, (err, result) => {
      if (err) {
        done();
      } else {
        done("erreur attendu");
      }
    });
  });
});

describe("Advertisement", () => {
  let ID;
  it("insertion advertisement", (done) => {
    const title = "titletest";
    const description = "description test";
    const salary = 6666;
    const id_responsable = 1;
    Advertisement.PostAdvertisement(
      title,
      description,
      salary,
      id_responsable,
      (err, result) => {
        if (err) {
          done(err);
        } else {
          Advertisement.GetAdvertisementByTitle(title, (err, result) => {
            if (err) {
              done(err);
            } else {
              ID = result.id;
              done();
            }
          });
        }
      }
    );
  });
  it("(erreur) insertion advertisement", (done) => {
    const description = "description test";
    const salary = 6666;
    const id_responsable = 1;
    Advertisement.PostAdvertisement(
      undefined,
      description,
      salary,
      id_responsable,
      (err, result) => {
        if (err) {
          done();
        } else {
          done("erreur attendu");
        }
      }
    );
  });
  it("modify advertisement", (done) => {
    const title = "titletest2";
    const description = "description test2";
    const salary = 6666;
    const id_responsable = 1;
    Advertisement.PutAdvertisement(
      ID,
      title,
      description,
      salary,
      id_responsable,
      (err, result) => {
        if (err) {
          done(err);
        } else {
          done();
        }
      }
    );
  });
  it("(error) modify application", (done) => {
    const description = "description test2";
    const salary = 6666;
    const id_responsable = 1;
    Advertisement.PutAdvertisement(
      ID,
      undefined,
      description,
      salary,
      id_responsable,
      (err, result) => {
        if (err) {
          done();
        } else {
          done("parametre manquant");
        }
      }
    );
  });
  it("delete advertisement", (done) => {
    Advertisement.DeleteAdvertisement(ID, (err, result) => {
      if (err) {
        done(err);
      } else {
        done();
      }
    });
  });
  it("(error) delete application", (done) => {
    Advertisement.DeleteAdvertisement(undefined, (err, result) => {
      if (err) {
        done();
      } else {
        done("erreur attendu");
      }
    });
  });
});
