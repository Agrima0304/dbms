const mongoose = require('mongoose')

const donateSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
        trim: true
    },
    mobile: {
        type: Number,
        required:true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    amount: {
        type: Number,
        required: true,
        //ref: 'User'
    }
}, {
    timestamps: true
})

const Donate = mongoose.model('Donate', donateSchema)

module.exports = Donate