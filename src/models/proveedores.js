import Map from 'can-define/map/map';
import List from 'can-define/list/list';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import feathers from 'aleph-frontend/feathers';
import 'lodash/lodash.js'

import Cuentas from 'aleph-frontend/models/cuentas';

export const Proveedores = Map.extend(
	{
		articulos:
		{
			value: List
		,	serialize: function(list)
			{
				return	_.map(
							list.get()
						,	function(art)
							{
								return	_.omit(
											art
										,	['proveedores', 'usuario']
										)
							}
						)
			}
		}
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
					).join(', ')

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
	,	cuenta:
		{
			value: Cuentas
		,	set: function(a)
			{
				this.tieneCuenta = a ? a._id : false;
				return a;
			}
		,	serialize: function(acc)
			{
				return this.tieneCuenta ? acc.get() : undefined;
			}
		}
	,	tempMontoLimite:
		{
			value: ''
		,	serialize: function()
			{
				return undefined;
			}
		}
	,	tieneCuenta:
		{
			value: false
		,	type: Boolean
		,	set: function(s)
			{
				if (this.cuenta)
					if (s) {
						this.cuenta.montoLimite = this.tempMontoLimite;
						this.tempMontoLimite = 0;
					}	else {
						this.tempMontoLimite = this.cuenta.montoLimite;
						this.cuenta.montoLimite = '';
					}

				return s
			}
		,	serialize: function()
			{
				return undefined;
			}
		}
	}
);

Proveedores.List = List.extend({
	'#': Proveedores
});

export const proveedoresConnection
=	superMap(
		{
			url:	feathers.rest('proveedores')
		,	idProp:	'_id'
		,	Map:	Proveedores
		,	List:	Proveedores.List
		,	name:	'proveedores'
		}
	);

feathers.io.on('proveedores created', proveedores => proveedoresConnection.createInstance(proveedores));
feathers.io.on('proveedores updated', proveedores => proveedoresConnection.updateInstance(proveedores));
feathers.io.on('proveedores patched', proveedores => proveedoresConnection.updateInstance(proveedores));
feathers.io.on('proveedores removed', proveedores => proveedoresConnection.destroyInstance(proveedores));


tag('proveedores-model', proveedoresConnection);

export default Proveedores;
