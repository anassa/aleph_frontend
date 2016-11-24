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
			unidadDeMedidaToParse:
			{
				set: function(value)
				{
					this.attr(
						'unidadMedida'
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
					return	this.attr('unidadMedida')
							?	this.attr('unidadMedida._id')+'-'+this.attr('unidadMedida.nombre')
							:	-1
				}
			,	serialize: function()
				{
					return undefined;
				}
			}
		,	proveedores:
			{
				value: can.List
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
											,	etiquetas:		i.etiquetas
											}
								}
							).serialize()
				}
			}
		,	stock:
			{
				set: function(value)
				{
					this.attr('tempStock',value)
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
					this.attr(
						'stock'
					,	value || this.attr('tempStock')
					);
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
					return	this.attr('codigo')
							?	pad(this.attr('codigo'),4)
							:	value;
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
	,	init: function ()
		{
			var	currentUser
			=	Usuarios.getSession();

			this.attr(
				'usuario'
			,	{
					_id:		currentUser.attr('_id')
				,	username: 	currentUser.attr('username')
				,	permisos:	currentUser.attr('permisos')
				}
			);
		}
	}
);

Articulos.List = can.List.extend({
  Map: Articulos
}, {});

export const connection
=	superMap(
		{
			url:	feathers.rest('articulos')
		,	idProp:	'_id'
		,	Map:	Articulos
		,	List:	Articulos.List
		,	name:	'articulo'
		}
	);

tag('articulos-model', connection);

feathers.io.on(
	'articulos created'
,	function(art){
		connection.createInstance(art);
	}
);

feathers.io.on(
	'articulos updated'
,	function(art){
		connection.updateInstance(art);
		console.log(art.attr('_id'))
	}
);

feathers.io.on(
	'articulos patched'
,	function(art){
		connection.updateInstance(art);
	}
);

feathers.io.on(
	'articulos removed'
,	function(art){
		connection.destroyInstance(art);
	}
);

export default Articulos;