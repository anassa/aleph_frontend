import can from 'can';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import 'can/map/define/define';

export const UnidadesDeMedida = can.Map.extend({
  define: {}
});

UnidadesDeMedida.List = can.List.extend({
  Map: UnidadesDeMedida
}, {});

export const unidadesDeMedidaConnection
=	superMap(
		{
			url:	feathers.rest('unidadesDeMedida')
		,	idProp:	'_id'
		,	Map:	UnidadesDeMedida
		,	List:	UnidadesDeMedida.List
		,	name:	'unidadesDeMedida'
		}
	);

feathers.io.on('unidadesDeMedida created', unidadesDeMedida => unidadesDeMedidaConnection.createInstance(unidadesDeMedida));
feathers.io.on('unidadesDeMedida updated', unidadesDeMedida => unidadesDeMedidaConnection.updateInstance(unidadesDeMedida));
feathers.io.on('unidadesDeMedida patched', unidadesDeMedida => unidadesDeMedidaConnection.updateInstance(unidadesDeMedida));
feathers.io.on('unidadesDeMedida removed', unidadesDeMedida => unidadesDeMedidaConnection.destroyInstance(unidadesDeMedida));

tag('unidadesDeMedida-model', unidadesDeMedidaConnection);

export default UnidadesDeMedida;
