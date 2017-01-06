import Component from 'can-component';
import Map from 'can-map';
import 'can-map-define';
import './nuevo_proveedor.less!';
import template from './nuevo_proveedor.stache!';

import Proveedores from 'aleph-frontend/models/proveedores';
import Articulos from 'aleph-frontend/models/articulos';
import 'aleph-frontend/util/func.js';

const labels = ['label-default','label-primary','label-success','label-info','label-warning','label-danger'];

export const ViewModel = Map.extend({
	define:
		{
			proveedor:
			{
				value:	Proveedores
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
	,	toggleArticulosProveedor: function()
		{
			var self
			=	this
			,	query
			=	this.attr('listQuery');

			this.attr('proveedor.articulos')
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
			if (this.attr('proveedor.articulos').indexOf(art) == -1) {
				this.attr('proveedor.articulos').push(art.attr('visible',true));
			} else {
				$.notify(
					{
						message:	'El Articulo '+art.attr('nombre')+' ya fue agregado al proveedor.' 
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
			this.attr('proveedor.articulos').splice($(el).parents('tr').index(),1);
		}
	,	toggleCuenta: function(el)
		{
			this.attr('proveedor.tieneCuenta',$(el).is(':checked'));
		}
	,	checkEtiquetas: function(el)
		{
			this.attr(
				'proveedor.etiquetas'
			,	$(el).val().split(',').map(
					function(t,i)
					{
						return	{
									descripcion:	t.trim()
								,	tipo:			labels[i%labels.length]
								} 
					}
				)
			);
		}
	,	cancelProveedor: function()
		{
			this.attr('proveedor', new Proveedores({}));
			this.attr('resetPaginador', true);
		}
	,	saveProveedor: function(el)
		{
			var $button
			=	$(el)
			,	self
			=	this;

			$button.button('loading');

			var	newMode
			=	self.attr('proveedor').isNew();

			self.attr('proveedor').save()
				.then(
					function(data)
					{
						$button.button('reset');

						if (newMode) {
							self.attr('proveedor', new Proveedores({}));
							self.attr('resetPaginador', true);
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

						self.attr('errorMsg', '');

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
				'proveedor'
			,	function(ev, p)
				{
					self.attr('proveedor.articulos', new Articulos.List(p.attr('articulos').attr()));

					self.toggleArticulosProveedor();
				}
			);
		}
	}
);

export default Component.extend({
	tag: 'aleph-compras-nuevo-proveedor',
	viewModel: ViewModel,
	view: template
});