import Component from 'can-component';
import Map from 'can-define/map/map';
import Route from 'can-route';
import './nuevo_proveedor.less!';
import template from './nuevo_proveedor.stache!';

import Proveedores from 'aleph-frontend/models/proveedores';
import Articulos from 'aleph-frontend/models/articulos';
import 'aleph-frontend/util/func.js';

const labels = ['label-default','label-primary','label-success','label-info','label-warning','label-danger'];

export const ViewModel = Map.extend(
	{
		toggleArticulosProveedor: function()
		{
			var self
			=	this;

			self.proveedor.articulos
				.map(
					function(art, i)
					{
						art.visible = (i >= self.listQuery.current.firstPage && i <= self.listQuery.current.lastPage);
					}
				);
		}
	,	searchArticulo: function(value)
		{
			var fields
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
			=	this.searchInput.length
				?	createQuery(fields,value)
				:	undefined;
		}
	,	addArticulo: function(art)
		{
			if (this.proveedor.articulos.indexOf(art) == -1) {
				art.visible = true;
				this.proveedor.articulos.push(art);
			} else {
				$.notify(
					{
						message:	'El Articulo '+art.nombre+' ya fue agregado al proveedor.' 
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
			this.proveedor.articulos.splice($(el).parents('tr').index(),1);
		}
	,	toggleCuenta: function(el)
		{
			this.proveedor.tieneCuenta = $(el).is(':checked');
		}
	,	checkEtiquetas: function(el)
		{
			this.proveedor.etiquetas
			=	$(el).val().split(',').map(
					function(t,i)
					{
						return	{
									descripcion:	t.trim()
								,	tipo:			labels[i%labels.length]
								} 
					}
				);
		}
	,	cancelProveedor: function()
		{
			this.proveedor = new Proveedores({});
			this.resetPaginador = true;
		}
	,	saveProveedor: function(el)
		{
			var $button
			=	$(el)
			,	self
			=	this;

			$button.button('loading');

			var	newMode
			=	self.proveedor.isNew();

			self.proveedor.save()
				.then(
					function(data)
					{
						$button.button('reset');

						if (newMode) {
							self.proveedor = new Proveedores({});
							self.resetPaginador = true;
						} else {
							$(el).parents('.modal').modal('hide')
							$('#cuenta-switch').click();
						}

						$.notify(
							{
								message:	'Proveedor '+(newMode ? 'creado' : 'actualizado')+' correctamente.' 
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

						$('#nuevo-proveedor-form').find('[name]').each(
							function()
							{
								$(this).parents('.form-group')
									.removeClass('has-error has-success')
							}
						);

						self.errorMsg = '';

					}
				,	function(data)
					{
						if (data.code == 409)
							data.errors[data.message.match( /\w*_1\w*/)[0].split('_1')[0]] = 'duplicado'

						$('#nuevo-proveedor-form').find('[name]').each(
							function()
							{
								$(this).parents('.form-group')
									.removeClass('has-error has-success')
									.addClass(
										(data.errors[$(this).attr('name')])
										?	'has-error'
										:	'has-success'
									)
							}
						);

						self.errorMsg = 'Datos incorrectos, verifique los datos ingresados.';

						$button.button('reset');
					}
				)
		}
	,	init: function()
		{
			var self
			=	this;

			this.on(
				'proveedor'
			,	function(ev, p)
				{
					self.proveedor.articulos = new Articulos.List(p.articulos.get());

					self.toggleArticulosProveedor();
				}
			);
		}
	,	proveedor:
		{
			value: Proveedores
		}
	,	articulos:
		{
			value: function()
			{
				return	Articulos.getList()
			}
		,	set: function(a)
			{
				this.resetPaginadorArticulos = !this.resetPaginadorArticulos;
				$('a[href="#datos"]').click();
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
	,	errorMsg:
		{
			value:	null
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
						=		Articulos.getList(
									query.serialize()
								);
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
							self.toggleArticulosProveedor()
						}
					);

				return query;
			}
		}
	}
);

export default Component.extend({
	tag: 'aleph-compras-nuevo-proveedor',
	viewModel: ViewModel,
	view: template
});