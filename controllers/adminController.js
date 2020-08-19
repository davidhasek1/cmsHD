const Msg = require('../models/form');
const MailTo = require('../models/sendEmail').cmsSendMsg;
const Users = require('../models/users');
const Images = require('../models/images');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');


exports.getCMSPage = async (req, res, next) => {
	try {
		const msgCount = await Msg.msgCount();
		const imgCount = await Images.imgCount();
		res.render('admin/cms', {
			pageTitle: 'cmsHD',
			msgCount: msgCount,
			imgCount: imgCount
		});
		
	} catch (error) {
		console.log(err);
	}
		
}; //pokud  req.user je prázdný - nepřiřadil se user v modalu auth.js, tak je hodnota implicitně FALSE, pokud je user nalezen hodnota je TRUE

exports.getHelpPage = (req, res, next) => {
	res.render('admin/help', {
		pageTitle: 'Guide'
	});
};
exports.getHelpShowDeleteMsg = (req, res, next) => {
	res.render('admin/help/ShowDeleteMsg', {
		pageTitle: 'Zobrazit / Smazat zprávu'
	});
};

exports.getHelpSendMsg = (req, res, next) => {
	res.render('admin/help/SendMsg', {
		pageTitle: 'Poslat zprávu'
	});
};
exports.getHelpAddImage = (req, res, next) => {
	res.render('admin/help/AddImage', {
		pageTitle: 'Přidat fotku'
	});
};
exports.getHelpShowDeleteImg = (req, res, next) => {
	res.render('admin/help/ShowDeleteImg', {
		pageTitle: 'Zobrazit / Smazat fotku'
	});
};
exports.getHelpAddUser = (req, res, next) => {
	res.render('admin/help/AddUser', {
		pageTitle: 'Přidat uživatele'
	});
};
exports.getHelpChangePwd = (req, res, next) => {
	res.render('admin/help/ChangePwd', {
		pageTitle: 'Změnit heslo'
	});
};
exports.getHelpDeleteUser = (req, res, next) => {
	res.render('admin/help/DeleteUser', {
		pageTitle: 'Smazat uživatele'
	});
};

exports.getMailBoxPage = async (req, res, next) => {
	try {
		const allMsgs = await Msg.fetchAll();
			res.render('admin/mailbox', {
				msg: allMsgs,
				pageTitle: 'Mailbox'
			});
	} catch (err)  {
		console.log(err);
		console.log('fail fetch messages from DB');
	}
	
};

exports.getMessagePage = async (req, res, next) => {
	const ID = req.params.msgId;
	try {
		const singleMsg = await Msg.findById(ID);
			res.render('admin/selectedMsg', {
				msg: singleMsg,
				pageTitle: singleMsg.name
			});

	} catch (err) {
		console.log(err);
		console.log('fail fetch single message');
	}
};

////Delete
exports.deleteMsg = async (req, res, next) => {
	const ID = req.params.msgId;
	try {
		await Msg.delete(ID);
		res.status(200).json({message: "Success!"});
	} catch (error) {
		console.log(err);
	}
};

exports.postSendEmail = (req, res, next) => {
	const mail = req.body.mail;
	const subject = req.body.subject;
	const text = req.body.mailtext;
	const message = new MailTo(mail, subject, text);

	console.log(message);
	/* message.send(); */
	console.log('controller OK');
	res.redirect('/admin/mailbox');
};

exports.getAddContentPage = async (req, res, next) => {
	try {
		const allImgs = await Images.fetchImg();
			res.render('admin/add-content', {
				pageTitle: 'Add content',
				images: allImgs
			});
	} catch (error) {
		console.log(error);
		console.log('fail fetch images');
	}
	
};	
		

exports.postImgVisibility = async (req, res, next) => {
	const ID = req.body.imgId;
	const visibility = req.body.visibility;

	if (visibility === 'true') {
		try {
			const visible = await Images.visibilityIsTrue(ID);
			console.log('ctrl img visibility update');
			console.log(visible);
			res.redirect('/admin/add-content');
		} catch (error) {
			console.log(error);
			console.log('visibility');
		}
		
	} else {
		try {
			const disVisible = await Images.visibilityIsFalse(ID);
			console.log('ctrl img visib. update');
			console.log(disVisible);
			res.redirect('/admin/add-content');
		
		} catch (error) {
			console.log(error);
			console.log('disvisibility');
		}
	}
};

