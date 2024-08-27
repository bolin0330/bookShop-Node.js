![Node.js](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![PNPM](https://img.shields.io/badge/pnpm-yellow?style=for-the-badge&logo=pnpm&logoColor=white)
# Bookstore Backend Application
#### This project is a server-side application for an online bookstore, where users can view books, search for specific books, and manage book reviews. The application is built using Node.js and Express.js, and it provides RESTful APIs for different operations. Authentication and authorization are implemented using session and JWT to ensure that only logged-in users can perform certain actions.

## Tech Stack
* Node.js: Server-side environment
* Express.js: Web application framework
* JWT (JSON Web Tokens): Used for authentication
* pnpm: Fast, disk space-efficient package manager

## API Endpoints
* **GET** `/public/books`: Retrieve all books.
* **GET** `/public/books/isbn/(:isbn)`: Get book details by ISBN.
* **GET** `/public/books/author/(:author)`: Get books by author.
* **GET** `/public/books/title/(:title)`: Get books by title.
* **GET** `/public/books/review/(:isbn)`: Retrieve reviews for a book.
* **POST** `/public/register`: Register a new user.
* **POST** `/registered/login`: Login as a registered user.
* **PUT** `/registered/books/review/(:isbn)`: Add or modify a review (authenticated users only).
* **DELETE** `/registered/books/review/(:isbn)`: Delete a review (authenticated users only).

## Project setup
#### 1. Clone the repository:
```
git clone https://github.com/bolin0330/bookStore-Node.js.git
cd bookStore-Node.js
```

#### 2. Install dependencies:
```
pnpm install
```

#### 3. Start the server:
```
pnpm start
```

## Sources
This project is inspired by the IBM course [Developing Back-End Apps with Node.js and Express](https://www.coursera.org/account/accomplishments/records/UD9H4ML8E2JE?trk=public_profile_see-credential).