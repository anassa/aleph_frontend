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
		articulos:
		{
			value: List
		,	serialize: function(list)
			{
				return	list.map(
							function(a)
							{
								return	{
											_id:			a._id
										,	codigo:			a.codigo
										,	nombre:			a.nombre
										,	descripcion:	a.descripcion
										,	cantidad:		a.cantidad
										,	precioVenta:	a.precioVenta
										,	precioCosto:	a.precioCosto
										}
							}
						).serialize()
			}
		}
	,	listadoArticulos:
		{
			get: function()
			{
				return	this.articulos
							.map(
								function(a)
								{
									return a.cantidad+' '+a.nombre
								}
							).join(', ')
			}
		,	serialize: function()
			{
				return undefined;
			}
		}
	,	formaDePagoToParse:
		{
			set: function(value)
			{
				this.formaPago
				=	(value)
					?	{
							codigo:		value.split('-')[0]
						,	nombre:		value.split('-')[1]
						,	interes:	0
						,	cuotas:		1
						}
					:	undefined
				
				return value;
			}
		,	get: function()
			{
				return	this.formaPago
						?	this.formaPago.codigo+'-'+this.formaPago.nombre
						:	undefined
			}
		,	serialize: function()
			{
				return undefined;
			}
		}
	,	tarjetaToParse:
		{
			set: function(value)
			{
				this.formaPago.tarjeta
				=	(value != -1)
					?	{
							_id:		value.split('-')[0]
						,	compania:	value.split('-')[1]
						,	banco:		value.split('-')[2]
						}
					:	undefined
				
				return value;
			}
		,	get: function()
			{
				return	this.formaPago.tarjeta
						?	this.formaPago.tarjeta._id+'-'+this.formaPago.tarjeta.compania+'-'+this.formaPago.tarjeta.banco
						:	-1
			}
		,	serialize: function()
			{
				return undefined;
			}
		}
	,	nombreCliente:
		{
			serialize: function()
			{
				return undefined;
			}
		}
	,	cliente: Clientes
	,	clienteToFind:
		{
			set: function(dni_cliente)
			{
				var self
				=	this;

				if (dni_cliente.length) {

					Clientes
						.getList(
							{
								dni: dni_cliente
							}
						).then(
							function(clientes)
							{
								self.cliente = clientes.get(0);
							}
						);

				} else {

					self.cliente = undefined;
				
				}


				return dni_cliente;
			}
		}
	,	cuentaClienteToFind:
		{
			set: function(dni_cliente)
			{
				var self
				=	this;

				Clientes
					.getList(
						{
							dni: dni_cliente
						}
					).then(
						function(clientes)
						{
							self.formaPago.cliente = clientes.get(0);
						}
					)

				return dni_cliente;
			}
		,	serialize: function()
			{
				return undefined;	
			}
		}
	,	descuento:
		{
			value:	0
		,	type:	Number
		}
	,	total:
		{
			value:	0
		,	type:	Number
		,	get: function()
			{
				return	this.articulos.length
						?	(
								this.articulos.get()
									.reduce(
										function(a, b)
										{
											return a + (b.precioVenta || 0)*b.cantidad;
										}
									,	0
									)
								*
								( 1 - ( ((this.descuento < 0) ? 0 : (this.descuento > 100) ? 100 : this.descuento) / 100 ) )
								*
								(1 + ( this.formaPago.interes ? ((this.formaPago.interes < 0) ? 0 : (this.formaPago.interes / 100)) : 0) )
							)
						:	0
			}
		,	serialize: function(v)
			{
				return	v;
			}
		}
	,	total$:
		{
			value:	0
		,	type:	Number
		,	get: function()
			{
				return this.total.toFixed(2);	
			}
		,	serialize: function()
			{
				return undefined;	
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
