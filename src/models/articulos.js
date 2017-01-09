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
		unidadDeMedidaToParse:
		{
			set: function(value)
			{
				this.unidadMedida
				=	(value != -1)
					?	{
							_id:	value.split('-')[0]
						,	nombre:	value.split('-')[1]
						}
					:	undefined
				
				return value;
			}
		,	get: function()
			{
				return	this.unidadMedida
						?	this.unidadMedida._id+'-'+this.unidadMedida.nombre
						:	-1
			}
		,	serialize: function()
			{
				return undefined;
			}
		}
	,	proveedores:
		{
			value: List
		,	set: function(l)
			{
				l.map(
					function(p, i)
					{
						p.attr(
							'visible'
						,	(i >= 0 && i <= 4)
						);
					}
				)
				return l;
			}
		,	serialize: function(list)
			{
				return	list.map(
							function(i)
							{
								return	{
											_id:			i._id
										,	denominacion:	i.denominacion
										,	dni_cuit:		i.dni_cuit
										}
							}
						).get()
			}
		}
	,	stock:
		{
			set: function(value)
			{
				this.tempStock = value;
				return value;
			}
		}
	,	tempStock:
		{
			serialize: function()
			{
				return undefined;
			}
		}
	,	ajuste:
		{
			set: function(value)
			{
				this.stock
				=	value || this.tempStock;
				
				return value;
			}
		,	serialize: function()
			{
				return undefined;
			}
		}
	,	padedCodigo:
		{
			get: function(value)
			{
				return	this.codigo
						?	pad(this.codigo,4)
						:	value;
			}
		}
	,	precioVenta:
		{
			value: 0
		,	type:	Number
		}
	,	precioVenta$:
		{
			value: 0
		,	type:	Number
		,	get: function()
			{
				return this.precioVenta.toFixed(2);	
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
	,	init: function ()
		{
			// El remito se inicializa con el usuario actual
			this.usuario
			=	{
					_id:		feathers.get('usuario')._id
				,	username:	feathers.get('usuario').username
				,	permisos:	feathers.get('usuario').permisos
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