import can from 'can';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import 'can/map/define/define';
import feathers from 'aleph-frontend/feathers';
import 'lodash/lodash.js'

import UnidadesDeMedida from 'aleph-frontend/models/unidadesDeMedida';
import Usuarios from 'aleph-frontend/models/usuarios';

export const Articulos = can.Map.extend(
	{}
,	{
		define:
		{
			unidadDeMedidaToParse:
			{
				set: function(value)
				{
					if (value)
						this.attr(
							'unidadMedida'
						,	{
								_id:	value.split('-')[0]
							,	nombre:	value.split('-')[1]
							}
						)
					return value;
				}
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
		,	name:	'articulos'
		}
	);

feathers.io.on('articulos created', articulos => connection.createInstance(articulos));
feathers.io.on('articulos updated', articulos => connection.updateInstance(articulos));
feathers.io.on('articulos patched', articulos => connection.updateInstance(articulos));
feathers.io.on('articulos removed', articulos => connection.destroyInstance(articulos));

tag('articulos-model', connection);

export default Articulos;
