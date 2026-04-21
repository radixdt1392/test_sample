const db = require('../models');
const Tasks = db.Tasks;
const cache = require('../utils/cache');

function addeditTask(req,resp) {
    // resp.send('Your are here to check all Task list')
    resp.render('addtask', { pageName : 'Add - Edit Task for TSM',token:"token", task:''});
}

async function getAllTask(req, resp) {
    try {
        const cacheKey = `tasks_${req.user.id}_${req.user.role}`;

        const cached = await cache.get(cacheKey);
        if (cached) {
            return resp.render('index', { pageName: 'Task for TSM', taskList: cached, });
        }

        let whereCondition = {};

        //admin can see all task 
        // manager can see only thoses which created by them
        // user see only tasks assigned to them.
        if (req.user.role === 'admin') {
            whereCondition = {};
        } else if (req.user.role === 'manager') {
            const { Op } = require('sequelize');
            whereCondition = {
                [Op.or]: [
                    { createBy: req.user.email },
                    { assignTo: req.user.email }
                ]
            };
        } else {
            whereCondition = { assignTo: req.user.email };
        }

        const taskList = await Tasks.findAll({
            where: whereCondition,
            order: [['createdAt', 'DESC']]
        });
        // Set Cache.
        await cache.set(cacheKey, taskList, 120);

        resp.render('index', { pageName: 'Task for TSM', taskList: taskList, });

    } catch (error) {
        resp.render('index', { pageName: 'Task for TSM', taskList: [], error: error.message });
    }
}
// get Specific id's details.
async function getTaskDetails(req, resp) {

    try {
        const ID = req.params.id;
        const cacheKey = `tasks_${ID}`;

        const cached = await cache.get(cacheKey);
        if (cached) {
            return resp.render('addtask', { pageName: 'Edit Task for TSM', task: cached, token: 'token' });
        }
        // if no cache Found
        const result = await Tasks.findByPk(ID);
        if (!result) return resp.send('NO Record Found');

        // store cache
        await cache.set(cacheKey, result, 120);
        resp.render('addtask', { pageName: 'Edit Task for TSM', task: result, token: 'token' });



    } catch (error) {
        resp.send(error.message);
    }
}

async function saveTask(req, resp) {
    try {
        const AddTaskData = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            priority: req.body.priority,
            due_date: req.body.due_date || null,
            assignTo: req.body.assignTo || null,
            createBy: req.user.email,
        }
        await Tasks.create(AddTaskData);
        // Delete all old cached 
        await cache.invalidateByPrefix('tasks_');

        resp.redirect('/api');
    } catch (error) {
        resp.render('addtask', {
            pageName: 'Add Task for TSM',
            token: 'token',
            task: req.body,
            error: error.message
        });
    }
}

async function updateTask(req, resp) {
    try {
        const ID = req.params.id;
        const updateData = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            priority: req.body.priority,
            due_date: req.body.due_date,
            assignTo: req.body.assignTo,
        };
        if (req.file) {
            updateData.attachments = req.file.filename;
        }
        await Tasks.update(updateData, { where: { id: ID } });

        await cache.invalidate(`tasks_${ID}`);
        await cache.invalidateByPrefix(`tasks_`);

        resp.redirect('/api')

    } catch (error) {
        resp.render('addtask', {
            pageName: 'Edit Task for TSM',
            token: 'token',
            task: { ...req.body, id: ID },
            error: error.message
        });
    }
}

async function deleteTaskDetail(req, resp) {
    try {
        const ID = req.params.id;
        await Tasks.destroy({ where: { id: ID } });
        await cache.invalidate(`tasks_${ID}`);
        await cache.invalidateByPrefix(`tasks_`);
        resp.redirect('/api/');

    } catch (error) {
        resp.send("Somthing went wrong");
    }
}

async function uploadAttachment(req,resp) {
    try {
        const ID = req.params.id;
        const task = await Tasks.findByPk(ID);
        if(!task) return resp.status(404).json({success: false, message:'task not found'});
        if(!req.file) return resp.status(400).json({
            success:'false',
            message:'no file uplaoded'
        });
        await Tasks.update(
            { attachments : 'uploads/' + req.file.filename},
            { where :  {id : ID} }
        ); 

        await cache.invalidate(`tasks_${ID}`);
        await cache.invalidateByPrefix('tasks_');
        resp.redirect('/api/tasks/'+ ID);
    } catch (error) {
        resp.status(500).json({
            success:false,
            message:error.message
        });
    }
}

module.exports = {
    getAllTask, addeditTask, getTaskDetails, saveTask, updateTask, deleteTaskDetail, uploadAttachment
};














