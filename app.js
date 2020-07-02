const express = require('express');
const app = express();

const path = require('path');
const bodyParser = require('body-parser');
const mongoConnect = require('./helpers/database').mongoConnect;
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const MONGO_URI = require('./helpers/database').uri;

const routers = require('./routes/router');
const errCtrl = require('./controllers/errorCtrl');
const adminRouters = require('./routes/adminRoutes');
const authRouter = require('./routes/auth');

const store = new MongoDBStore({
    uri: MONGO_URI,
    collection: 'sessions'
});

app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, '/views'));   //definice cesty pro nested directories ve views dir
app.set('views', 'views');

app.use(
    session({secret: 'mysecretstring', resave: false, saveUninitialized: false, store: store})
);

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));


app.use('/admin', adminRouters );

app.use(routers);
app.use(authRouter);


app.use(errCtrl.getError);

mongoConnect(()=> {
    app.listen(5000);
});

