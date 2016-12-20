import can from 'can';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import 'can/map/define/define';
import feathers from 'aleph-frontend/feathers';
import 'lodash/lodash.js'

import Cuentas from 'aleph-frontend/models/cuentas';

export const Proveedores = can.Map.extend(
	{
		define:
		{
			articulos:
			{
				value: can.List
			,	serialize: function(list)
				{
					return	_.map(
								list.serialize()
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
		,	cuenta:
			{
				value: Cuentas
			,	set: function(a)
				{
					this.attr('tieneCuenta', a ? a.attr('_id') : false);
					return a;
				}
			,	serialize: function(acc)
				{
					return this.attr('tieneCuenta') ? acc.attr() : undefined;
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
					if (this.attr('cuenta'))
						if (s) {
							this.attr('cuenta.montoLimite',this.attr('tempMontoLimite'))
							this.attr('tempMontoLimite','')
						}	else {
							this.attr('tempMontoLimite',this.attr('cuenta.montoLimite'))
							this.attr('cuenta.montoLimite','')
						}

					return s
				}
			,	serialize: function()
				{
					return undefined;
				}
			}
		}
	}
);

Proveedores.List = can.List.extend({
	Map: Proveedores
}, {});

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
