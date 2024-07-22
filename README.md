# Node.js MySQL CRUD Project

## Overview
A simple CRUD application built with Node.js and MySQL. Demonstrates basic operations (Create, Read, Update, Delete) for managing student records using Express.js.

## Installation
1. Clone the repository: `git clone <repo-url>`
2. Navigate to the project directory: `cd <project-directory>`
3. Install dependencies: `npm install`
4. Create a `.env` file in the root directory with the following variables:
    ```
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_DATABASE=students_db
    PORT=8000
    ```
5. Start the server: `npm start`

## Usage
- **GET /api/v1/student/getall**: Retrieve all student records.
- **GET /api/v1/student/get/:id**: Retrieve a student record by ID.
- **POST /api/v1/student/create**: Create a new student record.
- **PUT /api/v1/student/update/:id**: Update an existing student record.
- **DELETE /api/v1/student/delete/:id**: Delete a student record by ID.

## Security Note
Ensure that your `.env` file containing sensitive information is not exposed or committed to version control.

## Project Structure
- `server.js`: Main application file.
- `config/db.js`: Database connection setup.
- `controllers/studentController.js`: Controller functions for handling requests.
- `routes/studentRoutes.js`: Route definitions for student-related endpoints.
- `README.md`: Project documentation.

For more details, refer to the code comments and documentation within the project.
