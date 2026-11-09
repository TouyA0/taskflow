// Toute la partie sécurité de l'application

// Valeur recommandée par l'OWASP pour PBKDF2 avec SHA-256
const ITERATIONS_PBKDF2 = 600000;

const MESSAGE_SANS_CRYPTO = "Action impossible : ouvre l'application en localhost avec Live Server.";

// Les éléments de la page dont on a besoin
const formulaireInscription = document.getElementById("formulaire-inscription");
const champIdentifiant = document.getElementById("identifiant");
const champMotDePasse = document.getElementById("mot-de-passe");
const jauge = document.getElementById("jauge");
const texteReglesManquantes = document.getElementById("regles-manquantes");
const messageInscription = document.getElementById("message-inscription");
const boutonInscription = document.getElementById("bouton-inscription");
const lienVersConnexion = document.getElementById("lien-vers-connexion");

const formulaireConnexion = document.getElementById("formulaire-connexion");
const champIdentifiantConnexion = document.getElementById("identifiant-connexion");
const champMotDePasseConnexion = document.getElementById("mot-de-passe-connexion");
const messageConnexion = document.getElementById("message-connexion");
const boutonConnexion = document.getElementById("bouton-connexion");
const lienVersInscription = document.getElementById("lien-vers-inscription");

const ecranConnexion = document.getElementById("ecran-connexion");
const ecranInscription = document.getElementById("ecran-inscription");
const ecranTaches = document.getElementById("ecran-taches");
const boutonDeconnexion = document.getElementById("bouton-deconnexion");

// Renvoie la liste des règles que le mot de passe ne respecte pas
function reglesManquantes(motDePasse) {
  const manquantes = [];

  // Array.from compte un emoji comme un seul caractère
  if (Array.from(motDePasse).length < 8) {
    manquantes.push("8 caractères minimum");
  }
  // \p{Lu} = une majuscule, accentuée ou non
  if (!/\p{Lu}/u.test(motDePasse)) {
    manquantes.push("une majuscule");
  }
  // \p{N} = un chiffre
  if (!/\p{N}/u.test(motDePasse)) {
    manquantes.push("un chiffre");
  }
  // \p{L} = une lettre : « é » est donc une lettre, pas un caractère spécial
  if (!/[^\p{L}\p{N}]/u.test(motDePasse)) {
    manquantes.push("un caractère spécial");
  }

  return manquantes;
}

// Renvoie "faible", "moyen" ou "fort" selon le nombre de règles respectées
function niveauMotDePasse(motDePasse) {
  const reglesRespectees = 4 - reglesManquantes(motDePasse).length;

  if (reglesRespectees <= 2) {
    return "faible";
  }
  if (reglesRespectees === 3) {
    return "moyen";
  }
  return "fort";
}

// Met à jour la jauge et les règles manquantes
function mettreAJourJauge() {
  const motDePasse = champMotDePasse.value;
  const niveau = niveauMotDePasse(motDePasse);
  const manquantes = reglesManquantes(motDePasse);

  jauge.textContent = niveau;
  // La couleur de chaque niveau est définie dans style.css
  jauge.className = "jauge-" + niveau;

  if (manquantes.length === 0) {
    texteReglesManquantes.textContent = "";
  } else {
    texteReglesManquantes.textContent = "Il manque : " + manquantes.join(", ");
  }
}

// Met l'identifiant en minuscules et retire les espaces autour
function normaliserIdentifiant(identifiant) {
  return identifiant.trim().toLowerCase();
}

// Renvoie le message d'erreur de l'identifiant, ou "" s'il est correct
function validerIdentifiant(identifiant) {
  if (identifiant === "") {
    return "L'identifiant est obligatoire.";
  }
  if (!/^[a-z0-9_-]+$/.test(identifiant)) {
    return "L'identifiant ne peut contenir que des lettres sans accent, des chiffres, - et _.";
  }

  if (trouverUtilisateur(identifiant) !== undefined) {
    return "Cet identifiant est déjà pris.";
  }
  return "";
}

// Retrouve un compte, ou undefined s'il n'existe pas
function trouverUtilisateur(identifiant) {
  return chargerUtilisateurs().find(function (utilisateur) {
    return utilisateur.identifiant === identifiant;
  });
}

// Transforme des octets en texte hexadécimal (2 caractères par octet)
function enHexadecimal(octets) {
  return Array.from(octets, function (octet) {
    return octet.toString(16).padStart(2, "0");
  }).join("");
}

// Transforme un texte hexadécimal en octets (l'inverse de enHexadecimal)
function depuisHexadecimal(texte) {
  const octets = new Uint8Array(texte.length / 2);
  for (let i = 0; i < octets.length; i++) {
    octets[i] = parseInt(texte.slice(i * 2, i * 2 + 2), 16);
  }
  return octets;
}

// Calcule le hash PBKDF2 (SHA-256) du mot de passe, renvoyé en hexadécimal
async function hacherMotDePasse(motDePasse, sel) {
  const octetsMotDePasse = new TextEncoder().encode(motDePasse);

  const cle = await crypto.subtle.importKey(
    "raw", octetsMotDePasse, "PBKDF2", false, ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt: sel, iterations: ITERATIONS_PBKDF2 },
    cle,
    256
  );

  return enHexadecimal(new Uint8Array(bits));
}

