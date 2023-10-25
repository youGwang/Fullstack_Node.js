const express = require('express')
//라우터 생성
const router = express.Router()

//쿠키 생성
///setcookie 로 요청 들어오면 req,res 객체 생성후 body안의 내용 실행 
router.get('/setcookie', (req,res)=>{
    let nick = 'nickname1'

    //서버에서 생성(key값, value)
    res.cookie('nickname', nick ,{
        maxAge : 1000000, //만료기간 (밀리초 단위 1000ms ->1초)
        signed : true //쿠키 서명 -> 암호화 시켜주겠다는 의미 
    })
    // -> 클라이언트로 응답시 포함시켜서 응답

    res.cookie('lunch', '오마카세',{
        exprires : new Date(Date.now() + 1000*60*60*24)  //하루 후 만료
    })

    res.send('쿠키 생성')
})

//쿠키 값 확인하기
router.get('/getcookies', (req,res)=>{
    console.log(req.cookies.lunch) //서명이 안된 쿠키만 가지고 올 수 있음
    console.log(req.signedCookies.nickname) // 서명이 된 쿠키만 가지고 올 수 있음

    res.send('쿠키 확인')
})

//쿠키 삭제
router.get('/deletecookie', (req, res)=>{
    res.clearCookie('lunch')
    res.send('쿠키 삭제')
})

module.exports = router