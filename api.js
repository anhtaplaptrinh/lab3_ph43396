const express = require('express')
const router = express.Router();    

module.exports = router;

router.get('/', (req, res) => {
    res.send('Vao api Moblie')
})

const uri = 'mongodb+srv://anhttph43396:1234565ATT@lab3-anhttph43396.9jz7xzv.mongodb.net/db'

const spModel = require('./sanpham')
const mongoose = require('mongoose');
const server = require('./server')

router.get('/list', async (req, res) => {
    await mongoose.connect(uri)

    let sanphams = await spModel.find();

    res.send(sanphams)
})