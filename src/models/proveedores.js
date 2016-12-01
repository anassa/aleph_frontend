import can from 'can';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import 'can/map/define/define';
import feathers from 'aleph-frontend/feathers';

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
					return	list.map(
								function(i)
								{
									return	{
												_id:			i._id
											,	codigo:			i.codigo
											,	nombre:			i.nombre
											,	descripcion:	i.descripcion
											}
								}
							).serialize()
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
				value:	Cuentas
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
