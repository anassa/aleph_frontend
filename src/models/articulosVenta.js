import Map from 'can-define/map/map';
import List from 'can-define/list/list';
import superMap from 'can-connect/can/super-map/';

import UnidadesDeMedida from 'aleph-frontend/models/unidadesDeMedida';
import Usuarios from 'aleph-frontend/models/usuarios';

import 'aleph-frontend/util/func';

export const Articulos = Map.extend(
	{
		cantidad:
		{
			value:	1
		,	type:	Number
		}
	,	unidadDeMedidaToParse:
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
										,	etiquetas:		i.etiquetas
										}
							}
						).get()
			}
		}
	,	stock:
		{
			set: function(value)
			{
				this.tempStock = value
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
				=	value || this.tempStock
				
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
			var	currentUser
			=	Usuarios.getSession();

			this.usuario
			=	{
					_id:		currentUser._id
				,	username: 	currentUser.username
				,	permisos:	currentUser.permisos
				};
		}
	}
);

Articulos.List = List.extend({
  '#': Articulos
});

export default Articulos;