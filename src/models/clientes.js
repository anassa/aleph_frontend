import can from 'can';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import 'can/map/define/define';
import feathers from 'aleph-frontend/feathers';
import 'lodash/lodash.js'

// Importar clases de modelo
import Usuarios from 'aleph-frontend/models/usuarios';
import Cuentas from 'aleph-frontend/models/cuentas';

export const Clientes = can.Map.extend({
	define: 
  	{
  		cuenta:
		{
			value:	Cuentas
			// Si no se seteo el atributo monto limite de la cuenta
			// entonces no se va a crear la cuenta en el cliente.
			,serialize: function(){
				if(this.attr('cuenta.montoLimite')){
					// return this.attr('cuenta')	
					return new Cuentas({
						// Le chanto el monto limite a lo ñeri.
						montoLimite: this.attr('cuenta.montoLimite')
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
				return this.attr('apellido')+' '+this.attr('nombre')
			}
		}
		// Funciones agregadas parecidas a proveedores
		// Function para tirar etiquetas
	,	etiquetas:
		{
			value: can.List
		,	set: function(e)
			{	
				this.attr(
					'parsedEtiquetas'
				,	e.map(
						function(e)
						{
							return	e.descripcion
						}
					).join(', ')
				);
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
						).serialize()
			}
		}
	,	parsedEtiquetas:
		{
			serialize: function()
			{
				return undefined;
			}
		}
		
	}
  ,	init: function (){
		var	currentUser
		=	Usuarios.getSession();

		this.attr(
			'usuario', {
					_id:		currentUser.attr('_id')
				,	username: 	currentUser.attr('username')
				,	permisos:	currentUser.attr('permisos')
			}
		);
	}
	
});

Clientes.List = can.List.extend({
  Map: Clientes
}, {});

export const clientesConnection
=	superMap(
		{
			url:	feathers.rest('clientes')
		,	idProp:	'_id'
		,	Map:	Clientes
		,	List:	Clientes.List
		,	name:	'clientes'
		}
	);

feathers.io.on('clientes created', clientes => clientesConnection.createInstance(clientes));
feathers.io.on('clientes updated', clientes => clientesConnection.updateInstance(clientes));
feathers.io.on('clientes patched', clientes => clientesConnection.updateInstance(clientes));
feathers.io.on('clientes removed', clientes => clientesConnection.destroyInstance(clientes));

tag('clientes-model', clientesConnection);

export default Clientes;
