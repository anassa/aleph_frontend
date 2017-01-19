import Component from 'can-component';
import Map from 'can-define/map/map';
import './registros_proveedor.less!';
import template from './registros_proveedor.stache!';

import Proveedores from 'aleph-frontend/models/proveedores';
import 'aleph-frontend/util/func.js';

export const ViewModel = Map.extend(
	{
		proveedores:
		{
			value: function()
			{
				return	Proveedores.getList()
			}
		}
	,	tempProveedor:
		{
			value: Proveedores
		}
	,	query:
		{
			value: function()
			{
				var self
				=	this;

				var query
				=	new Map(
						{
							$skip: 0
						}
					);

				query
					.bind(
						'change'
					,	function()
						{
							self.proveedores
							=	Proveedores.getList(query.serialize());
						}
					);

				return query;
			}
		}
	,	searchInput:
		{
			value:	undefined
		}
	,	init: function()
		{
			var self
			=	this;
			
			Proveedores.bind(
				'updated'
			,	function()
				{
					self.proveedores
					=	Proveedores.getList(self.query.get());
				}
			);
		}
	,	search: function(value)
		{
			var value
			=	this.searchInput
			,	fields
			=	[
					{
						name: 'denominacion'
					,	type: String	
					}
				];

			this.query.$or
			=	value.length
				?	createQuery(fields,value)
				:	undefined;
		}
	,	setTempProveedor: function(prov)
		{
			this.tempProveedor = new Proveedores(prov.get());
		}
	,	destroyProveedor: function(el)
		{
			var $button
			=	$(el)
			,	$modal
			=	$(el).parents('.modal')
			,	self
			=	this;

			$button.button('loading');

			this.tempProveedor.destroy()
				.then(
					function()
					{
						$button.button('reset');
						$modal.modal('hide');

						self.proveedores
						=	Proveedores.getList(self.query.get());

						$.notify(
							{
								message:	'Proveedor eliminado correctamente.' 
							}
						,	{
								type:		'success'
							,	placement:
								{
									from:	'bottom',
									align:	'right'
								}
							}
						);
					}
				,	function(data)
					{
						$.notify(
							{
								message:	'Ocurrio un error al eliminar el proveedor. Intentelo nuevamente.' 
							}
						,	{
								type:		'danger'
							,	placement:
								{
									from:	'bottom',
									align:	'right'
								}
							}
						);
						$button.button('reset');
					}
				)
		}
	}
);

export default Component.extend(
	{
		tag: 'aleph-compras-registros-proveedor'
	,	viewModel: ViewModel
	,	view: template
	}
);