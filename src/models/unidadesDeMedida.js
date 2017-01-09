import connect from 'can-connect';
import Map from 'can-define/map/map';
import List from 'can-define/list/list';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import set from "can-set";
import feathers from 'aleph-frontend/feathers';

//	service related
import feathersServiceBehavior from 'can-connect-feathers/service';
import dataParse from 'can-connect/data/parse/';
import realtime from 'can-connect/real-time/';
import construct from 'can-connect/constructor/';
import constructStore from 'can-connect/constructor/store/';
import constructOnce from 'can-connect/constructor/callbacks-once/';
import canMap from 'can-connect/can/map/';
import canRef from 'can-connect/can/ref/';
import dataCallbacks from 'can-connect/data/callbacks/';

// Use feathersClient.service(url) to create a service
const unidadesDeMedidaService = feathers.service('/api/unidadesDeMedida');

export const UnidadesDeMedida = Map.extend(
	{
		seal: false
	}
,	{}
);

UnidadesDeMedida.List = List.extend(
	{
		'#': UnidadesDeMedida
	}
);

UnidadesDeMedida.algebra = new set.Algebra(
	set.comparators.id('_id')
);

UnidadesDeMedida.connection = connect(
	[
		feathersServiceBehavior
	,	dataParse
	,	construct
	,	constructStore
	,	constructOnce
	,	canMap
	,	canRef
	,	dataCallbacks
	,	realtime
	]
,	{
		idProp:	'_id'
	,	Map:	UnidadesDeMedida
	,	List:	UnidadesDeMedida.List
	,	name:	'unidadesDeMedida'
	,	feathersService: unidadesDeMedidaService
	,	algebra: UnidadesDeMedida.algebra
	}
);

tag('unidadesDeMedida-model', UnidadesDeMedida.connection);

export default UnidadesDeMedida;