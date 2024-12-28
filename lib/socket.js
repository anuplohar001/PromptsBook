import socketIo from 'socket.io-client'

// const socket = socketIo('https://backend-tfsk.onrender.com/', { transports: ['websocket'] });
const socket = socketIo('http://localhost:3000/', { transports: ['websocket'] });

export default socket;
