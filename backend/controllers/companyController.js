const Company = require('../models/Company');
const Lead = require('../models/Lead');

const createCompany = async (req, res) => {
    try {
        const { name, industry, location } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Company name is required' });
        }

        const company = await Company.create({
            name,
            industry,
            location
        });

        res.status(201).json(company);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCompanies = async (req, res) => {
    try {
        const companies = await Company.find().sort('-createdAt');
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCompany = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        const leads = await Lead.find({ company: req.params.id, isDeleted: false })
            .populate('assignedTo', 'name email');

        res.status(200).json({ company, leads });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createCompany,
    getCompanies,
    getCompany
};
