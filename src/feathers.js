import Feathers from 'can-connect-feathers';
 
const feathers = new Feathers({
	// The current server is assumed to be the API server. 
	url: 'http://localhost:3030',
	// Determines if the token is persisted to the `storage` provider. 
	//storeToken: true,
	// The storage engine used to persist the token on the client. 
	//storage: cookieStorage,
	// The key name of the location where the token will be stored. 
	//tokenLocation: 'ssr-cookie',
	// The default `idProp` for all services. 
	idProp: '_id',
	// The endpoint for token authentication. 
	//tokenEndpoint: 'auth/token',
	// The endpoint for username/password authentication. 
	//localEndpoint: 'auth/local',
	// Store the token in a cookie for SSR by default. 
	//ssr: true
});
 
export default feathers;