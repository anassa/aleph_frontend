import Component from 'can-component';
import Map from 'can-define/map/map';
import './registros_oc.less!';
import template from './registros_oc.stache!';

import OrdenesDeCompra from 'aleph-frontend/models/ordenesDeCompra';
import Articulos from 'aleph-frontend/models/articulosOC';
import 'aleph-frontend/util/func.js';

export const ViewModel = Map.extend(
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
							self.ordenesDeCompra
							=	OrdenesDeCompra.getList(query.get());
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
			
			OrdenesDeCompra.bind(
				'updated'
			,	function()
				{
					self.ordenesDeCompra
					=	OrdenesDeCompra.getList(self.query.get());
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
						name: 'proveedor.denominacion'
					,	type: String	
					}
				,	{
						name: 'numero'
					,	type: String	
					}
				];

			this.query.$or
			=	value.length
				?	createQuery(fields,value)
				:	undefined;
		}
	,	setTempOrdenDeCompra: function(oc)
		{
			this.tempOrdenDeCompra = new OrdenesDeCompra(oc.get());
		}
	,	setPreviewOrdenDeCompra: function(oc)
		{
			this.previewOrdenDeCompra = new OrdenesDeCompra(oc.get());

			this.previewOrdenDeCompra.articulos = new Articulos.List(oc.articulos.get());
		}
	}
);

export default Component.extend(
	{
		tag: 'aleph-compras-registros-oc'
	,	viewModel: ViewModel
	,	view: template
	}
);