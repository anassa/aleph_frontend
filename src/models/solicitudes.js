import can from 'can';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import 'can/map/define/define';
import feathers from 'aleph-frontend/feathers';

export const Solicitudes = can.Map.extend({
  define: {}
});

Solicitudes.List = can.List.extend({
  Map: Solicitudes
}, {});

export const solicitudesConnection
=	superMap(
		{
			url:	feathers.rest('solicitudes')
		,	idProp:	'_id'
		,	Map:	Solicitudes
		,	List:	Solicitudes.List
		,	name:	'solicitudes'
		}
	);

feathers.io.on('solicitudes created', solicitudes => solicitudesConnection.createInstance(solicitudes));
feathers.io.on('solicitudes updated', solicitudes => solicitudesConnection.updateInstance(solicitudes));
feathers.io.on('solicitudes patched', solicitudes => solicitudesConnection.updateInstance(solicitudes));
feathers.io.on('solicitudes removed', solicitudes => solicitudesConnection.destroyInstance(solicitudes));


tag('solicitudes-model', solicitudesConnection);

export default Solicitudes;
