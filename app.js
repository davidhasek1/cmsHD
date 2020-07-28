const express = require('express');
const app = express();
const csrf = require('csurf');

const path = require('path');
const bodyParser = require('body-parser');
const mongoConnect = require('./helpers/database').mongoConnect;
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const User = require('./models/users');
const flash = require('connect-flash');

const MONGO_URI = require('./helpers/database').uri;

const routers = require('./routes/router');
const errCtrl = require('./controllers/errorCtrl');
const adminRouters = require('./routes/adminRoutes');
const authRouter = require('./routes/auth');
const csrfProtection = csrf();

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
//POZOR!!! - CSRF musí být deklarován PO bodyparseru, aby BP věděl o csrf!!!!!!
app.use(csrfProtection);

app.use(flash());   //musí být po initu session


// když už session uživatele existuje tak, jen najdu session id uživatele a vezmu si pouze data o něm - použiju  req.user = user data ze session už mam... když req.session user id existuje, tak se do then parametru uloží data teto session a ty čistý data si uložím do ní a nasledně do req.user = user
// tím že jde o session muddleware "obecený" tak je dostupný všude. Pokud req.session.user existuje našel jsem id, tak pro něho ukladsam data do req.user a ty pak používám v admin controlleru, např. pro isAuthenticated -> a tedy mohu vypsat obsah CMS
app.use((req,res,next) => {
    if(!req.session.user) {
       return next();
    }
    User.findById(req.session.user._id)
        .then((user) => {
            req.user = user; //K dané session je přřazen user . nalezený user je uložen v session   //req.session.user je dostupnej všude kvuli session middlewareu v app.js
            next();
        }).catch((err) => {
            console.log(err);
        });
});

//Namísto opakování těchto parametrů v renderech, použiju locals - tím se používají tyto params ve všech renderech
app.use((req,res,next) => {
    res.locals.isAuthenticated = req.user;  //pro každý get router defunuju authentication session. To kontroluje, zda je uživatel přihlášen a muže vypisovat obsah
    res.locals.csrfToken = req.csrfToken();
    next();
})

app.use('/admin', adminRouters );

app.use(routers);
app.use(authRouter);


app.use(errCtrl.getError);

mongoConnect(()=> {
    app.listen(5000);
});

