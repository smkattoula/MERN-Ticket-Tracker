const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Ticket Model
const Ticket = require("../../models/Ticket");

// Route: GET api/tickets
// Description: Get all tickets
// Access: Private

router.get("/", auth, (req, res) => {
  Ticket.find({ userId: req.user.id })
    .sort({ date: -1 })
    .then((tickets) => res.json(tickets));
});

// Route: GET api/tickets
// Description: Get a single ticket
// Access: Private

router.get("/:id", auth, (req, res) => {
  Ticket.findById(req.params.id)
    .then((ticket) => res.json(ticket))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Route: POST api/tickets
// Description: Create a ticket
// Access: Private

router.post("/", auth, async (req, res) => {
  try {
    const newTicket = new Ticket({
      subject: req.body.subject,
      category: req.body.category,
      priority: req.body.priority,
      description: req.body.description,
      date: Date.parse(req.body.date),
      userId: req.user.id,
    });

    if (!newTicket) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    const savedTicket = await newTicket.save();
    res.json(savedTicket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route: UPDATE api/tickets/update/:id
// Description: Update an existing ticket
// Access: Private

router.post("/update/:id", auth, (req, res) => {
  Ticket.findById({ userId: req.user.id, _id: req.params.id })
    .then((ticket) => {
      ticket.subject = req.body.subject;
      ticket.category = req.body.category;
      ticket.priority = req.body.priority;
      ticket.description = req.body.description;
      ticket.status = req.body.status;
      ticket.date = Date.parse(req.body.date);
      ticket.userId = req.user.id;

      ticket
        .save()
        .then(() => res.json("Ticket updated!"))
        .catch((err) => res.status(400).json("Error " + err));
    })
    .catch((err) => res.status(400).json("Error " + err));
});

// Route: DELETE api/tickets/:id
// Description: Delete an existing ticket
// Access: Private

router.delete("/:id", auth, (req, res) => {
  Ticket.findById({ userId: req.user.id, _id: req.params.id })
    .then((ticket) => ticket.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
