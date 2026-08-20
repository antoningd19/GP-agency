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

Site statique, sans framework ni backend.

```
accueil.html             Page d'accueil
index.html               Redirection vers accueil.html (racine du domaine, requis par GitHub Pages)
vercel.json              Rewrite "/" -> accueil.html (utilisé uniquement en cas de déploiement Vercel)
services.html            Détail des 3 automatisations
tarifs.html               Packs Starter, Pro, Signature
offre-lancement.html     Page dédiée à l'offre -45%
contact.html              Formulaire de contact (démo)
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
