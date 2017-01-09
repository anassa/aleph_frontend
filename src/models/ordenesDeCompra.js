import connect from 'can-connect';
import Map from 'can-define/map/map';
import List from 'can-define/list/list';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import set from "can-set";
import feathers from 'aleph-frontend/feathers';

//	service related
import feathersServiceBehavior from 'can-connect-feathers/service';
import dataParse from 'can-connect/data/parse/';
import realtime from 'can-connect/real-time/';
import construct from 'can-connect/constructor/';
import constructStore from 'can-connect/constructor/store/';
import constructOnce from 'can-connect/constructor/callbacks-once/';
import canMap from 'can-connect/can/map/';
import canRef from 'can-connect/can/ref/';
import dataCallbacks from 'can-connect/data/callbacks/';

// Use feathersClient.service(url) to create a service
const ordenesDeCompraService = feathers.service('/api/ordenesDeCompra');

export const OrdenesDeCompra = Map.extend(
	{
		seal: false
	}
,	{
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

OrdenesDeCompra.List = List.extend(
	{
		'#': OrdenesDeCompra
	}
);

OrdenesDeCompra.algebra = new set.Algebra(
	set.comparators.id('_id')
);

OrdenesDeCompra.connection = connect(
	[
		feathersServiceBehavior
	,	dataParse
	,	construct
	,	constructStore
	,	constructOnce
	,	canMap
	,	canRef
	,	dataCallbacks
	,	realtime
	]
,	{
		idProp:	'_id'
	,	Map:	OrdenesDeCompra
	,	List:	OrdenesDeCompra.List
	,	name:	'ordenesDeCompra'
	,	feathersService: ordenesDeCompraService
	,	algebra: OrdenesDeCompra.algebra
	}
);

tag('ordenesDeCompra-model', OrdenesDeCompra.connection);

export default OrdenesDeCompra;