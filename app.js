const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, { cors: { origin: "*" } })
const ejs = require('ejs')
var Cookies = require('cookies')

const db = require('./data/db')
require('./data/mongo')()



app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => res.redirect('/landing'))
app.get('/landing', (req, res) => res.render('landing'))

keys = ['milad']

app.get('/room/:roomId/:username', async (req, res) => {
	req.params.roomId = req.params.roomId.toUpperCase()
	let username = req.params.username;
	if (username.length < 2 || username.match(/[^\x00-\x7F]+/gi) || username[username.length - 1] === ' ' || username[0] === ' ') res.redirect('/')
	if ((req.params.roomId) ? req.params.roomId.length !== 10 : false) return res.send("How'd you get here?")


	let room = await db.getRoom(req.params.roomId) || await db.makeRoom(req.params.roomId)

	// if(Object.keys(room.messages)[0]) {
	// 	if(Object.keys(room.messages)[0] + Date.now)
	// }

	res.render(`room`, { messages: room.messages || {}, user: username, roomId: req.params.roomId, db:db })

})


io.on("connection", socket => {




	var room = socket.handshake.query.room.toUpperCase();
	socket.join(room);
	console.log('Someone just joined ' + room)

	socket.on("message", async (data) => {
		//  data.message = data.message.replace('/</gi, '&lt;')
		await db.message(room, `messages.${Date.now().toString()}`, data)
		io.in(room).emit('message', data)
	})

});


server.listen(5000, function () {

	console.log("Listening on port 3000")
})