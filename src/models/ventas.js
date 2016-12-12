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
								function(i)
								{
									return	{
												_id:			i._id
											,	codigo:			i.codigo
											,	nombre:			i.nombre
											,	descripcion:	i.descripcion
											}
								}
							).serialize()
				}
			,	set: function(articulos)
				{
					var	self
					=	this;

					articulos
						.bind(
							'change'
						,	function()
							{
								self.attr(
									'total'
								,	articulos.attr()
										.reduce(
											function(a, b)
											{
												return a + (b.precioVenta || 0);
											}
										,	0
										)
								)
							}
						);
					
					return articulos;
				}
			}
		,	formaDePagoToParse:
			{
				set: function(value)
				{
					this.attr(
						'formaPago'
					,	(value != -1)
						?	{
								codigo:	value.split('-')[0]
							,	nombre:	value.split('-')[1]
							}
						:	undefined
					)
					return value;
				}
			,	get: function()
				{
					return	this.attr('formaPago')
							?	this.attr('formaPago.codigo')+'-'+this.attr('formaPago.nombre')
							:	-1
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
								_id:	value.split('-')[0]
							,	nombre:	value.split('-')[1]
							}
						:	undefined
					)
					return value;
				}
			,	get: function()
				{
					return	this.attr('formaPago.tarjeta')
							?	this.attr('formaPago.tarjeta._id')+'-'+this.attr('formaPago.tarjeta.nombre')
							:	-1
				}
			,	serialize: function()
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
			}
		,	total$:
			{
				value:	0
			,	type:	Number
			,	get: function()
				{
					return (this.attr('total')*(1-(this.attr('descuento')/100))).toFixed(2);	
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
