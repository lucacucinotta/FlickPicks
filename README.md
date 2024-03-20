<div align="center"><img src="/client/src/assets/logo.png" width="150px"></div>
<h1 align="center">FlickPicks</h1>
<br>
<p align="center">
Click here to visit the <a href="https://flickpicks-hub.vercel.app"><strong>website</strong></a>
</p>

#### ⚠️ N.B.

If you experience delays when using FlickPicks please be patient, it's possible that the free render.com server went into sleep mode.
It should resume upon receiving the first request.

## 🗂️ Table of contents

- [Introduction to Project](#introduction-to-project)
  - [Requirements](#requirements)
- [Frontend](#frontend)
  - [Pages](#pages)
  - [Framework and libraries](#frontend-framework-and-libraries)
- [Backend](#backend)
  - [Framework and libraries](#backend-framework-and-libraries)
- [API](#api)
- [Tools](#tools)
- [Usage](#usage)
- [Author](#author)

## 🌐 Introduction to Project

Cinema is one of the my passion. So, for the last project of Full-Stack Development course on start2impact academy, I decided to create a website focused on cinema's world. FlickPicks is a MERN web application that allows user to discover new titles, search for their favorite movies and create a personalized lists to store them. The realization of this project aims to contribute to the promotion of quality education, a key objective of the ONU 2030 Agenda outlined in point n.4, encouraging the user to discover new titles from all over the world, wich allow him to discover new cultures and reality and stimulate his creativity and critical sense.

### 📋 Requirements

The minimum requirements ask to create an complete web application, with front-end features that allows it to manage APIs RESTful calls for login/logout and registration for the user. I also added further functionalities that allows users, when he is logged in, to save movies on their lists.

## 🖥️ Frontend

Frontend constitutes the application's visual interface, and is responsible for presentation and interaction of the elements and technlogies with the users. Cause is an MERN application, I've use a framework like React for the realization of all the various UI components that make up the website, and a series of complementary libraries that allowed me to increase the page's functionalities, connecting to the technologies built in the backend. For movies data, I integrated with TMDb APIs to provide users access to a wide range of movie data and updated information.

### 📑 Pages

Below you'll find all the available navigation pages.

- `FirstPage` : welcomes unregistered users, offering introductory information and options for registration.
- `LoginPage` & `SignUpPage` : allow user to registers or to login.
- `HomePage`: available when the access is done, provides the various sections to discover new movie.
- `SectionPage` & `GenresPage`: show a series of movies belonging to a specific section or genre.
- `SearchPage` : permits user to make a research for a movie by keyword.
- `MoviePage` : shows all the info about a movie and allows user to save it in his personal lists.
- `ProfilePage` & `UserListsPage` : permit user to access at his personal lists and view their contenute.

### 📚 Frameworks and libraries

<p align="left">  
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white"/>
  <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white"/>
  <img src="https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=React_Query&logoColor=white"/>
  <img src="https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white"/>
  <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white"/>
</p>

#### 📦 Bundler

<p align="left">
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E"/>
</p>

## 🖧 Backend

In the backend development phase of the project, I'm focused on the realization of the RESTful APIs using the technologies from the MERN stack: MongoDB, Express.js, Node.js. Those API allow user to registers and to login to FlickPicks, thanks to the authentication mechanism based on token that I've create. I've also expanded the functionality of the APIs to allow the user to save his favorite films in his own lists, thus increasing the level of customization of the experience.

### 📚 Frameworks and libraries

<p align="left">
<img src="https://img.shields.io/badge/MongoDB-47A248.svg?style=for-the-badge&logo=MongoDB&logoColor=white"/>  
<img src="https://img.shields.io/badge/Mongoose-880000.svg?style=for-the-badge&logo=Mongoose&logoColor=white"/>  
<img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
<img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white"/>
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white"/>
</p>

## 🚀 API

Endpoints follow the camelCase naming convention.

### Endpoints

#### GET

| Method | Endpoint               | Result                                  |
| ------ | ---------------------- | --------------------------------------- |
| GET    | /checkToken            | Check if user has the access token      |
| GET    | /checkMovieID/:movieID | Check that the movie is in user's lists |
| GET    | /getUserData           | Return the username and his ID          |
| GET    | /getUserLists          | Return all the user's personal lists    |

#### POST

| Method | Endpoint | Result                |
| ------ | -------- | --------------------- |
| POST   | /signup  | Allow user to sign up |
| POST   | /login   | Allow user to log in  |
| POST   | /logout  | Allow user to log out |

#### PUT

| Method | Endpoint         | Result                |
| ------ | ---------------- | --------------------- |
| PUT    | /updateMovieList | Add or remove a movie |

## 🛠️ Tools

### 🧑‍💻 IDE

<p align="left">
  <img src="https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white"/>
</p>

### 🧩 Languages

<p align="left">
  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"/>
  <img src=" https://img.shields.io/badge/HTML5-E34F26.svg?style=for-the-badge&logo=HTML5&logoColor=white"/>
 
</p>

### 🔧 Dev Utilities

<p align="left">
  <img src="https://img.shields.io/badge/Git-F05032.svg?style=for-the-badge&logo=Git&logoColor=white"/>
  <img src="https://img.shields.io/badge/Markdown-000000.svg?style=for-the-badge&logo=Markdown&logoColor=white"/>
</p>

## 🕹️ Usage

After you've login, you'll automatically rendered at the homepage, the pulsing heart of FlickPicks. Here you can explore a wide collection of movies browsing between the various thematic sections or the available genres, either through the page itself or through the navigation bar.
If you've a movie that you want to search, just type its keyword in the specific search bar contained in the navbar.

Once you've found the movie you prefer, you'll be able a more detailed description, containing the plot, director and more. You've also the option to save the movie in one of the available lists.

If you want to check out your favorite movies or movies you want to watch, just log in to your profile and click on the list you want to watch.

And when you want to log out from FlickPicks, simply click on the navigation bar.

## 👤 Author

Luca Cucinotta

<p align="left">
  <a href="https://github.com/lucacucinotta">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"/>
  </a>
  <a href="https://www.linkedin.com/in/luca-cucinotta-4b836b278/">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"/>
  </a>
</p>
