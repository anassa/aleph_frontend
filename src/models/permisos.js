import can from 'can';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import 'can/map/define/define';

export const Permisos = can.Map.extend({
  define: {}
});

Permisos.List = can.List.extend({
  Map: Permisos
}, {});

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
