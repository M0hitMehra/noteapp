const express = require('express');
const router = express.Router();
const fetchUser = require("../middleware/userData")
const bcrypt = require("bcryptjs");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");


// get all notes
router.get('/fetchnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user })
        res.json(notes)

    } catch (error) {
        console.log("server Error");
        return res.status(500).json("Server Error");
    }

})

// add notes
router.post('/addnotes', fetchUser, [
    body("title", "Enter a valid title").isLength({
        min: 5,
    }),
    body("description", "description should conatain at least 5 characters").isLength({
        min: 6,
    }),
    body("tags", "tags should conatain at least 5 characters").isLength(
        { min: 3 }
    ),
], async (req, res) => {


    try {
        let { title, tags, description } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const notes = await Notes({
            title, description, tags, user: req.user
        })

        const savedNotes = await notes.save();

        res.send(savedNotes);
    } catch (error) {
        console.log("server Error");
        return res.status(500).json("Server Error");
    }
})


// Update notes
router.put("/updatenotes/:id", fetchUser, async (req, res) => {
    try {

        let { title, description, tags } = req.body;
        const newNote = {};
        if (title) { newNote.title = title; }
        if (description) { newNote.description = description }
        if (tags) { newNote.tags = tags }
        let notes = await Notes.findById(req.params.id);

        if (!notes) { return res.status(404).json("Can't perfrom this action"); }
        if (notes.user.toString() !== req.user) { res.status(404).json("Can't perfrom this action"); }
        console.log(notes.user.toString())
        console.log(req.user)

        notes = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ notes })
    } catch (error) {
        console.log("server Error");
        return res.status(500).json("Server Error");
    }

})

//Delete notes

router.delete("/deletenotes/:id", fetchUser, async (req, res) => {

    try {
        let notes = await Notes.findById(req.params.id);
        if (!notes) { return res.status(404).json("Can't perfrom this action 1"); }
        console.log(notes.user.toString() , " notes.user ")
        console.log(req.user + " req.user")
        console.log(notes.user.toString() === req.user)
        if (!(notes.user.toString() === req.user)) { res.status(404).json("Can't perfrom this action 2"); }
        notes = await Notes.findByIdAndDelete(req.params.id)
        res.json("deleted")

    } catch (error) {
        console.log("server Error");
        return res.status(500).json("Server Error");
    }
})


module.exports = router;