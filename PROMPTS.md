# Journal de prompts — TaskFlow

On a fait tous les prompts de la séance 1 dans la même conversation avec Claude, pour qu'elle se souvienne de ce qu'on avait dit avant.

## Prompt 1 · Questions d'abord (Claude)

**Prompt :**
```
Tu es un développeur web qui aide des étudiants de 1re année.

On est un binôme en Cybersécurité et on doit créer TaskFlow, une petite app de gestion de tâches en HTML, CSS et JavaScript, sans framework.

L'app doit permettre de créer une tâche (titre, priorité, échéance, titre vide refusé), de l'afficher, la modifier, la cocher comme terminée, la supprimer, et de retrouver ses tâches après avoir fermé le navigateur.

En plus, on ajoute deux fonctionnalités :
- organisation des tâches : trier par priorité ou échéance, filtrer par statut, des catégories en couleur (cours, perso, projet), et en bonus une recherche par mot-clé ;
- sécurité : un écran de connexion avant d'accéder aux tâches, un contrôle du mot de passe (8 caractères, une majuscule, un chiffre, un caractère spécial), une jauge faible / moyen / fort, et en bonus un blocage après 3 échecs.

Pas de serveur ni de base de données : tout est sauvegardé dans le localStorage.

Avant d'écrire les user stories, pose-moi 3 questions sur l'app qui pourraient changer ce que tu vas proposer. Pas de code, juste les 3 questions en liste.
```

**Résultat :**
```
1. Un seul utilisateur ou plusieurs comptes ? L’écran de connexion sert-il à protéger l’app d’un seul utilisateur, avec un mot de passe défini au premier lancement ? Ou faut-il une inscription avec plusieurs comptes sur le même navigateur, chacun avec ses propres tâches ?
2. Comment se comportent la session et le blocage ? Après fermeture du navigateur, l’utilisateur doit-il se reconnecter ou reste-t-il connecté ? Et le blocage après 3 échecs dure-t-il un temps limité (par exemple 30 secondes ou 5 minutes) ? Doit-il survivre à un rechargement de la page ?
3. Les catégories sont-elles fixes ou personnalisables ? On garde uniquement cours, perso et projet, une seule catégorie par tâche ? Ou l’utilisateur peut-il créer ses propres catégories et choisir leur couleur ? Et le filtre par catégorie s’ajoute-t-il au filtre par statut ?
```

**Gardé :** les 3 questions. Elles étaient toutes utiles, surtout celle sur les comptes, on n'y avait pas pensé.

**Modifié / rejeté :** rien. Pour les catégories, on les garde fixes, sinon c'était trop pour nous.

**Pourquoi :** on voulait qu'elle nous pose des questions avant d'écrire, pour qu'elle n'invente pas le projet à notre place. Nos réponses (dans le prompt 2) ont décidé comment on gère les comptes, la connexion et le blocage.

## Prompt 2 · Génération des user stories (Claude)

**Prompt :**
```
Mes réponses :
1. Plusieurs comptes : on peut créer un compte sur le même navigateur, et chaque utilisateur ne voit que ses propres tâches.
2. L'utilisateur reste connecté après avoir fermé le navigateur, jusqu'à ce qu'il clique sur « Se déconnecter ». Le blocage après 3 échecs dure 30 secondes et survit au rechargement de la page.
3. Les catégories sont fixes (cours, perso, projet), une seule par tâche. Le filtre par catégorie se combine avec le filtre par statut.

Propose maintenant 10 user stories qui couvrent toute l'app : les fonctionnalités de base, l'organisation des tâches (tri, filtres, catégories, recherche) et la sécurité (connexion, mot de passe, blocage).

Format « En tant que… je veux… afin de… », avec 2 ou 3 critères d'acceptation qu'on peut tester. Rien qui demande un serveur, une base de données ou une bibliothèque externe. Pas de code.

Réponds dans un tableau : n°, user story, critères d'acceptation, type (base / organisation / sécurité).

Exemple :
| 1 | En tant qu'étudiant, je veux ajouter une tâche avec un titre, une priorité et une échéance afin de planifier mon travail. | Un titre vide est refusé ; la tâche apparaît tout de suite ; elle est encore là après rechargement. | Base |
```

**Résultat :**
```
| N° | User story | Critères d'acceptation | Type |
| --- | --- | --- | --- |
| 1 | En tant qu'étudiant, je veux ajouter une tâche avec un titre, une priorité et une échéance afin de planifier mon travail. | Un titre vide (ou fait uniquement d'espaces) est refusé avec un message ; la tâche apparaît tout de suite dans la liste ; elle est encore là après rechargement. | Base |
| 2 | En tant qu'étudiant, je veux modifier le titre, la priorité, l'échéance ou la catégorie d'une tâche afin de corriger une erreur ou suivre un changement de planning. | Les champs actuels sont pré-remplis à l'ouverture de la modification ; un titre vidé est refusé et la tâche garde son ancien titre ; la modification est conservée après rechargement. | Base |
| 3 | En tant qu'étudiant, je veux cocher une tâche comme terminée afin de voir ce qu'il me reste à faire. | Une tâche cochée s'affiche différemment (barrée ou grisée) ; on peut la décocher pour la remettre « à faire » ; son statut est conservé après rechargement. | Base |
| 4 | En tant qu'étudiant, je veux supprimer une tâche afin de garder une liste à jour. | Une confirmation est demandée avant la suppression ; si on annule, la tâche reste ; une tâche supprimée ne réapparaît pas après rechargement. | Base |
| 5 | En tant qu'étudiant, je veux classer chaque tâche dans une catégorie (cours, perso, projet) affichée en couleur afin de repérer d'un coup d'œil de quoi il s'agit. | On choisit une seule catégorie parmi les trois à la création comme à la modification ; chaque catégorie a sa propre couleur, identique partout dans l'app ; la catégorie est conservée après rechargement. | Organisation |
| 6 | En tant qu'étudiant, je veux trier mes tâches par priorité ou par échéance afin de savoir par quoi commencer. | Le tri par priorité affiche haute, puis moyenne, puis basse ; le tri par échéance affiche la date la plus proche en premier et les tâches sans échéance à la fin ; le tri s'applique à la liste déjà filtrée. | Organisation |
| 7 | En tant qu'étudiant, je veux filtrer mes tâches par statut et par catégorie, et chercher par mot-clé (bonus), afin de retrouver vite une tâche précise. | Les filtres de statut (toutes / à faire / terminées) et de catégorie se combinent (ex. « cours » + « à faire ») ; la recherche porte sur le titre, ignore les majuscules et s'ajoute aux filtres ; un message s'affiche si aucune tâche ne correspond. | Organisation |
| 8 | En tant que nouvel utilisateur, je veux créer un compte avec un mot de passe robuste afin de protéger l'accès à mes tâches. | Un mot de passe sans 8 caractères, une majuscule, un chiffre et un caractère spécial est refusé, avec un message qui indique la règle manquante ; la jauge faible / moyen / fort se met à jour à chaque caractère tapé ; un identifiant déjà utilisé sur ce navigateur est refusé. | Sécurité |
| 9 | En tant qu'utilisateur, je veux me connecter, rester connecté et pouvoir me déconnecter afin d'accéder à mes tâches, et seulement aux miennes. | Les tâches restent inaccessibles sans connexion, et un identifiant ou un mot de passe faux affiche une erreur sans préciser lequel est faux ; après fermeture du navigateur on reste connecté, et « Se déconnecter » ramène à l'écran de connexion ; chaque utilisateur ne voit que ses propres tâches. | Sécurité |
| 10 | En tant qu'utilisateur, je veux que la connexion soit bloquée après 3 échecs (bonus) afin d'empêcher quelqu'un de deviner mon mot de passe. | Au 3e échec, le formulaire est bloqué pendant 30 secondes avec le temps restant affiché ; le blocage continue même après un rechargement de la page ; une connexion réussie remet le compteur d'échecs à zéro. | Sécurité |

Un point à garder en tête pour la soutenance, vu votre filière : tout ce qui est dans le localStorage est lisible et modifiable depuis les outils développeur. La connexion et le blocage sont donc pédagogiques, pas une vraie protection. Vous pouvez quand même éviter de stocker les mots de passe en clair en les hachant avec l’API Web Crypto (SHA-256). Elle est intégrée au navigateur, donc ce n’est pas une bibliothèque externe, mais elle exige d’ouvrir l’app en localhost ou en HTTPS, pas en file://. Ça peut faire un critère en plus pour la story 8.
```

**Gardé :** les 10 stories comme base. Elles respectent les règles du projet et nos réponses. On aime bien que la 9 ne dise pas si c'est l'identifiant ou le mot de passe qui est faux : comme ça, personne ne peut deviner quels comptes existent. On garde aussi son idée de ne pas enregistrer le mot de passe en clair.

**Modifié / rejeté :** rien pour l'instant. Le prof veut 5 à 8 stories, donc on savait qu'il faudrait en regrouper après. Elle a ajouté d'elle-même une confirmation avant de supprimer une tâche : on ne l'avait pas demandée, mais on la garde.

**Pourquoi :** on a demandé 10 stories exprès, pour faire le tri nous-mêmes au lieu de tout prendre.

## Prompt 3 · Hypothèses et auto-critique (Claude)

**Prompt :**
```
Avant qu'on choisisse, relis tes user stories de manière critique :
- qu'est-ce que tu as supposé sans qu'on te le dise ?
- qu'est-ce qui est trop compliqué ou impossible avec juste du HTML/CSS/JS et le localStorage ?
- y a-t-il des stories trop grosses, en double, ou avec des critères impossibles à tester ?
- honnêtement, une connexion gérée seulement dans le navigateur, ça protège de quoi et ça ne protège pas de quoi ?

Ne réécris pas les stories pour l'instant, réponds juste point par point, court.
```

