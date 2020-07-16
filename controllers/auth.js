const bcrypt = require('bcryptjs');
const User = require('../models/users');

exports.getLoginPage = (req, res, next) => {
	//const isLoogedIn = req.get('Cookie').split('SL_wptGlobTipTmp=undefined; ')[1].trim().split('=')[1];

	let message = req.flash('error');
	console.log(message);

	console.log(req.session.isLoggedIn);
	res.render('auth/adminLogin', {
		pageTitle: 'Admin Login',
		isAuthenticated: false, //vyrenderuje se login page tudíš authentication je false jako výchozí stav
		errorMessage: message[0],
	});
	console.log(req.session.isLoggedIn);
};

exports.postLogin = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	User.findByEmail(email)
		.then((user) => {
			if(!user){
				req.flash('error', 'Invalid email or password');
				return res.redirect('/admin');
			}
			bcrypt.compare(password, user.password)	//bcrypt vrací bolean
			.then(doMatch => {
				if(doMatch){
					req.session.isLoggedIn = true;
					req.session.user = user; //K dané session je přřazen user . nalezený user je uložen v session   //req.session.user je dostupnej všude kvuli session middlewareu v app.js
					return req.session.save((err) => { // nejprve se uloží session a pak se s jistotou vyrenderuje full page bez prodlení
						console.log(err);
						res.redirect('/admin/cms');
					})
				}
				req.flash('error', 'Invalid email or password' );
				res.redirect('/admin');
            })	
			.catch(err => console.log(err));
			
		})
		.catch((err) => {
			console.log(err);
		});
};


exports.postLogout = (req, res, next) => {
	req.session.destroy((err) => {
		//destroy session při aktualní aktivní session
		console.log(err);
		res.redirect('/admin'); // přesměrování na admin login
	});
};
