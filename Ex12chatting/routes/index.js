const express = require("express");
const {Room} = require('../models');
const { Member } = require('../models');
const router = express.Router();

// 첫페이지(login.html)
router.get("/", (req, res) => {
  res.render("login");
});

// rooms.html (db에서 채팅방 데이터 불러오기)
router.get("/rooms", async(req, res,next) => {

    //room 테이블에 있는 모든 데이터 가져오기 
    //console에 출력
    try{
        const rooms = await Room.findAll() // 전부 다 가져오기
        console.log('room',rooms);
        res.render("room",{rooms:rooms});
    }catch(err){
        //err 를 다뤄줄수 있는 미들웨어 호출
        next(err)
    }


});

module.exports = router;