**Résultat :**
```
Ce que j'ai supposé sans que vous le disiez

- Une confirmation avant de supprimer.
- Trois niveaux de priorité : haute, moyenne, basse.
- Une échéance facultative, avec les tâches sans date placées en fin de tri.
- Une recherche qui porte sur le titre seulement.
- Un message d'erreur de connexion qui ne dit pas si c'est l'identifiant ou le mot de passe qui est faux.
- Une catégorie obligatoire.
- Des seuils de la jauge que je n'ai jamais définis.
- Un blocage dont je n'ai pas précisé la portée : par compte ou pour tout le navigateur.
- Le blocage étiqueté « bonus » : c'était dans votre consigne, mais ça mérite d'être confirmé.

Trop compliqué ou impossible

- Rien d'impossible. Le blocage qui survit au rechargement, c'est juste une date de fin stockée. La session persistante, c'est l'utilisateur courant stocké.
- Le seul vrai piège est mon conseil sur Web Crypto. Il impose localhost ou HTTPS, donc il faut lancer un petit serveur local même si l'app n'en dépend pas. Ça ajoute de la complexité pour un gain réel limité (voir plus bas).

Stories trop grosses, en double ou mal testables

- La 9 est trop grosse : elle mélange connexion, session/déconnexion et séparation des tâches entre comptes. Elle est à découper.
- La 7 mélange un filtre obligatoire et une recherche en bonus. Il vaut mieux les séparer pour pouvoir livrer l'un sans l'autre.
- La 5 recoupe la 1 et la 2, puisque le choix de la catégorie se fait à la création et à la modification. La 1 ne mentionne d'ailleurs pas la catégorie.
- « Conservé après rechargement » est répété partout. C'est plutôt une règle commune (une « définition de fini ») qu'un critère à réécrire dans chaque story.
- La jauge n'est pas testable tant que les seuils de faible, moyen et fort ne sont pas définis.
- Le blocage n'est pas testable sans savoir s'il porte sur le compte ou sur le navigateur.
- « Couleur identique partout » reste vague. Mieux vaut lister les écrans concernés.

Ce qu'une connexion côté navigateur protège vraiment

- Elle protège de quelqu'un qui utilise le même PC sans ouvrir les outils développeur. Elle évite aussi qu'un utilisateur voie les tâches d'un autre par erreur, et elle freine les essais de mots de passe à la main dans le formulaire.
- Elle ne protège pas de quelqu'un qui ouvre les outils développeur. Il peut :
  - lire toutes les tâches de tous les comptes, stockées en clair ;
  - se déclarer connecté en modifiant l'utilisateur courant ;
  - effacer le blocage ;
  - récupérer les empreintes des mots de passe et les attaquer hors ligne, puisqu'un SHA-256 sans sel se casse vite par dictionnaire ;
  - modifier le JavaScript lui-même.
- Elle ne protège pas non plus de l'accès aux fichiers du profil du navigateur.
- Un risque concret à surveiller : si les titres des tâches sont affichés avec innerHTML, un titre piégé peut exécuter du script (faille XSS). Il faut utiliser textContent.
- En résumé, c'est un contrôle d'accès « d'interface », pas une vraie sécurité. Pour protéger réellement les données sans serveur, il faudrait chiffrer les tâches avec une clé dérivée du mot de passe (PBKDF2 + AES-GCM, toujours via Web Crypto). C'est faisable, mais probablement hors de portée pour 3 séances. Le dire clairement à l'oral sera plus valorisé que de faire semblant que c'est sécurisé.
```

**Gardé :** la plupart de ce qu'elle avait supposé (confirmation avant de supprimer, 3 niveaux de priorité, date pas obligatoire, recherche sur le titre, catégorie obligatoire). On garde aussi ses remarques sur les stories trop grosses, et l'idée d'écrire une seule fois la règle « tout reste enregistré après rechargement » au lieu de la répéter partout. Toute sa partie sur ce que la connexion protège ou pas ira dans le README. Et on retient le risque qu'un titre de tâche piégé exécute du code : il faudra afficher les textes de façon sûre.

**Modifié :** deux points n'étaient pas clairs, donc on les a fixés nous-mêmes : la jauge (2 règles ou moins = faible, 3 = moyen, 4 = fort) et le blocage, qui concerne un compte et pas tout le navigateur. On ajoute aussi un « sel » au mot de passe, parce qu'elle dit elle-même que sans ça il se retrouve vite.

**Rejeté :** chiffrer toutes les tâches. C'est trop compliqué pour nous en 3 séances, on en parlera à l'oral comme d'une limite.

**À vérifier :** elle dit que la partie sécurité ne marche pas si on ouvre le fichier index.html directement. On ne l'a pas encore testé, on le fera en séance 2. De toute façon, on lance l'app avec Live Server.

**Pourquoi :** lui demander de se critiquer nous a montré tout ce qu'elle avait décidé sans nous demander. Sans ça, on aurait eu une jauge et un blocage mal définis.

## Prompt 4 · Version finale des user stories (Claude)

**Prompt :**
````
Ok, voilà ce qu'on a décidé :
- on garde : 1, 3, 8, 10
- on fusionne : 2 et 4 (modifier et supprimer une tâche, c'est la même gestion d'une tâche existante) ; 5 dans 1 et 2 (la catégorie se choisit à la création et à la modification) ; 6 et le filtre de la 7 (trier et filtrer la liste)
- on sépare : la recherche par mot-clé devient sa propre story, en bonus ; la 9 garde connexion, session et déconnexion, et la séparation des tâches par compte devient un critère d'acceptation
- on enlève : le chiffrement des tâches (PBKDF2 + AES-GCM), trop complexe pour 3 séances, on l'expliquera à l'oral comme limite
- on précise :
  - la catégorie est obligatoire, l'échéance est facultative, la recherche porte sur le titre seulement, et on garde la confirmation avant suppression ;
  - la jauge se base sur les 4 règles (8 caractères, majuscule, chiffre, caractère spécial) : 2 règles ou moins = faible, 3 = moyen, 4 = fort, et seul « fort » permet de créer le compte ;
  - le blocage porte sur le compte, pas sur tout le navigateur ;
  - le mot de passe est haché en SHA-256 avec un sel, via Web Crypto.

Rédige la version finale avec 8 user stories maximum, en appliquant exactement ces choix, sans rien ajouter. Classe-les par priorité (Must, Should, Could).

Ajoute en dessous une « définition de fini » commune à toutes les stories : les données sont conservées après rechargement, et les textes saisis sont affichés avec textContent, jamais innerHTML.

Donne-moi un tableau Markdown que je peux coller dans le README : n°, priorité, user story, critères d'acceptation.
````

**Résultat :**
````
Légende des priorités : Must = fonctionnalités de base, Should = organisation et sécurité demandées, Could = bonus.

```markdown
## User stories

| N° | Priorité | User story | Critères d'acceptation |
|---|---|---|---|
| 1 | Must | En tant qu'étudiant, je veux ajouter une tâche avec un titre, une priorité, une catégorie et une échéance facultative afin de planifier mon travail. | Un titre vide (ou fait uniquement d'espaces) est refusé avec un message ; la catégorie est obligatoire, une seule parmi cours, perso et projet, affichée avec sa couleur ; l'échéance peut rester vide et la tâche apparaît tout de suite dans la liste. |
| 2 | Must | En tant qu'étudiant, je veux cocher une tâche comme terminée afin de voir ce qu'il me reste à faire. | Une tâche cochée s'affiche différemment (barrée ou grisée) ; on peut la décocher pour la remettre « à faire ». |
| 3 | Must | En tant qu'étudiant, je veux modifier ou supprimer une tâche existante afin de garder une liste juste et à jour. | À la modification, les champs actuels (catégorie comprise) sont pré-remplis ; un titre vidé est refusé et la tâche garde son ancien titre ; la suppression demande une confirmation, et si on annule, la tâche reste. |
| 4 | Should | En tant qu'étudiant, je veux trier et filtrer ma liste de tâches afin de savoir par quoi commencer. | Le tri par priorité affiche haute, puis moyenne, puis basse ; le tri par échéance affiche la date la plus proche en premier et les tâches sans échéance à la fin ; les filtres de statut (toutes / à faire / terminées) et de catégorie se combinent, le tri s'applique à la liste filtrée et un message s'affiche si aucune tâche ne correspond. |
| 5 | Should | En tant que nouvel utilisateur, je veux créer un compte avec un mot de passe robuste afin de protéger l'accès à mes tâches. | La jauge se met à jour à chaque caractère selon les 4 règles (8 caractères, majuscule, chiffre, caractère spécial) : 2 règles ou moins = faible, 3 = moyen, 4 = fort, et les règles manquantes sont indiquées ; seul « fort » permet de créer le compte, et un identifiant déjà utilisé est refusé ; le mot de passe est stocké haché en SHA-256 avec un sel via Web Crypto, jamais en clair. |
| 6 | Should | En tant qu'utilisateur, je veux me connecter, rester connecté et pouvoir me déconnecter afin d'accéder à mes tâches, et seulement aux miennes. | Les tâches sont inaccessibles sans connexion, et un identifiant ou un mot de passe faux affiche une erreur sans préciser lequel est faux ; on reste connecté après fermeture du navigateur jusqu'au clic sur « Se déconnecter », qui ramène à l'écran de connexion ; chaque utilisateur ne voit que ses propres tâches. |
| 7 | Could | En tant qu'étudiant, je veux rechercher une tâche par mot-clé dans son titre afin de la retrouver rapidement. | La recherche porte sur le titre seulement et ignore les majuscules ; elle se combine avec le tri et les filtres, et un message s'affiche si aucune tâche ne correspond ; effacer la recherche réaffiche la liste filtrée. |
| 8 | Could | En tant qu'utilisateur, je veux que la connexion à mon compte soit bloquée après 3 échecs afin d'empêcher quelqu'un de deviner mon mot de passe. | Au 3e échec sur un même compte, sa connexion est bloquée 30 secondes avec le temps restant affiché, et le blocage continue après un rechargement de la page ; les autres comptes peuvent toujours se connecter ; une connexion réussie remet le compteur d'échecs à zéro. |

## Définition de fini

Une story est terminée uniquement si :

- les données concernées sont conservées après un rechargement de la page (localStorage) ;
- tous les textes saisis par l'utilisateur sont affichés avec `textContent`, jamais avec `innerHTML`.
```
````

**Gardé :** les 8 stories et la règle commune, qu'on a mises dans le README. Toutes nos décisions du prompt 3 y sont.

**Modifié :** rien. On ne lui avait pas dit comment classer les stories par priorité, mais son choix nous va : l'essentiel en premier, puis ce que demande la consigne, puis les bonus.

**Remarqué :** on lui avait dit de ne rien ajouter, et elle a quand même ajouté deux petits détails (stories 7 et 8). On les garde parce qu'ils vont avec nos choix, mais ça montre qu'il faut tout relire.

**Pourquoi :** on lui a donné nos décisions une par une, pour que la version finale vienne de nous et pas juste d'elle.

## Prompt 5 · Structure de fichiers (Claude)

**Prompt :**
```
On passe à l'architecture. Le prof nous propose cette structure :

taskflow/
├── index.html
├── style.css
├── app.js
├── README.md
└── PROMPTS.md

Est-ce qu'elle suffit pour toute l'app, y compris le tri, les filtres, les catégories et la partie sécurité (connexion, mot de passe, jauge, blocage) ? Si besoin, propose au maximum 2 fichiers en plus pour que le code reste lisible.

Reste simple, on est en 1re année : pas de dossiers inutiles, pas d'outil de build, pas de code.

Réponds avec l'arborescence, puis une ligne par fichier pour expliquer son rôle.
```

**Résultat :**
```
Elle suffit techniquement, mais app.js mélangerait tâches, affichage, tri, sécurité et stockage, et deviendrait vite illisible. Avec 2 fichiers en plus, chaque partie a sa place :

taskflow/
├── index.html
├── style.css
├── storage.js
├── auth.js
├── app.js
├── README.md
└── PROMPTS.md

- index.html : structure des deux écrans (connexion/inscription et liste des tâches) et chargement des scripts dans l'ordre storage.js, auth.js, app.js.
- style.css : mise en page, couleurs des catégories, style des tâches terminées, couleurs de la jauge.
- storage.js : seul fichier qui lit et écrit dans le localStorage : comptes, tâches rangées par utilisateur, session et état du blocage.
- auth.js : toute la sécurité : vérification des 4 règles, jauge, hachage SHA-256 avec sel, connexion, session, déconnexion et blocage de 30 secondes par compte.
- app.js : les tâches et leur affichage : ajout, modification, suppression avec confirmation, cocher, catégories, tri, filtres et recherche, avec un affichage via textContent.
- README.md : présentation du projet, user stories, définition de fini, lancement en localhost (nécessaire pour Web Crypto) et limites de sécurité.
- PROMPTS.md : journal des prompts utilisés avec l'IA et de ce que vous en avez gardé ou corrigé.
```

