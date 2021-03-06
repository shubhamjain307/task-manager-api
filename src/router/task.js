
const express = require('express');

const router = new express.Router();

const Task = require('../models/task');
const auth = require('../middleware/auth')

router.post('/tasks',auth,async(req,res)=>{
    // const task = new Task(req.body);
       const task = new Task({
           ...req.body,
           'owner':req.user._id
       })

    try{
        await task.save();
        res.status(200).send(task)
    }catch(e){
        res.status(400).send(e);
    }
    // task.save().then(()=>{
    //     res.status(201).send(task);
    // }).catch((e)=>{
    //     res.status(400).send(e);
    // });
})


// GET /tasks?completed=true 
//  Pagination limit  /tasks?limit=10&skip=10  (skipping first page of record 10 )
// Sorting /tasks?sortBy=createdAt:asc

router.get('/tasks',auth,async(req,res)=>{
    
    const completedStatus = req.query.completed;
    const match = {}
    const sort = {} 

    if(completedStatus){
        match.completedStatus = completedStatus === 'true'
    }

    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] ==='desc' ? -1 : 1
    }

    try{
       // const task = await Task.find({'owner':req.user._id});
         //await task.populate('owner').execPopulate();
         
         await req.user.populate({
             'path':'tasks',
             match,
             'options':{
                 'limit':parseInt(req.query.limit),
                 'skip':parseInt(req.query.skip),
                //  'sort':{
                //      'createdAt':-1  //(1-Ascending, -1->Descending)
                //  }
                sort
             }
            
         }).execPopulate();

        
        res.send(req.user.tasks);
    }catch(e){
        res.status(404).send(e);
    }
    // Task.find().then((tasks)=>{

    //     res.status(200).send(tasks);
    // }).catch((e)=>{
    //     res.status(404).send(e);
    // })
})

router.get('/tasks/:id',auth,async(req,res)=>{
    const _id = req.params.id;

    try{
        //const task = await Task.findById(_id);
        const task = await Task.findOne({'_id':_id,
          'owner':req.user._id
        })
        
        if(!task)
            return res.status(400).send();

        res.status(200).send(task);    
    }catch(e){
        res.status(404).send(e);
    }
    // Task.findById(_id).then((task)=>{
    //     if(!task){
    //         res.status(404).send();
    //     }
    //     res.send(task);
    // }).catch((e)=>{
    //     res.status(400).send(e)
    // })

});


router.patch('/tasks/:id',auth,async(req,res)=>{

    const id = req.params.id;

    const updates = Object.keys(req.body);
    const updatedTask = ['description','completedStatus']

    const isValidOperation = updates.every((update)=>{
        return updatedTask.includes(update)
    })

    if(!isValidOperation)
     return res.status(400).send("Error: Invalid update")

    try{

       // const task = await Task.findByIdAndUpdate(id,req.body,{'new':true,'runValidators':true});
        
       //const task = await Task.findById(id);
        const task = await Task.findOne({'_id':id,'owner':req.user._id})
      

       if(!task)
         return res.status(404).send();

         updates.forEach((update)=>{
            task[update] = req.body[update]
        })
        
        await task.save(); 
        res.send(task)

    }catch(e){
        res.status(400).send();
    }
});

router.delete('/tasks/:id',auth,async(req,res)=>{
    try{
        // const task = await Task.findByIdAndDelete(req.params.id);
        const task = await Task.findOneAndDelete({'_id':req.params.id,'owner':req.user._id})

        if(!task)
         return res.status(404).send('Error:task not found')

        res.send(task); 

    }catch(e){
        res.status(400).send();
    }
})

module.exports = router
