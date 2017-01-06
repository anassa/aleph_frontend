import Map from 'can-define/map/map';
import List from 'can-define/list/list';
import superMap from 'can-connect/can/super-map/';

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

export default Ventas;
