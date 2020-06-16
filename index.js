const express= require('express');
const path =require('path');
const port =8000;

const db=require('./config/mongoose');
const Contact=require('./models/contact');
const app= express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({ extended: true }));// this is for req.body
app.use(express.static('assets'))

var contact_list=[
    {
        name:"shikhar",
        phone:"9410080897"
    },
    {
        name:"Utkarsh",
        phone:"8218639727"
    },
    {
        name:"Vikas",
        phone:"9719428004"
    }
]
app.get('/', function(req,res){
    // console.log(__dirname);
    // res.send("<h1>Cool It is working isn't it?</h1>");
    Contact.find({},function(err,contacts){
        if(err){
            console.log('error in fetching contact from db');
            return;
        }
        return res.render('home',{
            title:"Contact List",
            contactList:contacts     
        });

    });
    // return res.render('home',{
        // title:"Contact List",
        // contactList:contact_list      
    // });
    

});
app.get('/practice' ,function(req,res){
        return res.render('practice',{
            title:"let us play with ejs"
        });
});

app.post('/contact',function(req,res){
    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);
    // contact_list.push({
        // name:req.body.name,
        // phone:req.body.phone
    // });
    // contact_list.push(req.body);
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){
            console.log('error in creating the contact');
            return;
        }
        console.log('*********',newContact);
        return res.redirect('back');
    });
    // return res.redirect('/');// instead of '/' if we want to come back to same page use 'back'
});
//deleting contact
app.get('/delete-contact/',function(req,res){
    // let phone= req.query.phone;
    let id=req.query.id;
    // let contactIndex=contact_list.findIndex(contact => contact.phone==phone);
    // if(contactIndex!=-1){
    //     contact_list.splice(contactIndex,1);
    // }
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting number');
            return
        }
        return res.redirect('back');
    })
    // return res.redirect('back');

});

app.listen(port, function(err){
    if(err){
        console.log('Error in running the surver', err);
       return ;
    }
    console.log('my express surver is running on the port', port);

})