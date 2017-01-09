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
const ventasService = feathers.service('/api/ventas');

import Clientes from 'aleph-frontend/models/clientes';

export const Ventas = Map.extend(
	{
		seal: false
	}
,	{
		fecha:
		{
			value:	''
		,	type:	String
		,	get: function()
			{
				return new Date(this.createdAt).toLocaleDateString()
			}
		}
	,	articulos:
		{
			set: function(s)
			{
				return	new Articulos.List(s.get());
			}
		}
	,	listadoArticulos:
		{
			get: function()
			{
				var text
				=	this.articulos
						.map(
							function(a)
							{
								return a.cantidad+' '+a.nombre
							}
						).join(', ');

				return (text.length > 60) ? text.substring(0,60)+'...' : text;
			}
		}
	,	clientes:
		{
			type: Clientes
		}
	,	descuento:
		{
			value:	0	
		,	type:	Number
		}
	,	total:
		{
			value: 0
		,	type: Number
		}
	,	total$:
		{
			value:	0
		,	type:	Number
		,	get: function()
			{
				return this.total.toFixed(2);	
			}
		}
	}
);

Ventas.List = List.extend(
	{
		'#': Ventas
	}
);

Ventas.algebra = new set.Algebra(
	set.comparators.id('_id')
);

Ventas.connection = connect(
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
	,	Map:	Ventas
	,	List:	Ventas.List
	,	name:	'Ventas'
	,	feathersService: ventasService
	,	algebra: Ventas.algebra
	}
);


tag('ventas-model', Ventas.connection);

export default Ventas;