**Gardé :** la structure avec 2 fichiers en plus : un pour tout ce qui est enregistrement des données (storage.js) et un pour tout ce qui est sécurité (auth.js). On garde aussi l'ordre dans lequel les charger.

**Modifié :** rien. On a juste choisi de faire une seule page, où la connexion, l'inscription et les tâches s'affichent l'une après l'autre, au lieu de plusieurs pages.

**Rejeté :** rien, elle n'a rien proposé d'inutile.

**Pourquoi :** en séparant les données et la sécurité, le code sera plus clair et plus facile à vérifier pendant l'audit. Une seule page évite de répéter le même code partout.

## Prompt 6 · Modèle de données (Claude)

**Prompt :**
````
Voici le modèle d'une tâche donné par le prof :

{
  "id": 1,
  "titre": "Réviser le CSS",
  "description": "Flexbox",
  "priorite": "haute",
  "echeance": "2026-11-15",
  "statut": "a_faire"
}

Qu'est-ce qui manque à ce modèle pour nos fonctionnalités en plus (catégories, tri, filtres, recherche ; comptes, connexion et blocage de 30 secondes par compte après 3 échecs) ?

Propose-moi :
1. le modèle de la tâche complété ;
2. le modèle d'un utilisateur ;
3. les clés localStorage que storage.js va utiliser et ce qu'il y a dedans.

Le mot de passe ne doit jamais être stocké en clair (SHA-256 avec un sel), l'échéance est facultative, et on n'utilise que ce qui existe déjà dans le navigateur. Pour chaque champ, donne son type et ses valeurs possibles, et dis ce qui doit être stocké ou juste calculé à l'affichage (comme la couleur d'une catégorie). Pas de code, juste des exemples JSON avec un petit tableau en dessous.
````

**Résultat :**
````
Pour vos fonctionnalités, il manque au modèle du prof :

- la catégorie ;
- une échéance qui peut être vide ;
- une liste fermée de valeurs pour la priorité et le statut, sans laquelle le tri et les filtres ne sont pas fiables.

Le tri, les filtres et la recherche n'ont pas besoin de champ en plus : ils se calculent à partir des champs existants. Les comptes et le blocage relèvent du modèle utilisateur, pas de la tâche.

1. Modèle de la tâche

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

Exemple sans échéance : "echeance": null.

| Champ | Type | Valeurs possibles | Stocké / calculé |
|---|---|---|---|
| id | nombre | unique, généré à la création (par exemple Date.now()) | Stocké |
| titre | texte | non vide, sans espaces seuls | Stocké |
| description | texte | facultatif, "" si vide | Stocké |
| priorite | texte | "basse", "moyenne", "haute" | Stocké |
| categorie | texte | "cours", "perso", "projet" | Stocké |
| echeance | texte ou null | date "AAAA-MM-JJ" (format du champ <input type="date">) ou null | Stocké |
| statut | texte | "a_faire", "terminee" | Stocké |
| couleur de la catégorie | — | dépend de categorie | Calculé (dans le CSS) |
| rang de priorité pour le tri | — | haute = 3, moyenne = 2, basse = 1 | Calculé |
| titre en minuscules pour la recherche | — | — | Calculé |
| date affichée (« 15/11/2026 ») | — | — | Calculé |

Il n'y a pas de champ « propriétaire » : chaque utilisateur a sa propre liste, rangée sous sa propre clé (voir le point 3).

2. Modèle d'un utilisateur

```json
{
  "identifiant": "quentin",
  "sel": "9f2c4a7e1b3d5f60a8c2e4b6d8f0a1c3",
  "hash": "3b8e…(64 caractères hexadécimaux)",
  "echecs": 0,
  "bloqueJusqua": null
}
```

| Champ | Type | Valeurs possibles | Stocké / calculé |
|---|---|---|---|
| identifiant | texte | unique, non vide | Stocké |
| sel | texte (hexadécimal) | 16 octets aléatoires tirés avec crypto.getRandomValues, un par compte | Stocké |
| hash | texte (hexadécimal) | SHA-256 du sel + mot de passe, via crypto.subtle, soit 64 caractères | Stocké |
| echecs | nombre | 0 à 3, remis à 0 après une connexion réussie | Stocké |
| bloqueJusqua | nombre ou null | heure de fin du blocage en millisecondes (Date.now() + 30 000), ou null | Stocké |
| mot de passe | — | — | Jamais stocké, ni en clair ni ailleurs |
| niveau de la jauge | — | faible / moyen / fort selon les 4 règles | Calculé à la saisie, jamais stocké |
| « est bloqué ? » et temps restant | — | bloqueJusqua comparé à Date.now() | Calculé |

3. Clés localStorage (gérées par storage.js)

| Clé | Contenu | Exemple |
|---|---|---|
| taskflow_utilisateurs | tableau JSON de tous les utilisateurs (modèle 2) | [{ "identifiant": "quentin", … }] |
| taskflow_session | identifiant de l'utilisateur connecté ; la clé est supprimée à la déconnexion | "quentin" |
| taskflow_taches_<identifiant> | tableau JSON des tâches de cet utilisateur (modèle 1) | taskflow_taches_quentin → [{ "id": 1730300000000, … }] |

Deux points à garder en tête :

- Le localStorage ne stocke que du texte. storage.js doit donc passer par JSON.stringify à l'écriture et JSON.parse à la lecture, avec une valeur par défaut ([]) si la clé n'existe pas encore.
- Il vous reste à décider si « Quentin » et « quentin » sont le même compte. Si oui, mettez l'identifiant en minuscules avant de le stocker et de le comparer.
````

**Gardé :** les deux modèles (tâche et utilisateur) et la façon de ranger les données. On aime bien l'idée de ranger les tâches de chaque utilisateur à part, au lieu d'écrire le propriétaire dans chaque tâche.

**Modifié :** l'identifiant est mis en minuscules, donc « Quentin » et « quentin » c'est le même compte. Dans le README, on a remplacé « quentin » par « etudiant1 », parce que le prof ne veut pas de vraies données personnelles.

**Rejeté :** rien.

**Remarqué :** l'app retient juste le nom de la personne connectée, donc quelqu'un qui s'y connaît peut le changer et se connecter à la place d'un autre. On garde ça pour l'audit du prompt 7.

**Pourquoi :** on n'enregistre que ce qui est vraiment nécessaire. Le reste (couleurs, ordre des priorités, jauge) se calcule à l'affichage, comme ça rien ne peut se contredire.

## Prompt 7 · Critique du modèle de données (Claude)

**Prompt :**
```
Mets-toi à la place d'un autre groupe qui doit auditer notre projet. Critique ton propre modèle de données :
- qu'est-ce qui est fragile ou mal pensé ?
- quelles attaques simples restent possibles, sachant que tout est dans le navigateur (console, modification du localStorage, force brute) ?
- quels cas limites il faut prévoir (titre vide, date passée, identifiant déjà pris, données cassées dans le localStorage…) ?

Sépare bien ce qu'on peut corriger à notre niveau et ce qui demanderait un serveur. Pas de code.

Réponds dans un tableau : problème, gravité, corrigeable par nous (oui/non), solution.
```

**Résultat :**
```
Grille de gravité : élevée = contourne la sécurité ou casse l'app, moyenne = bug visible ou fuite d'information, faible = gêne rare.

Modèle fragile

| Problème | Gravité | Corrigeable par nous | Solution |
|---|---|---|---|
| Une valeur cassée dans le localStorage (JSON invalide, clé modifiée à la main) fait planter JSON.parse et laisse une page blanche | Élevée | Oui | Lire dans un try/catch, revenir à [] par défaut et afficher un message plutôt que d'écraser les données en silence |
| Des valeurs inattendues ("priorite": "urgente", "categorie": "sport") cassent le tri, les filtres ou la couleur | Moyenne | Oui | Vérifier chaque tâche à la lecture avec les listes de valeurs autorisées, et ignorer ou corriger ce qui sort du cadre |
| L'identifiant sert dans le nom de clé taskflow_taches_<identifiant>, donc les espaces, la casse et les caractères spéciaux posent problème | Moyenne | Oui | Passer l'identifiant en minuscules, retirer les espaces autour, n'accepter que lettres, chiffres, - et _ |
| Deux onglets ouverts : le dernier qui enregistre écrase les changements de l'autre | Moyenne | Oui | Relire le localStorage juste avant chaque écriture, ou écouter l'événement storage pour rafraîchir l'autre onglet |
| new Date("2026-11-15") est lu en UTC : la date affichée ou comparée peut être décalée d'un jour | Faible | Oui | Comparer les dates sous forme de texte AAAA-MM-JJ, qui se trie correctement, ou construire la date en heure locale |
| Un id basé sur Date.now() peut être en double si deux tâches sont créées dans la même milliseconde | Faible | Oui | Prendre le plus grand id existant + 1, ou utiliser crypto.randomUUID() |
| Sans numéro de version, un changement de modèle plus tard cassera les anciennes données | Faible | Oui | Prévoir une clé ou un champ de version pour pouvoir convertir les anciennes données |
| Le localStorage est plein (environ 5 Mo) ou désactivé : setItem lève une erreur | Faible | Oui | Mettre les écritures dans un try/catch et prévenir l'utilisateur que la sauvegarde a échoué |

Attaques simples (console, localStorage, force brute)

| Problème | Gravité | Corrigeable par nous | Solution |
|---|---|---|---|
| Une tâche contenant <img src=x onerror=…> exécute du script si elle est affichée avec innerHTML (titre, description et aussi identifiant affiché) | Élevée | Oui | textContent partout, déjà dans la définition de fini, à vérifier en revue de code |
| La force brute hors ligne est facile : SHA-256 est très rapide, et le sel est stocké juste à côté du hash | Moyenne | Oui, en partie | Remplacer SHA-256 par PBKDF2 avec beaucoup d'itérations (inclus dans Web Crypto, plus simple que le chiffrement abandonné). Ça ralentit l'attaque sans l'empêcher |
| taskflow_session mis à la main sur un autre identifiant donne accès à ses tâches sans mot de passe | Élevée | Non | Un serveur délivrerait un jeton de session impossible à fabriquer et vérifierait chaque requête |
| Toutes les tâches de tous les comptes sont lisibles en clair dans les outils développeur | Élevée | Non | Stockage côté serveur, ou chiffrement par mot de passe (écarté pour ce projet) |
| Le blocage se contourne en remettant echecs à 0 ou bloqueJusqua à null, ou en changeant l'heure du PC | Élevée | Non | Le serveur compterait les échecs et mesurerait le temps lui-même |
| On peut tester des mots de passe en appelant directement la fonction de vérification dans la console, sans passer par le compteur | Élevée | Non | La vérification doit se faire là où l'utilisateur n'a pas la main, donc sur un serveur |
| On peut prendre un compte en remplaçant son sel et son hash par ceux d'un mot de passe connu | Élevée | Non | Comptes stockés sur un serveur |
| La liste de tous les identifiants est visible dans taskflow_utilisateurs | Faible | Non | Comptes stockés sur un serveur |
| Sur un PC partagé, la session reste ouverte sans limite tant qu'on ne se déconnecte pas | Moyenne | Oui, en partie | Bouton « Se déconnecter » bien visible. L'expiration de session sort de vos décisions : à signaler comme limite |

Cas limites à prévoir

| Problème | Gravité | Corrigeable par nous | Solution |
|---|---|---|---|
| Titre vide ou fait uniquement d'espaces | Moyenne | Oui | Retirer les espaces autour avant de tester, à la création comme à la modification |
| Titre très long qui casse la mise en page | Faible | Oui | maxlength sur le champ et retour à la ligne en CSS |
| Date passée | Faible | Oui | À décider : l'accepter (rien dans les stories ne l'interdit) ou la refuser. Dans les deux cas, l'écrire dans le README |
| Date vide ou invalide | Faible | Oui | Le champ <input type="date"> renvoie "" : le convertir en null |
| Identifiant déjà pris avec une autre casse (« Quentin » / « quentin ») | Moyenne | Oui | Comparer après passage en minuscules |
| Identifiant vide ou fait d'espaces | Moyenne | Oui | Le refuser après avoir retiré les espaces |
| Ce qui compte comme « caractère spécial » (accents, espaces, emoji) | Moyenne | Oui | Fixer la règle : par exemple « tout ce qui n'est ni lettre ni chiffre », et l'écrire dans le README |
| Encodage du mot de passe avant le hachage (accents) | Faible | Oui | Toujours passer par TextEncoder (UTF-8), à l'inscription comme à la connexion |
| Échec de connexion sur un identifiant inexistant : pas de compte à bloquer | Faible | Oui | Afficher le même message d'erreur que pour un mauvais mot de passe, sans rien compter |
| L'app ouverte en file:// : Web Crypto est indisponible et l'inscription échoue | Moyenne | Oui | Lancer en localhost et afficher un message clair si crypto.subtle n'existe pas |
| Données d'un ancien compte restées en place (pas de suppression de compte) | Faible | Non nécessaire | Hors périmètre, à mentionner comme limite |

Tout ce qui est marqué « Non » a la même cause : l'utilisateur contrôle entièrement son navigateur. Ce sont ces lignes qui doivent aller dans la partie « limites de sécurité » du README et de l'oral.
```

