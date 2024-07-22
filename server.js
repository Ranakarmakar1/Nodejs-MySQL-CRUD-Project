// Import necessary modules
import express from 'express'; 
import colors from 'colors';
import morgan from 'morgan'; 
import dotenv from 'dotenv';
import mySqlPool from './config/db.js'; 
import studentRoutes from './routes/studentRoutes.js'; 


// Load environment variables from a .env file into process.env
dotenv.config();


const app = express();               
app.use(morgan('dev'));               


// Middleware to parse incoming JSON requests
app.use(express.json());


const port = process.env.PORT || 8000;               // Define the port on which the server will listen for requests


// Define a simple route for the root of the application
app.get('/', (req, res) => {
    res.send('API running');
});

// Mount the student routes at the /api/v1/student path
app.use("/api/v1/student", studentRoutes);


// Check the database connection before starting the server
mySqlPool.query('SELECT 1')
    .then(() => {
        console.log('MySQL DB Connected'.green);        // Log success message if the database connection is established

        // Start the server and listen on the defined port
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`.yellow);
        });
    })
    .catch((error) => {
        
        console.log(`Error: ${error.message}`.red);           // Log error message if there is an issue connecting to the database
    });
