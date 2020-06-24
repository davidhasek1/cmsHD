exports.getError = (req, res, next) => {
	res.render('error', {
		pageTitle: '404: Page not found'
	});
};
