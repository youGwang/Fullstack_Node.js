const express = require('express')
const db_config = require('../config/database')
const router = express.Router()

//mysql DB 사용
const conn = db_config.init()
db_config.connect(conn)

router.post('/login', (req, res) => {
    console.log(req.body.AndMember);
    let {id, pw} = JSON.parse(req.body.AndMember)

    let sql = 'select * from andmember where id = ? and pw = ? '

    conn.query(sql, [id, pw], function(err, rows, fields) {
        if (err) { // 오류 발생
            console.log(err);
            res.send('Fail')
        } else {
            console.log(rows); // rows 형태 먼저 확인
            if (rows[0]) {
                res.send(rows)
            } else {
                res.send('Fail')
            }
        }
    })
})


module.exports = router