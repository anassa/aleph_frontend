import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './registros_articulo.less!';
import template from './registros_articulo.stache!';

import Articulos from 'aleph-frontend/models/articulos';
import 'aleph-frontend/util/func.js';

export const ViewModel = Map.extend(
	{
		define:
		{
			articulos:
			{
				value: function()
				{
					var self
					=	this;

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
										'articulos'
									,	Articulos.getList(
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
	,	search: function(value)
		{
			var value
			=	this.attr('searchInput')
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

			this.attr(
				'query.$or'
			,	value.length
				?	createQuery(fields,value)
				:	undefined
			);
		}
	,	setTempArticulo: function(art)
		{
			this.attr('tempArticulo',art);
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

			this.attr('tempArticulo').destroy()
				.then(
					function()
					{
						$button.button('reset');
						$modal.modal('hide');

						self
							.attr(
								'articulos'
							,	Articulos.getList(
									self.attr('query').serialize()
								)
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
	,	template
	}
);