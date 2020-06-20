

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

exports.postContacts = (req,res,next) => {
    res.redirect('/');
}