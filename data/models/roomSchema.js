const mongoose = require('mongoose')


const roomSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    messages: { type: Object },
    users: { type: Object }
})

module.exports = mongoose.model('rooms', roomSchema)