import Map from 'can-define/map/map';
import List from 'can-define/list/list';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import feathers from 'aleph-frontend/feathers';

export const Solicitudes = Map.extend({});

Solicitudes.List = List.extend({
  '#': Solicitudes
});

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
