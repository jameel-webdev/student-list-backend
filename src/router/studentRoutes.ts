import express from "express";
import {
  deleteStudentById,
  getAllStudents,
  getStudentById,
  newStudent,
  updateStudentById,
} from "../controllers/studentControllers.js";

const router = express.Router();

// Route to create a new student
// POST - /api/student/new
router.post("/new", newStudent);

// Route to get all students
// GET - /api/student/all
router.get("/all", getAllStudents);

// Routes to get, update, and delete a student by ID
// GET - /api/student/:id -> Get a student by ID
// PUT - /api/student/:id -> Update a student by ID
// DELETE - /api/student/:id -> Delete a student by ID
router
  .route("/:id")
  .get(getStudentById)
  .put(updateStudentById)
  .delete(deleteStudentById);

export default router;
