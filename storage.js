// Seul fichier qui lit et écrit dans le localStorage

// Identifiant temporaire : à remplacer par l'utilisateur connecté au sprint 3
const IDENTIFIANT_ACTUEL = "invite";

function cleTaches() {
  return "taskflow_taches_" + IDENTIFIANT_ACTUEL;
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
function chargerTaches() {
  try {
    const donnees = JSON.parse(localStorage.getItem(cleTaches()));
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
function sauvegarderTaches(taches) {
  localStorage.setItem(cleTaches(), JSON.stringify(taches));
}
