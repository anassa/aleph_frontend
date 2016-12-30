import Map from 'can-define/map/map';
import List from 'can-define/list/list';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import feathers from 'aleph-frontend/feathers';

export const Alarmas = Map.extend({});

Alarmas.List = List.extend({
	'#': Alarmas
});

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
