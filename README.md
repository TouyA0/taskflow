# TaskFlow

## Binôme

- Beauvais Lucas
- Guirlinger Quentin

Bachelor Cybersécurité, 1re année.

## Description

TaskFlow est une petite application web de gestion de tâches, réalisée en HTML, CSS et JavaScript sans framework. Elle permet de créer, organiser et suivre ses tâches, avec un système de comptes et de connexion. Tout fonctionne dans le navigateur : il n'y a ni serveur ni base de données, les données sont sauvegardées dans le localStorage.

## Cahier des charges

### Fonctionnalités de base

- Créer une tâche avec un titre, une priorité, une catégorie et une échéance facultative.
- Un titre vide ou fait uniquement d'espaces est refusé ; le titre fait 100 caractères maximum.
- Les dates passées sont acceptées ; une échéance vide vaut `null`.
- Afficher, modifier, cocher comme terminée et supprimer une tâche (avec confirmation avant suppression).
- Retrouver ses tâches après avoir fermé le navigateur.

### Organisation des tâches

- Catégories fixes en couleur : cours, perso, projet. Une seule catégorie par tâche, obligatoire.
- Tri par priorité ou par échéance.
- Filtre par statut (toutes / à faire / terminées), combinable avec le filtre par catégorie.

### Sécurité

- Écran de connexion avant d'accéder aux tâches.
- Plusieurs comptes possibles sur le même navigateur ; chaque utilisateur ne voit que ses propres tâches.
- Identifiant mis en minuscules, sans espaces autour, avec uniquement des lettres sans accent, des chiffres, `-` et `_`.
- Mot de passe de 8 caractères minimum, avec au moins une majuscule, un chiffre et un caractère spécial. Un caractère spécial est tout ce qui n'est ni une lettre ni un chiffre.
- Jauge de robustesse basée sur ces 4 règles : 2 règles ou moins = faible, 3 = moyen, 4 = fort. Seul « fort » permet de créer le compte.
- Mot de passe haché avec PBKDF2 (Web Crypto) et un sel unique par compte, jamais stocké en clair.
- L'utilisateur reste connecté après fermeture du navigateur, jusqu'à ce qu'il clique sur « Se déconnecter ».

### Bonus retenus

- Recherche par mot-clé dans le titre des tâches.
- Blocage de la connexion à un compte pendant 30 secondes après 3 échecs. Le blocage porte sur le compte, pas sur tout le navigateur, et survit au rechargement de la page.

## Contraintes techniques

- HTML, CSS et JavaScript uniquement, sans framework ni bibliothèque externe.
- Pas de serveur ni de base de données : stockage dans le localStorage.
- Uniquement des fonctionnalités déjà présentes dans le navigateur (dont l'API Web Crypto).
- Pas d'outil de build.
- L'API Web Crypto n'est garantie que dans un contexte sécurisé (`localhost` ou HTTPS) : on lance donc toujours l'application en `localhost` avec Live Server.

## Lancer le projet

1. Ouvrir le dossier `taskflow` dans VS Code.
2. Installer l'extension **Live Server** si ce n'est pas déjà fait.
3. Faire un clic droit sur `index.html`, puis **Open with Live Server**.
4. L'application s'ouvre dans le navigateur sur une adresse `localhost`.

## User stories

Légende des priorités : **Must** = fonctionnalités de base, **Should** = organisation et sécurité demandées, **Could** = bonus.

| N° | Priorité | User story | Critères d'acceptation |
|---|---|---|---|
| 1 | Must | En tant qu'étudiant, je veux ajouter une tâche avec un titre, une priorité, une catégorie et une échéance facultative afin de planifier mon travail. | Un titre vide (ou fait uniquement d'espaces) est refusé avec un message, et le titre est limité à 100 caractères ; la catégorie est obligatoire, une seule parmi cours, perso et projet, affichée avec sa couleur ; l'échéance peut rester vide (`null`) ou être passée, et la tâche apparaît tout de suite dans la liste. |
| 2 | Must | En tant qu'étudiant, je veux cocher une tâche comme terminée afin de voir ce qu'il me reste à faire. | Une tâche cochée s'affiche différemment (barrée ou grisée) ; on peut la décocher pour la remettre « à faire ». |
| 3 | Must | En tant qu'étudiant, je veux modifier ou supprimer une tâche existante afin de garder une liste juste et à jour. | À la modification, les champs actuels (catégorie comprise) sont pré-remplis ; un titre vidé est refusé et la tâche garde son ancien titre, avec les mêmes règles qu'à la création ; la suppression demande une confirmation, et si on annule, la tâche reste. |
| 4 | Should | En tant qu'étudiant, je veux trier et filtrer ma liste de tâches afin de savoir par quoi commencer. | Le tri par priorité affiche haute, puis moyenne, puis basse ; le tri par échéance affiche la date la plus proche en premier et les tâches sans échéance à la fin ; les filtres de statut (toutes / à faire / terminées) et de catégorie se combinent, le tri s'applique à la liste filtrée et un message s'affiche si aucune tâche ne correspond. |
| 5 | Should | En tant que nouvel utilisateur, je veux créer un compte avec un mot de passe robuste afin de protéger l'accès à mes tâches. | La jauge se met à jour à chaque caractère selon les 4 règles (8 caractères, majuscule, chiffre, caractère spécial) : 2 règles ou moins = faible, 3 = moyen, 4 = fort, et les règles manquantes sont indiquées ; seul « fort » permet de créer le compte, l'identifiant est normalisé (minuscules, sans espaces autour, lettres sans accent, chiffres, `-` et `_`) et un identifiant déjà utilisé est refusé ; le mot de passe est haché avec PBKDF2 et un sel unique via Web Crypto, jamais stocké en clair. |
| 6 | Should | En tant qu'utilisateur, je veux me connecter, rester connecté et pouvoir me déconnecter afin d'accéder à mes tâches, et seulement aux miennes. | Les tâches sont inaccessibles sans connexion, et un identifiant ou un mot de passe faux affiche une erreur sans préciser lequel est faux ; on reste connecté après fermeture du navigateur jusqu'au clic sur « Se déconnecter », qui ramène à l'écran de connexion ; chaque utilisateur ne voit que ses propres tâches. |
| 7 | Could | En tant qu'étudiant, je veux rechercher une tâche par mot-clé dans son titre afin de la retrouver rapidement. | La recherche porte sur le titre seulement et ignore les majuscules ; elle se combine avec le tri et les filtres, et un message s'affiche si aucune tâche ne correspond ; effacer la recherche réaffiche la liste filtrée. |
| 8 | Could | En tant qu'utilisateur, je veux que la connexion à mon compte soit bloquée après 3 échecs afin d'empêcher quelqu'un de deviner mon mot de passe. | Au 3e échec sur un même compte, sa connexion est bloquée 30 secondes avec le temps restant affiché, et le blocage continue après un rechargement de la page ; les autres comptes peuvent toujours se connecter ; une connexion réussie remet le compteur d'échecs à zéro. |

