import can from 'can';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import 'can/map/define/define';
import feathers from 'aleph-frontend/feathers';
import 'lodash/lodash.js'

import Usuarios from 'aleph-frontend/models/usuarios';
import Articulos from 'aleph-frontend/models/articulosOC';

export const OrdenesDeCompra = can.Map.extend(
	{
		define:
		{
			articulos:
			{
				value: Articulos.List
			}
		,	total:
			{
				get: function()
				{
					return	this.attr('articulos')
							?	(
									this.attr('articulos').attr()
										.reduce(
											function(a, b)
											{
												return a + (b.precioCosto || 0)*b.cantidad;
											}
										,	0
										)
								)
							:	0
				}
			,	serialize: function()
				{
					return	this.attr('total')
				}
			}
		,	remitos:
			{
				value:	can.List
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
		,	fecha$:
			{
				get: function()
				{
					return (new Date(this.attr('createdAt'))).toLocaleDateString()
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

OrdenesDeCompra.List = can.List.extend({
	Map: OrdenesDeCompra
}, {});

export const ordenesDeCompraConnection = superMap({
	url: feathers.rest('ordenesDeCompra')
	,idProp: '_id'
	,Map: OrdenesDeCompra
	,List: OrdenesDeCompra.List
	,name: 'ordenesDeCompra'
});

feathers.io.on('ordenesDeCompra created', ordenesDeCompra => ordenesDeCompraConnection.createInstance(ordenesDeCompra));
feathers.io.on('ordenesDeCompra updated', ordenesDeCompra => ordenesDeCompraConnection.updateInstance(ordenesDeCompra));
feathers.io.on('ordenesDeCompra patched', ordenesDeCompra => ordenesDeCompraConnection.updateInstance(ordenesDeCompra));
feathers.io.on('ordenesDeCompra removed', ordenesDeCompra => ordenesDeCompraConnection.destroyInstance(ordenesDeCompra));


tag('ordenesDeCompra-model', ordenesDeCompraConnection);

export default OrdenesDeCompra;
