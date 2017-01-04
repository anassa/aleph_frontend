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

// app models
import Usuarios from 'aleph-frontend/models/usuarios';
import Cuentas from 'aleph-frontend/models/cuentas';

// Use feathersClient.service(url) to create a service
const clientesService = feathers.service('/api/clientes');

export const Clientes = Map.extend(
	{
		cuenta:
		{
			value:	Cuentas
			// Si no se seteo el atributo monto limite de la cuenta
			// entonces no se va a crear la cuenta en el cliente.
			,serialize: function(){
				if(this.cuenta.montoLimite){
					// return this.attr('cuenta')	
					return new Cuentas({
						// Le chanto el monto limite a lo ñeri.
						montoLimite: this.cuenta.montoLimite
					})
				}else{
					return undefined
				}
				
			}
		}
	,	nombreCompleto:
		{
			get: function()
			{
				return this.apellido+' '+this.nombre
			}
		}
		// Funciones agregadas parecidas a proveedores
		// Function para tirar etiquetas
	,	etiquetas:
		{
			value: List
		,	set: function(e)
			{	
				this.parsedEtiquetas
				=	e.map(
						function(e)
						{
							return	e.descripcion
						}
					).join(', ');

				return e;
			}
		,	serialize: function(list)
			{
				return 	list.map(
							function(i)
							{
								return	{
											tipo:			i.tipo
										,	descripcion:	i.descripcion
										}
							}
						).get()
			}
		}
	,	parsedEtiquetas:
		{
			serialize: function()
			{
				return undefined;
			}
		}
	  ,	init: function (){
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

Clientes.List = List.extend(
	{
		'#': Clientes
	}
);

Clientes.algebra = new set.Algebra(
	set.comparators.id('_id')
);

Clientes.connection = connect(
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
	,	Map:	Clientes
	,	List:	Clientes.List
	,	name:	'clientes'
	,	feathersService: clientesService
	,	algebra: Clientes.algebra
	}
);

tag('clientes-model', Clientes.connection);

export default Clientes;