**Gardé :** tout ce qu'elle a marqué « Oui » et qui touche à la sécurité ou au fait que l'app ne plante pas. On le fera en séance 2 : ne pas planter si les données sont abîmées, vérifier les valeurs, nettoyer l'identifiant, afficher les textes de façon sûre, refuser les champs vides, et afficher le même message d'erreur que le compte existe ou pas. Tout ce qu'elle a marqué « Non » va dans les limites de sécurité du README.

**Modifié :** on change la méthode pour protéger le mot de passe, pour une méthode plus lente à casser (PBKDF2). Ce n'est pas beaucoup plus dur à faire et c'est bien plus sûr. On a aussi tranché les points qu'elle nous laissait : les dates passées sont acceptées, un caractère spécial c'est tout ce qui n'est ni une lettre ni un chiffre, et un titre fait 100 caractères maximum.

**Reporté :** certains cas rares (plusieurs onglets ouverts, mémoire pleine, déconnexion automatique, suppression de compte…). Ce sont de vrais problèmes, mais trop poussés pour 3 séances, donc on les met dans les limites.

**À vérifier :** elle répète que la sécurité ne marche pas si on ouvre index.html directement. Toujours pas testé, on reste avec Live Server.

**Pourquoi :** lui faire jouer le rôle d'un autre groupe qui nous audite a trouvé des failles qu'on n'aurait pas vues seuls. Et séparer ce qu'on peut corriger de ce qui demanderait un serveur nous donne la liste de travail pour la séance 2 et la partie limites pour l'oral.

## Prompt 8 · Rédaction du README (Claude)

**Prompt :**
```
Avec tout ce qu'on a validé dans cette conversation (user stories finales, définition de fini, structure, modèle de données), rédige le README.md du projet.

Applique aussi nos dernières décisions :
- le mot de passe est haché avec PBKDF2 (Web Crypto) et un sel unique par compte, au lieu de SHA-256 ;
- l'identifiant est mis en minuscules, sans espaces autour, avec seulement lettres, chiffres, - et _ ;
- un caractère spécial = tout ce qui n'est ni une lettre ni un chiffre ;
- les dates passées sont acceptées, une échéance vide vaut null, le titre fait 100 caractères maximum ;
- dans les exemples, utilise l'identifiant « etudiant1 », aucune donnée personnelle réelle ;
- l'app se lance avec Live Server dans VS Code (localhost).

N'invente rien qu'on n'a pas validé, pas de badges ni d'instructions d'installation compliquées. Dans « Limites de sécurité connues », reprends les problèmes que tu as classés « non corrigeables » à l'audit, et ce qu'on a reporté (plusieurs onglets, localStorage plein, expiration de session, suppression de compte), en expliquant honnêtement qu'une connexion gérée seulement dans le navigateur n'est pas une vraie sécurité.

Utilise exactement ces sections :
# TaskFlow
## Binôme
## Description
## Cahier des charges (fonctionnalités de base, organisation des tâches, sécurité, bonus retenus)
## Contraintes techniques
## Lancer le projet
## User stories (avec la légende des priorités et la définition de fini)
## Structure des fichiers
## Modèle de données (tâche, utilisateur, clés localStorage)
## Limites de sécurité connues
## Utilisation de l'IA (lien vers PROMPTS.md)

Donne-moi le README complet dans un seul bloc Markdown, prêt à copier.
```

**Résultat :**
````markdown
# TaskFlow

## Binôme

- [Prénom Nom]
- [Prénom Nom]

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
- Identifiant mis en minuscules, sans espaces autour, avec uniquement des lettres, des chiffres, `-` et `_`.
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
- L'API Web Crypto n'est disponible qu'en `localhost` ou en HTTPS : l'application ne fonctionne pas en ouvrant `index.html` directement (`file://`).

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
| 5 | Should | En tant que nouvel utilisateur, je veux créer un compte avec un mot de passe robuste afin de protéger l'accès à mes tâches. | La jauge se met à jour à chaque caractère selon les 4 règles (8 caractères, majuscule, chiffre, caractère spécial) : 2 règles ou moins = faible, 3 = moyen, 4 = fort, et les règles manquantes sont indiquées ; seul « fort » permet de créer le compte, l'identifiant est normalisé (minuscules, sans espaces autour, lettres, chiffres, `-` et `_`) et un identifiant déjà utilisé est refusé ; le mot de passe est haché avec PBKDF2 et un sel unique via Web Crypto, jamais stocké en clair. |
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

- **index.html** : structure des deux écrans (connexion/inscription et liste des tâches) et chargement des scripts dans l'ordre `storage.js`, `auth.js`, `app.js`.
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
| identifiant | texte | unique, en minuscules, sans espaces autour, lettres, chiffres, `-` et `_` uniquement | Stocké |
| sel | texte (hexadécimal) | octets aléatoires tirés avec `crypto.getRandomValues`, un par compte | Stocké |
| hash | texte (hexadécimal) | résultat de PBKDF2 (Web Crypto) appliqué au mot de passe et au sel | Stocké |
| echecs | nombre | 0 à 3, remis à 0 après une connexion réussie | Stocké |
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

Le localStorage ne stocke que du texte : les données sont écrites avec `JSON.stringify` et relues avec `JSON.parse`.

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

## Utilisation de l'IA

L'IA a été utilisée pour préparer le projet (user stories, structure, modèle de données, audit). Les prompts utilisés et ce que nous avons gardé ou corrigé sont détaillés dans [PROMPTS.md](PROMPTS.md).
````

**Gardé :** toute la structure et presque tout le contenu. La partie limites reprend bien l'audit du prompt 7.

**Modifié :**
- on a mis nos noms ;
- elle avait oublié qu'on veut que l'app ne plante pas si les données sont abîmées, on l'a rajouté ;
- elle affirmait que l'app ne marche pas en ouvrant index.html directement, alors qu'on ne l'a pas vérifié : on a juste écrit qu'on lance toujours l'app avec Live Server ;
- elle a mis à jour certaines stories avec nos dernières décisions. On garde, mais elles ne sont plus exactement celles du prompt 4.

**Pourquoi :** on lui a redonné nos dernières décisions, parce qu'après une longue conversation elle risquait de reprendre une vieille version. Et on ne voulait rien laisser dans le README qu'on n'a pas vérifié.

## Bilan de la séance 1

- **Ce qui a bien marché :** les questions au début, et surtout quand on lui a demandé de se critiquer et de nous auditer. C'est là qu'elle a trouvé des failles qu'on n'aurait pas vues seuls.
- **Ce qu'on a dû corriger :** elle a ajouté des choses alors qu'on lui avait dit de ne rien ajouter, elle a oublié une de nos décisions dans le README, et elle a répété plusieurs fois une affirmation qu'on n'a pas encore pu vérifier.
- **Pour la séance 2 :** donner le README à l'IA de code, coder une story à la fois, et relire tout ce qu'elle génère avant de le garder.

# Séance 2 · Coder l'application

Pour cette séance, on a utilisé Claude Code (le mode agent : il crée et modifie les fichiers lui-même), dans une seule conversation. On lui donne une seule tâche à la fois, et on relit et teste tout avant de faire le commit nous-mêmes.

## Prompt 9 · Sprint 1, étape 1 : ajouter et afficher une tâche (Claude Code)

**Prompt :**
```
Tu es un développeur web qui nous aide à coder TaskFlow, notre projet de 1re année en binôme Cybersécurité.

Tout le cahier des charges est dans README.md (user stories, structure des fichiers, modèle de données) : lis-le avant de commencer. On va coder l'app étape par étape, en 3 sprints, et je te donnerai une seule tâche à la fois.

Règles à respecter pendant toute la conversation :
- HTML, CSS et JavaScript natif uniquement : pas de framework, pas de bibliothèque, pas de npm ni de package.json, pas d'outil de build.
- Fais uniquement ce que je te demande dans le prompt, rien de plus.
- Les textes saisis par l'utilisateur sont toujours affichés avec textContent, jamais avec innerHTML.
- Code simple et lisible pour des étudiants de 1re année, avec des commentaires courts en français.
- Ne fais jamais de commit ni de push, c'est nous qui les faisons.
- À la fin de chaque tâche, donne-moi : la liste des fichiers créés ou modifiés, une explication simple de ce que tu as fait, et 3 cas de test à faire à la main dans le navigateur, dont un cas limite.

Sprint 1, étape 1 : crée index.html, style.css (juste le minimum pour que ce soit lisible) et app.js, pour pouvoir ajouter une tâche et l'afficher dans la liste.
- Le formulaire contient : titre, description (facultative), priorité (basse, moyenne, haute), catégorie (cours, perso, projet) et échéance (facultative).
- Respecte le modèle de tâche du README : id unique, titre, description, priorite, categorie, echeance (null si vide), statut "a_faire".
- Un titre vide ou fait uniquement d'espaces est refusé avec un message, et le titre fait 100 caractères maximum.
- Pour l'instant, les tâches restent seulement en mémoire dans un tableau : pas de localStorage, pas de connexion, ne crée pas encore storage.js ni auth.js.
```

