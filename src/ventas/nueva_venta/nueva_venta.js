import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './nueva_venta.less!';
import template from './nueva_venta.stache!';

import Ventas from 'aleph-frontend/models/ventas';
import Articulos from 'aleph-frontend/models/articulos';
import FormasDePago from 'aleph-frontend/models/formasDePago';
import Tarjetas from 'aleph-frontend/models/tarjetas';

export const ViewModel = Map.extend(
	{
		define:
		{
			venta:
			{
				value: Ventas
			}
		,	formasDePago:
			{
				value: function()
				{
					return	FormasDePago.getList()
				}
			}
		,	tarjetas:
			{
				value: function()
				{
					return	Tarjetas.getList()
				}
			}
		,	articulos:
			{
				value: function()
				{
					return	Articulos.getList()
				}
			,	set: function(a)
				{
					this.attr('resetPaginadorArticulos',!this.attr('resetPaginadorArticulos'));
					return a;
				}
			}
		,	resetPaginadorArticulos:
			{
				value:	false
			}
		,	resetPaginador:
			{
				value:	false
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
		,	listQuery:
			{
				value: function()
				{
					var self
					=	this;

					var query
					=	new can.Map(
							{
								current:
								{
									firstPage:	0
								,	lastPage:	4
								}
							}
						);

					query
						.bind(
							'change'
						,	function()
							{
								self.attr('venta.articulos')
									.map(
										function(art, i)
										{
											art.attr(
												'visible'
											,	(i >= query.current.firstPage && i <= query.current.lastPage)
											);
										}
									)
							}
						);

					return query;
				}
			}
		}
	,	searchArticulo: function(value)
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
	,	addArticulo: function(art)
		{
			if (this.attr('venta.articulos').indexOf(art) == -1) {
				this.attr('venta.articulos').push(art.attr('visible',true));
			} else {
				$.notify(
					{
						message:	'El Articulo '+art.attr('nombre')+' ya fue agregado a la Venta.' 
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
			}
		}
	,	removeArticulo: function(el)
		{
			this.attr('venta.articulos').splice(can.$(el).parents('tr').index(),1);
		}
	,	verifyCantidad: function(el)
		{
			var	$tr
			=	can.$(el).parents('tr')
			,	articulo
			=	this.attr('venta.articulos').attr($tr.index());

			if	((articulo.attr('stock') < articulo.attr('cantidad')) &&  (articulo.attr('cantidad') >= 1))
				$tr.addClass('has-error')
			else
				$tr.removeClass('has-error')
		}
	}
);

export default Component.extend({
	tag: 'aleph-ventas-nueva-venta',
	viewModel: ViewModel,
	template
});