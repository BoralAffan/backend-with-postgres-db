const express= require ('express');
const { getAllStudents, getStudentById, deleteStudentById, addStudent, updateStudent } = require('../controller/student.controller');
const router = express.Router();

router.get('/all',getAllStudents);
router.get('/student/:id', getStudentById);
router.delete('/delete/:id', deleteStudentById);
router.post('/add', addStudent);
router.put('/update/:id',updateStudent)

module.exports = router;
