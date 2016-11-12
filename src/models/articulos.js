import can from 'can';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import 'can/map/define/define';
import feathers from 'aleph-frontend/feathers';

export const Articulos = can.Map.extend({
  define: {}
});

Articulos.List = can.List.extend({
  Map: Articulos
}, {});

export const articulosConnection
=	superMap(
		{
			url:	feathers.rest('articulos')
		,	idProp:	'_id'
		,	Map:	Articulos
		,	List:	Articulos.List
		,	name:	'articulos'
		}
	);

feathers.io.on('articulos created', articulos => articulosConnection.createInstance(articulos));
feathers.io.on('articulos updated', articulos => articulosConnection.updateInstance(articulos));
feathers.io.on('articulos patched', articulos => articulosConnection.updateInstance(articulos));
feathers.io.on('articulos removed', articulos => articulosConnection.destroyInstance(articulos));

tag('articulos-model', articulosConnection);

export default Articulos;
