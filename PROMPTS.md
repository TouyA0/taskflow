# Journal de prompts — TaskFlow

Tous les prompts de la séance 1 ont été faits dans une seule conversation Claude, pour qu'elle garde le contexte d'un prompt à l'autre.

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

**Gardé :** les 3 questions. Elles étaient toutes utiles, surtout celle sur les comptes, on n'y avait pas vraiment pensé au départ.

**Modifié / rejeté :** rien. Pour les catégories, on a choisi de les garder fixes, sinon ça devenait trop gros pour nous.

**Pourquoi :** on voulait que l'IA nous pose des questions avant d'écrire les stories, pour éviter qu'elle invente le projet à notre place. Nos réponses (dans le prompt 2) ont décidé comment on range les tâches par compte et comment marchent la session et le blocage.

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

**Gardé :** les 10 stories comme point de départ. Elles respectent le cadre (pas de serveur, pas de bibliothèque) et nos réponses. On a bien aimé que la 9 ne dise pas si c'est l'identifiant ou le mot de passe qui est faux, comme ça on ne peut pas deviner quels comptes existent. On garde aussi l'idée de hacher le mot de passe avec Web Crypto.

**Modifié / rejeté :** rien pour l'instant. Le prof veut 5 à 8 stories, donc on savait qu'il faudrait en fusionner après (on pensait à 2 + 4 et 6 + 7). L'IA a ajouté toute seule une confirmation avant de supprimer (story 4). On ne l'avait pas demandée, mais on la garde, c'est pratique.

**Pourquoi :** on a demandé 10 stories exprès, pour faire le tri nous-mêmes au lieu de prendre directement ce qu'elle propose.

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

**Gardé :** la plupart de ses hypothèses (confirmation avant suppression, 3 priorités, échéance pas obligatoire, recherche seulement sur le titre, catégorie obligatoire). On garde aussi ses remarques sur les stories trop grosses (la 9 et la 7), l'idée d'une « définition de fini » pour ne pas répéter « conservé après rechargement » partout, et toute la partie sur ce que la connexion protège ou pas, qu'on va remettre dans le README. Le point sur la faille XSS avec innerHTML est important pour nous, on le garde.

**Modifié :** deux choses n'étaient pas testables, donc on les a fixées nous-mêmes : la jauge (2 règles ou moins = faible, 3 = moyen, 4 = fort) et le blocage, qui se fait par compte et pas pour tout le navigateur. On ajoute aussi un sel au hachage, vu qu'elle dit elle-même qu'un SHA-256 sans sel se casse vite.

**Rejeté :** le chiffrement des tâches (PBKDF2 + AES-GCM). C'est trop compliqué pour nous en 3 séances, on en parlera à l'oral comme d'une limite.

