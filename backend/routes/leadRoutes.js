const express = require('express');
const router = express.Router();
const { createLead, getLeads, updateLead, deleteLead } = require('../controllers/leadController');
const { protect } = require('../middleware/auth');

router.route('/').post(protect, createLead).get(protect, getLeads);
router.route('/:id').put(protect, updateLead).delete(protect, deleteLead);

module.exports = router;
