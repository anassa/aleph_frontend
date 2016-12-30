import Map from 'can-define/map/map';
import List from 'can-define/list/list';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import feathers from 'aleph-frontend/feathers';

import Clientes from 'aleph-frontend/models/clientes';
import Articulos from 'aleph-frontend/models/articulosVenta';

export const Ventas = Map.extend(
	{
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

Ventas.List = List.extend({
  '#': Ventas
});

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