### Définition de fini

Une story est terminée uniquement si :

- les données concernées sont conservées après un rechargement de la page (localStorage) ;
- tous les textes saisis par l'utilisateur sont affichés avec `textContent`, jamais avec `innerHTML`.

## Structure des fichiers

```
taskflow/
├── index.html
├── style.css
├── storage.js
├── auth.js
├── app.js
├── README.md
└── PROMPTS.md
```

- **index.html** : structure des trois écrans (connexion, inscription et liste des tâches) et chargement des scripts dans l'ordre storage.js, auth.js, app.js.
- **style.css** : mise en page, couleurs des catégories, style des tâches terminées, couleurs de la jauge.
- **storage.js** : seul fichier qui lit et écrit dans le localStorage : comptes, tâches rangées par utilisateur, session et état du blocage.
- **auth.js** : toute la sécurité : vérification des 4 règles, jauge, hachage PBKDF2 avec sel, connexion, session, déconnexion et blocage de 30 secondes par compte.
- **app.js** : les tâches et leur affichage : ajout, modification, suppression avec confirmation, cocher, catégories, tri, filtres et recherche, avec un affichage via `textContent`.
- **README.md** : ce document.
- **PROMPTS.md** : journal des prompts utilisés avec l'IA et de ce que nous en avons gardé ou corrigé.

## Modèle de données

### Tâche

```json
{
  "id": 1730300000000,
  "titre": "Réviser le CSS",
  "description": "Flexbox",
  "priorite": "haute",
  "categorie": "cours",
  "echeance": "2026-11-15",
  "statut": "a_faire"
}
```

Exemple sans échéance : `"echeance": null`.

| Champ | Type | Valeurs possibles | Stocké / calculé |
|---|---|---|---|
| id | nombre | unique, généré à la création | Stocké |
| titre | texte | non vide, sans espaces seuls, 100 caractères maximum | Stocké |
| description | texte | facultatif, `""` si vide | Stocké |
| priorite | texte | `"basse"`, `"moyenne"`, `"haute"` | Stocké |
| categorie | texte | `"cours"`, `"perso"`, `"projet"` | Stocké |
| echeance | texte ou null | date `"AAAA-MM-JJ"`, passée acceptée, ou `null` | Stocké |
| statut | texte | `"a_faire"`, `"terminee"` | Stocké |
| couleur de la catégorie | — | dépend de `categorie` | Calculé (dans le CSS) |
| rang de priorité pour le tri | — | haute = 3, moyenne = 2, basse = 1 | Calculé |
| titre en minuscules pour la recherche | — | — | Calculé |
| date affichée (« 15/11/2026 ») | — | — | Calculé |

Il n'y a pas de champ « propriétaire » : chaque utilisateur a sa propre liste de tâches, rangée sous sa propre clé.

### Utilisateur

