const express = require('express');
const User = require('../models/user')
const router = new express.Router();
const auth = require('../middleware/auth')
// File upload
const sharp = require('sharp');
const multer  = require('multer')
const upload = multer({
    // dest: 'avatars',
    'limits':{
        'fileSize':1000000
    },
    fileFilter(req,file,cb){

        // if(!file.originalname.endsWith('.pdf')){
        //     return cb(new Error('please upload pdf'))
        // }
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/))
            return cb(new Error('please upload jpg|jpeg|png'))

        cb(undefined,true)

    }


})



router.post('/users',async(req,res)=>{

    
    const user = new User(req.body);

    try{
         await user.save();
         const token = await user.generateAuthToken();
        res.send({user,token})
    }catch(e){
        res.status(400).send(e)
    }
    
    // user.save().then(()=>{
    //     res.send(user)
    // }).catch((e)=>{
    //     res.status(400).send(e)
        
    // })
   
});

router.post('/users/login',async(req,res)=>{

    try{

        const user = await User.findByCredentials(req.body.email,req.body.password);
        const token = await user.generateAuthToken();

        // res.send({'user':user.getPublicProfile(),token})
        res.send({'user':user,token})
    }catch(e){
        res.status(400).send();
    }
})

router.post('/users/logout',auth,async(req,res)=>{

    try {

        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        
        await req.user.save()

        res.send()
    } catch (error) {
        res.status(501).send();
    }
})

router.post('/users/logoutAll',auth,async(req,res)=>{
    try {

        req.user.tokens = []

        await req.user.save()

        res.send()
        
    } catch (error) {
        res.status(501).send()
    }
})

router.get('/users/me',auth,async(req,res)=>{

    res.send(req.user)
    // try{
    //     const user = await User.find();
    //     res.send(user)
    // }catch(e){
    //     res.status(400).send(e);
    // }
    
    // User.find().then((users)=>{
    //     res.status(201).send(users)

    // }).catch((e)=>{
    //     res.status(500).send();
    // });

});

router.get('/users/:id',async(req,res)=>{
    // console.log(req.params);
    const _id = req.params.id;

    try{

        const user = await User.findById(_id);
        if(!user)
         return res.status(404).send();

        res.send(user); 
    }catch(e){
        res.status(400).send(e);
    }
    
    // User.findById(_id).then((user)=>{
    //     if(!user){
    //         return res.status(404).send();
    //     }
        
    //       res.status(200).send(user) 
    // }).catch((e)=>{
    //     res.status(400).send(e);
    // })
    
});




router.patch('/users/me',auth,async(req,res)=>{
    // const id = req.user._id;

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','emsil','age','password'];
    const isValidOperation = updates.every((update)=>{
        return allowedUpdates.includes(update)
    })

    if(!isValidOperation)
     return res.status(400).send("Error: Invalid update")
   
    try{

       //const user = await User.findByIdAndUpdate(id,req.body,{'new':true,'runValidators':true});
        //const user = await User.findById(id);

        updates.forEach((update)=>{
            req.user[update] = req.body[update]
        });

        await req.user.save()

        // if(!user){
        //     return res.status(404).send();

        // }
        // res.send(req.user);
        res.send(req.user);


    }catch(e){
        res.status(400).send();
    }
});


// router.patch('/users/:id',async(req,res)=>{
//     const id = req.params.id;

//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name','emsil','age','password'];
//     const isValidOperation = updates.every((update)=>{
//         return allowedUpdates.includes(update)
//     })

//     if(!isValidOperation)
//      return res.status(400).send("Error: Invalid update")
   
//     try{

       // const user = await User.findByIdAndUpdate(id,req.body,{'new':true,'runValidators':true});
//         const user = await User.findById(id);

//         updates.forEach((update)=>{
//             user[update] = req.body[update]
//         });

//         await user.save()

//         if(!user){
//             return res.status(404).send();

//         }
//         res.send(user);


//     }catch(e){
//         res.status(400).send();
//     }
// });

// router.delete('/users/:id',async(req,res)=>{

//     try{

//         const user = await User.findByIdAndDelete(req.params.id)

//         if(!user)
//          res.status(404).send('Error: User not found')

//         res.send(user); 

//     }catch(e){
//         res.status(400).send()
//     }
// })

router.delete('/users/me',auth,async(req,res)=>{

    try{

        //const user = await User.findByIdAndDelete(req.user._id)

        // if(!user)
        //  res.status(404).send('Error: User not found')
        await req.user.remove()
        res.send(req.user); 

    }catch(e){
        res.status(400).send(e)
        
    }
})

router.post('/users/me/avatar',auth,upload.single('avatar'),async(req,res)=>{
    const buffer = await sharp(req.file.buffer).resize({'width':250,'height':250}).png().toBuffer()
    
    req.user.avatar = buffer
    await req.user.save()
    res.send("uploaded")
},(error,req,res,next)=>{
    res.status(400).send({
        'error':error.message
    })
})

router.delete('/users/me/avatar',auth,async(req,res)=>{
    req.user.avatar = undefined
    await req.user.save();
    res.send("profile pic deleted")

},(error,req,res,next)=>{
    res.status(400).send({
        'error':error.message
    })
})

router.get('/users/:id/avatar',async(req,res)=>{

    try{
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar)
            throw new Error()

        res.set('Content-Type','image/png')  
        res.send(user.avatar)  

    }catch(e){
        res.status(404).send()
    }
})


module.exports = router