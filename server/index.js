
var app = require('express')();
// var https = require('https').Server(options,app);
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 3000;
// app.get('/', function(req, res) {
//     res.send('<h1>Welcome Realtime Server</h1>');
// });
app.get('/', function(req, res){
res.sendFile(__dirname + '/index.html');
});
//在线用户
var onlineUsers = {};
//当前在线人数
var onlineCount = 0;

io.on('connection', function(socket) {
    console.log('a user connected');

    //监听新用户加入
    socket.on('login', function(obj) {
      console.log(obj);
        //将新加入用户的唯一标识当作socket的名称，后面退出的时候会用到
        socket.name = obj.userid;

        //检查在线列表，如果不在里面就加入
        if (!onlineUsers.hasOwnProperty(obj.userid)) {
            onlineUsers[obj.userid] = obj;
            //在线人数+1
            onlineCount++;
        }

        //向所有客户端广播用户加入
        io.emit('login', {
            onlineUsers: onlineUsers,
            onlineCount: onlineCount,
            user: obj,
            login: true
        });
        console.log(obj.name + '加入了聊天室');
    });

    //监听用户退出
    socket.on('disconnect', function() {
        //将退出的用户从在线列表中删除
        if (onlineUsers.hasOwnProperty(socket.name)) {
            //退出用户的信息
            var obj = {
                userid: socket.name,
                username: onlineUsers[socket.name]
            };

            //删除
            delete onlineUsers[socket.name];
            //在线人数-1
            onlineCount--;

            //向所有客户端广播用户退出
            io.emit('logout', {
                onlineUsers: onlineUsers,
                onlineCount: onlineCount,
                user: obj,
                logout: true
            });
            console.log(obj.username + '退出了聊天室');
        }
    });

    //监听用户发布聊天内容
    socket.on('changeInfo', function(obj) {
        //向所有客户端广播发布的消息
        io.emit('changeInfo', obj);
        console.log(obj.username + '更改了信息');
    });
    //监听更改信息
    socket.on('message', function(obj) {
        //向所有客户端广播发布的消息
        io.emit('message', obj);
        console.log(obj.username + '说：' + obj.msg);
    });

});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
// https.createServer(options).listen(3000, function () {
//     console.log('Https server listening on port ' + 3000);
// });
// http.createServer(options,function(req,res){
// 	res.writeHead(200);
// 	res.end('hello world\n');
// }).listen(3000,'127.0.0.1');
