import can from 'can';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import 'can/map/define/define';
import feathers from 'aleph-frontend/feathers';

export const Alarmas = can.Map.extend({
	define: {}
});

Alarmas.List = can.List.extend({
	Map: Alarmas
}, {});

export const alarmasConnection
=	superMap(
		{
			url:	feathers.rest('alarmas')
		,	idProp:	'_id'
		,	Map:	Alarmas
		,	List:	Alarmas.List
		,	name:	'alarmas'
		}
	);

feathers.io.on('alarmas created', alarmas => alarmasConnection.createInstance(alarmas));
feathers.io.on('alarmas updated', alarmas => alarmasConnection.updateInstance(alarmas));
feathers.io.on('alarmas patched', alarmas => alarmasConnection.updateInstance(alarmas));
feathers.io.on('alarmas removed', alarmas => alarmasConnection.destroyInstance(alarmas));

tag('alarmas-model', alarmasalarmasConnection);

export default Alarmas;