**Résultat :**
```
Je lis le README, puis je crée index.html, style.css et app.js, et je teste dans le navigateur.

Fichiers créés. Test dans le navigateur intégré : titre vide, espaces, ajout normal, injection HTML, 101 caractères.

La tâche ne s’affiche pas dans ce test. Je vérifie d’abord si app.js est bien exécuté dans cette page.

Le navigateur intégré affiche le fichier comme copie statique sans charger app.js, donc le problème vient du test et non du code. Je sers le dossier en localhost via un serveur temporaire, sans rien ajouter au projet.

Étape 1 terminée : on peut ajouter une tâche et la voir dans la liste. Aucun commit.

Fichiers créés (dans taskflow/)
index.html
style.css
app.js
Ce que j’ai fait
Formulaire : titre, description, priorité, catégorie, échéance. Seul app.js est chargé.
Validation : trim() retire les espaces autour du titre. Titre vide : message d’erreur. Plus de 100 caractères : message aussi. maxlength bloque la saisie, et app.js revérifie, car maxlength se retire dans les outils développeur.
Modèle : chaque tâche suit le README, ajoutée au tableau taches. Échéance vide : null. Description vide : "". Statut : "a_faire".
Id unique : basé sur Date.now(), augmenté de 1 si déjà pris.
Affichage : la liste est reconstruite à chaque ajout avec createElement et textContent, jamais innerHTML. Date affichée en 31/01/2020.
3 cas de test à la main

Lancer avec Live Server.

Ajout normal : titre Réviser le CSS, description Flexbox, priorité haute, catégorie projet, date au choix. Attendu : tâche visible tout de suite, date en JJ/MM/AAAA, formulaire vidé.
Titre refusé : taper seulement des espaces, puis Ajouter. Attendu : « Le titre est obligatoire. », aucune tâche ajoutée.
Cas limite, code dans le titre : saisir <img src=x onerror=alert(1)>, sans échéance. Attendu : texte affiché tel quel, pas d’image, pas d’alerte, « Échéance : aucune ».
Vérifié

Testé en localhost par script : titre vide, espaces, ajout complet, date passée, sans échéance, injection HTML, 100 caractères acceptés, 101 refusés (après retrait de maxlength), champs du modèle, ids uniques, aucune erreur console.

Non vérifié : rendu visuel, la capture d’écran a échoué.

Non fait : couleur des catégories, car hors de cette étape et CSS minimum demandé. Le critère de la story 1 l’exige, donc à prévoir avant de la déclarer finie.
```

Fichiers créés : index.html, style.css, app.js (le code est dans le commit du sprint 1).

**Gardé :** tout le code. Il respecte nos règles : les textes sont affichés de façon sûre, une date vide devient null, et chaque tâche suit le modèle du README. On a bien aimé qu'il vérifie la limite de 100 caractères deux fois, dans la page et dans le code, parce que la limite de la page peut être retirée dans les outils développeur. Il a aussi testé tout seul un titre piégé avec du code, et rien ne s'exécute.

**Modifié :** la priorité « moyenne » est mise par défaut, parce qu'après un ajout le formulaire revenait sur « basse ».

**Remarqué :** il n'a pas pu tester l'affichage lui-même, donc on a fait les 3 tests à la main avec Live Server. Il nous a aussi prévenus qu'il manquait encore la couleur des catégories : on la fait au sprint 2, avec le CSS.

**Pourquoi :** on a mis toutes nos règles dans le premier prompt pour ne pas avoir à les répéter, et on lui a demandé une seule étape à la fois pour pouvoir tout relire et tout comprendre.

## Prompt 10 · Sprint 1, étape 2 : terminer, modifier et supprimer une tâche (Claude Code)

**Prompt :**
```
Merci, l'étape 1 marche. Une petite correction d'abord : mets la priorité « moyenne » par défaut dans le formulaire, y compris après un ajout.

Sprint 1, étape 2 : on termine les fonctions de base, toujours en mémoire, sans localStorage.

1. Cocher une tâche comme terminée : une case à cocher sur chaque tâche passe son statut à "terminee", et la tâche s'affiche barrée. On peut la décocher pour la remettre "a_faire".
2. Modifier une tâche : un bouton « Modifier » réutilise le même formulaire que l'ajout, avec tous les champs actuels pré-remplis (catégorie comprise), un bouton « Enregistrer » et un bouton « Annuler ». Les règles sont les mêmes qu'à la création (titre vide refusé, 100 caractères maximum) : si le titre est refusé, la tâche garde son ancien titre. Ne recopie pas la validation, mets-la dans une seule fonction utilisée pour l'ajout et pour la modification.
3. Supprimer une tâche : un bouton « Supprimer » demande une confirmation avant de supprimer. Si on annule, la tâche reste.

Garde le même style de code qu'à l'étape 1, et retrouve toujours une tâche par son id, jamais par sa position dans la liste.
```

**Résultat :**
```
Je fais la correction de la priorité, puis cocher, modifier et supprimer, avec une seule fonction de validation et une recherche par id. Ensuite je teste en localhost.

Correction et étape 2 terminées, toujours en mémoire. Aucun commit.

Fichiers modifiés (dans taskflow/)
index.html
style.css
app.js
Ce que j’ai fait
Priorité par défaut : selected sur « moyenne ». formulaire.reset() y revient après chaque ajout.
Cocher : la case passe le statut à "terminee" ou "a_faire". La classe CSS terminee barre le titre, la description, la priorité, la catégorie et l’échéance.
Modifier : idEnModification indique le mode du formulaire : null pour ajouter, un id pour modifier. Le bouton devient « Enregistrer » et « Annuler » apparaît. L’id et le statut de la tâche ne changent pas.
Validation : une seule fonction, validerTitre(), sert à l’ajout et à la modification. Titre refusé : la tâche garde son ancien titre et le formulaire reste en modification.
Supprimer : confirm(), puis filter() sur l’id.
Recherche par id : trouverTache(id), jamais par position.

Trois ajouts que tu n’as pas demandés explicitement, mais nécessaires au bon fonctionnement :

Le titre du formulaire devient « Modifier la tâche » en modification, sinon il resterait « Ajouter une tâche ».
Supprimer la tâche en cours de modification remet le formulaire en mode ajout, sinon « Enregistrer » planterait.
La règle CSS [hidden] { display: none; }, sinon « Annuler » resterait visible à cause du display: block de l’étape 1.
3 cas de test à la main
Cocher et modifier : ajouter une tâche, la cocher, puis la modifier et enregistrer. Attendu : les changements sont appliqués, la tâche reste cochée et barrée. La décocher : elle n’est plus barrée.
Supprimer : cliquer « Supprimer », puis Annuler dans la fenêtre : la tâche reste. Recommencer et confirmer : elle disparaît, les autres ne bougent pas.
Cas limite, titre vidé : cliquer « Modifier », remplacer le titre par des espaces, cliquer « Enregistrer ». Attendu : « Le titre est obligatoire. », le formulaire reste en modification. Cliquer « Annuler » : l’ancien titre est toujours dans la liste, le formulaire est vide avec priorité moyenne.
Vérifié

Tests par script en localhost réussis : les cas ci-dessus, 101 caractères refusés en modification, pré-remplissage complet, échéance null pré-remplie vide, suppression de la tâche en cours de modification, injection HTML en modification, aucune erreur console. Rendu contrôlé par capture d’écran.

Non testé : un vrai clic dans la fenêtre confirm(), simulée par script. Couleur des catégories toujours absente (critère de la story 1).
```

Fichiers modifiés : index.html, style.css, app.js (le code est dans le commit du sprint 1).

**Gardé :** tout. Il n'y a plus qu'une seule fonction pour vérifier le titre, et chaque tâche est retrouvée par son id. Quand on modifie une tâche, elle garde son id et reste cochée si elle l'était.

**Remarqué :** on lui avait dit de ne rien faire de plus, et il a ajouté trois petites choses, mais il nous a prévenus et elles étaient nécessaires : le titre du formulaire qui change en mode modification, le formulaire qui se remet à zéro si on supprime la tâche en train d'être modifiée, et une règle CSS sans laquelle le bouton « Annuler » restait toujours visible. On les garde.

**Vérifié nous-mêmes :** il avait seulement simulé la fenêtre de confirmation, donc on a testé le vrai clic sur Annuler : la tâche reste bien.

**Pourquoi :** on lui a demandé exprès une seule fonction de validation et de passer par l'id, pour éviter les répétitions et les bugs quand l'ordre de la liste change, plus tard avec le tri.

## Prompt 11 · Simplification du code (Claude Code)

**Prompt :**
```
Avant le sprint 2, simplifie deux choses dans app.js, sans rien changer d'autre :
1. Remplace les deux Object.assign du formulaire par des affectations écrites champ par champ, plus faciles à lire pour nous.
2. Quand on coche ou décoche une tâche, change son statut puis appelle simplement afficherTaches(), comme pour les autres boutons, au lieu de modifier la classe CSS à la main.
```

**Résultat :**
```
Je fais les deux remplacements dans app.js, puis je reteste en localhost.

Les deux simplifications sont faites. Aucun commit.

Fichier modifié
app.js
Ce que j’ai fait
Fin des Object.assign : l’ajout écrit chaque champ dans l’objet passé à taches.push({...}). La modification fait tache.titre = champs.titre, et pareil pour les 4 autres champs. L’id et le statut ne sont toujours pas touchés.
Cocher : changerStatut() change le statut puis appelle afficherTaches(). La modification manuelle de la classe dans le clic est retirée. La ligne classList.toggle dans afficherTaches() reste : c’est elle qui barre les tâches terminées à chaque affichage.

Effet de bord du point 2 : la liste est reconstruite à chaque coche, donc la case perd le focus. Au clavier, il faut repartir du début de la page avec Tab. À la souris, aucun changement.

3 cas de test à la main
Cocher et décocher : ajouter deux tâches, cocher la première. Attendu : elle seule est barrée, sa case reste cochée. La décocher : elle n’est plus barrée.
Modifier une tâche cochée : cocher une tâche, cliquer « Modifier », changer tous les champs, cliquer « Enregistrer ». Attendu : nouvelles valeurs affichées, tâche toujours cochée et barrée.
Cas limite, cocher pendant une modification : cliquer « Modifier » sur la tâche A, taper un nouveau titre sans enregistrer, puis cocher la tâche B. Attendu : B est barrée, le formulaire garde le texte tapé et reste en modification sur A.
Vérifié

Tests par script en localhost réussis : ajout, coche et décoche, pré-remplissage, enregistrement, titre refusé, cas limite ci-dessus, suppression, aucune erreur console.

Non testé : la navigation au clavier après une coche, déduite du fonctionnement de la reconstruction.
```

Fichier modifié : app.js.

