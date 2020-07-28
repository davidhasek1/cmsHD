const Msg = require('../models/form');
const MailTo = require('../models/sendEmail').cmsSendMsg;
const Users = require('../models/users');
/* const User = require('../models/users'); */
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

exports.getCMSPage = (req, res, next) => {
	res.render('admin/cms', {
		pageTitle: 'cmsHD'
	});
}; //pokud  req.user je prázdný - nepřiřadil se user v modalu auth.js, tak je hodnota implicitně FALSE, pokud je user nalezen hodnota je TRUE

exports.getHelpPage = (req, res, next) => {
	res.render('admin/help', {
		pageTitle: 'Guide'
	});
};

exports.getHelpDelete = (req, res, next) => {
	res.render('admin/help/howdelete', {
		pageTitle: 'Guide'
	});
};

exports.getHelpSend = (req, res, next) => {
	res.render('admin/help/howsend', {
		pageTitle: 'Guide'
	});
};
exports.getHelpAdd = (req, res, next) => {
	res.render('admin/help/howadd', {
		pageTitle: 'Guide'
	});
};
exports.getHelpShow = (req, res, next) => {
	res.render('admin/help/howshow', {
		pageTitle: 'Guide'
	});
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

exports.getMessagePage = (req, res, next) => {
	const ID = req.params.msgId;
	Msg.findById(ID)
		.then((message) => {
			res.render('admin/selectedMsg', {
				msg: message,
				pageTitle: message.name
			});
		})
		.catch((err) => console.log(err));
};

exports.deleteMsgPost = (req, res, next) => {
	const ID = req.body.msgId;
	Msg.delete(ID)
		.then(() => {
			//není potřeba prametr - nepotřebuješ žadná data, když je mažeš
			res.redirect('/admin/mailbox');
		})
		.catch((err) => console.log(err));
};

exports.postSendEmail = (req, res, next) => {
	const mail = req.body.mail;
	const subject = req.body.subject;
	const text = req.body.mailtext;
	const message = new MailTo(mail, subject, text);

	console.log(message);
	message.send();
	console.log('controller OK');
	res.redirect('/admin/mailbox');
};

exports.getAddContentPage = (req, res, next) => {
	//v budoucnu budu fetchovat datat z databaze obrazky
	res.render('admin/add-content', {
		pageTitle: 'Add content'
	});
};

exports.getUsersPage = (req, res, next) => {
	const newPW = req.flash('changePW');
	Users.fetchAll()
		.then((users) => {
			res.render('admin/users-list', {
				pageTitle: 'Users',
				userList: users,
				newPWmsg: newPW[0]
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getUserPage = (req, res, next) => {
	const userId = req.params.userId;
	Users.findById(userId)
		.then((user) => {
			//data o vybranem userovi
			res.render('admin/user-edit', {
				pageTitle: 'User Edit',
				user: user,
				err: null
			});
		})
		.catch((err) => console.log(err));
};

/* post edit user - update v db */
exports.postEditUser = (req, res, next) => {
	const ID = req.body.userId;
	const newPassword = req.body.newpassword;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		Users.findById(ID)
			.then((user) => {
				console.log(errors);
				res.render('admin/user-edit', {
					pageTitle: 'User Edit',
					user: user,
					err: errors.array()[0].msg
				});
			})
			.catch((err) => console.log(err));
	}

	Users.findById(ID)
		.then((user) => {
			//nalezený user, pro kterého provedu update udajů
			return bcrypt
				.hash(newPassword, 12)
				.then((hash) => {
					Users.editUserPassword(user, hash)
						.then(() => {
							console.log('edit user password OK');
							req.flash('changePW', 'Your password was changed');
							res.redirect(`/admin/users`);
						})
						.catch((err) => {
							console.log(err);
						});
				})
				.catch((err) => {
					console.log(err);
				});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postDeleteUser = (req, res, next) => {
	const userId = req.body.userId;
	Users.delete(userId)
		.then(() => {
			res.redirect('/admin/users');
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getAddUserPage = (req, res, next) => {
	let error = req.flash('error');
	let newUser = req.flash('savedUser');

	res.render('admin/add-user', {
		pageTitle: 'Add new user',
		error: error[0],
		newUserMsg: newUser[0]
	});
};

exports.postAddUser = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	const errors = validationResult(req);
	let newUser = req.flash('savedUser'); //tady je to pouze definováno, aby tento render nehazel chybu

	if (!errors.isEmpty()) {
		console.log(errors);
		return res.status(422).render('admin/add-user', {
			pageTitle: 'Add new user',
			error: errors.array()[0].msg,
			newUserMsg: newUser[0]
		});
	}
	const checkUserEmail = new Users(email); //nový objekt jen mail - chranim heslo - nejde použit Users...?
	checkUserEmail
		.checkExistingUser()
		.then((userDoc) => {
			if (userDoc) {
				//není undefined
				console.log('User already exists');
				req.flash('error', 'User already exists');
				return res.redirect('/admin/users/add-user');
			}
			bcrypt.hash(password, 12).then((hashedPassword) => {
				const newUser = new Users(email, hashedPassword);
				newUser
					.save()
					.then(() => {
						console.log('New user saved');
						req.flash('savedUser', 'New user added!');
						return res.redirect('/admin/users/add-user');
					})
					.catch((err) => console.log(err));
			});
		})
		.catch((err) => {
			console.log('check Email error');
		});
};
