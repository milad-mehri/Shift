const mongoose = require('mongoose')


const roomSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    messages: {
        type: Object,
        required: true,
        default: {}
    },
    users: {
        type: Object,
        required: true,
        default: {}
    }
})

module.exports = mongoose.model('rooms', roomSchema)