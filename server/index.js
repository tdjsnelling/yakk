const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(bodyParser.urlencoded({ extended: true }))

let users = {}

// socket

io.on('connection', socket => {
	const user = {
		free: true,
		socket: socket
	}

	users[socket.id] = user

	io.emit('count', Object.keys(users).length)

	socket.on('disconnect', () => {
		io.emit('userDisconnect', socket.id)

		Object.keys(users).forEach(id => {
			if (socket.id === id) {
				delete users[id]
				io.emit('count', Object.keys(users).length)
			}
		})
	})
})

// http

app.get('/list', (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*')

	let userList = []
	Object.keys(users).map(id => {
		userList.push({ id: id, free: users[id].free })
	})

	res.send(JSON.stringify(userList))
})

app.get('/discover/:initiatingUser', (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*')

	const partner = users[getRandomFreeUserId(req.params.initiatingUser)]

	if (partner) {
		partner.free = false
		users[req.params.initiatingUser].free = false

		partner.socket.emit('foundPartner', req.params.initiatingUser)

		res.send(partner.socket.id)
	}
	else {
		res.send('no-free-users')
	}
})

app.get('/makeFree/:id', (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*')

	users[req.params.id].free = true
	io.emit('userDisconnect', req.params.id)
	res.sendStatus(200)
})

app.post('/send', (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*')

	const userSocket = users[req.body.to].socket
	userSocket.send(req.body.message)

	res.sendStatus(200)
})

// helpers

const getRandomFreeUserId = (initiatingUser) => {
	const freeUsers = Object.keys(users).filter(x => {
		return users[x].free && x !== initiatingUser
	})

	if (freeUsers.length) {
		const rand = Math.floor(Math.random() * Object.keys(freeUsers).length)
		const randomUserId = freeUsers[rand]
		return randomUserId
	}
	else {
		return null
	}
}

// expose ports

server.listen(3001)
