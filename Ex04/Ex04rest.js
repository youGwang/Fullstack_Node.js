const http = require('http')
const server = http.createServer((req,res)=>{
    //REST API->이해하기 쉽게 주소 정보를 입력하도록 한 규칙
    //전체 회원 정보 :[GET] localhost:8888/fullstack(context)/user
    //1번 회원 정보 : [GET] localhost:8888/fullstack(context)/user/1 
    //                                                      /user?unum=1

    if(req.url==='/home'){
        res.writeHead(200, {'Content-Type' : 'text/html; charset=UTF-8'})

        let data = '<html>'
        data += '<body>'
        data += '<h3>home!</h3>'
        data += '</body>'
        data += '</html>'

        res.write(data)
        res.end()
    }else if(req.url==='/plus'){
        res.writeHead(200, {'Content-Type' : 'text/html; charset=UTF-8'})

        let data = '<html>'
        data += '<body>'
        data += '<h3>PLUS!</h3>'
        data += '</body>'
        data += '</html>'

        res.write(data)
        res.end()
    }
})

server.listen(8888)
server.on('listening',()=>{
    console.log('8888포트에서 서버연결 기다리는 중 ');
})