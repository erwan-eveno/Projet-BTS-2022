<div>
<h1>Repush projet BTS 2022 partie serveur</h1>
<h3>Côté client non disponible.</h3>
<hr>
</div>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

<h1 style="text-align: center">Projet "Le Cafe de Paris", partie backend</h1>

## Description

Partie backend créée via le framework javascript [Nest](https://github.com/nestjs/nest).

##Frameworks / Librairies

[NestJS](https://github.com/nestjs/nest) » Framework principal du projet, permet de créer des API REST.<br>
[@nestjs/config](https://docs.nestjs.com/techniques/configuration) » Permet de créer un fichier de config (.env)
[TypeScript](https://www.typescriptlang.org/docs/) » Langage de programmation créé à partir de JavaScript rajoutant des types, améliore l'utilisation des classes, etc..
<hr>
<h4>Authentification</h4>
<ul>
    <li> <a href="https://jwt.io/">[JWT]</a>  » Json Web Token, permet de générer un token d'authentification généralement stocké dans les cookies. Celui-ci est envoyé au server pour approuvé que l'utilisateur est bien connecté à son compte.</li>
    <li> <a href="https://www.npmjs.com/package/bcryptjs">[BcryptJS]</a>  » Bcrypt, permet de transformer un mot de passe brut en un hash irréversible. Ajoute des fonctions permettant de comparer le mot de passe (brut et "hashé") à l'authentification.</li>
    <li> <a href="https://www.passportjs.org/">[PassportJS]</a>  » PassportJS, librairie permettant de créer des stratégies middleware d'authentification afin de vérifier que les tokens sont valides (classique, jwt, google, github, etc..)</li>
    <li> <a href="https://www.passportjs.org/packages/passport-jwt/">[PassportJS-JWT]</a>  » PassportJS-JWT, stratégie d'authentification middleware permettant de vérifier que le token JWT est valide et n'a pas été modifié par l'utilisateur.</li>
    <li> <a href="https://www.npmjs.com/package/cookie-parser">[Cookie-Parser]</a>  » Cookie-Parser, permet une meilleure gestion des cookies</li>
</ul>
<hr />
<h4>Base de données</h4>
<ul>
    <li> <a href="https://www.mongodb.com/">MongoDB</a> » Base de données nosql choisie pour le projet. </li>
    <li> <a href="https://mongoosejs.com/docs/guide.html">[Mongoose]</a> » Mongoose, module permettant de communiquer à la base de données en utilisant le système de Schémas </li>
</ul>
<hr />
<h4>Documentation</h4>
<ul>
    <li><a href="https://swagger.io/">[Swagger]</a> » Crée une documentation des endpoints d'API avec les informations nécessaires à l'utilisation du endpoint (methode, corps, réponse, etc..).
    </li>
</ul>

## Installation

```bash
$ git clone https://github.com/lycee-rascol/ProjetRestaurant.git
$ cd ProjetRestaurant/server
$ npm install
> Créer fichier .env et y coller la configuration
> Ajouter son adresse IP sur la base de données MongoDB
```

## Lancer le projet

```bash
# developpement (watch)
$ npm run start:dev

# production
$ npm run start:prod
```

## Tests

```bash
# En cours de dev
```

## Crédits

- Auteur - [Erwan EVENO](https://erwan-eveno.fr)
- Site web - [https://erwan-eveno.fr](https://erwan-eveno.fr)
