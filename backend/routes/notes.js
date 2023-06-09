const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");


// ROUTE-1 : Get all the notes using: GET "/api/notes/getuser". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.send(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE-2 : Add a new note using: POST "/api/notes/addnote". Login required
router.post("/addnote", fetchuser, [
    body('title', "Enter a valid title").isLength({ min: 3 }),
    body('description', "description must be atleast 5 characters").isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // If there are errors, return Bad request and the errors array
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        // Creating a new Note and sending it to database
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const saveNote = await note.save();
        res.json(saveNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE-3 : Update an exiting note using: POST "/api/notes/updatenote". Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // Create a nowNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find a note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})

// ROUTE-4 : Delete an exiting note using: DELETE "/api/notes/deletenote". Login required

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {

        // Find a note that we want to delete and delete it
        const note = await Note.findById(req.params.id);  //req.parms.id is the id of the note means the id that we send in /deletenote/:id
        //if no note found agaist this id than return error status
        if (!note) { return res.status(404).send("Not Found") };
        // Checking the user whether the user id in the found note is equal to the user.id that is deleting the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        let deletedNote = await Note.findByIdAndDelete(req.params.id);
        res.send({ "Success": "Deleted Sucessfully", deletedNote });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;