const http = require('http');
const path = require('path');
const fs = require('fs');
const { Server } = require("socket.io");
const db = require('./database')



const indexHtmlFile = fs.readFileSync(path.join(__dirname, 'static', 'index.html'));
const styleFile = fs.readFileSync(path.join(__dirname, 'static', 'style.css'));
const scriptFile = fs.readFileSync(path.join(__dirname, 'static', 'script.js'));

const server = http.createServer((req,res)=> {
    // if(req.url === '/'){
    //     return res.end(indexHtmlFile);
    // }
    // res.statusCode = 404;


    // return res.end("Error 404");

    switch(req.url){
        case '/': return res.end(indexHtmlFile);
        case '/script.js': return res.end(scriptFile);
        case '/style.css': return res.end(styleFile);
    }
    res.statusCode === 404;
    return res.end('Error 404');
});

const io = new Server(server);

io.on('connection', async (socket) => {
    let messages = db.getMessages()
    console.log('a user connected. id - ' + socket.id);
    socket.on('new_message', (message) =>  {
        io.emit('message', message);
    });
    socket.on('set_nickname', (nickname) =>{
    userNickname = nickname;
});

socket.on('new_message', (message) => {
   await db.addMessage(message,1)
    io.emit('message', userNickname + ':' + message);
})

});








server.listen(3000);