```json
{
  "identifiant": "etudiant1",
  "sel": "9f2c4a7e1b3d5f60a8c2e4b6d8f0a1c3",
  "hash": "3b8e…(hexadécimal)",
  "echecs": 0,
  "bloqueJusqua": null
}
```

| Champ | Type | Valeurs possibles | Stocké / calculé |
|---|---|---|---|
| identifiant | texte | unique, en minuscules, sans espaces autour, lettres sans accent, chiffres, `-` et `_` uniquement | Stocké |
| sel | texte (hexadécimal) | octets aléatoires tirés avec `crypto.getRandomValues`, un par compte | Stocké |
| hash | texte (hexadécimal) | résultat de PBKDF2 (Web Crypto) appliqué au mot de passe et au sel | Stocké |
| echecs | nombre | 0 à 2, remis à 0 au 3e échec (le compte est alors bloqué) et après une connexion réussie | Stocké |
| bloqueJusqua | nombre ou null | heure de fin du blocage en millisecondes (`Date.now()` + 30 000), ou `null` | Stocké |
| mot de passe | — | — | **Jamais stocké** |
| niveau de la jauge | — | faible / moyen / fort selon les 4 règles | Calculé à la saisie, jamais stocké |
| « est bloqué ? » et temps restant | — | `bloqueJusqua` comparé à `Date.now()` | Calculé |

### Clés localStorage

| Clé | Contenu | Exemple |
|---|---|---|
| `taskflow_utilisateurs` | tableau JSON de tous les utilisateurs | `[{ "identifiant": "etudiant1", … }]` |
| `taskflow_session` | identifiant de l'utilisateur connecté ; la clé est supprimée à la déconnexion | `"etudiant1"` |
| `taskflow_taches_<identifiant>` | tableau JSON des tâches de cet utilisateur | `taskflow_taches_etudiant1` → `[{ "id": 1730300000000, … }]` |

Le localStorage ne stocke que du texte : les données sont écrites avec `JSON.stringify` et relues avec `JSON.parse` dans un `try/catch`, avec `[]` par défaut si la clé est absente ou cassée. Les tâches ou comptes abîmés sont ignorés à la lecture, les autres sont gardés.

## Limites de sécurité connues

Une connexion gérée seulement dans le navigateur **n'est pas une vraie sécurité**. L'utilisateur contrôle entièrement son navigateur : il peut lire et modifier le localStorage, exécuter du code dans la console et changer le JavaScript de l'application. L'écran de connexion de TaskFlow protège d'une personne qui utilise le même ordinateur sans ouvrir les outils développeur, et évite qu'un utilisateur voie les tâches d'un autre par erreur. Il ne protège pas d'une personne qui sait ouvrir la console.

### Limites qui demanderaient un serveur

- **Session falsifiable** : mettre à la main un autre identifiant dans `taskflow_session` donne accès à ses tâches sans mot de passe.
- **Tâches en clair** : les tâches de tous les comptes sont lisibles dans les outils développeur. Le chiffrement des tâches par mot de passe (PBKDF2 + AES-GCM) a été écarté, car trop complexe pour la durée du projet.
- **Blocage contournable** : il suffit de remettre `echecs` à 0 ou `bloqueJusqua` à `null`, ou de changer l'heure de l'ordinateur.
- **Vérification contournable** : la fonction qui vérifie le mot de passe peut être appelée directement depuis la console, sans passer par le compteur d'échecs.
- **Compte remplaçable** : on peut remplacer le `sel` et le `hash` d'un compte par ceux d'un mot de passe connu, puis s'y connecter.
- **Identifiants visibles** : la liste de tous les comptes est lisible dans `taskflow_utilisateurs`.
- **Force brute hors ligne** : PBKDF2 ralentit le test de mots de passe sur un hash récupéré, mais ne l'empêche pas.

Dans une vraie application, un serveur stockerait les comptes et les tâches, vérifierait le mot de passe, compterait les échecs, mesurerait la durée du blocage et délivrerait un jeton de session impossible à fabriquer.

### Points reportés

- **Plusieurs onglets ouverts** : le dernier onglet qui enregistre peut écraser les changements faits dans un autre.
- **localStorage plein** : au-delà de la capacité du navigateur, la sauvegarde peut échouer.
- **Expiration de session** : la session reste ouverte sans limite de durée tant qu'on ne se déconnecte pas, ce qui pose problème sur un ordinateur partagé.
- **Suppression de compte** : non prévue ; les données d'un compte restent dans le localStorage.
- **Message de blocage** : le message « Compte bloqué » révèle qu'un compte existe, car un identifiant inconnu n'est jamais bloqué.
- **Temps de réponse** : un mauvais mot de passe met plus de temps à répondre qu'un compte qui n'existe pas, car seul le premier déclenche le calcul PBKDF2.

## Utilisation de l'IA

L'IA a été utilisée pour préparer le projet (user stories, structure, modèle de données, audit) avec Claude, puis pour coder l'application étape par étape avec Claude Code. Les prompts utilisés et ce que nous avons gardé ou corrigé sont détaillés dans [PROMPTS.md](PROMPTS.md).