// Tire un sel unique, hache le mot de passe et enregistre le nouveau compte
async function creerCompte(identifiant, motDePasse) {
  const sel = crypto.getRandomValues(new Uint8Array(16));
  const hash = await hacherMotDePasse(motDePasse, sel);

  const utilisateurs = chargerUtilisateurs();
  utilisateurs.push({
    identifiant: identifiant,
    sel: enHexadecimal(sel),
    hash: hash,
    echecs: 0,
    bloqueJusqua: null
  });
  sauvegarderUtilisateurs(utilisateurs);
}

// Recalcule l'empreinte du mot de passe tapé avec le sel du compte, puis compare
async function motDePasseCorrect(utilisateur, motDePasse) {
  const hash = await hacherMotDePasse(motDePasse, depuisHexadecimal(utilisateur.sel));
  return hash === utilisateur.hash;
}

function afficherMessage(element, texte, estUnSucces) {
  element.textContent = texte;
  element.classList.toggle("succes", estUnSucces);
}

// Affiche un seul écran et vide les formulaires de connexion et d'inscription
function afficherEcran(ecran) {
  ecranConnexion.hidden = true;
  ecranInscription.hidden = true;
  ecranTaches.hidden = true;
  ecran.hidden = false;

  formulaireConnexion.reset();
  formulaireInscription.reset();
  mettreAJourJauge();
  afficherMessage(messageConnexion, "", false);
  afficherMessage(messageInscription, "", false);
}

// Montre l'écran des tâches et demande à app.js de charger celles du compte
function ouvrirSession(identifiant) {
  afficherEcran(ecranTaches);
  ouvrirTaches(identifiant);
}

function seDeconnecter() {
  supprimerSession();
  fermerTaches();
  afficherEcran(ecranConnexion);
}

// Choisit l'écran de départ : appelée à la fin de app.js, le dernier script chargé
function demarrer() {
  const identifiant = lireSession();

  if (identifiant !== null && trouverUtilisateur(identifiant) !== undefined) {
    ouvrirSession(identifiant);
  } else {
    afficherEcran(ecranConnexion);
  }
}

champMotDePasse.addEventListener("input", mettreAJourJauge);
boutonDeconnexion.addEventListener("click", seDeconnecter);

lienVersInscription.addEventListener("click", function (evenement) {
  // Empêche le lien de changer l'adresse de la page
  evenement.preventDefault();
  afficherEcran(ecranInscription);
});

lienVersConnexion.addEventListener("click", function (evenement) {
  evenement.preventDefault();
  afficherEcran(ecranConnexion);
});

formulaireConnexion.addEventListener("submit", async function (evenement) {
  evenement.preventDefault();

  if (crypto.subtle === undefined) {
    afficherMessage(messageConnexion, MESSAGE_SANS_CRYPTO, false);
    return;
  }

  const identifiant = normaliserIdentifiant(champIdentifiantConnexion.value);
  const motDePasse = champMotDePasseConnexion.value;

  boutonConnexion.disabled = true;
  try {
    const utilisateur = trouverUtilisateur(identifiant);

    if (utilisateur !== undefined && await motDePasseCorrect(utilisateur, motDePasse)) {
      enregistrerSession(identifiant);
      ouvrirSession(identifiant);
    } else {
      // Même message dans les deux cas : on ne révèle pas si le compte existe
      afficherMessage(messageConnexion, "Identifiant ou mot de passe incorrect.", false);
    }
  } catch (erreurConnexion) {
    afficherMessage(messageConnexion, "La connexion a échoué.", false);
  } finally {
    boutonConnexion.disabled = false;
  }
});

formulaireInscription.addEventListener("submit", async function (evenement) {
  // Empêche le rechargement de la page
  evenement.preventDefault();

  const identifiant = normaliserIdentifiant(champIdentifiant.value);
  const motDePasse = champMotDePasse.value;

  const erreur = validerIdentifiant(identifiant);
  if (erreur !== "") {
    afficherMessage(messageInscription, erreur, false);
    return;
  }

  if (niveauMotDePasse(motDePasse) !== "fort") {
    afficherMessage(messageInscription, "Le mot de passe doit être de niveau fort.", false);
    return;
  }

  // crypto.subtle n'existe que sur une page sécurisée (localhost ou HTTPS)
  if (crypto.subtle === undefined) {
    afficherMessage(messageInscription, MESSAGE_SANS_CRYPTO, false);
    return;
  }

  // Bouton désactivé pendant le calcul : un double clic ne crée pas deux comptes
  boutonInscription.disabled = true;
  try {
    await creerCompte(identifiant, motDePasse);
    afficherEcran(ecranConnexion);
    afficherMessage(messageConnexion, "Compte créé, tu peux te connecter", true);
  } catch (erreurCreation) {
    afficherMessage(messageInscription, "Le compte n'a pas pu être créé.", false);
  } finally {
    boutonInscription.disabled = false;
  }
});
