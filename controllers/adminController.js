const Msg = require('../models/form');
const MailTo = require('../models/sendEmail').cmsSendMsg;


exports.getCMSPage = (req, res, next) => {
	res.render('admin/cms', {
		pageTitle: 'CMS',
		isAuthenticated: req.session.user	//pro každý get router defunuju authentication session. To kontroluje, zda je uživatel přihlášen a muže vypisovat obsah
	});
};		//pokud  req.session.user je prázdný - nepřiřadil se user v modalu auth.js, tak je hodnota implicitně FALSE, pokud je user nalezen hodnota je TRUE

exports.getHelpPage = (req, res, next) => {
	res.render('admin/help', {
		pageTitle: 'Guide',
		isAuthenticated: req.session.user
	});
}

exports.getHelpDelete = (req,res,next) => {
	res.render('admin/help/howdelete', {
		pageTitle: 'Guide',
		isAuthenticated: req.session.user
	});
}

exports.getHelpSend = (req,res,next) => {
	res.render('admin/help/howsend', {
		pageTitle: 'Guide',
		isAuthenticated: req.session.user
	})
}
exports.getHelpAdd = (req,res,next) => {
	res.render('admin/help/howadd', {
		pageTitle: 'Guide',
		isAuthenticated: req.session.user
	})
}
exports.getHelpShow = (rew,res,next) => {
	res.render('admin/help/howshow', {
		pageTitle: 'Guide',
		isAuthenticated: req.session.user
	})
}

exports.getMailBoxPage = (req, res, next) => {
	Msg.fetchAll()
		.then((messages) => {
			res.render('admin/mailbox', {
				msg: messages,
				pageTitle: 'Mailbox',
				isAuthenticated: req.session.user
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
				pageTitle: message.name,
				isAuthenticated: req.session.user
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
	//Msg.delete(id).then catch
};

exports.postSendEmail = (req,res,next) => {
	const mail = req.body.mail;
	const subject = req.body.subject;
	const text = req.body.mailtext;
	const message = new MailTo(mail, subject, text);

	console.log(message);
	message.send();
	console.log('controller OK');
	res.redirect('/admin/mailbox');

}


