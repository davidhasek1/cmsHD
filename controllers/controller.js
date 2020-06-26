const Form = require('../models/form');

exports.getHomePage = (req,res,next) => {
    res.render('home', {
        pageTitle: 'Martin Bucek'
    });
};

exports.getAboutPage = (req,res,next) => {
    res.render('about', {
        pageTitle: 'Martin Bucek'
    });
};

exports.getServicesPage = (req,res,next) => {
    res.render('services', {
        pageTitle: 'Martin Bucek'
    });
};

exports.getContactPage = (req,res,next) => {
    res.render('contacts', {
        pageTitle: 'Martin Bucek'
    });
};

exports.postContacts = (req, res ,next) => {
    const name = req.body.fullname;
    const email = req.body.email;
    const message = req.body.message;
    const data = new Form(name,email,message); 
    data.save()
    .then(() =>{
        console.log('New MSG created');
        res.redirect('/admin/cms');
    })
    .catch(err => console.log(err));
    
}