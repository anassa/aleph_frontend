import can from 'can';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import 'can/map/define/define';
import feathers from 'aleph-frontend/feathers';

export const Remitos = can.Map.extend({
  define: {}
});

Remitos.List = can.List.extend({
  Map: Remitos
}, {});

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
