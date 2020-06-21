const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const routers = require('./routes/router');
const adminRouters = require('./routes/adminRoutes');

app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, '/views'));   //definice cesty pro nested directories ve views dir
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));


app.use('/admin', adminRouters );

app.use(routers);


app.use((req,res,next) => {
    res.render('error', {
        pageTitle: '404: Page not found'
    });
});

app.listen(5000);