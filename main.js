const express = require('express');
const studentRoute = require("./src/routes/student.routes");
const app = express();

const port = 4000;
app.use(express.json());
app.get('/',(req,res)=>{
    // return res.json({
    //     "hello": "welcome to the backend learning"
    // })
    res.send("hello, welcome to learning backend")
});

app.use('/api/v1/students',studentRoute)

app.listen(port,()=> console.log(`server hosted at ${port}`))