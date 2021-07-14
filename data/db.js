const cache = {}

const roomSchema = require('./models/roomSchema')

const makeRoom = async (roomId) => {
    let room = await new roomSchema({ id: roomId}).save();
    return room
}

const message = async (roomId, messageID, message) => {
    roomSchema.findOneAndUpdate({ id: roomId }, { $set: { [messageID]: message } }, function (err, docs) {
				  return docs
    })
}



const getRoom = async (roomId) => {
    const result = await roomSchema.findOne({ id: roomId })
    return result
}


module.exports = {makeRoom, message, getRoom}