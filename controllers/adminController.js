
exports.getLoginPage = (req,res,next) => {
    res.render('admin/adminLogin', {
        pageTitle: 'Admin Login'
    });
};  