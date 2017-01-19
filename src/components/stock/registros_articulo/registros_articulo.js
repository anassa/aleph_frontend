import Component from 'can-component';
import Map from 'can-define/map/map';
import './registros_articulo.less!';
import template from './registros_articulo.stache!';

import Articulos from 'aleph-frontend/models/articulos';
import 'aleph-frontend/util/func.js';

export const ViewModel = Map.extend(
	{
		articulos:
		{
			value: function()
			{
				return	Articulos.getList()
			}
		}
	,	tempArticulo:
		{
			value: Articulos
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
							self.articulos
							=	Articulos.getList(query.get());
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
			
			Articulos.bind(
				'updated'
			,	function()
				{
					self.articulos
					=	Articulos.getList(self.query.get());
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
						name: 'nombre'
					,	type: String	
					}
				,	{
						name: 'codigo'
					,	type: Number
					}
				];

			this.query.$or
			=	value.length
				?	createQuery(fields,value)
				:	undefined;
		}
	,	setTempArticulo: function(art)
		{
			this.tempArticulo = new Articulos(art.get());
		}
	,	destroyArticulo: function(el)
		{
			var $button
			=	$(el)
			,	$modal
			=	$(el).parents('.modal')
			,	self
			=	this;

			$button.button('loading');

			this.tempArticulo.destroy()
				.then(
					function()
					{
						$button.button('reset');
						$modal.modal('hide');

						self.articulos
						=	Articulos.getList(
								self.query.get()
							);

						$.notify(
							{
								message:	'Artículo eliminado correctamente.' 
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
								message:	'Ocurrio un error al eliminar el articulo. Intentelo nuevamente.' 
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
		tag: 'aleph-stock-registros-articulo'
	,	viewModel: ViewModel
	,	view: template
	}
);