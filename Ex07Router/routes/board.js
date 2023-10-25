const express = require('express')

const router = express.Router() //라우터 인스턴스 생성

router.get('/test', (req,res)=>{
    res.send('board 요청!')
})

module.exports = router