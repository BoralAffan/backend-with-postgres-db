const pool = require("../../db.js");
const { getStudentQuery, getStudentByIdQuery, deleteStudentById, checkEmailExists, addStudent, updateStudent } = require("../queries.js");

exports.getAllStudents= async(req,res)=>{
    pool.query(getStudentQuery,(err,data)=>{
        if (err) {
            return res.status(500).json({ error: 'An error occurred while fetching the student.' });
        }
console.log(data.rows)
        res.status(200).json({"length": data.rows.length, "students": data.rows }
            
        )
    })
}

exports.updateStudent=async (req,res)=>{
    const id = req.params.id;
    console.log("id "+ id)
    const {name,email,age}= req.body;
    console.log("name"+ name);
    console.log("email"+ email);
    console.log("age"+ age);
  
    

    // Check if any fields to update were provided in the request body
    if (name===undefined && email===undefined &&age===undefined) {
        return res.status(400).json({
            error: "No valid fields provided for update.",
        });
    } else { 
        const updatedFields = {};
        if (name !== undefined) {
            console.log('11')
            updatedFields.name = name;
        }

        if (email !== undefined) {
            console.log('22')
            updatedFields.email = email;
        }

        if (age !== undefined) {
            console.log('33')
            updatedFields.age = age;
        }  
       

    pool.query(getStudentByIdQuery,[id],(err,data)=>{
        const noStudentExists= !data.rows.length;
        console.log("data"+ JSON.stringify(data.rows))
        console.log(noStudentExists)
        if(err){
            console.log(err);
            res.status(500).json({
                "message": "something went wrong"
            })
        }

        if(noStudentExists){
            res.status(400).json({
                "error": "student does not exists with this id"
            })
        } else{
            console.log(data.rows[0].name);
            console.log(data.rows[0].email);
            console.log(data.rows[0].age);
            if (name === undefined) {
                console.log('1')
                updatedFields.name = data.rows[0].name;
            }

            if (email === undefined) {
                console.log('2')
                updatedFields.email = data.rows[0].email;

            }

            if (age === undefined) {
                console.log('3')
                updatedFields.age = data.rows[0].age;
            }  
            console.log("updated" + JSON.stringify(updatedFields))
            if (updatedFields.name === null) {
                console.log('1')
                updatedFields.name = data.rows[0].name;
            }

            if (updatedFields.email === null) {
                console.log('3')
                updatedFields.email = data.rows[0].email;
            }

            if (updatedFields.age === null) {
                console.log('3')
                updatedFields.age = data.rows[0].age;
            }
            const values = [updatedFields.name, updatedFields.email, updatedFields.age, id];
            pool.query(updateStudent,values,(err,data)=>{
                if(err){
                    res.status(500).json({
                        "error": "something wemt wrong"
                    })
                } else{
                    res.status(202).json({
                        "message": "student updated successfully"
                    })
                }
            })
           
        }
     })
    }
}

exports.getStudentById= async(req,res)=>{
    const studentId = req.params.id;
   
    pool.query(getStudentByIdQuery,[studentId],(err,data)=>{
        if(err){
            return res.status(500).json({ error: 'An error occurred while fetching the student.' });
        } 

        console.log(data.rows)
        if (data.rows.length === 0) {
            return res.status(404).json({ error: 'Student not found.' });
        }
        res.status(200).json(
            data.rows
        )
    })


}

exports.deleteStudentById = async(req,res)=>{
    const id = req.params.id;
    console.log(id)
pool.query(getStudentByIdQuery,[id],(err,data)=>{
    console.log(data.rows)
    const noStudentExists = !data.rows.length;

    if (noStudentExists) {
        res.status(500).json({
            error: "No student exists with this id in database."
        });
    }
    else if(!noStudentExists){

    

    pool.query(deleteStudentById, [id], (err, data) => {
        

        if (err) {
            res.status(500).json({
                error: "An error occurred while deleting the student."
            });
        }
        res.status(200).json({
            "messasge": "Student deleted successfully",

        })


    })
}
})
   
}

exports.addStudent=async(req,res)=>{
    const{name,email,age,dob} = req.body;


    //check if email already exists
    pool.query(checkEmailExists,[email],(err,data)=>{
        if (err) {
            console.error(err);
            return res.status(500).json({
                error: "An error occurred while checking email existence.",
            });
        }
        if (data.rows.length) {
            // If email already exists, return an error response
            return res.status(500).json({
                error: "Email already exists",
            });
        }

        //if email not exists create a new student 
        pool.query(addStudent, [name, email, age, dob], (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    error: "An error occurred while adding the student.",
                });
            }

            return res.status(201).json({
                message: "Success! Student added successfully",
            });
        })
    })

    
}