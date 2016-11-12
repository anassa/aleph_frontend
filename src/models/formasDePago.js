import can from 'can';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import 'can/map/define/define';
import feathers from 'aleph-frontend/feathers';

export const FormasDePago = can.Map.extend({
  define: {}
});

FormasDePago.List = can.List.extend({
  Map: FormasDePago
}, {});

export const formasDePagoConnection
=	superMap(
		{
			url:	feathers.rest('formasDePago')
		,	idProp:	'_id'
		,	Map:	FormasDePago
		,	List:	FormasDePago.List
		,	name:	'formasDePago'
		}
	);

feathers.io.on('formasDePago created', formasDePago => formasDePagoConnection.createInstance(formasDePago));
feathers.io.on('formasDePago updated', formasDePago => formasDePagoConnection.updateInstance(formasDePago));
feathers.io.on('formasDePago patched', formasDePago => formasDePagoConnection.updateInstance(formasDePago));
feathers.io.on('formasDePago removed', formasDePago => formasDePagoConnection.destroyInstance(formasDePago));


tag('formasDePago-model', formasDePagoConnection);

export default FormasDePago;
