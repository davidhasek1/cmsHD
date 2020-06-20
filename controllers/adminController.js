
exports.getLoginPage = (req,res,next) => {
    res.render('adminLogin', {
        pageTitle: 'Admin Login'
    });
};  