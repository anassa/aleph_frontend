import connect from 'can-connect';
import Map from 'can-define/map/map';
import List from 'can-define/list/list';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import set from "can-set";
import feathers from 'aleph-frontend/feathers';

//	service related
import feathersServiceBehavior from 'can-connect-feathers/service';
import dataParse from 'can-connect/data/parse/';
import realtime from 'can-connect/real-time/';
import construct from 'can-connect/constructor/';
import constructStore from 'can-connect/constructor/store/';
import constructOnce from 'can-connect/constructor/callbacks-once/';
import canMap from 'can-connect/can/map/';
import canRef from 'can-connect/can/ref/';
import dataCallbacks from 'can-connect/data/callbacks/';

// Use feathersClient.service(url) to create a service
const usuariosService = feathers.service('/api/usuarios');

export const Usuarios = Map.extend(
	{
		seal: false
	,	login: function(username,password)
		{
			//	auth user
			return	feathers.authenticate(
						{
							strategy:	'local'
						,	username:	username
						,	password:	password
						}
					).then(
						function(response)
						{
							//	auth ok, get token
							return feathers.passport.verifyJWT(response.accessToken);
						}
					).then(
						function(payload)
						{
							// token ready, get user
							return	Usuarios.get(payload.usuarioId);
						}
					).then(
						function(user)
						{
							// user ready, set session
							feathers.set('usuario', user);
						}
					)
		}
	,	logout: function()
		{
			return	feathers.logout()
		}
	,	getSession: function()
		{
			return	feathers.authenticate()
						.then(
							function(response)
							{
								//	auth ok, get token
								return feathers.passport.verifyJWT(response.accessToken);
							}
						).then(
							function(payload)
							{
								// token ready, get user
								return	Usuarios.get(payload.usuarioId);
							}
						).then(
							function(user)
							{
								// user ready, set session
								feathers.set('usuario', user);
							}
						);
		}
	}
,	{

	}
);

Usuarios.List = List.extend(
	{
		'#': Usuarios
	}
);

Usuarios.algebra = new set.Algebra(
	set.comparators.id('_id')
);

Usuarios.connection = connect(
	[
		feathersServiceBehavior
	,	dataParse
	,	construct
	,	constructStore
	,	constructOnce
	,	canMap
	,	canRef
	,	dataCallbacks
	,	realtime
	]
,	{
		idProp:	'_id'
	,	Map:	Usuarios
	,	List:	Usuarios.List
	,	name:	'usuarios'
	,	feathersService: usuariosService
	,	algebra: Usuarios.algebra
	}
);

tag('usuarios-model', Usuarios.connection);

window.Usuarios = Usuarios

export default Usuarios;
