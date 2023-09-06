const Ticket = require('../models/Ticket');
const Article = require('../models/Article');

const tickets = {};

function createTicket(req, res) {
    const data = req.body;
    const ticket = new Ticket(Object.keys(tickets).length + 1);
    for (const item of data.items) {
        const article = item.article;
        const quantity = item.quantity;
        if (article.stock >= quantity) {
            article.stock -= quantity;
            ticket.addArticle(article, quantity);
        } else {
            return res.status(400).json({ error: "Not enough stock for one or more items" });
        }
    }
    const { subtotal, total } = ticket.calculateTotal();
    tickets[ticket.id] = { id: ticket.id, subtotal, total };
    return res.status(201).json(tickets[ticket.id]);
}

function updateTicket(req, res) {
    const ticketId = parseInt(req.params.ticketId);
    const data = req.body;
    if (!tickets[ticketId]) {
        return res.status(404).json({ error: "Ticket not found" });
    }
    const ticket = new Ticket(ticketId);
    for (const item of data.items) {
        const article = item.article;
        const quantity = item.quantity;
        if (article.stock >= quantity) {
            article.stock -= quantity;
            ticket.addArticle(article, quantity);
        } else {
            return res.status(400).json({ error: "Not enough stock for one or more items" });
        }
    }
    const { subtotal, total } = ticket.calculateTotal();
    tickets[ticket.id] = { id: ticket.id, subtotal, total };
    return res.status(200).json(tickets[ticket.id]);
}

module.exports = { createTicket, updateTicket };
