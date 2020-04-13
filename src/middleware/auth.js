const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async(req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ','');
        const decodedPayload = jwt.verify(token,process.env.SECRET);
        const user = await User.findOne({'_id':decodedPayload._id,'tokens.token':token})

        if(!user)
            throw new Error();
        
        req.token = token;    
        req.user =user;    
        next()
    }catch(e){
        res.status(401).send({'errors':"Please authenticate"})
    }
    
}

module.exports = auth