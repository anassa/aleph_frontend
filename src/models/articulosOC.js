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

//	app models
import UnidadesDeMedida from 'aleph-frontend/models/unidadesDeMedida';
import Usuarios from 'aleph-frontend/models/usuarios';

// Use feathersClient.service(url) to create a service
const articulosService = feathers.service('/api/articulos');

export const Articulos = Map.extend(
	{
		seal: false
	}
,	{
		padedCodigo:
		{
			get: function(value)
			{
				return	this.codigo
						?	pad(this.codigo,4)
						:	value;
			}
		}
	,	cantidad:
		{
			value: 1
		,	type: Number
		}
	,	alarma$:
		{
			get: function()
			{
				return	this.stock <= this.minimo
						?	'Min'
						:	this.stock >= this.maximo
							?	'Max'
							:	undefined	
			}
		,	serialize: function()
			{
				return undefined;	
			}
		}
	,	precioCosto:
		{
			value: 0
		,	type:	Number
		}
	,	precioCosto$:
		{
			value: 0
		,	type:	Number
		,	get: function()
			{
				return this.precioCosto.toFixed(2);	
			}
		}
	,	visible:
		{
			value: true
		,	serialize: function()
			{
				return undefined;
			}
		}
	}
);

Articulos.List = List.extend(
	{
		'#': Articulos
	}
);

Articulos.algebra = new set.Algebra(
	set.comparators.id('_id')
);

Articulos.connection = connect(
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
	,	Map:	Articulos
	,	List:	Articulos.List
	,	name:	'articulos'
	,	feathersService: articulosService
	,	algebra: Articulos.algebra
	}
);

tag('articulos-model', Articulos.connection);

export default Articulos;