const server = require('http').createServer();
const io = require('socket.io')(server, { cors: { origin: '*' } });

const PORT = '8080';
const CHAT_EVENT = 'newChatMessage';

io.on('connection', (socket) => {
  console.log('a user connected : ', socket.id);
  const { roomId } = socket.handshake.query;
  
  socket.join(roomId);

  socket.on(CHAT_EVENT, (data) => {
    io.in(roomId).emit(CHAT_EVENT, data)
  })

  socket.on('disconnect', () => {
    socket.leave(roomId);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});