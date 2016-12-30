import Map from 'can-define/map/map';
import List from 'can-define/list/list';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import feathers from 'aleph-frontend/feathers';

import Usuarios from 'aleph-frontend/models/usuarios';

export const Remitos = Map.extend(
	{
	  	init: function (){
			// El remito se inicializa con el usuario actual
			var	currentUser = Usuarios.getSession();
			this.attr(
				'usuario', {
						_id:		currentUser.attr('_id')
					,	username: 	currentUser.attr('username')
					,	permisos:	currentUser.attr('permisos')
				}
			);
	}
});

Remitos.List = List.extend({
  '#': Remitos
});

export const remitosConnection
=	superMap(
		{
			url:	feathers.rest('remitos')
		,	idProp:	'_id'
		,	Map:	Remitos
		,	List:	Remitos.List
		,	name:	'remitos'
		}
	);

feathers.io.on('remitos created', remitos => remitosConnection.createInstance(remitos));
feathers.io.on('remitos updated', remitos => remitosConnection.updateInstance(remitos));
feathers.io.on('remitos patched', remitos => remitosConnection.updateInstance(remitos));
feathers.io.on('remitos removed', remitos => remitosConnection.destroyInstance(remitos));


tag('remitos-model', remitosConnection);

export default Remitos;
