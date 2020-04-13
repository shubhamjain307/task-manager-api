//  CRUD using MongoDb

const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient; //To initialize connection
const {MongoClient,ObjectID} =require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager';

// const ObjectID = mongodb.ObjectID
//const id = new ObjectID();

// console.log(id.id.length);
// console.log(id.toHexString().length)
// console.log(id.getTimestamp());

MongoClient.connect(connectionURL,{'useNewUrlParser':true},(error,client)=>{

    if(error){
        console.log('Error');
        return;
    }
    console.log('Connected Succcessfully')

   const db = client.db(databaseName);

//    db.collection('users').insertOne({
//         'name':'vikram',
//         'age':26,
//    },(error,result)=>{

//         if(error){
//             console.log("Error in inserting")
//         }

//         console.log(result.ops)
//    })

    // db.collection('users').insertMany([{
    //         'name':'jane',
    //         'age':22
    //     },
    //     {
    //         'name':"Andrew",
    //         'age':34
    //     }
    // ],(error,result)=>{
    //     if(error)
    //         return console.log("Error while inserting");
    //     else{
    //         console.log("inserted successfully");
    //         console.log(result.ops);
    //     }    
    // })

    // db.collection('tasks').insertMany([{
    //     'description':"First task to be executed",
    //     'completedStatus':true
    // },
    // {
    //     'description':"Second task to be executed",
    //     'completedStatus':false
    // },
    // {
    //     'description':"Third task to be executed",
    //     'completedStatus':true
    // }
    // ],(error,result)=>{
    //     if(error)
    //      console.log("error while inserting")
    //     else{
    //         console.log(result.ops)
    //     } 
    // })

    //////////////////// To Find data //////////////////////


    // db.collection('users').findOne({'_id':new ObjectID('5e8c30f9df49742de6363724')},(error,user)=>{
    //     if(error)
    //      console.log("unble to fetch");
        
    //     console.log(user); 
    // });

    // db.collection('users').find({'age':24}).toArray((error,users)=>{

    //     if(error){
    //         console.log("error while fetching")

    //     }else{
    //         console.log(users)
    //     }
    // })

    // db.collection('users').find({'age':24}).count((error,count)=>{

    //     if(error){
    //         console.log("error while fetching")

    //     }else{
    //         console.log(count)
    //     }
    // })

    // db.collection('tasks').findOne({'_id':new ObjectID('5e8c2d3f38a25c2c2dd62147')},(error,task)=>{
    //     if(error)
    //      console.log("Error")

    //     else{
    //         console.log(task);
    //     } 
    // })

    // db.collection('tasks').find({'completedStatus':false}).toArray((error,result)=>{
    //     if(error)
    //      console.log("Error")

    //     else{
    //         console.log(result);
    //     } 
    // })

    // @@@@@@@@@@@@@   Update @@@@@@@@@@@@@@@@@@@@@@@@@2

    
    
//    db.collection('users').updateOne({
//         '_id':new ObjectID('5e8c30f9df49742de6363724')
//     },
//     {
//         '$set':{
//             'name':'shubham'
//         },
        // '$inc':{
        //     'age':2
        // }
    // }). then((result)=>{
    //     console.log(result)

    // }).catch((error)=>{
    //     console.log(error)
    // })

    // db.collection('tasks').updateMany({'completedStatus':false},
    // {
    //     '$set':{
    //         'completedStatus':true
    //     }
    // }).then((result)=>{
    //     console.log(result);
    // }).catch((error)=>{
    //     console.log(error);
    // })
       

    // @@@@@@@@@@@@@@  Delete the records @@@@@@@@@@@@@@@@@@@@@

    // db.collection('users').deleteMany({'age':24}).then((result)=>{
    //     console.log(result);
    // }).catch((error)=>{
    //     console.log(error);
    // })

        // db.collection('tasks').deleteOne({'completedStatus':true}).then((result)=>{

        //     console.log(result);
        // }).catch((error)=>{
        //     console.log(error);
        // })
   
})