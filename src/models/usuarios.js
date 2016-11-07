import can from 'can';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import 'can/map/define/define';

export const Usuarios = can.Map.extend({
  define: {}
});

Usuarios.List = can.List.extend({
  Map: Usuarios
}, {});

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
