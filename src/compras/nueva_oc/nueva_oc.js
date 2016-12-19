import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './nueva_oc.less!';
import template from './nueva_oc.stache!';

import OrdenesDeCompra from 'aleph-frontend/models/ordenesDeCompra';
import Proveedores from 'aleph-frontend/models/proveedores';
import Articulos from 'aleph-frontend/models/articulosOC';
import 'aleph-frontend/util/func.js';

export const ViewModel = Map.extend(
	{
		define:
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
								Proveedores.getList(
									query.serialize()
								).then(
									function(p)
									{
										if (p.length > 0) {
											var prov
											=	p.attr(0);

											self.attr('articulosP', new Articulos.List(prov.attr('articulos').attr()));

											self.attr('articulosFiltrados', self.attr('articulosP').slice());

											self
												.attr(
													'ordenDeCompra.proveedor'
												,	prov
												);
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
								self.attr('articulosFiltrados')
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
		,	listQueryAOC:
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
								self.attr('ordenDeCompra.articulos')
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
	,	filterArticulo: function()
		{
			var nombreArticulo
			=	this.attr('nombreArticulo')
			,	codigoArticulo
			=	this.attr('codigoArticulo');

			this.attr(
				'articulosFiltrados'
			,	this.attr('articulosP').filter(
					function(item, index, list)
					{
						if 	(nombreArticulo.length && codigoArticulo.length)
							return	(item.attr('nombre').toLowerCase().indexOf(nombreArticulo) != -1)
								&&	(item.attr('codigo') == Number(codigoArticulo))
						else
							if 	(nombreArticulo.length)
								return	(item.attr('nombre').toLowerCase().indexOf(nombreArticulo) != -1)
							else
								if (codigoArticulo.length)
									return (item.attr('codigo') == Number(codigoArticulo))
								else
									return true;
					}
				)
			)


		}
	,	resetProveedor: function()
		{
			this.attr('nombreProveedor','');
			this.removeAttr('ordenDeCompra.proveedor');
			this.attr('articulosP',[]);
			this.attr('articulosFiltrados',[]);
			this.attr('resetPaginadorAP', true);
			this.resetOrdenDeCompra()
		}
	,	resetOrdenDeCompra: function()
		{
			this.attr('ordenDeCompra', new OrdenesDeCompra({}));
			this.attr('resetPaginadorAOC', true);
		}
	,	searchProveedor: function(value)
		{
			if (this.attr('nombreProveedor').length)
				this.attr(
					'query.denominacion'
				,	{
						$regex:		this.attr('nombreProveedor')
					,	$options:	'i'
					}
				);
			else
				this.resetProveedor();
		}
	,	addArticulo: function(art)
		{
			if (this.attr('ordenDeCompra.articulos').indexOf(art) == -1) {
				this.attr('ordenDeCompra.articulos').push(art.attr('visible',true));
			} else {
				$.notify(
					{
						message:	'El Articulo '+art.attr('nombre')+' ya fue agregado a la Orden de Compra.' 
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
			this.attr('ordenDeCompra.articulos').splice(can.$(el).parents('tr').index(),1);
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
			=	self.attr('ordenDeCompra').isNew();

			self.attr('ordenDeCompra').save()
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

						self.attr('errorMsg', '');

					}
				,	function(data)
					{
						self.attr('errorMsg','Datos incorrectos, verifique los datos ingresados.');

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

					self.attr('nombreProveedor',oc.attr('proveedor.denominacion'))

					self.attr('articulosP', new Articulos.List(oc.attr('proveedor.articulos').attr()));

					self.attr('articulosFiltrados', self.attr('articulosP').slice());

					console.log(oc.attr('articulos'))
				}
			);
		}
	}
);

export default Component.extend({
	tag: 'aleph-compras-nueva-oc',
	viewModel: ViewModel,
	template
});