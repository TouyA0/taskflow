// Les tâches du compte connecté : vide tant que personne n'est connecté
let taches = [];

// Identifiant du compte connecté, null si personne n'est connecté
let identifiantConnecte = null;

const TITRE_MAX = 100;

// Rang de chaque priorité pour le tri : le plus grand passe en premier
const RANG_PRIORITE = { haute: 3, moyenne: 2, basse: 1 };

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
const utilisateurConnecte = document.getElementById("utilisateur-connecte");
const formulaireFiltres = document.getElementById("formulaire-filtres");
const champTri = document.getElementById("tri");
const filtreStatut = document.getElementById("filtre-statut");
const filtreCategorie = document.getElementById("filtre-categorie");
const champRecherche = document.getElementById("recherche");
const messageAucuneTache = document.getElementById("aucune-tache");

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

// Appelée par auth.js à la connexion : charge et affiche les tâches du compte
function ouvrirTaches(identifiant) {
  identifiantConnecte = identifiant;
  taches = chargerTaches(identifiant);
  utilisateurConnecte.textContent = "Connecté en tant que " + identifiant;
  // Le tri et les filtres reviennent à zéro à chaque connexion
  formulaireFiltres.reset();
  reinitialiserFormulaire();
  afficherTaches();
}

// Appelée par auth.js à la déconnexion : plus rien ne reste en mémoire ni à l'écran
function fermerTaches() {
  identifiantConnecte = null;
  taches = [];
  utilisateurConnecte.textContent = "";
  reinitialiserFormulaire();
  afficherTaches();
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
  sauvegarderTaches(identifiantConnecte, taches);
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
  sauvegarderTaches(identifiantConnecte, taches);
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

function comparerPriorite(tacheA, tacheB) {
  return RANG_PRIORITE[tacheB.priorite] - RANG_PRIORITE[tacheA.priorite];
}

// Date la plus proche en premier, tâches sans échéance à la fin
function comparerEcheance(tacheA, tacheB) {
  if (tacheA.echeance === tacheB.echeance) {
    return 0;
  }
  if (tacheA.echeance === null) {
    return 1;
  }
  if (tacheB.echeance === null) {
    return -1;
  }
  // Au format AAAA-MM-JJ, l'ordre du texte est aussi l'ordre des dates
  return tacheA.echeance < tacheB.echeance ? -1 : 1;
}

// Renvoie les tâches à afficher, filtrées puis triées
function tachesAAfficher() {
  const statut = filtreStatut.value;
  const categorie = filtreCategorie.value;
  const recherche = champRecherche.value.trim().toLowerCase();

  // filter crée un nouveau tableau : le tri ne réordonne jamais taches
  const resultat = taches.filter(function (tache) {
    return (statut === "toutes" || tache.statut === statut)
      && (categorie === "toutes" || tache.categorie === categorie)
      && tache.titre.toLowerCase().includes(recherche);
  });

  if (champTri.value === "priorite") {
    resultat.sort(comparerPriorite);
  } else if (champTri.value === "echeance") {
    resultat.sort(comparerEcheance);
  }
  return resultat;
}

// Vide la liste affichée, puis la reconstruit à partir du tableau
function afficherTaches() {
  listeTaches.textContent = "";

  const tachesVisibles = tachesAAfficher();
  messageAucuneTache.hidden = tachesVisibles.length !== 0;

  tachesVisibles.forEach(function (tache) {
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
  sauvegarderTaches(identifiantConnecte, taches);
});

boutonAnnuler.addEventListener("click", reinitialiserFormulaire);

// Un seul écouteur suffit : l'événement des 4 champs remonte jusqu'au formulaire
formulaireFiltres.addEventListener("input", afficherTaches);

// Entrée dans la recherche ne doit pas recharger la page
formulaireFiltres.addEventListener("submit", function (evenement) {
  evenement.preventDefault();
});

// Tous les scripts sont chargés : auth.js peut choisir l'écran de départ
demarrer();
