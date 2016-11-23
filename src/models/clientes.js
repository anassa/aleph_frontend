import can from 'can';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import 'can/map/define/define';
import feathers from 'aleph-frontend/feathers';
import 'lodash/lodash.js'

import Usuarios from 'aleph-frontend/models/usuarios';

export const Clientes = can.Map.extend(
	{},
{
  define: {}
  ,	init: function (){
		var	currentUser
		=	Usuarios.getSession();

		this.attr(
			'usuario', {
					_id:		currentUser.attr('_id')
				,	username: 	currentUser.attr('username')
				,	permisos:	currentUser.attr('permisos')
			}
		);
	}
	
});

Clientes.List = can.List.extend({
  Map: Clientes
}, {});

export const clientesConnection
=	superMap(
		{
			url:	feathers.rest('clientes')
		,	idProp:	'_id'
		,	Map:	Clientes
		,	List:	Clientes.List
		,	name:	'clientes'
		}
	);

feathers.io.on('clientes created', clientes => clientesConnection.createInstance(clientes));
feathers.io.on('clientes updated', clientes => clientesConnection.updateInstance(clientes));
feathers.io.on('clientes patched', clientes => clientesConnection.updateInstance(clientes));
feathers.io.on('clientes removed', clientes => clientesConnection.destroyInstance(clientes));

tag('clientes-model', clientesConnection);

export default Clientes;
