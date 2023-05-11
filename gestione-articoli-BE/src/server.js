require('dotenv').config();

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connection = require('../data-access/dbConnection');
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
const cors = require('cors');
let corsOptions = {
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));

const BASE_PATH = '/api/gestione';
// app.options('*', cors())
// const posts = [
//     {
//         name: 'kyle',
//         age: 34
//     },
//     {
//         name: 'nick',
//         age: 21
//     },
//     {
//         name: 'MrcDbs',
//         age: 39
//     },
//     {
//         name: 'MrcDbs',
//         age: 55
//     }
// ]

app.get(BASE_PATH + '/posts', authenticateToken, async (req, res) => {
    console.log('GET POSTS METHOD ', req.body.username);
    const articoli = await connection.getArticoli()
    res.json(articoli);
    //res.json(posts.filter(p => p.name === req.body.username));
});

app.post(BASE_PATH + '/login', async (req, res) => {
    console.log('LOGIN METHOD');
    const userAuthenticated = await loginAuthentication(req, res);
    const accessToken = jwt.sign({ username: userAuthenticated.username }, process.env.ACCESS_TOKEN_SECRET);
    console.log('USER AUTHENTICATED ', userAuthenticated);
    res.json({ accessToken: accessToken, user: userAuthenticated });
});

app.get(BASE_PATH + '/getArticoli', async (req, res) => {
    try {
        let topics = await connection.getArticoli();
        res.status(200).send(topics);

    } catch {
        res.status(400).send('Somenthing went wrong')
    }
})

function authenticateToken(req, res, next) {
    console.log('MIDDLEWARE METHOD');
    const authorizationHeader = req.headers['authorization'];
    const token = authorizationHeader.split(' ')[1];
    if (token === null) return res.status(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, username) => {
        if (err) return res.status(403);
        req.body = username;
        console.log('USER DENTRO MIDDLEWARE ', username);
        next();
    })
}


async function loginAuthentication(req, res) {
    console.log('AUTH  METHOD');
    //const user = { name: 'nick' };
    const user = await connection.getUser(req.body.username);
    if (user == null || user == undefined) {
        console.log('ENTRA NEL PRIMO IF, USER IS ', user);
        return res.status(400).send('Username does not exists');
    }
    if (await bcrypt.compare(req.body.password, user.password)) {
        console.log('ENTRA IN AWAIT ', user);
        return user;
    } else {
        return res.status(401).send('Password is not correct');
    }
    //return user;
}
app.listen(2000);