////DELETE
exports.postDeleteImage = async (req, res, next) => {
	const imgID = req.body.imgID;
	const URL = req.body.imgURL;

	try {
		await Images.delete(imgID, URL);
		console.log('Image successfully deleted');
		res.redirect('/admin/add-content');
	} catch (err){
		console.log(err);
	}
	
};

exports.getAddContentForm = (req, res, next) => {
	res.render('admin/contentForm', {
		pageTitle: 'Add new image',
		errorMsg: '',
		oldInput: {
			title: ''
		}
	});
};

exports.postAddContent = async (req, res, next) => {
	const title = req.body.title;
	const image = req.file;
	console.log(image);

	if (!image) {
		return res.render('admin/contentForm', {
			pageTitle: 'Add new image',
			errorMsg: 'Attech file is not an image',
			oldInput: {
				title: title
			}
		});
	}

	const imageURL = image.path;

	const imageData = new Images(title, imageURL);
	try {
		const newImg = await imageData.saveImage();
		console.log('IMG Saved');
		console.log(newImg);
		res.redirect('/admin/add-content');
	} catch (error) {
		console.log(error);
	}
};

exports.getUsersPage = async (req, res, next) => {
	const newPW = req.flash('changePW');
	try {
		const users = await Users.fetchAll();
		res.render('admin/users-list', {
				pageTitle: 'Users',
				userList: users,
				newPWmsg: newPW[0]
			});
		
	} catch (error) {
		console.log(error);
	}
};

exports.getUserPage = async (req, res, next) => {
	const userId = req.params.userId;
	try {
		const singleUser = await Users.findById(userId);
		res.render('admin/user-edit', {
			pageTitle: 'User Edit',
			user: singleUser,
			err: null,
			oldInput: {
				password: '',
				confirm: ''
			}
		})
	} catch (error) {
		console.log(error);
	}
};

/* post edit user - update v db */
exports.postEditUser = async (req, res, next) => {
	const ID = req.body.userId;
	const newPassword = req.body.newpassword;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		try {
			const user = await Users.findById(ID);
			console.log(errors);
			res.render('admin/user-edit', {
				pageTitle: 'User Edit',
				user: user,
				err: errors.array()[0].msg,
				oldInput: {
					password: newPassword,
					confirm: req.body.confirmpassword
				}
			});
		} catch (error) {
			console.log(error);
		}
	}

	try {
		const user = await Users.findById(ID);
		const hash = await bcrypt.hash(newPassword, 12);
		const updatePW = await Users.editUserPassword(user, hash);
		console.log('edit user password OK');
		console.log(updatePW);
		req.flash('changePW', 'Your password was changed');
		res.redirect(`/admin/users`);
	} catch (err){
		console.log(err);
		console.log('new password set failed');
	}
		
};

////DELETE async/await
exports.DeleteUser = async (req, res, next) => {
	const userId = req.params.userId;
	try {
		await Users.delete(userId);
		res.status(200).json({message: "User deleted success"});
	} catch (err) {
		console.log(err);
	}
	
};

exports.getAddUserPage = (req, res, next) => {
	let error = req.flash('error');
	let newUser = req.flash('savedUser');

	res.render('admin/add-user', {
		pageTitle: 'Add new user',
		error: error[0],
		newUserMsg: newUser[0],
		oldInput: {
			email: '',
			password: '',
			confirm: ''
		}
	});
};

exports.postAddUser = async (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	const errors = validationResult(req);
	let newUser = req.flash('savedUser'); //tady je to pouze definováno, aby tento render nehazel chybu

	if (!errors.isEmpty()) {
		console.log(errors);
		return res.status(422).render('admin/add-user', {
			pageTitle: 'Add new user',
			error: errors.array()[0].msg,
			newUserMsg: newUser[0],
			oldInput: {
				email: email,
				password: password,
				confirm: req.body.confirm
			}
		});
	}

	try {
		const hash = await bcrypt.hash(password, 12);
		const newUser = new Users(email, hash);
		await newUser.save();
		console.log('New user saved');
		req.flash('savedUser', 'New user added!');
		return res.redirect('/admin/users/add-user');

	} catch (error) {
		console.log(error);
	}

};
