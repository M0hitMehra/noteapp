const mongoose = require('mongoose');
const { ref } = require('pdfkit');
const {Schema} = mongoose;

const notesSchema = mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref :"users"
    },
 
    title:{
        type:    String,
        required: true
    },
    description: {
        type:    String,
        required: true
    },
    tags : {
        type:    String,
        default: 'General'
    },
    date: {
        type: Date,
        default:Date.now
    }


})

module.exports = mongoose.model('notes',notesSchema)