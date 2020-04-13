const mongoose = require('mongoose');
const validator = require('validator')

mongoose.connect(process.env.DB_CONNECTION,{
    'useNewUrlParser':true,
    'useCreateIndex':true,
    'useFindAndModify':false,
    'useUnifiedTopology': true 

});

// const User = mongoose.model('User',{
//     'name':{
//         'type':String,
//         'required':true,
//         'trim':true

//     },
//     'age':{
//         'type':Number,
//         'default':18,
//         validate(value){
//             if(value < 0)
//             throw new Error('Age must be a positive no.')
//         }
//     },
//     'email':{
//         'type':String,
//         'trim':true,
//         'lowercase':true,
//         validate(value){
//             if(!validator.isEmail(value))
//              throw new Error('Email is invalid')
//         }
//     },
//     'password':{
//         'type':String,
//         'minlength':7,
//         'trim':true,
//         'required':true,
//         validate(value){
//             if(value.toLowerCase().includes('password'))
//                 throw new Error('Password cannot contain password as value')
//         }
//     }
// });

// const me = new User({
//     'name':'rajat',
    
//     'email':'rajat@gmail.com', 
//     'password':'1234'    
    
// });

// me.save().then((result)=>{

//     console.log(me)
// }).catch((error)=>{
//     console.log("Error",error);
// })

// const Task = mongoose.model('Task',{
//     'description':{
//         'type':String,
//         'trim':true,
//         'required':true
//     },
//     'completedStatus':{
//         'type':Boolean,
//         'default':false
//     }
// });

// const firstTask = new Task({
//     'description':''
   
// });

// firstTask.save().then(()=>{
//     console.log(firstTask);
// }).catch((error)=>{
//     console.log("error",error)
// })