const WebSocket = require('ws');

module.exports = (server) =>{
    const wss = new WebSocket.Server({server});
    wss.on('connection',(ws,req)=>{ // 웹소켓 연결
        const ip = req.headers['X-forwarded-for']|| req.connection.remoteAddress;
        console.log('유저 접속',ip);
        ws.on('message',(message)=>{ // 메세지 수신
            console.log(message);
        });
        ws.on('err',(err)=>{
            console.log(err);
        });
        ws.on('close',()=>{
            console.log('유저 연결 해제',ip);
            clearInterval(ws.interval);
        })
        ws.interval = setInterval(()=>{
            if(ws.readyState === ws.OPEN){
                ws.send('서버에서 보내는 메세지');
            }
        },3000);
    });
};