**Gardé :** les deux simplifications. Maintenant, chaque champ de la tâche est écrit un par un, et cocher une tâche marche comme les autres boutons : on change la tâche, puis on réaffiche la liste.

**Remarqué :** il nous a prévenus que la case perd le focus quand on navigue au clavier. On accepte : c'est un petit défaut, et le code est bien plus simple.

**Pourquoi :** en relisant le code, deux endroits étaient plus compliqués que nécessaire. On a fait simplifier parce qu'on veut pouvoir expliquer chaque ligne à l'oral.

## Prompt 12 · Sprint 2 : sauvegarde et mise en forme (Claude Code)

**Prompt :**
```
Sprint 2 : sauvegarde et mise en forme.

1. Crée storage.js, le seul fichier qui lit et écrit dans le localStorage, et charge-le avant app.js dans index.html.
   - Les tâches sont rangées sous la clé taskflow_taches_<identifiant>, comme dans le README. Les comptes n'existent pas encore : pour l'instant, utilise un identifiant temporaire "invite" écrit à un seul endroit, pour qu'on puisse brancher la connexion au sprint 3 sans tout réécrire.
   - La lecture se fait dans un try/catch : si la clé n'existe pas ou si les données sont cassées, on repart d'un tableau vide sans planter.
   - app.js charge les tâches au démarrage et les sauvegarde après chaque ajout, modification, coche et suppression.

2. Refais style.css plus simplement, sans mettre display: block sur tous les éléments, pour ne plus avoir besoin de la règle [hidden] ni des exceptions pour la liste.
   - Chaque catégorie a sa propre couleur (cours, perso, projet), la même partout dans l'app.
   - Les tâches terminées restent barrées.
   - Une mise en page propre et lisible, qui marche aussi sur un écran de téléphone, sans en faire trop.
```

**Résultat :**
```
Je crée storage.js, je branche la sauvegarde dans app.js, je refais style.css, puis je teste en localhost : rechargement, données cassées, écran de téléphone.

Sprint 2 terminé : les tâches restent après un rechargement, et style.css est refait. Aucun commit.

Fichiers
Créé : storage.js
Modifiés : index.html, app.js, style.css
Ce que j’ai fait

Sauvegarde

storage.js contient chargerTaches() et sauvegarderTaches(). Aucun autre fichier ne touche au localStorage.
"invite" est écrit une seule fois, dans IDENTIFIANT_ACTUEL. Au sprint 3, seul cet endroit changera.
Lecture dans un try/catch. Clé absente ou JSON invalide : [].
tacheValide() vérifie aussi chaque tâche relue. Sans ça, un JSON valide comme [{"id":1}] passerait le try/catch et ferait planter l’affichage.
app.js charge au démarrage et sauvegarde après ajout, modification, coche et suppression.

CSS

display: grid sur le formulaire remplace les display: block : chaque champ a sa ligne, en pleine largeur. La règle [hidden] et les exceptions de la liste ont disparu.
Une tâche a une bande de couleur à gauche : bleu pour cours, vert pour perso, orange pour projet. Ces couleurs sont définies une seule fois, via la classe categorie-... ajoutée par app.js.
Les tâches terminées restent barrées.
3 cas de test à la main

Lancer avec Live Server.

Rechargement : ajouter une tâche par catégorie, en cocher une, en modifier une, en supprimer une, puis appuyer sur F5. Attendu : la liste est identique, la tâche cochée est toujours barrée, chaque catégorie a sa couleur.
Téléphone : F12, mode appareil mobile, largeur 375 px, ajouter une tâche avec un titre de 100 caractères sans espace. Attendu : pas de défilement horizontal, le titre passe à la ligne.
Cas limite, données cassées : F12, onglet Application, Local Storage, remplacer la valeur de taskflow_taches_invite par {cassé, puis F5. Attendu : liste vide, pas d’erreur, et on peut ajouter une tâche.
Vérifié

Tests par script en localhost réussis :

sauvegarde après chaque action et relecture après rechargement ;
10 cas de clé absente ou de données cassées, sans erreur console ;
à 375 px : aucun débordement, contrôlé aussi par capture d’écran.

Risques :

Une seule tâche invalide vide toute la liste, comme demandé, et la sauvegarde suivante écrase les anciennes données.
localStorage plein non géré (point reporté du README) : l’erreur part en console, l’affichage reste correct, mais la tâche n’est pas sauvegardée.
```

Fichiers : storage.js créé ; index.html, app.js et style.css modifiés (le code est dans le commit du sprint 2).

**Gardé :** tout. Les tâches restent après un rechargement, et seul storage.js touche aux données enregistrées. Le nom « invite » n'est écrit qu'à un endroit, donc on pourra brancher les comptes facilement au sprint 3. Le CSS est plus simple qu'avant, et chaque catégorie a sa couleur.

**Remarqué :** il a ajouté de lui-même une vérification de chaque tâche relue. On ne l'avait pas demandée ici, mais c'était une des corrections décidées lors de notre audit, donc on la garde.

**Vérifié nous-mêmes :** on a rechargé la page après plusieurs actions, testé sur un écran de téléphone, et abîmé les données à la main dans les outils développeur : l'app ne plante pas.

**Pourquoi :** on a préparé la sauvegarde pour les comptes dès maintenant, pour ne pas devoir tout réécrire au sprint 3.

## Prompt 13 · Ne plus perdre toutes les tâches (Claude Code)

**Prompt :**
```
Dans storage.js, au lieu de tout vider quand une seule tâche est invalide, garde seulement les tâches valides et ignore les autres. Ne change rien d'autre.
```

**Résultat :**
```
Je remplace le test dans chargerTaches(), puis je reteste en localhost.

chargerTaches() garde maintenant les tâches valides et ignore les autres. Aucun commit.

Fichier modifié
storage.js
Ce que j’ai fait

donnees.every(tacheValide) est remplacé par donnees.filter(tacheValide). Si les données ne sont pas un tableau, ou si le JSON est cassé, le résultat reste [].

3 cas de test à la main

Lancer avec Live Server, ajouter 2 tâches, puis F12, onglet Application, Local Storage, clé taskflow_taches_invite.

Une tâche invalide : dans la valeur, changer "priorite":"haute" (ou la valeur présente) d’une seule tâche en "priorite":"urgente", puis F5. Attendu : seule l’autre tâche s’affiche, sans erreur.
JSON cassé : remplacer toute la valeur par {cassé, puis F5. Attendu : liste vide, sans erreur, et on peut ajouter une tâche.
Cas limite, éléments qui ne sont pas des tâches : remplacer la valeur par [null, 3, {"id":1}], puis F5. Attendu : liste vide, sans erreur.
Vérifié

Tests par script en localhost réussis sur 10 cas : clé absente, JSON cassé, non-tableau, tableau vide, tout invalide, tout valide, mélange. Dans le mélange de 8 éléments, les 3 tâches valides sont gardées, avec leur statut, et se modifient normalement. Aucune erreur console.

Risque : les tâches ignorées restent dans le localStorage jusqu’à la prochaine sauvegarde. Après un ajout, une coche, une modification ou une suppression, elles sont effacées définitivement.
```

**Gardé :** la correction. Maintenant, une seule tâche abîmée ne fait plus disparaître toutes les autres.

**Pourquoi :** il nous avait prévenus lui-même du risque. Avec l'ancienne version, une seule tâche abîmée vidait la liste, et la sauvegarde suivante effaçait tout pour de bon. C'est justement ce que notre audit voulait éviter.

## Prompt 14 · Sprint 3, étape 1 : création de compte (Claude Code)

**Prompt :**
```
Sprint 3, étape 1 : création de compte. On garde les mêmes règles que depuis le début (JS natif, textContent, code simple et commenté, pas de commit, fichiers modifiés + explication + 3 cas de test à la fin).

1. Crée auth.js, qui contient toute la partie sécurité, et charge-le entre storage.js et app.js dans index.html.

2. Ajoute dans index.html un formulaire d'inscription : identifiant, mot de passe, et la jauge en dessous. Pour l'instant, affiche-le simplement au-dessus des tâches : le changement d'écran (inscription, connexion, tâches) viendra à l'étape suivante.

3. Le contrôle du mot de passe, à chaque caractère tapé :
   - les 4 règles : 8 caractères minimum, une majuscule, un chiffre, un caractère spécial (tout ce qui n'est ni une lettre ni un chiffre) ;
   - la jauge : 2 règles ou moins = faible, 3 = moyen, 4 = fort, avec une couleur pour chaque niveau ;
   - les règles qui manquent sont affichées sous la jauge ;
   - seul « fort » permet de créer le compte.

4. L'identifiant est mis en minuscules et sans espaces autour, et il ne peut contenir que des lettres, des chiffres, - et _. Un identifiant vide ou déjà pris est refusé.

5. Le mot de passe n'est jamais enregistré en clair. Hache-le avec PBKDF2 (SHA-256) via Web Crypto, avec un sel aléatoire de 16 octets tiré avec crypto.getRandomValues, différent pour chaque compte. Le sel et le hash sont enregistrés en texte hexadécimal. Passe le mot de passe par TextEncoder avant de le hacher. Choisis un nombre d'itérations raisonnable et explique ton choix en une phrase. Si crypto.subtle n'existe pas (page ouverte sans localhost), affiche un message clair au lieu de planter.

6. Les comptes sont enregistrés dans storage.js, sous la clé taskflow_utilisateurs, avec le modèle du README (identifiant, sel, hash, echecs: 0, bloqueJusqua: null). La lecture se fait dans un try/catch, comme pour les tâches.

Une fois le compte créé, affiche juste « Compte créé ». Pas encore de connexion.

Dans ton explication finale, explique comme à un débutant ce que font le sel, PBKDF2 et les fonctions async/await, parce qu'on devra le présenter à l'oral.
```

