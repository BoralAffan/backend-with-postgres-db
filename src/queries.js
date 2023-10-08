exports.getStudentQuery = "SELECT * FROM students";
exports.getStudentByIdQuery = "SELECT * FROM students WHERE id=$1";
exports.deleteStudentById = "DELETE FROM students WHERE id=$1";
exports.checkEmailExists = "SELECT s FROM students s WHERE s.email=$1";
exports.addStudent = "INSERT INTO students (name,email,age,dob) VALUES ($1,$2,$3,$4)";
exports.updateStudent = "UPDATE students SET name=$1, email=$2, age=$3 WHERE id=$4";
// exports.updateStudent = "UPDATE students SET name=$1 WHERE id=$2";