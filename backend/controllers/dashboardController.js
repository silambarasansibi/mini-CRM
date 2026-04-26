const Lead = require('../models/Lead');
const Task = require('../models/Task');

const getDashboardStats = async (req, res) => {
    try {
        // Total Leads (excluding soft deleted)
        const totalLeadsPipeline = [
            { $match: { isDeleted: false } },
            { $count: "total" }
        ];

        // Qualified Leads (Contacted)
        const qualifiedLeadsPipeline = [
            { $match: { isDeleted: false, status: 'Contacted' } },
            { $count: "total" }
        ];

        // Tasks Due Today
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const tasksDueTodayPipeline = [
            { $match: { dueDate: { $gte: startOfDay, $lte: endOfDay }, status: 'Pending' } },
            { $count: "total" }
        ];

        // Completed Tasks
        const completedTasksPipeline = [
            { $match: { status: 'Completed' } },
            { $count: "total" }
        ];

        const [
            totalLeadsResult,
            qualifiedLeadsResult,
            tasksDueTodayResult,
            completedTasksResult
        ] = await Promise.all([
            Lead.aggregate(totalLeadsPipeline),
            Lead.aggregate(qualifiedLeadsPipeline),
            Task.aggregate(tasksDueTodayPipeline),
            Task.aggregate(completedTasksPipeline)
        ]);

        res.status(200).json({
            totalLeads: totalLeadsResult.length > 0 ? totalLeadsResult[0].total : 0,
            qualifiedLeads: qualifiedLeadsResult.length > 0 ? qualifiedLeadsResult[0].total : 0,
            tasksDueToday: tasksDueTodayResult.length > 0 ? tasksDueTodayResult[0].total : 0,
            completedTasks: completedTasksResult.length > 0 ? completedTasksResult[0].total : 0,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getDashboardStats
};