**Résultat :**
```
Je crée auth.js, j’ajoute le formulaire et la jauge, puis le stockage des comptes. Ensuite je teste en localhost, en recalculant le hash avec un autre outil que Web Crypto.

La création de compte fonctionne et affiche « Compte créé ». Aucun commit.

Fichiers
Créé : auth.js
Modifiés : storage.js, index.html, style.css
Ce que j’ai fait
Formulaire : identifiant, mot de passe, jauge et règles manquantes, au-dessus des tâches.
Jauge : recalculée à chaque caractère. Rouge pour faible, orange pour moyen, vert pour fort. Seul « fort » permet de créer le compte.
Caractère spécial : é compte comme une lettre, donc pas comme un caractère spécial, conformément au README.
Identifiant : trim(), minuscules, puis contrôle. Vide, caractère interdit ou déjà pris : refusé.
Stockage : chargerUtilisateurs() et sauvegarderUtilisateurs() dans storage.js, avec try/catch et filtre des comptes invalides, comme pour les tâches.
Sans crypto.subtle : message clair, pas de plantage.

Itérations : 600 000, car c’est la valeur recommandée par l’OWASP pour PBKDF2-SHA256, et le calcul a pris environ 0,1 seconde ici, ce qui reste imperceptible pour l’utilisateur.

Deux choix que tu n’avais pas précisés :

L’identifiant n’accepte que a-z sans accent. Ça évite les comptes visuellement identiques, comme un а cyrillique à la place d’un a latin.
Le bouton est désactivé pendant le calcul, sinon un double clic créerait deux comptes.
À expliquer à l’oral

Le hash. C’est une empreinte : à partir du mot de passe, on calcule un long texte, et on ne peut pas faire le chemin inverse. À la connexion, on recalculera l’empreinte du mot de passe tapé et on la comparera à celle enregistrée. Le mot de passe lui-même n’est jamais stocké.

Le sel. C’est une valeur aléatoire de 16 octets, différente pour chaque compte, mélangée au mot de passe avant le calcul.

Sans sel, deux personnes avec le même mot de passe auraient la même empreinte. Un attaquant le verrait tout de suite.
Sans sel, il pourrait aussi utiliser des tables d’empreintes calculées à l’avance.
Avec un sel, il doit attaquer chaque compte séparément.
Le sel n’est pas secret : il est enregistré à côté du hash, car il faut le réutiliser à la connexion.

PBKDF2. Un hash simple comme SHA-256 est très rapide, donc un attaquant peut tester des milliards de mots de passe. PBKDF2 répète le calcul 600 000 fois. Pour un utilisateur, c’est 0,1 seconde une seule fois. Pour un attaquant, chaque essai coûte 600 000 fois plus cher. Ça ralentit l’attaque, mais ne l’empêche pas : un mot de passe très courant reste vite trouvé.

TextEncoder. Web Crypto travaille sur des octets, pas sur du texte. TextEncoder convertit le mot de passe en octets UTF-8.

async / await. Certaines opérations prennent du temps, comme ce calcul. Le navigateur ne bloque pas la page pendant ce temps : il donne une promesse, c’est-à-dire « le résultat arrivera plus tard ».

await veut dire « attends ce résultat avant de passer à la ligne suivante », sans figer la page.
async est le mot obligatoire devant une fonction qui utilise await.
Comparaison : tu commandes au comptoir, tu attends ton numéro, et le restaurant continue à servir les autres.
3 cas de test à la main

Lancer avec Live Server.

Jauge : taper abc, puis Abcdefg1, puis Abcdefg1!. Attendu : faible, puis moyen avec « Il manque : un caractère spécial », puis fort sans règle manquante.
Création : identifiant  Etudiant1 , mot de passe Abcdefg1!, cliquer « Créer le compte ». Attendu : « Compte créé », formulaire vidé. Dans F12, Application, Local Storage, taskflow_utilisateurs contient etudiant1 avec sel et hash en hexadécimal, et aucune trace du mot de passe.
Cas limite, identifiant déjà pris avec une autre casse : recréer ETUDIANT1 avec un mot de passe fort. Attendu : « Cet identifiant est déjà pris. », aucun nouveau compte.
Vérifié

Tests par script en localhost réussis : 13 mots de passe sur la jauge, dont accents et emojis, identifiants refusés, double clic, sels et hash différents pour le même mot de passe, localStorage plein, 7 cas de lecture cassée, tâches toujours fonctionnelles, aucune erreur console.

Le hash a été recalculé en Python avec le même sel : résultat identique, donc PBKDF2 est bien appliqué avec les bons paramètres.

Limites :

L’absence de crypto.subtle est simulée par script, pas testée sur une vraie page non sécurisée.
Un compte invalide est ignoré à la lecture, puis effacé à la prochaine création de compte.
```

Fichiers : auth.js créé ; storage.js, index.html et style.css modifiés.

**Gardé :** tout. Le mot de passe n'est jamais enregistré, seulement son empreinte et le sel. On a vérifié dans les outils développeur : on ne voit aucune trace du mot de passe. Il a choisi 600 000 répétitions du calcul parce que c'est la valeur recommandée aujourd'hui, et ça ne prend que 0,1 seconde. On garde aussi ses explications sur le sel et PBKDF2 pour préparer l'oral.

**Remarqué :** il a fait deux choix qu'on n'avait pas précisés. L'identifiant n'accepte pas les accents, pour éviter deux comptes qui se ressemblent à l'œil avec des lettres d'un autre alphabet. Et le bouton se bloque pendant le calcul, pour qu'un double clic ne crée pas deux comptes. On garde les deux. On a juste ajouté « sans accent » dans le README.

**Vérifié nous-mêmes :** deux comptes avec le même mot de passe ont bien deux empreintes différentes, ce qui prouve que le sel marche. Et lui a recalculé l'empreinte avec un autre outil (Python) : même résultat.

**Pourquoi :** on a mis le hachage dès la création de compte, et pas plus tard, pour qu'aucun mot de passe ne soit jamais enregistré en clair, même pendant qu'on développe. On lui a aussi demandé d'expliquer comme à un débutant, parce que c'est la partie qu'on devra le mieux expliquer à l'oral.

## Prompt 15 · Sprint 3, étape 2 : connexion et tâches par compte (Claude Code)

**Prompt :**
```
Sprint 3, étape 2 : connexion, déconnexion et tâches séparées par compte. Mêmes règles que d'habitude.

1. Trois écrans dans index.html : connexion, inscription et tâches. Un seul est visible à la fois. On passe de la connexion à l'inscription avec un lien, et inversement. Après la création d'un compte, on revient à l'écran de connexion avec le message « Compte créé, tu peux te connecter ».

2. Connexion : l'identifiant est normalisé comme à l'inscription, puis on recalcule l'empreinte du mot de passe tapé avec le sel du compte, et on la compare à celle enregistrée. Si l'identifiant n'existe pas ou si le mot de passe est faux, on affiche le même message : « Identifiant ou mot de passe incorrect. ». Ne compte pas encore les échecs, le blocage viendra à l'étape suivante.

3. Session : l'identifiant connecté est enregistré dans storage.js sous la clé taskflow_session. À l'ouverture de la page, si une session existe et que le compte existe toujours, on arrive directement sur les tâches, sinon sur la connexion. Un bouton « Se déconnecter » supprime la session et ramène à la connexion. Affiche « Connecté en tant que … » sur l'écran des tâches.

4. Tâches par compte : remplace l'identifiant temporaire "invite" par l'identifiant connecté, pour que chaque compte ait sa propre clé taskflow_taches_<identifiant>. Après une déconnexion, plus aucune tâche ne doit rester affichée ou en mémoire.

Dans ton explication finale, explique simplement comment auth.js et app.js se parlent : qui appelle quoi, et dans quel ordre.
```

**Résultat :**
```
Je réécris index.html en trois écrans, je branche session et connexion, puis je teste deux comptes en localhost : séparation des tâches, déconnexion, rechargement.

Connexion, déconnexion, session et tâches par compte fonctionnent. Aucun commit.

Fichiers modifiés (dans taskflow/)
index.html
auth.js
app.js
storage.js
style.css
Ce que j’ai fait
Écrans : trois <section>, toutes cachées au départ. afficherEcran() en montre une seule. Elle vide aussi les formulaires de connexion et d’inscription, donc aucun mot de passe ne reste dans un champ caché.
Connexion : identifiant normalisé, sel relu et reconverti en octets, empreinte recalculée, puis comparaison. Compte inconnu ou mauvais mot de passe : même message.
Session : lireSession(), enregistrerSession(), supprimerSession() dans storage.js, avec try/catch à la lecture.
Tâches par compte : "invite" a disparu. chargerTaches() et sauvegarderTaches() reçoivent maintenant l’identifiant.
Déconnexion : fermerTaches() vide le tableau, la liste et le formulaire de tâche, même si une modification était en cours.
Comment auth.js et app.js se parlent

Les scripts se chargent dans l’ordre storage.js, auth.js, app.js. Ils partagent le même espace global : une fonction écrite dans un fichier peut être appelée depuis un autre.

Au chargement de la page

storage.js puis auth.js se chargent : ils définissent leurs fonctions et leurs écouteurs.
app.js se charge, et sa dernière ligne appelle demarrer(), qui est dans auth.js. C’est app.js qui lance cet appel, car à ce moment tout est prêt. Si auth.js le faisait lui-même, ouvrirTaches() n’existerait pas encore.
demarrer() lit la session via storage.js. Si le compte existe : ouvrirSession(). Sinon : écran de connexion.

À la connexion

Le clic sur « Se connecter » déclenche le code de auth.js, qui vérifie le mot de passe.
auth.js enregistre la session via storage.js.
auth.js appelle ouvrirSession(), qui affiche l’écran des tâches puis appelle ouvrirTaches(identifiant) dans app.js.
app.js retient l’identifiant, charge ses tâches via storage.js et les affiche.

Pendant l’utilisation
auth.js n’intervient plus. app.js sauvegarde avec l’identifiant qu’il a retenu.

À la déconnexion

auth.js supprime la session via storage.js.
auth.js appelle fermerTaches() dans app.js, qui oublie l’identifiant et les tâches.
auth.js affiche l’écran de connexion.

À retenir : auth.js décide qui est connecté, app.js gère les tâches de cette personne, storage.js est le seul à toucher au localStorage. app.js n’appelle dans auth.js que demarrer(), et auth.js n’appelle dans app.js que ouvrirTaches() et fermerTaches().

3 cas de test à la main

Lancer avec Live Server.

Deux comptes séparés : créer etudiant1, se connecter, ajouter une tâche, se déconnecter. Créer etudiant2, se connecter. Attendu : liste vide, « Connecté en tant que etudiant2 ». Se reconnecter en etudiant1 : sa tâche est là.
Rester connecté : une fois connecté, recharger la page ou fermer puis rouvrir l’onglet. Attendu : écran des tâches directement. Cliquer « Se déconnecter », recharger : écran de connexion.
Cas limite, session vers un compte inexistant : une fois connecté, dans F12, Application, Local Storage, remplacer la valeur de taskflow_session par "fantome", puis F5. Attendu : écran de connexion, aucune tâche affichée.
Vérifié

Tests par script en localhost réussis :

changement d’écrans et liens ;
mauvais mot de passe, compte inconnu, champs vides : même message ;
connexion avec identifiant en majuscules et espaces ;
déconnexion pendant une modification : mémoire et écran vidés ;
clés séparées entre deux comptes ;
rechargement, et 7 valeurs de session dont cassée et compte inexistant ;
aucune erreur console.

Limites :

Ancienne clé : taskflow_taches_invite reste dans ton localStorage. Un compte nommé invite récupérerait ces tâches : supprime cette clé dans F12.
Temps de réponse : un compte inconnu répond sans calcul, un mot de passe faux prend environ 0,1 seconde. La différence pourrait révéler qu’un compte existe, mais la liste des comptes est déjà lisible dans le localStorage (limite du README).
Faux crypto.subtle : absence toujours simulée par script.
```

Fichiers modifiés : index.html, auth.js, app.js, storage.js, style.css.

**Gardé :** tout. Il y a maintenant trois écrans (connexion, inscription, tâches) et un seul s'affiche à la fois. Chaque compte a ses propres tâches, et on reste connecté après un rechargement. Quand on se déconnecte, plus rien ne reste à l'écran ni en mémoire. On garde aussi son explication de qui appelle quoi entre les fichiers, pour l'oral.

