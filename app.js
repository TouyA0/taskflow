// Au démarrage, on reprend les tâches enregistrées
let taches = chargerTaches();

const TITRE_MAX = 100;

// Id de la tâche en cours de modification, null si le formulaire sert à ajouter
let idEnModification = null;

// Les éléments de la page dont on a besoin
const formulaire = document.getElementById("formulaire-tache");
const champTitre = document.getElementById("titre");
const champDescription = document.getElementById("description");
const champPriorite = document.getElementById("priorite");
const champCategorie = document.getElementById("categorie");
const champEcheance = document.getElementById("echeance");
const messageErreur = document.getElementById("message-erreur");
const listeTaches = document.getElementById("liste-taches");
const titreFormulaire = document.getElementById("titre-formulaire");
const boutonValider = document.getElementById("bouton-valider");
const boutonAnnuler = document.getElementById("bouton-annuler");

// Donne un id basé sur l'heure, en évitant un id déjà pris
function genererId() {
  let id = Date.now();
  while (taches.some(function (tache) { return tache.id === id; })) {
    id = id + 1;
  }
  return id;
}

// Retrouve une tâche à partir de son id
function trouverTache(id) {
  return taches.find(function (tache) { return tache.id === id; });
}

// Renvoie le message d'erreur du titre, ou "" si le titre est correct
function validerTitre(titre) {
  if (titre === "") {
    return "Le titre est obligatoire.";
  }
  // maxlength peut être retiré dans les outils développeur : on revérifie ici
  if (titre.length > TITRE_MAX) {
    return "Le titre fait 100 caractères maximum.";
  }
  return "";
}

// Lit les champs du formulaire, pour l'ajout comme pour la modification
function lireChamps() {
  return {
    titre: champTitre.value.trim(),
    description: champDescription.value.trim(),
    priorite: champPriorite.value,
    categorie: champCategorie.value,
    // Un champ date vide renvoie "" : on le remplace par null
    echeance: champEcheance.value === "" ? null : champEcheance.value
  };
}

// Remet le formulaire vide, en mode ajout
function reinitialiserFormulaire() {
  idEnModification = null;
  formulaire.reset();
  messageErreur.textContent = "";
  titreFormulaire.textContent = "Ajouter une tâche";
  boutonValider.textContent = "Ajouter";
  boutonAnnuler.hidden = true;
}

// Pré-remplit le formulaire avec la tâche à modifier
function commencerModification(id) {
  const tache = trouverTache(id);

  idEnModification = id;
  champTitre.value = tache.titre;
  champDescription.value = tache.description;
  champPriorite.value = tache.priorite;
  champCategorie.value = tache.categorie;
  champEcheance.value = tache.echeance === null ? "" : tache.echeance;

  messageErreur.textContent = "";
  titreFormulaire.textContent = "Modifier la tâche";
  boutonValider.textContent = "Enregistrer";
  boutonAnnuler.hidden = false;
  champTitre.focus();
}

function changerStatut(id, estTerminee) {
  trouverTache(id).statut = estTerminee ? "terminee" : "a_faire";
  afficherTaches();
  sauvegarderTaches(taches);
}

function supprimerTache(id) {
  if (!confirm("Supprimer cette tâche ?")) {
    return;
  }

  taches = taches.filter(function (tache) { return tache.id !== id; });

  // Si la tâche supprimée était en cours de modification, on quitte ce mode
  if (id === idEnModification) {
    reinitialiserFormulaire();
  }
  afficherTaches();
  sauvegarderTaches(taches);
}

// Transforme "2026-11-15" en "15/11/2026"
function formaterDate(date) {
  return date.split("-").reverse().join("/");
}

// Crée un paragraphe : textContent empêche d'exécuter du code saisi par l'utilisateur
function creerParagraphe(texte) {
  const paragraphe = document.createElement("p");
  paragraphe.textContent = texte;
  return paragraphe;
}

// Crée un bouton qui lance action quand on clique dessus
function creerBouton(texte, action) {
  const bouton = document.createElement("button");
  bouton.textContent = texte;
  bouton.addEventListener("click", action);
  return bouton;
}

// Vide la liste affichée, puis la reconstruit à partir du tableau
function afficherTaches() {
  listeTaches.textContent = "";

  taches.forEach(function (tache) {
    const element = document.createElement("li");
    element.classList.toggle("terminee", tache.statut === "terminee");
    // La couleur de chaque catégorie est définie dans style.css
    element.classList.add("categorie-" + tache.categorie);

    const caseTerminee = document.createElement("input");
    caseTerminee.type = "checkbox";
    caseTerminee.checked = tache.statut === "terminee";
    caseTerminee.addEventListener("change", function () {
      changerStatut(tache.id, caseTerminee.checked);
    });

    const etiquette = document.createElement("label");
    etiquette.appendChild(caseTerminee);
    etiquette.appendChild(document.createTextNode("Terminée"));
    element.appendChild(etiquette);

    const titre = document.createElement("strong");
    titre.textContent = tache.titre;
    element.appendChild(titre);

    if (tache.description !== "") {
      element.appendChild(creerParagraphe(tache.description));
    }

    element.appendChild(creerParagraphe("Priorité : " + tache.priorite));
    element.appendChild(creerParagraphe("Catégorie : " + tache.categorie));

    if (tache.echeance === null) {
      element.appendChild(creerParagraphe("Échéance : aucune"));
    } else {
      element.appendChild(creerParagraphe("Échéance : " + formaterDate(tache.echeance)));
    }

    element.appendChild(creerBouton("Modifier", function () {
      commencerModification(tache.id);
    }));
    element.appendChild(creerBouton("Supprimer", function () {
      supprimerTache(tache.id);
    }));

    listeTaches.appendChild(element);
  });
}

formulaire.addEventListener("submit", function (evenement) {
  // Empêche le rechargement de la page
  evenement.preventDefault();

  const champs = lireChamps();

  // Titre refusé : on s'arrête ici, la tâche n'est pas changée
  const erreur = validerTitre(champs.titre);
  if (erreur !== "") {
    messageErreur.textContent = erreur;
    return;
  }

  if (idEnModification === null) {
    taches.push({
      id: genererId(),
      titre: champs.titre,
      description: champs.description,
      priorite: champs.priorite,
      categorie: champs.categorie,
      echeance: champs.echeance,
      statut: "a_faire"
    });
  } else {
    // Seuls les champs du formulaire changent : l'id et le statut restent
    const tache = trouverTache(idEnModification);
    tache.titre = champs.titre;
    tache.description = champs.description;
    tache.priorite = champs.priorite;
    tache.categorie = champs.categorie;
    tache.echeance = champs.echeance;
  }

  reinitialiserFormulaire();
  afficherTaches();
  sauvegarderTaches(taches);
});

boutonAnnuler.addEventListener("click", reinitialiserFormulaire);

// Affiche les tâches chargées au démarrage
afficherTaches();
