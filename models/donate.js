const mongoose = require('mongoose')

const donateSchema = new mongoose.Schema({
    address : {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        //required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Donate = mongoose.model('Donate', donateSchema)

module.exports = Donate