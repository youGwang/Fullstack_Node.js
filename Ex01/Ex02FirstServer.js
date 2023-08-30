//http 모듈
const http = require('http')

//req(요청), res(응답) 
// 반드시 앞에는 요청객체, 뒤에는 응답 객체
http.createServer((req,res)=>{  
    //요청, 응답 로직 작성
}).listen(8888, ()=>{
    console.log('8888 포트에서 서버 연결 기다리는 중...')
})