import socketIo from 'socket.io-client'

const socket = socketIo('https://backend-tfsk.onrender.com/', { transports: ['websocket'] });

export default socket;
