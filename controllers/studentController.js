import db from "../config/db.js"; // Ensure the file extension is included

export const getStudents = async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM students");
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "No records found",
      });
    }
    res.status(200).send({
      success: true,
      message: "All student records",
      totalStudents: data[0].length,
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get all student API",
      error,
    });
  }
};

//Get student by id

const getStudentByID = async (req, res) => {
  try {
    const studentID = req.params.id;
    if (!studentID) {
      return res.status(404).send({
        success: false,
        message: "Invalid student ID",
      });
    }
    // const data =await db.query(` SELECT * FROM WHERE id= `+studentID)
    const data = await db.query(` SELECT * FROM students WHERE id=?`, [
      studentID,
    ]);
    //validation

    if (!data) {
      return res.status(500).send({
        success: false,
        message: "error in get student by ID API",
        error,
      });
    }
    res.status(200).send({
      success: true,
      studentDetails: data[0],
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        message: "Error in Get student by Id API",
        error,
      });
  }
};

const createStudent = async (req, res) => {
  try {
    const { name, roll_no, fees, medium } = req.body;

    if (!name || !roll_no || !fees || !medium) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    // Execute the query and await the result
    const [result] = await db.query(
      "INSERT INTO students (name, roll_no, fees, medium) VALUES (?, ?, ?, ?)",
      [name, roll_no, fees, medium]
    );

    if (!result) {
      return res.status(500).send({
        success: false,
        message: "Error in INSERT QUERY",
      });
    }

    res.status(201).send({
      success: true,
      message: "New Student Record Created",
      studentID: result.insertId, // Optionally include the inserted ID
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Student API",
      error,
    });
  }
};

//update student

const updateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    if (!studentId) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID",
      });
    }

    const { name, roll_no, fees, medium } = req.body;
    const [result] = await db.query(
      "UPDATE students SET name = ?, roll_no = ?, fees = ?, medium = ? WHERE id = ?",
      [name, roll_no, fees, medium, studentId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: "Student not found or no changes made",
      });
    }

    res.status(200).send({
      success: true,
      message: "Student record updated successfully",
    });
  } catch (error) {
    console.error(error); // Use console.error for error logging
    res.status(500).send({
      success: false,
      message: "Error in Update Student API",
      error: error.message, // Provide error message for clarity
    });
  }
};

// DELETE student
const deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    if (!studentId) {
      return res.status(400).send({
        success: false,
        message: "Please provide a valid student ID",
      });
    }

    const [result] = await db.query("DELETE FROM students WHERE id = ?", [
      studentId,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error(error); // Use console.error for error logging
    res.status(500).send({
      success: false,
      message: "Error in DELETE student API",
      error: error.message, // Provide error message for clarity
    });
  }
};

export { getStudentByID, createStudent, updateStudent, deleteStudent };
