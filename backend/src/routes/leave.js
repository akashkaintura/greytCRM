const express = require('express');
const router = express.Router();
const Leave = require('../models/Leave');

// Request leave
router.post('/', async (req, res) => {
    try {
        const leave = new Leave(req.body);
        await leave.save();
        res.status(201).json(leave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all leave requests for an employee
router.get('/employee/:employeeId', async (req, res) => {
    try {
        const leaveRequests = await Leave.find({ employee: req.params.employeeId });
        res.json(leaveRequests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update leave status (for managers)
router.put('/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const leave = await Leave.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!leave) {
            return res.status(404).json({ message: 'Leave request not found' });
        }
        res.json(leave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;