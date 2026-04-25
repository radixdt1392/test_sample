const { body, param, validationResult } = require('express-validator');
// body = validates req.body fields (form data)
// param = validates req.params (URL params like :id)
// validationResult = collects all validation errors

//AUTH Validation ::
const registerRules = [
    body('name').trim().notEmpty().withMessage('Name is Required').isLength({ min:3, max:50}).withMessage('name must be 3-50 character').escape(),
    body('email').trim().notEmpty().withMessage('email ios requird').isEmail().withMessage('invalid Email').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required').isLength({ min:6}).withMessage(' password min 6 character')
];

const loginRules = [
    body('email').trim().notEmpty().withMessage('email is requird').isEmail().withMessage('invalid Email').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required')
];

// Rule: validate :id in URL
const idRule = [
    param('id')
        .isInt({ min: 1 })          // must be a positive integer
        .withMessage('Invalid ID')   // error message if fails
];

const savetaskRules = [
    body('title').trim().notEmpty().withMessage("Title is Required")
    .isLength({min:3,max:255}).withMessage("Title Must be in 3-255 character")
    .escape(),
    body('status').optional().isIn(['pending','in-progress','completed']).withMessage('invalid input'),
    body('priority').trim().isIn(['low','medium','high']).withMessage("invalid priority input"),
    body('due_date').isDate().withMessage("Invalid Date")
];

const updateTaskRules = [...idRule, ...savetaskRules];



// validation this if there any failure ocured.
function validate(req,resp,next) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const errorMsg = errors.array().map( e => e.msg).join(', ');

        if(req.originalUrl.includes('/auth/login')) {
            return resp.render('login', {
                pageName:"login for TSM",
                error: errorMsg
            });
        }
        if(req.originalUrl.includes('/auth/register')) {
            return resp.render('register', {
                pageName:'Register',
                error:errorMsg,
                success: null
            })
        }
        return resp.render('addtask', {
            pageName:'Task For TSM',
            token:'token',
            task:req.body || '',
            error:errorMsg
        });
    }
    next();
}

module.exports = { registerRules, loginRules, idRule, savetaskRules, updateTaskRules, validate }