**À vérifier :** elle dit que Web Crypto ne marche pas si on ouvre index.html directement (file://). On n'a pas encore testé, on le fera en séance 2 avec window.isSecureContext dans la console. De toute façon, on lance l'app avec Live Server, donc en localhost.

**Pourquoi :** lui demander de se critiquer elle-même nous a montré tout ce qu'elle avait supposé sans nous demander. Sans ça, on aurait gardé une jauge sans seuils et un blocage pas clair.

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

**Gardé :** les 8 stories et la définition de fini, qu'on a mises dans le README. Toutes nos décisions du prompt 3 ont bien été appliquées.

**Modifié :** rien. On ne lui avait pas donné de règle pour Must / Should / Could, mais sa répartition nous va : la base en Must, ce que demande la consigne en Should, les bonus en Could.

**Remarqué :** on lui avait dit « sans rien ajouter » et elle a quand même ajouté deux critères : « les autres comptes peuvent toujours se connecter » (story 8) et « effacer la recherche réaffiche la liste filtrée » (story 7). On les garde parce qu'ils vont avec nos choix, mais ça montre qu'il faut tout relire.

**Pourquoi :** on lui a donné nos décisions une par une (garder, fusionner, séparer, enlever, préciser) pour que la version finale vienne de nous, et pas juste d'elle.

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

**Gardé :** la structure avec les 2 fichiers en plus, storage.js et auth.js, et l'ordre de chargement des scripts (storage.js, puis auth.js, puis app.js).

**Modifié :** rien. On a juste décidé de faire une seule page index.html, avec la connexion, l'inscription et les tâches dans des sections qu'on affiche une par une, au lieu de faire plusieurs pages.

**Rejeté :** rien, elle n'a proposé ni dossiers inutiles ni outil de build.

**Pourquoi :** avec un seul fichier qui touche au localStorage et un fichier à part pour la sécurité, le code sera plus clair et plus simple à vérifier pendant l'audit. Une seule page évite de recopier le HTML et de revérifier la connexion sur chaque page.

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

**Gardé :** les deux modèles et les trois clés localStorage. On aime bien l'idée de ranger les tâches avec une clé par utilisateur, au lieu de mettre un champ propriétaire dans chaque tâche. Le sel est bien tiré au hasard avec crypto.getRandomValues, un par compte.

**Modifié :** on met l'identifiant en minuscules avant de le stocker, donc « Quentin » et « quentin », c'est le même compte. Dans le README, on a remplacé « quentin » par « etudiant1 » dans les exemples, parce que le prof ne veut pas de données personnelles réelles.

**Rejeté :** rien.

**Remarqué :** taskflow_session contient juste l'identifiant, donc n'importe qui peut le changer dans la console et se connecter comme quelqu'un d'autre. On garde ça pour l'audit du prompt 7.

**Pourquoi :** tout ce qui peut se calculer (couleur, ordre des priorités, jauge, blocage en cours) n'est pas stocké. Comme ça, les données et l'affichage ne peuvent pas se contredire.

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

**Gardé :** toutes les corrections marquées « Oui » qui concernent la sécurité ou le fait que l'app ne plante pas. On les fera en séance 2 : lire le localStorage dans un try/catch, vérifier que les valeurs sont autorisées, normaliser l'identifiant, utiliser textContent partout, refuser les titres et identifiants vides, mettre null si la date est vide, afficher le même message d'erreur si l'identifiant n'existe pas, passer par TextEncoder pour le mot de passe, et prévenir si crypto.subtle n'existe pas. Toutes les lignes « Non » vont dans les limites de sécurité du README.

**Modifié :** on passe de SHA-256 à PBKDF2 pour hacher le mot de passe. C'est la même API Web Crypto, ce n'est pas beaucoup plus dur, et ça ralentit vraiment la force brute. On a aussi tranché les points qu'elle nous laissait : les dates passées sont acceptées, un caractère spécial c'est tout ce qui n'est ni une lettre ni un chiffre, et le titre fait 100 caractères maximum.

**Reporté :** le numéro de version des données, les onglets multiples, le localStorage plein, l'expiration de session et la suppression de compte. Ce sont de vrais problèmes, mais trop poussés pour 3 séances, donc on les met dans les limites.

**À vérifier :** elle répète que Web Crypto ne marche pas en file://. Toujours pas testé (voir prompt 3), on reste en localhost et on ajoutera un message si crypto.subtle n'existe pas.

**Pourquoi :** lui faire auditer son propre modèle a sorti des failles qu'on n'aurait pas trouvées seuls (session qu'on peut falsifier, blocage qu'on peut contourner, XSS). Et séparer ce qu'on peut corriger de ce qui demande un serveur nous donne directement la liste de travail pour la séance 2 et la partie limites pour l'oral.

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

**Gardé :** toute la structure et presque tout le contenu. Les limites de sécurité reprennent bien l'audit du prompt 7.

**Modifié :**
- on a mis nos noms dans la partie Binôme ;
- elle avait oublié le try/catch décidé au prompt 7, on l'a rajouté dans la phrase sur le localStorage ;
- elle affirmait que l'app ne marche pas en file://, alors qu'on ne l'a pas vérifié. On a mis à la place que Web Crypto est garanti en localhost ou en HTTPS, et qu'on lance toujours l'app avec Live Server ;
- elle a complété les stories 1, 3 et 5 avec nos décisions du prompt 7 (100 caractères, date passée ou vide, identifiant normalisé, PBKDF2). On garde, mais du coup elles ne sont plus exactement celles du prompt 4.

**Pourquoi :** on lui a redonné nos dernières décisions dans le prompt, parce qu'après une longue conversation elle aurait pu reprendre une vieille version (SHA-256 au lieu de PBKDF2). Et on ne voulait pas laisser dans le README quelque chose qu'on n'a pas vérifié.

## Bilan de la séance 1

- **Ce qui a bien marché :** les questions au début, et surtout quand on lui a demandé de se critiquer et d'auditer son modèle. C'est là qu'elle a trouvé des failles qu'on n'aurait pas vues seuls (session falsifiable, XSS, blocage contournable).
- **Ce qu'on a dû corriger :** elle a ajouté des choses alors qu'on lui avait dit de ne rien ajouter (prompt 4), elle a oublié une de nos décisions dans le README (le try/catch), et elle a répété plusieurs fois une affirmation sur file:// qu'on n'a pas pu vérifier tout de suite.
- **Pour la séance 2 :** donner le README comme contexte à Copilot ou Cursor, coder une story à la fois en respectant la définition de fini, et relire chaque fonction générée avant de la garder.