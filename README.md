# GP Agency

Site vitrine de GP Agency, agence d'automatisations IA pour hôtels indépendants et petites chaînes.

**Site en ligne : [antoningd19.github.io/GP-agency](https://antoningd19.github.io/GP-agency/)**

## Le produit

GP Agency vend trois automatisations concrètes pour les hôteliers qui gèrent leur établissement seuls ou en petite équipe :

- **Zéro Devis Perdu** : relance automatique des devis MICE (séminaires, mariages, événements) restés sans réponse.
- **Assistant Pré-séjour 24/7** : réponses aux questions clients avant séjour, en dehors des horaires de réception.
- **Copilote Réponses** : traitement des avis et emails accumulés, sans y passer des heures.

Le site convertit un visiteur hôtelier en rendez-vous de diagnostic gratuit de 20 minutes, avec une offre de lancement à -45% pour les 3 premiers hôtels signés.

## Structure

Site statique (HTML/CSS/JS), sans framework. Une seule fonction serverless
pour le formulaire de contact (voir plus bas).

```
accueil.html             Page d'accueil
index.html               Redirection vers accueil.html (racine du domaine, requis par GitHub Pages)
vercel.json              Rewrite "/" -> accueil.html (utilisé uniquement en cas de déploiement Vercel)
api/contact.js           Fonction serverless Vercel : reçoit le formulaire de contact et envoie un email
services.html            Détail des 3 automatisations
tarifs.html               Packs Starter, Pro, Signature
offre-lancement.html     Page dédiée à l'offre -45%
contact.html              Formulaire de contact
css/style.css              Styles
js/main.js                  Interactions (menu, FAQ, animations, curseur)
assets/                    Images et logo
```

## Développement local

Le projet ne nécessite aucune installation. Pour le servir en local :

```
npx serve -l 5757 .
```

Puis ouvrir `http://localhost:5757`.

## Déploiement

Le site est publié via GitHub Pages depuis la branche `main`. Toute modification poussée sur `main` est automatiquement déployée.

## Formulaire de contact (à activer sur Vercel)

Le formulaire de `contact.html` appelle `/api/contact` en JavaScript. Sur
GitHub Pages, cette route n'existe pas : la soumission retombe
automatiquement sur un message de démo, sans erreur visible pour le
visiteur. Pour l'activer réellement, il faut déployer le site sur Vercel
(qui exécute `api/contact.js` comme fonction serverless) :

1. Créer un compte sur [vercel.com](https://vercel.com) et importer ce repo GitHub.
2. Créer un compte gratuit sur [resend.com](https://resend.com) et générer une clé API.
3. Dans les réglages du projet Vercel → *Environment Variables*, ajouter :
   - `RESEND_API_KEY` (obligatoire) — la clé Resend
   - `CONTACT_TO_EMAIL` (optionnel) — adresse de réception, par défaut `support@agency-gp.com`
   - `RESEND_FROM` (optionnel) — expéditeur, par défaut `onboarding@resend.dev` (fonctionne sans domaine vérifié ; pour un expéditeur `@agency-gp.com`, il faut vérifier le domaine dans Resend)
4. Redéployer : le formulaire enverra alors un vrai email à chaque soumission.
