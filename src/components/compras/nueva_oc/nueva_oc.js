import Component from 'can-component';
import Map from 'can-define/map/map';
import './nueva_oc.less!';
import template from './nueva_oc.stache!';

import OrdenesDeCompra from 'aleph-frontend/models/ordenesDeCompra';
import Proveedores from 'aleph-frontend/models/proveedores';
import Articulos from 'aleph-frontend/models/articulosOC';
import 'aleph-frontend/util/func.js';

export const ViewModel = Map.extend(
	{
		ordendecompra:
		{
			value: OrdenesDeCompra
		}
	,	articulosP:
		{
			value: Articulos.List
		}
	,	resetPaginadorAP:
		{
			value:	false
		}
	,	resetPaginadorAOC:
		{
			value:	false
		}
	,	errorMsg:
		{
			value:	null
		}
	,	nombreProveedor:
		{
			value: ''
		}
	,	nombreArticulo:
		{
			value: ''
		}
	,	codigoArticulo:
		{
			value: ''
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
							Proveedores.getList(
								query.serialize()
							).then(
								function(p)
								{
									if (p.length > 0) {
										var prov
										=	p.get(0);

										self.articulosP = new Articulos.List(prov.articulos.get());

										self.articulosFiltrados = self.articulosP.slice();

										self.ordendecompra.proveedor = prov;

									}
								}
							)
						}
					);

				return query;
			}
		}
	,	listQueryF:
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
							self.articulosFiltrados
								.map(
									function(art, i)
									{
										art.visible = (i >= query.current.firstPage && i <= query.current.lastPage);
									}
								)
						}
					);

				return query;
			}
		}
	,	listQueryAOC:
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
							self.ordendecompra.articulos
								.map(
									function(art, i)
									{
										art.visible = (i >= query.current.firstPage && i <= query.current.lastPage);
									}
								)
						}
					);

				return query;
			}
		}
	,	filterArticulo: function()
		{
			var nombreArticulo
			=	this.nombreArticulo
			,	codigoArticulo
			=	this.codigoArticulo;

			this.articulosFiltrados
			=	this.articulosP.filter(
					function(item, index, list)
					{
						if 	(nombreArticulo.length && codigoArticulo.length)
							return	(item.nombre.toLowerCase().indexOf(nombreArticulo) != -1)
								&&	(item.codigo == Number(codigoArticulo))
						else
							if 	(nombreArticulo.length)
								return	(item.nombre.toLowerCase().indexOf(nombreArticulo) != -1)
							else
								if (codigoArticulo.length)
									return (item.codigo == Number(codigoArticulo))
								else
									return true;
					}
				);
		}
	,	resetProveedor: function()
		{
			this.nombreProveedor = '';
			this.ordendecompra.proveedor = undefined;
			this.articulosP = [];
			this.articulosFiltrados = [];
			this.resetPaginadorAP = true;
		}
	,	resetOrdenDeCompra: function()
		{
			this.ordendecompra = new OrdenesDeCompra({});
			this.resetPaginadorAOC = true;
		}
	,	searchProveedor: function(value)
		{
			if (this.nombreProveedor.length)
				this.query.denominacion
				=	{
						$regex:		this.nombreProveedor
					,	$options:	'i'
					};
			else {
				this.resetProveedor();
				this.resetOrdenDeCompra()
			}
		}
	,	addArticulo: function(art)
		{
			if (this.ordendecompra.articulos.indexOf(art) == -1) {
				art.visible = true;
				this.ordendecompra.articulos.push(art);
			} else {
				$.notify(
					{
						message:	'El Articulo '+art.nombre+' ya fue agregado a la Orden de Compra.' 
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
			this.ordendecompra.articulos.splice($(el).parents('tr').index(),1);
		}
	,	cancelOrdenDeCompra: function()
		{
			this.resetProveedor();
			this.resetOrdenDeCompra();
		}
	,	saveOrdenDeCompra: function(el)
		{
			var $button
			=	$(el)
			,	self
			=	this;

			$button.button('loading');

			var	newMode
			=	self.ordendecompra.isNew();

			self.ordendecompra.save()
				.then(
					function(data)
					{
						$button.button('reset');

						self.resetProveedor()

						if (newMode) {
							self.resetOrdenDeCompra()
						} else {
							$(el).parents('.modal').modal('hide')
						}

						$.notify(
							{
								message:	'Orden de Compra '+(newMode ? 'creada' : 'actualizada')+' correctamente.' 
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

						self.errorMsg = '';

					}
				,	function(data)
					{
						self.errorMsg = 'Datos incorrectos, verifique los datos ingresados.';

						$button.button('reset');
					}
				)
		}
	,	init: function()
		{
			var self
			=	this;

			this.bind(
				'ordendecompra'
			,	function(ev, oc)
				{
					if (!oc.isNew()) {

						oc.articulos = new Articulos.List(oc.articulos.get());

						self.nombreProveedor = oc.proveedor.denominacion;

						self.articulosP = new Articulos.List(oc.proveedor.articulos.get());

						self.articulosFiltrados = self.articulosP.slice();
						
					}
				}
			);
		}
	}
);

export default Component.extend(
	{
		tag: 'aleph-compras-nueva-oc'
	,	viewModel: ViewModel
	,	view: template
	}
);