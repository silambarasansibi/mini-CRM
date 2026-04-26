const express = require('express');
const router = express.Router();
const { createCompany, getCompanies, getCompany } = require('../controllers/companyController');
const { protect } = require('../middleware/auth');

router.route('/').post(protect, createCompany).get(protect, getCompanies);
router.route('/:id').get(protect, getCompany);

module.exports = router;
