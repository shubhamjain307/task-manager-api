const express = require('express');

require('./db/mongoose');

const User = require('./models/user');
const Task = require('./models/task');
const userRouter = require('./router/user');
const taskRouter = require('./router/task');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());
app.use(userRouter,taskRouter);

const port = process.env.PORT;


app.listen(port,()=>{
    console.log("Server started at port "+port)
})


// app.use((req,res,next)=>{
    // console.log(req.method,req.path)
    // next()

    // if(req.method == 'GET'){
    //     res.send("GET Disabled")
    // }else{
    //     next()
    // }
// })


// app.use((req,res,next)=>{
//     res.status(502).send("Site is under maintainence code")
// })


// const bcrypt = require('bcryptjs');


// const myFunction = async()=>{
//     const pass = "redhat123";
//     const hashedPass = await bcrypt.hash(pass,8);

//     console.log(pass);
//     console.log(hashedPass);

//     const isMatch = await bcrypt.compare('redhat123',hashedPass)
//     console.log(isMatch)
// }

// myFunction()



// ************* JWT TOKEN  *******************************

// const myFunction = async() =>{
//     const token = jwt.sign({'_id':"abc1234"},'this is secret key',{ 'expiresIn': '1 second' });

//     console.log(token);

//    const data = jwt.verify(token,'this is secret key')

//    console.log(data)
// }

// myFunction();


// ################## Relationships between user and tasks #############



const main = async()=>{
    // const task = await Task.findById('5e930c03af586e23902732e9');
    // await task.populate('owner').execPopulate()
    // console.log(task)

    // const user = await User.findById('5e930ae1d6bc2722e25890df');
    // await user.populate('tasks').execPopulate()
   // console.log(user.tasks)

}

//main();


// !!!!!!!!!!!!!!!!!!!!!  File upload to express  !!!!!!!!!!!!!!!!!!!!!!

// File upload
// const multer  = require('multer')
// const upload = multer({
//     dest: 'avatars',
//     'limits':{
//         'fileSize':1000000
//     },
//     fileFilter(req,file,cb){

        // if(!file.originalname.endsWith('.pdf')){
        //     return cb(new Error('please upload pdf'))
        // }
//         if(!file.originalname.match(/\.(doc|docx)$/))
//             return cb(new Error('please upload pdf'))

//         cb(undefined,true)

//     }


// })

// const errorMiddleware = (req,res,next)=>{

//     throw new Error('From my middleware')
// }

// app.post('/upload',upload.single('upload'),(req,res)=>{

//     res.send("uploaded")
// },(error,req,res,next)=>{
//     res.status(400).send({
//         'error':error.message
//     })
// })