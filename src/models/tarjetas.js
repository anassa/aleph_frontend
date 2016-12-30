import Map from 'can-define/map/map';
import List from 'can-define/list/list';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import feathers from 'aleph-frontend/feathers';

export const Tarjetas = Map.extend({});

Tarjetas.List = List.extend({
  '#': Tarjetas
});

export const tarjetasConnection
=	superMap(
		{
			url:	feathers.rest('tarjetas')
		,	idProp:	'_id'
		,	Map:	Tarjetas
		,	List:	Tarjetas.List
		,	name:	'tarjetas'
		}
	);

feathers.io.on('tarjetas created', tarjetas => tarjetasConnection.createInstance(tarjetas));
feathers.io.on('tarjetas updated', tarjetas => tarjetasConnection.updateInstance(tarjetas));
feathers.io.on('tarjetas patched', tarjetas => tarjetasConnection.updateInstance(tarjetas));
feathers.io.on('tarjetas removed', tarjetas => tarjetasConnection.destroyInstance(tarjetas));

tag('tarjetas-model', tarjetasConnection);

export default Tarjetas;
