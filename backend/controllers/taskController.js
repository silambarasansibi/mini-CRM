const Task = require('../models/Task');

const createTask = async (req, res) => {
    try {
        const { title, lead, assignedTo, dueDate, status } = req.body;

        if (!title || !lead || !assignedTo || !dueDate) {
            return res.status(400).json({ message: 'Title, lead, assignedTo, and dueDate are required' });
        }

        const task = await Task.create({
            title,
            lead,
            assignedTo,
            dueDate,
            status
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
            .populate('lead', 'name email')
            .populate('assignedTo', 'name email')
            .sort('dueDate');

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTaskStatus = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Only assigned user can update status
        if (task.assignedTo.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized to update this task' });
        }

        task.status = req.body.status || task.status;
        const updatedTask = await task.save();

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createTask,
    getTasks,
    updateTaskStatus
};
