const express = require('express')
const {v4:uuidv4} = require('uuid')
const fs = require('fs')
const db_config = require('../config/database')

const router = express.Router()

var conn = db_config.init()
db_config.connect(conn)


router.get('/', (req, res)=>{
    
    let sql = "select * from andboard"
    conn.query(sql, (err, rows)=>{
        if(err){
            console.log(err)
            res.send('Fail')
        }else{
            res.send(rows)
        }
    })
    
})

router.post('/write', (req, res)=>{
    
    let {title, content, writer, img} = JSON.parse(req.body.board)

    //img파일 디코딩(base64)
    let decode = Buffer.from(img, 'base64')

    const uuid =uuidv4() //-> 파일이름으로 사용(중복되지 않는 랜덤한 문자열 생성)
    //파일저장되는 기본 경로 : 프로젝트 폴더 바로 아래 (기준)
    fs.writeFileSync('public/img/board/'+uuid+'.jpg', decode)

    var sql = "insert into andboard values (null, ?,?,?,?, null)"

    conn.query(sql, [title, content, writer, uuid], (err, rows)=>{
        if(err){
            console.log(err)
            res.send('Fail')
        }else{
            res.send('Success')
        }
    })
})

router.get('/img', (req, res)=>{
    let sql = "select img from andboard where idx=4"
    conn.query(sql, (err, rows)=>{
       if(err){
          console.log(err)
          res.send('Fail')
       }else{
          console.log(rows[0].img)
          let readFile = fs.readFileSync('public/img/board/'+rows[0].img+'.jpg'); //이미지 파일 읽기
          let encode = Buffer.from(readFile).toString('base64'); //파일 인코딩
          res.send(encode)
       }
    })
 })

 
module.exports = router