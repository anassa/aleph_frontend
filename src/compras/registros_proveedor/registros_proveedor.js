import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './registros_proveedor.less!';
import template from './registros_proveedor.stache!';

import Proveedores from 'aleph-frontend/models/proveedores';
import 'aleph-frontend/util/func.js';

export const ViewModel = Map.extend(
	{
		define:
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
					=	new can.Map(
							{
								$skip: 0
							}
						);

					query
						.bind(
							'change'
						,	function()
							{
								self
									.attr(
										'proveedores'
									,	Proveedores.getList(
											query.serialize()
										)
									)
							}
						);

					return query;
				}
			}
		,	searchInput:
			{
				value:	undefined
			}
		}
	,	init: function()
		{
			var self
			=	this;
			
			Proveedores.bind(
				'updated'
			,	function()
				{
					self
						.attr(
							'proveedores'
						,	Proveedores.getList(
								self.attr('query').serialize()
							)
						)
				}
			);
		}
	,	search: function(value)
		{
			var value
			=	this.attr('searchInput')
			,	fields
			=	[
					{
						name: 'denominacion'
					,	type: String	
					}
				];

			this.attr(
				'query.$or'
			,	value.length
				?	createQuery(fields,value)
				:	undefined
			);
		}
	,	setTempProveedor: function(prov)
		{
			this.attr('tempProveedor', new Proveedores(prov.serialize()));
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

			this.attr('tempProveedor').destroy()
				.then(
					function()
					{
						$button.button('reset');
						$modal.modal('hide');

						self
							.attr(
								'proveedores'
							,	Proveedores.getList(
									self.attr('query').serialize()
								)
							);

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
		tag: 'aleph-compras-registros-proveedor',
		viewModel: ViewModel,
		template
	}
);