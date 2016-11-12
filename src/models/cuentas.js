import can from 'can';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import 'can/map/define/define';
import feathers from 'aleph-frontend/feathers';

export const Cuentas = can.Map.extend({
  define: {}
});

Cuentas.List = can.List.extend({
  Map: Cuentas
}, {});

export const cuentasConnection
=	superMap(
		{
			url:	feathers.rest('cuentas')
		,	idProp:	'_id'
		,	Map:	Cuentas
		,	List:	Cuentas.List
		,	name:	'cuentas'
		}
	);

feathers.io.on('cuentas created', cuentas => cuentasConnection.createInstance(cuentas));
feathers.io.on('cuentas updated', cuentas => cuentasConnection.updateInstance(cuentas));
feathers.io.on('cuentas patched', cuentas => cuentasConnection.updateInstance(cuentas));
feathers.io.on('cuentas removed', cuentas => cuentasConnection.destroyInstance(cuentas));


tag('cuentas-model', cuentasConnection);

export default Cuentas;
