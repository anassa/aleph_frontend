import can from 'can';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import 'can/map/define/define';
import feathers from 'aleph-frontend/feathers';

export const OrdenesDeCompra = can.Map.extend({
  define: {}
});

OrdenesDeCompra.List = can.List.extend({
  Map: OrdenesDeCompra
}, {});

export const ordenesDeCompraConnection
=	superMap(
		{
			url:	feathers.rest('ordenesDeCompra')
		,	idProp:	'_id'
		,	Map:	OrdenesDeCompra
		,	List:	OrdenesDeCompra.List
		,	name:	'ordenesDeCompra'
		}
	);

feathers.io.on('ordenesDeCompra created', ordenesDeCompra => ordenesDeCompraConnection.createInstance(ordenesDeCompra));
feathers.io.on('ordenesDeCompra updated', ordenesDeCompra => ordenesDeCompraConnection.updateInstance(ordenesDeCompra));
feathers.io.on('ordenesDeCompra patched', ordenesDeCompra => ordenesDeCompraConnection.updateInstance(ordenesDeCompra));
feathers.io.on('ordenesDeCompra removed', ordenesDeCompra => ordenesDeCompraConnection.destroyInstance(ordenesDeCompra));


tag('ordenesDeCompra-model', ordenesDeCompraConnection);

export default OrdenesDeCompra;
