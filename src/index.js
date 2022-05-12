const express = require("express");
const User = require("../models/user");
const path = require('path')
const PORT = 3000 || process.env.PORT;
const hbs = require('hbs')
const App = express();
const auth = require("../middleware/auth")
var bodyParser = require('body-parser');
const Events = require("../models/event");
const res = require("express/lib/response");
const { render } = require("express/lib/response");
require('../db/database')
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../frontend/views')
const partialsPath = path.join(__dirname, '../frontend/partials')
App.set('view engine', 'hbs')
App.set('views', viewsPath)
hbs.registerPartials(partialsPath)
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: true }));

App.get('/', (req, res) => {
    res.render('index')
})

App.post('/logging', async (req, res) => {
    try {
        console.log(req.body)
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.render('schedule', { user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})
App.post('/adminentry', async (req, res) => {
    try {
        if (req.body.email == "agrima@gmail.com" && req.body.password == "agrima") {
            render('admin');
        }
        else {
            res.send("You are not allowed.")
        }
    } catch (error) {
        res.status(400).send()
    }
})

App.post('/admin', async (req, res) => {
    try {
        const event = new Events(req,body)
        await event.save()
        render('admin');
    } catch (error) {
        res.status(400).send()
    }
})
App.post('/secure', async (req, res) => {
    const data = req.body
    const user = new User(data)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        const events = await Events.find({})
        console.log(token)
        res.status(201).render('schedule', { user, token, events })
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

App.get('/events', async (req, res) => {
    if (req.quary == undefined) {
        const events = await Events.find({})
        try {
            res.render('schedule', { events })
        } catch (e) {
            console.log(e)
        }
    }
    else {
        const events = await Events.find({ branch: req.quary.branch })
        try {
            res.render('schedule', { events })
        } catch (e) {
            console.log(e)
        }
    }
})

App.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

App.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

App.get('/donate', async (req, res) => {
    try {
        res.render('donation')
    } catch (error) {
        res.status(500).send(error)
    }
})

App.post('/donatesecure', async (req, res) => {
    //const events = await Events.find({})
    const donate = new req.body
    try {
        res.render('schedule', { events })
    } catch (e) {
        console.log(e)
    }
})

App.listen(PORT, () => {
    console.log('App started on 3000')
});