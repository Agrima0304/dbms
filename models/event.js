const mongoose = require('mongoose')


//{ "_id": { "$oid": "627a90b737af5bc351ccef37" }, "SiNo.": { "$numberInt": "1" }, "Branch": "Petroleum Engineering", "Year": "2016", "EventDiscription": "A webinar on Renewable resources and reservoir" }


const eventSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    branch: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
})

const Events = mongoose.model('Events', eventSchema)

module.exports = Events