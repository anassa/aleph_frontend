import Component from 'can-component';
import Map from 'can-map';
import 'can-map-define';
import './registros_venta.less!';
import template from './registros_venta.stache!';

import Ventas from 'aleph-frontend/models/registroVentas';
import 'aleph-frontend/util/func.js';

export const ViewModel = Map.extend(
	{
		define:
		{
			ventas:
			{
				value: function()
				{
					return	Ventas.getList()
				}
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
								$skip:	0
							,	$limit:	10
							}
						);

					query
						.bind(
							'change'
						,	function()
							{
								self
									.attr(
										'ventas'
									,	Ventas.getList(
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
		,	tempVenta:
			{
				value: Ventas
			}
		,	resetPaginador:
			{
				value:	false
			}
		,	listQuery:
			{
				value: function()
				{
					var self
					=	this;

					var query
					=	new Map(
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
	,	search: function(value)
		{
			var value
			=	this.attr('searchInput')
			,	fields
			=	[
					{
						name: 'cliente.nombre'
					,	type: String	
					}
				,	{
						name: 'cliente.apellido'
					,	type: String	
					}
				,	{
						name: 'formaPago.nombre'
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
	,	setTempVenta: function(v)
		{
			this.attr('tempVenta', new Ventas(v.serialize()));
		}
	}
);

export default Component.extend(
	{
		tag: 'aleph-ventas-registros-venta',
		viewModel: ViewModel,
		view: template
	}
);