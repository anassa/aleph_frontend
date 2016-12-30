import Component from 'can-component';
import Map from 'can-map';
import 'can-map-define';
import './registros_oc.less!';
import template from './registros_oc.stache!';

import OrdenesDeCompra from 'aleph-frontend/models/ordenesDeCompra';
import Articulos from 'aleph-frontend/models/articulosOC';
import 'aleph-frontend/util/func.js';

export const ViewModel = Map.extend(
	{
		define:
		{
			ordenesDeCompra:
			{
				value: function()
				{
					return	OrdenesDeCompra.getList()
				}
			}
		,	previewOrdenDeCompra:
			{
				value: OrdenesDeCompra
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
								self
									.attr(
										'ordenesDeCompra'
									,	OrdenesDeCompra.getList(
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
			
			OrdenesDeCompra.bind(
				'updated'
			,	function()
				{
					self
						.attr(
							'ordenesDeCompra'
						,	OrdenesDeCompra.getList(
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
						name: 'proveedor.denominacion'
					,	type: String	
					}
				,	{
						name: 'numero'
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
	,	setTempOrdenDeCompra: function(oc)
		{
			this.attr('tempOrdenDeCompra', new OrdenesDeCompra(oc.serialize()));
		}
	,	setPreviewOrdenDeCompra: function(oc)
		{
			this.attr('previewOrdenDeCompra', new OrdenesDeCompra(oc.serialize()));

			this.attr('previewOrdenDeCompra.articulos', new Articulos.List(oc.serialize().articulos));
		}
	}
);

export default Component.extend({
	tag: 'aleph-compras-registros-oc',
	viewModel: ViewModel,
	view: template
});