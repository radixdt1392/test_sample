const db = require('../models');
const Users = db.Users;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//Show Login page
function authLogin(req, resp) {
    resp.render('login', { pageName:'Login for TSM', error : null});
}

//show register page
function authRegister(req, resp) {
    resp.render('register', { pageName:'Register', error : null, success : null });
}

//check POST register request
function registerUser(req,resp) {
    const {name, email, password, role } = req.body;
    Users.findOne( {where: { email} } )
    .then(existingUser => {
        // if user already there.
        if(existingUser) {
            return resp.render('register',{
                pageName:'Register',
                error:'Email is Alaready Exist',
                success:null
            });
        }

        // password Hash
        const hashedPassword = bcrypt.hashSync(password,10);

        return Users.create({
            name,
            email,
            password:hashedPassword,
            role:role || 'user',
            isActive:'yes',
            login_attempts:0
        });
    }).then(user => {
        if(user) {
            resp.render('register', {
                pageName:'Register',
                error:null,
                success:"Registration SuccessFull Please login"
            });
        }
    }).catch(error => {
        resp.render('register',{
            pageName:'Register',
            error:error.message,
            success:null
        });
    });
}

function loginUser(req,resp) {
    const { email, password } = req.body;
    Users.findOne({ where : { email } })
        .then(user => {
            if(!user) {
                return resp.render('login',{
                    pageName: 'Login For TSM',
                    error:'Invalid email or password'
                });
            }
            if(!user.isActive) {
                return resp.render('login',{
                    pageName:'Login for TSM',
                    error:'Account is Deactivated'
                });
            }

            //check Password
            const isMatched = bcrypt.compareSync(password,user.password);

            if(!isMatched) {
                // increase Login Attempts
                Users.update(
                    { login_attempts : user.login_attempts + 1},
                    { where : { id : user.id } }
                );
                return resp.render('login',{
                    pageName:'Login for TSM',
                    error:'Invalid Email for Password'
                });
            }

            // reset login attempts
            Users.update({ login_attempts: 0 },
                { where : {id : user.id} }
            );

            // Generate JWT token
            const token = jwt.sign(
                { id: user.id, email: user.email, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn : process.env.JWT_EXPIRES}
            );

            // set token in cookie
            resp.cookie('token', token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000 // 1 Day
            });
             //redirect 

             resp.redirect('/api/');

        }).catch(error => {
            resp.render('login',{
                pageName:'Login for TSM',
                error:error.message
            });
        });

}

function logOut(req,resp) {
    resp.clearCookie('token');
    resp.redirect('/api/auth/login');
}

module.exports = {
    authLogin,authRegister,registerUser,loginUser,logOut
}