**Remarqué :** il a vu lui-même qu'un mauvais mot de passe met un peu plus de temps à répondre qu'un compte qui n'existe pas, ce qui pourrait permettre de deviner quels comptes existent. On ne corrige pas, parce que la liste des comptes est de toute façon visible dans le navigateur, mais on en parlera à l'oral. Il nous a aussi prévenus que nos anciennes tâches de test étaient restées enregistrées : on les a supprimées.

**Vérifié nous-mêmes :** avec deux comptes, chacun ne voit que ses tâches. Le message d'erreur est le même pour un mauvais identifiant et pour un mauvais mot de passe. Et en changeant à la main le nom de la personne connectée dans le navigateur, on arrive sur les tâches de l'autre : c'est la limite « session falsifiable » qu'on avait prévue dans le README.

**Pourquoi :** on avait préparé la sauvegarde au sprint 2 pour qu'elle marche avec un identifiant, donc brancher les comptes n'a rien cassé.

## Prompt 16 · Sprint 3, étape 3 : blocage après 3 échecs (Claude Code)

**Prompt :**
```
Sprint 3, étape 3 (bonus) : blocage après 3 échecs. Mêmes règles que d'habitude.

- Quand le mot de passe est faux pour un compte qui existe, on augmente son compteur echecs et on l'enregistre.
- Au 3e échec, on enregistre bloqueJusqua = maintenant + 30 secondes, et on remet echecs à 0.
- Tant que le compte est bloqué, on ne vérifie même pas le mot de passe : on affiche « Compte bloqué, réessaie dans X secondes », avec X calculé au moment de l'essai. Pas de compte à rebours qui se met à jour tout seul, on reste simple.
- Une fois les 30 secondes passées, on peut réessayer normalement.
- Une connexion réussie remet echecs à 0 et bloqueJusqua à null.
- Pour un identifiant qui n'existe pas, on ne compte rien et on garde le message habituel.
- Le blocage reste actif après un rechargement de la page, puisqu'il est enregistré dans le compte.
- Le blocage ne concerne que ce compte : les autres comptes peuvent toujours se connecter.
```

**Résultat :**
```
J’ajoute le compteur d’échecs et le blocage dans auth.js, plus une fonction de mise à jour d’un compte dans storage.js. Je teste avec une vraie attente de 30 secondes.

Le blocage après 3 échecs fonctionne. Aucun commit.

Fichiers modifiés
auth.js
storage.js
Ce que j’ai fait
Ordre des contrôles à la connexion : compte inconnu, puis compte bloqué, puis vérification du mot de passe.
Compte inconnu : message habituel, rien n’est compté ni enregistré.
Compte bloqué : secondesDeBlocage() calcule X au moment de l’essai, à partir de bloqueJusqua et Date.now(). Le mot de passe n’est pas calculé.
Mot de passe faux : enregistrerEchec() ajoute 1. Au 3e, bloqueJusqua = Date.now() + 30000 et echecs revient à 0.
Connexion réussie : effacerEchecs() remet echecs à 0 et bloqueJusqua à null.
Enregistrement : mettreAJourUtilisateur() dans storage.js remplace uniquement le compte concerné. Le blocage est stocké dans ce compte : il survit au rechargement et ne touche pas les autres.

Deux détails que tu n’avais pas précisés :

Le 3e échec affiche déjà « Compte bloqué, réessaie dans 30 secondes », comme le demande la story 8.
Le texte passe au singulier pour X = 1 : « 1 seconde ».
3 cas de test à la main

Lancer avec Live Server, avec deux comptes créés : etudiant1 et etudiant2.

Blocage : se tromper 3 fois de mot de passe sur etudiant1. Attendu : 2 fois « Identifiant ou mot de passe incorrect. », puis « Compte bloqué, réessaie dans 30 secondes ». Taper le bon mot de passe : toujours bloqué.
Rechargement et autre compte : pendant le blocage, appuyer sur F5 et réessayer etudiant1. Attendu : toujours bloqué, X a diminué. Se connecter en etudiant2 : ça marche.
Cas limite, compteur remis à zéro : se tromper 2 fois sur un compte, se connecter correctement, se déconnecter, puis se tromper 2 fois de plus. Attendu : pas de blocage, car la connexion réussie a remis le compteur à 0.
Vérifié

Tests par script en localhost réussis, dont une vraie attente de 30 secondes :

compteur à 1, 2, puis blocage ;
aucun calcul de hash pendant le blocage, vérifié en comptant les appels à deriveBits ;
blocage après rechargement, X à 10 secondes après 20 secondes d’attente ;
après expiration : mauvais mot de passe recompté à 1, bon mot de passe accepté avec remise à zéro ;
identifiant inconnu essayé 4 fois : aucune donnée modifiée ;
autre compte non touché, sel et hash intacts, aucune erreur console.

Limites :

Le message de blocage révèle qu’un compte existe, puisqu’un identifiant inconnu n’est jamais bloqué. C’est une conséquence directe des règles demandées, à mentionner à l’oral.
Blocage contournable en modifiant le localStorage ou l’heure du PC : déjà indiqué dans le README.
Plusieurs onglets : des essais simultanés peuvent perdre un échec (point reporté du README).
```

Fichiers modifiés : auth.js, storage.js.

**Gardé :** tout. Après 3 mauvais mots de passe, le compte est bloqué 30 secondes, même si on recharge la page, et les autres comptes peuvent toujours se connecter. Pendant le blocage, le mot de passe n'est même pas vérifié. Une connexion réussie remet le compteur à zéro. Le nombre d'échecs et la durée sont écrits une seule fois en haut du fichier, donc faciles à changer.

**Remarqué :** il a ajouté deux petits détails : le message de blocage s'affiche dès le 3e échec, et « seconde » passe au singulier quand il ne reste qu'une seconde. On garde. Il nous a aussi prévenus d'une nouvelle limite : comme un compte qui n'existe pas n'est jamais bloqué, le message de blocage révèle que le compte existe. On l'a ajoutée dans les limites du README.

**Vérifié nous-mêmes :** les 3 tests à la main, et le test d'audit : en remettant à zéro la date de blocage dans les outils développeur, le blocage saute. C'est la limite « blocage contournable » prévue dans le README.

**Pourquoi :** c'était un bonus, mais il protège contre quelqu'un qui essaie de deviner un mot de passe à la main. On l'a gardé simple, sans compte à rebours qui se met à jour tout seul.

## Prompt 17 · Tri, filtres et recherche (Claude Code)

**Prompt :**
```
Dernière étape : tri, filtres et recherche. Mêmes règles que d'habitude. Ne touche pas à auth.js ni à storage.js.

- Au-dessus de la liste des tâches, ajoute : un choix de tri (aucun, par priorité, par échéance), un filtre par statut (toutes, à faire, terminées), un filtre par catégorie (toutes, cours, perso, projet) et un champ de recherche.
- Tri par priorité : haute, puis moyenne, puis basse. Tri par échéance : la date la plus proche en premier, les tâches sans échéance à la fin.
- Les deux filtres et la recherche se combinent, et le tri s'applique à la liste filtrée.
- La recherche porte seulement sur le titre et ignore les majuscules. Effacer la recherche réaffiche la liste filtrée.
- Si aucune tâche ne correspond, affiche « Aucune tâche ne correspond. ».
- Le tri et les filtres changent seulement ce qui est affiché : le tableau des tâches enregistrées ne doit pas être modifié ni réordonné. Ils ne sont pas sauvegardés et reviennent à zéro à la connexion.
```

**Résultat :**
```
J’ajoute les contrôles dans index.html et un calcul de la liste affichée dans app.js, sur une copie, donc sans toucher au tableau enregistré. Ensuite je teste les combinaisons en localhost.

Tri, filtres et recherche fonctionnent et se combinent. auth.js et storage.js n’ont pas été touchés. Aucun commit.

Fichiers modifiés
index.html
app.js
Ce que j’ai fait
Contrôles : un formulaire au-dessus de la liste, avec tri, statut, catégorie et recherche. Un seul écouteur input sur ce formulaire suffit pour les 4 champs.
tachesAAfficher() : filter() garde les tâches qui passent les 3 conditions, puis le tri s’applique sur ce résultat.
Tableau protégé : filter() crée toujours un nouveau tableau, donc sort() ne réordonne jamais taches. Le tri et les filtres ne sont pas sauvegardés.
Priorité : RANG_PRIORITE, avec haute = 3, moyenne = 2, basse = 1, comme dans le README. À égalité, l’ordre d’origine est gardé.
Échéance : les dates AAAA-MM-JJ se comparent comme du texte. Les null passent à la fin.
Recherche : titre seulement, en minuscules des deux côtés, espaces autour ignorés.
Retour à zéro : formulaireFiltres.reset() dans ouvrirTaches(), donc à chaque connexion et à chaque rechargement.
Touche Entrée : bloquée dans la recherche, sinon elle rechargerait la page.
3 cas de test à la main

Lancer avec Live Server, créer 4 tâches variées (priorités, catégories, avec et sans échéance), en cocher une.

Tri : choisir « Priorité » : haute, puis moyenne, puis basse. Choisir « Échéance » : date la plus proche en premier, tâches sans date à la fin. Revenir à « Aucun » : ordre de création.
Combinaison : choisir « À faire », une catégorie et taper une partie d’un titre en MAJUSCULES. Attendu : seules les tâches qui respectent les 3 conditions restent. Effacer la recherche : la liste filtrée revient.
Cas limite, aucun résultat et retour à zéro : chercher xyzxyz. Attendu : « Aucune tâche ne correspond. ». Se déconnecter puis se reconnecter : tri et filtres à zéro, toutes les tâches visibles.
Vérifié

Tests en localhost réussis :

chaque tri, chaque filtre, recherche avec majuscules et espaces, description ignorée ;
combinaisons des 2 filtres, de la recherche et du tri ;
taches et localStorage inchangés après tri et filtres ;
cocher, modifier, supprimer dans une liste triée : la bonne tâche est touchée ;
retour à zéro à la connexion et au rechargement ;
saisie clavier réelle, Entrée sans rechargement, effacement ;
aucune erreur console.

À savoir :

Un compte sans aucune tâche affiche aussi « Aucune tâche ne correspond. », car la liste affichée est vide.
Une date passée apparaît en premier dans le tri par échéance.
Cocher une tâche avec le filtre « À faire » la fait disparaître aussitôt de la liste, ce qui est le comportement attendu du filtre.
La recherche ignore les majuscules mais pas les accents : reviser ne trouve pas Réviser.
```

Fichiers modifiés : index.html, app.js.

**Gardé :** tout. On peut trier, filtrer par statut et par catégorie, et chercher dans les titres, et tout se combine. Le tri et les filtres changent seulement ce qu'on voit : l'ordre des tâches enregistrées ne bouge pas, il l'a vérifié.

**Remarqué :** il nous a signalé deux petites choses. Un nouveau compte sans tâche affiche « Aucune tâche ne correspond. », et la recherche ne gère pas les accents. On garde comme ça, parce que le README demandait seulement d'ignorer les majuscules.

**Pourquoi :** c'était la fonctionnalité de la filière Développement, qu'on avait décidé de faire en plus. On l'a gardée pour la fin, une fois toute la partie sécurité terminée.