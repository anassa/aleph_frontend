import Map from 'can-define/map/map';
import List from 'can-define/list/list';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import feathers from 'aleph-frontend/feathers';

export const Cuentas = Map.extend(
	{
		montoLimite:
		{
			value:	""
		}
	}
);

Cuentas.List = List.extend({
	'#': Cuentas
});

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
