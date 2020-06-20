const express = require('express');
const app = express();
const path = require('path');

const routers = require('./routes/router');
const adminRouters = require('./routes/adminRoutes');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));


app.use('/admin', adminRouters );

app.use(routers);


app.use((req,res,next) => {
    res.render('error', {
        pageTitle: '404: Page not found'
    });
});

app.listen(5000);