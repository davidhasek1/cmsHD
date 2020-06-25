const Msg = require('../models/form');
exports.getLoginPage = (req, res, next) => {
	res.render('admin/adminLogin', {
		pageTitle: 'Admin Login'
	});
};

exports.getCMSPage = (req, res, next) => {
    res.render('admin/cms', {
        pageTitle: 'CMS'
    })
};

exports.getMailBoxPage = (req, res, next) => {
	Msg.fetchAll()
		.then((messages) => {
			res.render('admin/mailbox', {
				msg: messages,
				pageTitle: 'Mailbox'
			});
		})
		.catch((err) => console.log(err));
};
