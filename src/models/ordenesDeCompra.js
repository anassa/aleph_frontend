import Map from 'can-define/map/map';
import List from 'can-define/list/list';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import feathers from 'aleph-frontend/feathers';

import Usuarios from 'aleph-frontend/models/usuarios';
import Articulos from 'aleph-frontend/models/articulosOC';

export const OrdenesDeCompra = Map.extend(
	{
		articulos:
		{
			value: Articulos.List
		}
	,	total:
		{
			get: function()
			{
				return	this.articulos.length
						?	(
								this.articulos.get()
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
				return	this.total
			}
		}
	,	remitos:
		{
			value:	List
		}
	,	total$:
		{
			value:	0
		,	type:	Number
		,	get: function()
			{
				return this.total.toFixed(2);	
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
				return (new Date(this.createdAt)).toLocaleDateString()
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

OrdenesDeCompra.List = List.extend({
	'#': OrdenesDeCompra
});

export const ordenesDeCompraConnection
=	superMap(
		{
			url:	feathers.rest('ordenesDeCompra')
		,	idProp:	'_id'
		,	Map:	OrdenesDeCompra
		,	List:	OrdenesDeCompra.List
		,	name:	'ordenesDeCompra'
		}
	);

feathers.io.on('ordenesDeCompra created', ordenesDeCompra => ordenesDeCompraConnection.createInstance(ordenesDeCompra));
feathers.io.on('ordenesDeCompra updated', ordenesDeCompra => ordenesDeCompraConnection.updateInstance(ordenesDeCompra));
feathers.io.on('ordenesDeCompra patched', ordenesDeCompra => ordenesDeCompraConnection.updateInstance(ordenesDeCompra));
feathers.io.on('ordenesDeCompra removed', ordenesDeCompra => ordenesDeCompraConnection.destroyInstance(ordenesDeCompra));


tag('ordenesDeCompra-model', ordenesDeCompraConnection);

export default OrdenesDeCompra;
