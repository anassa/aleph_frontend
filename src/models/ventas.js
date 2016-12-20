import can from 'can';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import 'can/map/define/define';
import feathers from 'aleph-frontend/feathers';

import Clientes from 'aleph-frontend/models/clientes';

export const Ventas = can.Map.extend(
	{
		define:
		{
			articulos:
			{
				value: can.List
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
					return	this.attr('articulos').serialize()
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
					this.attr(
						'formaPago'
					,	(value)
						?	{
								codigo:		value.split('-')[0]
							,	nombre:		value.split('-')[1]
							,	interes:	0
							,	cuotas:		1
							}
						:	undefined
					)
					return value;
				}
			,	get: function()
				{
					return	this.attr('formaPago')
							?	this.attr('formaPago.codigo')+'-'+this.attr('formaPago.nombre')
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
					this.attr(
						'formaPago.tarjeta'
					,	(value != -1)
						?	{
								_id:		value.split('-')[0]
							,	compania:	value.split('-')[1]
							,	banco:		value.split('-')[2]
							}
						:	undefined
					)
					return value;
				}
			,	get: function()
				{
					return	this.attr('formaPago.tarjeta')
							?	this.attr('formaPago.tarjeta._id')+'-'+this.attr('formaPago.tarjeta.compania')+'-'+this.attr('formaPago.tarjeta.banco')
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
		,	clienteToFind:
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
								self.attr('cliente',clientes.attr(0))
							}
						)

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
								self.attr('formaPago.cliente',clientes.attr(0))
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
					return	this.attr('articulos')
							?	(
									this.attr('articulos').attr()
										.reduce(
											function(a, b)
											{
												return a + (b.precioVenta || 0)*b.cantidad;
											}
										,	0
										)
									*
									( 1 - ( ((this.attr('descuento') < 0) ? 0 : (this.attr('descuento') > 100) ? 100 : this.attr('descuento')) / 100 ) )
									*
									(1 + ( this.attr('formaPago.interes') ? ((this.attr('formaPago.interes') < 0) ? 0 : (this.attr('formaPago.interes') / 100)) : 0) )
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
					return this.attr('total').toFixed(2);	
				}
			,	serialize: function()
				{
					return undefined;	
				}
			}
		}
	}
);

Ventas.List = can.List.extend({
  Map: Ventas
}, {});

export const ventasConnection
=	superMap(
		{
			url:	feathers.rest('ventas')
		,	idProp:	'_id'
		,	Map:	Ventas
		,	List:	Ventas.List
		,	name:	'ventas'
		}
	);

feathers.io.on('ventas created', ventas => ventasConnection.createInstance(ventas));
feathers.io.on('ventas updated', ventas => ventasConnection.updateInstance(ventas));
feathers.io.on('ventas patched', ventas => ventasConnection.updateInstance(ventas));
feathers.io.on('ventas removed', ventas => ventasConnection.destroyInstance(ventas));


tag('ventas-model', ventasConnection);

export default Ventas;
