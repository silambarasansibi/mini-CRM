const Lead = require('../models/Lead');

const createLead = async (req, res) => {
    try {
        const { name, email, phone, status, assignedTo, company } = req.body;

        if (!name || !email) {
            return res.status(400).json({ message: 'Name and email are required' });
        }

        const lead = await Lead.create({
            name,
            email,
            phone,
            status,
            assignedTo,
            company
        });

        res.status(201).json(lead);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getLeads = async (req, res) => {
    try {
        const { search, status, page = 1, limit = 10 } = req.query;

        const query = { isDeleted: false };
        if (status) query.status = status;
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const leads = await Lead.find(query)
            .populate('assignedTo', 'name email')
            .populate('company', 'name')
            .skip(skip)
            .limit(parseInt(limit))
            .sort('-createdAt');

        const total = await Lead.countDocuments(query);

        res.status(200).json({
            leads,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / parseInt(limit))
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateLead = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);

        if (!lead || lead.isDeleted) {
            return res.status(404).json({ message: 'Lead not found' });
        }

        const updatedLead = await Lead.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json(updatedLead);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteLead = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);

        if (!lead || lead.isDeleted) {
            return res.status(404).json({ message: 'Lead not found' });
        }

        lead.isDeleted = true;
        await lead.save();

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createLead,
    getLeads,
    updateLead,
    deleteLead
};
