import Map from 'can-define/map/map';
import List from 'can-define/list/list';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import feathers from 'aleph-frontend/feathers';

export const FormasDePago = Map.extend({});

FormasDePago.List = List.extend({
  '#': FormasDePago
});

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
