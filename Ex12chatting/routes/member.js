const express = require('express');
const router = express.Router();
const Member = require('../models/member')


router.post('/login', async (req, res, next) => {
    try {
        const { id, pw } = req.body;

        
        const member = await Member.findOne({
            where : {id : id, pw : pw},
            attributes : ['id', 'pw', 'nick'] 
        });

        req.session.member = member // 세션 값 저장

        req.session.save(function () {
        if (member) {
            res.redirect('/rooms')
        } else {
            res.redirect('/')
        }
    })
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;