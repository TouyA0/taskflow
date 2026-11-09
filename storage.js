// Seul fichier qui lit et écrit dans le localStorage

// Chaque compte a sa propre clé pour ses tâches
function cleTaches(identifiant) {
  return "taskflow_taches_" + identifiant;
}

// Vérifie qu'un élément relu respecte le modèle de tâche du README
function tacheValide(tache) {
  return tache !== null
    && typeof tache === "object"
    && typeof tache.id === "number"
    && typeof tache.titre === "string"
    && typeof tache.description === "string"
    && ["basse", "moyenne", "haute"].includes(tache.priorite)
    && ["cours", "perso", "projet"].includes(tache.categorie)
    && (tache.echeance === null || typeof tache.echeance === "string")
    && ["a_faire", "terminee"].includes(tache.statut);
}

// Renvoie les tâches enregistrées, ou [] si la clé est absente ou les données cassées
function chargerTaches(identifiant) {
  try {
    const donnees = JSON.parse(localStorage.getItem(cleTaches(identifiant)));
    if (Array.isArray(donnees)) {
      // On garde les tâches valides et on ignore les autres
      return donnees.filter(tacheValide);
    }
    return [];
  } catch (erreur) {
    return [];
  }
}

// Limite connue (README) : si le localStorage est plein, setItem lève une erreur
function sauvegarderTaches(identifiant, taches) {
  localStorage.setItem(cleTaches(identifiant), JSON.stringify(taches));
}

const CLE_UTILISATEURS = "taskflow_utilisateurs";

// Vérifie qu'un élément relu respecte le modèle d'utilisateur du README
function utilisateurValide(utilisateur) {
  return utilisateur !== null
    && typeof utilisateur === "object"
    && typeof utilisateur.identifiant === "string"
    && typeof utilisateur.sel === "string"
    && typeof utilisateur.hash === "string"
    && typeof utilisateur.echecs === "number"
    && (utilisateur.bloqueJusqua === null || typeof utilisateur.bloqueJusqua === "number");
}

// Renvoie les comptes valides, ou [] si la clé est absente ou les données cassées
function chargerUtilisateurs() {
  try {
    const donnees = JSON.parse(localStorage.getItem(CLE_UTILISATEURS));
    if (Array.isArray(donnees)) {
      return donnees.filter(utilisateurValide);
    }
    return [];
  } catch (erreur) {
    return [];
  }
}

function sauvegarderUtilisateurs(utilisateurs) {
  localStorage.setItem(CLE_UTILISATEURS, JSON.stringify(utilisateurs));
}

// Remplace un compte enregistré par sa nouvelle version
function mettreAJourUtilisateur(utilisateurModifie) {
  const utilisateurs = chargerUtilisateurs().map(function (utilisateur) {
    return utilisateur.identifiant === utilisateurModifie.identifiant ? utilisateurModifie : utilisateur;
  });
  sauvegarderUtilisateurs(utilisateurs);
}

const CLE_SESSION = "taskflow_session";

// Renvoie l'identifiant connecté, ou null si la session est absente ou cassée
function lireSession() {
  try {
    const identifiant = JSON.parse(localStorage.getItem(CLE_SESSION));
    return typeof identifiant === "string" ? identifiant : null;
  } catch (erreur) {
    return null;
  }
}

function enregistrerSession(identifiant) {
  localStorage.setItem(CLE_SESSION, JSON.stringify(identifiant));
}

function supprimerSession() {
  localStorage.removeItem(CLE_SESSION);
}
