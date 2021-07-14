const mongoose = require('mongoose')

const { mongoUri } = require('../config.json')
console.log(mongoUri)
async function mongo() {
    await mongoose.connect(mongoUri, {

        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    console.log("Connected to mongo!")

    return mongoose
}
module.exports = mongo