import Map from 'can-define/map/map';
import List from 'can-define/list/list';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import feathers from 'aleph-frontend/feathers';

export const Usuarios
=	Map.extend(
		{
			login: function(username,password)
			{
				return	feathers.authenticate(
							{
								strategy:	'local'
							,	username:	username
							,	password:	password
							}
						).then(
							function(result)
							{
								feathers.storage.setItem('user',JSON.stringify(result.data))
							}
						);
			}
		,	logout: function()
			{
				return	feathers.logout()
							.then(
								function()
								{
									feathers.storage.clear()
								}
							);
			}
		,	getSession: function()
			{
				return	feathers.getSession()
						?	new Usuarios(JSON.parse(feathers.storage.getItem('user')))
						:	false
			}
		}
	,	{}
	);

Usuarios.List = List.extend({
  '#': Usuarios
});

export const usuariosConnection
=	superMap(
		{
			url:	feathers.rest('usuarios')
		,	idProp:	'_id'
		,	Map:	Usuarios
		,	List:	Usuarios.List
		,	name:	'usuarios'
		}
	);

feathers.io.on('usuarios created', usuarios => usuariosConnection.createInstance(usuarios));
feathers.io.on('usuarios updated', usuarios => usuariosConnection.updateInstance(usuarios));
feathers.io.on('usuarios patched', usuarios => usuariosConnection.updateInstance(usuarios));
feathers.io.on('usuarios removed', usuarios => usuariosConnection.destroyInstance(usuarios));


tag('usuarios-model', usuariosConnection);

export default Usuarios;
