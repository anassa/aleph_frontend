<<<<<<< HEAD
<<<<<<< Updated upstream
=======
/*
>>>>>>> 2417f7ff501d5d91c3646b26f86d11dcffa2c0ef
import Feathers from 'can-connect-feathers';
import $ from 'can-jquery'

const feathers = new Feathers(
	{
		// The current server is assumed to be the API server. 
		url: 'http://localhost:3030'
		// Determines if the token is persisted to the `storage` provider. 
	,	storeToken: true
		// The storage engine used to persist the token on the client. 
		//storage: cookieStorage,
		// The key name of the location where the token will be stored. 
		//tokenLocation: 'ssr-cookie',
		// The default `idProp` for all services. 
	,	idProp: '_id'
		// The endpoint for token authentication. 
	,	tokenEndpoint: 'auth/token'
		// The endpoint for username/password authentication. 
	,	localEndpoint: 'auth/local'
		// Store the token in a cookie for SSR by default. 
	,	ssr: true
	,	jquery: $
	}
);

window.feathers = feathers;
 
export default feathers;
<<<<<<< HEAD
=======
import feathers from 'feathers/client';
=======
*/

import feathers from 'feathers-client';
>>>>>>> 2417f7ff501d5d91c3646b26f86d11dcffa2c0ef
import socketio from 'feathers-socketio/client';
import io from 'socket.io-client';
import hooks from 'feathers-hooks';
import localStorage from 'localstorage-memory';
import auth from 'feathers-authentication-client';

<<<<<<< HEAD
const socket = io('http://localhost:3030');
=======
const socket = io('http://localhost:3030/');
>>>>>>> 2417f7ff501d5d91c3646b26f86d11dcffa2c0ef

const feathersClient
=	feathers()
		.configure(hooks())
		.configure(socketio(socket))
		.configure(auth({ storage: localStorage }));

window.feathers = feathersClient;

<<<<<<< HEAD
export default feathersClient;
>>>>>>> Stashed changes
=======
export default feathersClient;
>>>>>>> 2417f7ff501d5d91c3646b26f86d11dcffa2c0ef
