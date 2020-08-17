const express = require("express");
const router = express.Router();

// Ticket Model
const Ticket = require("../../models/Ticket");

// Route: GET api/tickets
// Description: Get all tickets
// Access: Public

router.get("/", (req, res) => {
  Ticket.find()
    .sort({ date: -1 })
    .then((tickets) => res.json(tickets));
});

// Route: POST api/tickets
// Description: Create a ticket
// Access: Public

router.post("/", (req, res) => {
  const newTicket = new Ticket({
    subject: req.body.subject,
    category: req.body.category,
    priority: req.body.priority,
    description: req.body.description,
  });

  newTicket.save().then((ticket) => res.json(ticket));
});

// Route: UPDATE api/tickets/update/:id
// Description: Update an existing ticket
// Access: Public

router.post("/update/:id", (req, res) => {
  Ticket.findById(req.params.id)
    .then((ticket) => {
      ticket.subject = req.body.subject;
      ticket.category = req.body.category;
      ticket.priority = req.body.priority;
      ticket.description = req.body.description;

      ticket
        .save()
        .then(() => res.json("Ticket updated!"))
        .catch((err) => res.status(400).json("Error " + err));
    })
    .catch((err) => res.status(400).json("Error " + err));
});

// Route: DELETE api/tickets/:id
// Description: Delete an existing ticket
// Access: Public

router.delete("/:id", (req, res) => {
  Ticket.findById(req.params.id)
    .then((ticket) => ticket.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
