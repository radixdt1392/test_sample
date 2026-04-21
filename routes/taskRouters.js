const express = require('express');
const taskRouters = express.Router();
const multer = require('multer');
// const upload = multer({dest:'public/uploads/'});
const taskController = require('../controllers/taskControllers');
//import for validation 
const { idRule, savetaskRules, updateTaskRules, validate } = require('../middlewares/validate');
const authMiddleware = require('../middlewares/auth');
const authorizeRoles = require('../middlewares/roleAuth');
const upload = require('../middlewares/upload');

taskRouters.use(authMiddleware);

taskRouters.get('/',taskController.getAllTask);

// add or edit  tas, need to check Role
taskRouters.get('/tasks',authorizeRoles('admin','manager')  , taskController.addeditTask);

// check for ID rule
taskRouters.get('/tasks/:id', idRule, validate, taskController.getTaskDetails);

// CHANGED: added saveTaskRules + validate (validates form fields)
// taskRouters.post('/tasks', upload.single('attachments'), savetaskRules, validate, taskController.saveTask);

taskRouters.post('/tasks', savetaskRules, validate, taskController.saveTask);

// Update the Task
// taskRouters.put('/tasks/:id', authorizeRoles('admin','manager'), upload.single('attachments'), updateTaskRules, validate, taskController.updateTask);
taskRouters.put('/tasks/:id', authorizeRoles('admin','manager'), updateTaskRules, validate, taskController.updateTask);

//Delete the Task
taskRouters.post('/tasks/delete/:id', authorizeRoles('admin'), idRule, validate, taskController.deleteTaskDetail);

taskRouters.post('/tasks/:id/upload', authorizeRoles('admin','manager'), idRule, validate, upload.single('attachments'), taskController.uploadAttachment )


module.exports = taskRouters;