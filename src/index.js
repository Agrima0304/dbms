const express = require("express");
const User = require("../models/user");
const path = require('path')
const PORT = 3000 || process.env.PORT;
const hbs = require('hbs')
const App = express();
var bodyParser = require('body-parser');
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

App.post('/logging', (req, res) => {
    const data = req.body
    console.log(data)
    const user = new User(req.body)
    res.send()
})

App.post('/secure', async (req, res) => {
    const data = req.body
    const user = new User(data)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        console.log(token)
        res.status(201).render('schedule', { user, token })
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
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

App.post('/logout', async (req, res) => {
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

App.listen(PORT, () => {
    console.log('App started on 3000')
});