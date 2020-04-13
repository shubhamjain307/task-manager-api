const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');


const userSchema = new mongoose.Schema({
    'name':{
        'type':String,
        'required':true,
        'trim':true

    },
    'age':{
        'type':Number,
        'default':18,
        validate(value){
            if(value < 0)
            throw new Error('Age must be a positive no.')
        }
    },
    'email':{
        'type':String,
        'unique':true,
        'trim':true,
        'lowercase':true,
        validate(value){
            if(!validator.isEmail(value))
             throw new Error('Email is invalid')
        }
    },
    'password':{
        'type':String,
        'minlength':7,
        'trim':true,
        'required':true,
        validate(value){
            if(value.toLowerCase().includes('password'))
                throw new Error('Password cannot contain password as value')
        }
    },
    'tokens':[{
        'token':{
            'type':String,
            'required':true
        }
    }],
    'avatar':{
        'type':Buffer
    }
},{
    'timestamps':true
});

userSchema.methods.generateAuthToken = async function(){
    const user = this;

    const token = jwt.sign({'_id':user.id.toString()},process.env.SECRET);
    user.tokens = user.tokens.concat({'token':token});
    await user.save();
    return token
}

// userSchema.methods.getPublicProfile =  function(){
//     const user = this;

//     const userObject = user.toObject();

//     delete userObject.password;
//     delete userObject.tokens; 
    
//     return userObject;
// }

userSchema.virtual('tasks',{
    'ref':'Task',
    'localField':'_id',
    'foreignField':'owner'
})

userSchema.methods.toJSON =  function(){
    const user = this;

    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens; 
    delete userObject.avatar;
    
    return userObject;
}


userSchema.statics.findByCredentials = async(email,password)=>{
    const user = await User.findOne({'email':email})

    if(!user){
        throw new Error("Unable to login")
    }

    const isMatched = await bcrypt.compare(password,user.password);

    if(!isMatched){
        throw new Error("Unable to login")
    }

    return user
}

// Hash the plain text password
userSchema.pre('save',async function (next){
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
       
    next();

})

// @@@@@@@@@@  Delete User task when user is removed @@@@@@@@@@@@@@@@@@@@@@@
userSchema.pre('remove',async function (next){
    const user = this
    await Task.deleteMany({'owner':user._id})
    next()
})

const User = mongoose.model('User',userSchema);

module.exports = User