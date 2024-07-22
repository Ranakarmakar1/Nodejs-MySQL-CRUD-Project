import express from 'express';
import { getStudents, getStudentByID, createStudent, updateStudent, deleteStudent } from '../controllers/studentController.js'; // Import controller functions for handling student-related requests

// Create a new router object
const router = express.Router();

// Define routes and associate them with controller functions

// Route to get the list of all students || GET
router.get('/getall', getStudents);

// Route to get a student by ID || GET
router.get('/get/:id', getStudentByID);

// Route to create a new student || POST
router.post('/create', createStudent);

// Route to update a student by ID || PUT
router.put('/update/:id', updateStudent);

// Route to delete a student by ID || DELETE
router.delete('/delete/:id', deleteStudent);

// Export the router to be used in the main application file
export default router;
