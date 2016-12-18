import can from 'can';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import 'can/map/define/define';
import feathers from 'aleph-frontend/feathers';
import 'lodash/lodash.js'

import UnidadesDeMedida from 'aleph-frontend/models/unidadesDeMedida';
import Usuarios from 'aleph-frontend/models/usuarios';

import 'aleph-frontend/util/func';

export const Articulos = can.Map.extend(
	{}
,	{
		define:
		{
			padedCodigo:
			{
				get: function(value)
				{
					return	this.attr('codigo')
							?	pad(this.attr('codigo'),4)
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
					return	this.attr('stock') <= this.attr('minimo')
							?	'Min'
							:	this.attr('stock') >= this.attr('maximo')
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
					return this.attr('precioCosto').toFixed(2);	
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
	}
);

Articulos.List = can.List.extend({
  Map: Articulos
}, {});

export const articulosConnection
=	superMap(
		{
			url:	feathers.rest('articulos')
		,	idProp:	'_id'
		,	Map:	Articulos
		,	List:	Articulos.List
		,	name:	'articulo'
		}
	);

tag('articulos-model', articulosConnection);


feathers.io.on('articulos created', articulos => articulosConnection.createInstance(articulos));
feathers.io.on('articulos updated', articulos => articulosConnection.updateInstance(articulos));
feathers.io.on('articulos patched', articulos => articulosConnection.updateInstance(articulos));
feathers.io.on('articulos removed', articulos => articulosConnection.destroyInstance(articulos));


export default Articulos;