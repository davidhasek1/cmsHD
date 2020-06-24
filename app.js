const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoConnect = require('./helpers/database').mongoConnect;

const routers = require('./routes/router');
const errCtrl = require('./controllers/errorCtrl');
const adminRouters = require('./routes/adminRoutes');

app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, '/views'));   //definice cesty pro nested directories ve views dir
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));


app.use('/admin', adminRouters );

app.use(routers);


app.use(errCtrl.getError);

mongoConnect(()=> {
    app.listen(5000);
});

