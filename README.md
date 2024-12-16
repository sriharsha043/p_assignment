Book Management System - Project Overview
The Book Management System is a web application designed to allow users to manage and interact with a collection of books. It provides functionalities for searching, viewing, adding, editing, and deleting books. The project consists of two main components: the frontend (user interface) and the backend (server-side logic and database management). The primary goal of this system is to help users easily manage a large collection of books, whether it's for a library, bookstore, or personal collection.

Frontend Overview
The frontend of the Book Management System is developed using React.js, a popular JavaScript library for building user interfaces. It is designed with a simple and intuitive layout to ensure an easy and pleasant user experience. The interface includes several key pages and components, including:

Home Page:

The homepage displays a navigation bar with links to important sections such as Home, About, Contact, and Add Book.
It includes a search bar where users can filter books based on criteria like title, author, or genre.
Search Results Page:

This page displays the results of a user's search query. It is designed to show books in a grid format with details like the title, author, genre, and publication date.
Pagination is implemented to handle large datasets efficiently, ensuring the user can browse through many books without performance issues.
Each book entry includes options to view its details, edit its information, or delete it.
Book Details Page:

On this page, detailed information about a specific book is displayed, including its title, author, genre, number of pages, and publication date.
Users can navigate to edit or delete the book directly from this page.
Add/Edit Book Pages:

A user can add a new book or edit an existing one by filling out a form with input fields such as book title, author, genre, pages, and published date.
The form has built-in validation to ensure that the user provides the required information correctly.
The frontend communicates with the backend through RESTful API calls to perform CRUD operations (Create, Read, Update, Delete) on book records. The user interface is styled using a combination of CSS files, with separate stylesheets for each component (e.g., Home, Search Results).

Backend Overview
The backend is built using Node.js with the Express.js framework, offering a robust and scalable solution for handling API requests and responses. The backend handles all database interactions and processes user requests for viewing, adding, editing, and deleting books.

Database Setup:

The backend uses SQLite, a lightweight relational database, for storing and managing book, author, and genre data.
There are three main tables in the database:
Books: Stores information about each book, including its title, author, genre, number of pages, and publication date.
Authors: Stores information about authors, linked to books through a foreign key.
Genres: Stores information about book genres, also linked to books via a foreign key.
API Endpoints:

GET /books: Retrieves a list of books, with optional search functionality for filtering based on title, author, or genre.
GET /books/:id: Fetches detailed information about a specific book using its unique ID.
POST /books: Adds a new book to the database, including its author and genre if they don't exist.
PUT /books/:id: Updates an existing book's details.
DELETE /books/:id: Deletes a book from the system.

These API endpoints handle the core functionalities of the application, ensuring smooth communication between the frontend and the database.
