const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, { cors: { origin: "*" } })
const ejs = require('ejs')
var Cookies = require('cookies')

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => res.redirect('/landing'))
app.get('/landing/:roomid/:username', (req, res) => res.render('landing', { ri: req.params.roomid, un: req.params.username }))

keys = ['milad']

app.get('/room/:roomId/:username', (req, res) => {
	let username = req.params.username;
	if (username.length < 2 || username.match(/[^\x00-\x7F]+/gi) || username[username.length - 1] === ' ' || username[0] === ' ') res.redirect('/')
	if ((req.params.roomId) ? req.params.roomId.length !== 10 : false) return res.send("How'd you get here?")
	res.render(`room`)

})


io.on("connection", socket => {
	io.emit('message', { user: count, message: '<span><em>just joined the chat.</em></span>' })

	var room = socket.handshake.query.room;
	socket.join(room);
	io.to(room).emit('message');
	console.log('Someone just joined ' + room)


});


server.listen(5000, function () {

	console.log("Listening on port 3000")
})