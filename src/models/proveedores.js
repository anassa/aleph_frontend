import can from 'can';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import 'can/map/define/define';
import feathers from 'aleph-frontend/feathers';

export const Proveedores = can.Map.extend({
  define: {}
});

Proveedores.List = can.List.extend({
  Map: Proveedores
}, {});

export const proveedoresConnection
=	superMap(
		{
			url:	feathers.rest('proveedores')
		,	idProp:	'_id'
		,	Map:	Proveedores
		,	List:	Proveedores.List
		,	name:	'proveedores'
		}
	);

feathers.io.on('proveedores created', proveedores => proveedoresConnection.createInstance(proveedores));
feathers.io.on('proveedores updated', proveedores => proveedoresConnection.updateInstance(proveedores));
feathers.io.on('proveedores patched', proveedores => proveedoresConnection.updateInstance(proveedores));
feathers.io.on('proveedores removed', proveedores => proveedoresConnection.destroyInstance(proveedores));


tag('proveedores-model', proveedoresConnection);

export default Proveedores;
