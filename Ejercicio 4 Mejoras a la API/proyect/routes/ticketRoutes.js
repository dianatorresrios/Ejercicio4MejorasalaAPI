const express = require('express');
const router = express.Router();
const { createTicket, updateTicket } = require('../controllers/ticketController');

router.post('/ticket', createTicket);
router.put('/ticket/:ticketId', updateTicket);

module.exports = router;
