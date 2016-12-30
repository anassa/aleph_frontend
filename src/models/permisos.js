import Map from 'can-define/map/map';
import List from 'can-define/list/list';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import feathers from 'aleph-frontend/feathers';

export const Permisos = Map.extend({});

Permisos.List = List.extend({
  '#': Permisos
});

export const permisosConnection
=	superMap(
		{
			url:	feathers.rest('permisos')
		,	idProp:	'_id'
		,	Map:	Permisos
		,	List:	Permisos.List
		,	name:	'permisos'
		}
	);

feathers.io.on('permisos created', permisos => permisosConnection.createInstance(permisos));
feathers.io.on('permisos updated', permisos => permisosConnection.updateInstance(permisos));
feathers.io.on('permisos patched', permisos => permisosConnection.updateInstance(permisos));
feathers.io.on('permisos removed', permisos => permisosConnection.destroyInstance(permisos));


tag('permisos-model', permisosConnection);

export default Permisos;
