require('dotenv').config();
// core modules
const path = require('path');
const db = require('./models');

// custom modules
const taskRouters = require('./routes/taskRouters');
const authRouters = require('./routes/usersRouters');
const errorHandler = require('./middlewares/errorHandler');

//External modules
const express = require('express');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const app = express();


app.set('view engine', 'ejs');
app.set('views','views');

app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/uplaods', express.static(path.join(__dirname,'uplaods')));

app.use((req,resp,next) => {
    const token = req.cookies?.token;
    if(token) {
        try {
            const jwt = require('jsonwebtoken');
            resp.locals.user = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            resp.locals.user = null;
        }
    } else {
        resp.locals.user = null;
    }
    next();
});

app.use('/api',authRouters);
app.use('/api',taskRouters);

app.use( (req,resp) => {
    resp.status(404).render('404', { pageName : '404 page not found'})
});
// Centralized error handler — MUST be last
app.use(errorHandler);

const PORT = process.env.PORT || 3002;


db.sequelize.authenticate().then(() => {
    app.listen(PORT, () => {
        console.log(`we are running on http://localhost:${PORT}`);
    });
}
).catch(err => {
    console.log("There is DB connection issue", err);

})


