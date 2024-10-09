const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

// Check-in
router.post('/checkin', async (req, res) => {
    try {
        const { employeeId } = req.body;
        const attendance = new Attendance({
            employee: employeeId,
            date: new Date(),
            checkIn: new Date()
        });
        await attendance.save();
        res.status(201).json(attendance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Check-out
router.put('/checkout/:id', async (req, res) => {
    try {
        const attendance = await Attendance.findById(req.params.id);
        if (!attendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }
        attendance.checkOut = new Date();
        await attendance.save();
        res.json(attendance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get attendance records for an employee
router.get('/employee/:employeeId', async (req, res) => {
    try {
        const attendanceRecords = await Attendance.find({ employee: req.params.employeeId });
        res.json(attendanceRecords);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;