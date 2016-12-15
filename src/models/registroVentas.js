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
			fecha:
			{
				value:	''
			,	type:	String
			,	get: function()
				{
					return new Date(this.attr('createdAt')).toLocaleDateString()
				}
			}
		,	articulos:
			{
				value: can.List
			}
		,	listadoArticulos:
			{
				get: function()
				{
					var text
					=	this.attr('articulos').serialize()
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
				value:	0	
			,	type:	Number
			}
		,	total$:
			{
				value:	0
			,	type:	Number
			,	get: function()
				{
					return this.attr('total').toFixed(2);	
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
