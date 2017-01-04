import feathers from 'feathers-client';
import socketio from 'feathers-socketio/client';
//import io from 'socket.io-client';
import io from 'steal-socket.io';
import hooks from 'feathers-hooks';
import localStorage from 'localstorage-memory';
import auth from 'feathers-authentication-client';

const socket = io('http://localhost:3030');

const feathersClient
=	feathers()
		.configure(hooks())
		.configure(socketio(socket))
		.configure(auth({ storage: localStorage }));

window.feathers = feathersClient;

export default feathersClient;