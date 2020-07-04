const User = require('../models/users');

exports.getLoginPage = (req, res, next) => {
	//const isLoogedIn = req.get('Cookie').split('SL_wptGlobTipTmp=undefined; ')[1].trim().split('=')[1];

	console.log(req.session.isLoggedIn);
	res.render('auth/adminLogin', {
		pageTitle: 'Admin Login',
		isAuthenticated: false //vyrenderuje se login page tudíš authentication je false jako výchozí stav
	});
	console.log(req.session.isLoggedIn);
};

exports.postLogin = (req, res, next) => {
	//přihlášení do systému
	User.findById('5efe0a13026ed0a4022d55d1')
		.then((user) => {
			req.session.isLoggedIn = true;
            req.session.user = user; //K dané session je přřazen user . nalezený user je uložen v session   //req.session.user je dostupnej všude kvuli session middlewareu v app.js
            req.session.save((err) => { // nejprve se uloží session a pak se s jistotou vyrenderuje full page bez prodlení
                console.log(err);
                res.redirect('/admin/cms');
            })
			
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postLogout = (req, res, next) => {
	req.session.destroy((err) => {
		//destroy session při aktualní aktivní session
		console.log(err);
		res.redirect('/'); // přesměrování na homepage
	});
};
