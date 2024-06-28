import { NextFunction, Request, Response } from "express";
import { Student } from "../models/studentModel.js";
import { NewStudentRequestBody } from "../types/types.js";

// Controller to create a new student
export const newStudent = async (
  req: Request<{}, {}, NewStudentRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, phoneNumber, enrollmentNumber, dateOfAdmission } =
      req.body;

    // Check if all required fields are provided
    if (
      !name ||
      !email ||
      !phoneNumber ||
      !enrollmentNumber ||
      !dateOfAdmission
    ) {
      throw new Error("Please provide all details");
    }

    // Create a new student document
    const newStudent = await Student.create({
      name,
      email,
      phoneNumber,
      enrollmentNumber,
      dateOfAdmission: new Date(dateOfAdmission),
    });

    // Return a success response with the created student data
    return res.status(201).json({
      success: true,
      message: "New student data created",
      newStudent,
    });
  } catch (error) {
    next(error);
  }
};

// Controller to get all students
export const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Find all students in the database
    const allUsers = await Student.find();

    // Return a success response with all students data
    return res.status(200).json({
      success: true,
      allUsers,
    });
  } catch (error) {
    next(error);
  }
};

// Controller to get a student by ID
export const getStudentById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    // Find a student by ID
    const student = await Student.findById(id);

    // Check if student data exists
    if (!student) {
      throw new Error("No student data found");
    }

    // Return a success response with the student data
    return res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    next(error);
  }
};

// Controller to update a student by ID
export const updateStudentById = async (
  req: Request<{ id: string }, {}, NewStudentRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, email, phoneNumber, enrollmentNumber, dateOfAdmission } =
      req.body;

    // Find a student by ID
    const student = await Student.findById(id);

    // Check if student data exists
    if (!student) {
      throw new Error("No student data found");
    }

    // Update the student data
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        name,
        email,
        phoneNumber,
        enrollmentNumber,
        dateOfAdmission,
      },
      { new: true }
    );

    // Return a success response with the updated student data
    return res.status(200).json({
      success: true,
      message: "Student updated successfully",
      updatedStudent,
    });
  } catch (error) {
    next(error);
  }
};

// Controller to delete a student by ID
export const deleteStudentById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    // Find a student by ID
    const student = await Student.findById(id);

    // Check if student data exists
    if (!student) {
      throw new Error("No student data found");
    }

    // Delete the student document
    await student.deleteOne();

    // Return a success response
    return res.status(200).json({
      success: true,
      message: "Student data deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
