const socketIO = require('socket.io')


                // express server
module.exports = (server,app)=>{
    //socketIO 객체 생성 
    const io = socketIO(server,{path : '/socket.io'});
    app.set('io',io);
    

    //라우팅 (-> 네임스페이스 : 경로)
    //채팅 /chat
    //실시간 알림-> /alarm
    //

    const chat = io.of('/chat') // 채팅 관련 처리 네임스페이스
    chat.on('connection',(socket)=>{

        console.log('chat 네임스페이스 접속 성공');
        //room 설정 -> 방 이름(rommid) -> 클라이언트 요청경로(request)
        const ref = socket.request.headers.referer;
        const rommId = ref.split('/')[ref.split('/').length-1]
        console.log(rommId);

        socket.join(rommId);


        socket.on('disconnection',()=>{
            console.log('chat 네임스페이스에서 접속 해제 ');
        })
        socket.on('chat',(data)=>{ // data : 채팅 관련 데이터
            // console.log('socket.js :', data);
            socket.to(data.roomId).emit(data)
        });
    });
}