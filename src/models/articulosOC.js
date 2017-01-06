import Map from 'can-define/map/map';
import List from 'can-define/list/list';
import superMap from 'can-connect/can/super-map/';

import 'aleph-frontend/util/func';

export const Articulos = Map.extend(
	{
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

Articulos.List = List.extend({
  '#': Articulos
});

export default Articulos;