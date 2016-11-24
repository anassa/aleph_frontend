import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './nuevo_articulo.less!';
import template from './nuevo_articulo.stache!';

import UnidadesDeMedida from 'aleph-frontend/models/unidadesDeMedida';
import Articulos from 'aleph-frontend/models/articulos';
import Proveedores from 'aleph-frontend/models/proveedores';

export const ViewModel = Map.extend(
	{
		define:
		{
			unidadesDeMedida:
			{
				value: function()
				{
					return UnidadesDeMedida.getList();
				}
			}
		,	articulo:
			{
				value:	Articulos
			}
		,	proveedores:
			{
				value: function()
				{
					return	Proveedores.getList()
				}
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
										'proveedores'
									,	Proveedores.getList(
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
								self.attr('articulo.proveedores')
									.map(
										function(prov, i)
										{
											prov.attr(
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
	,	searchProveedor: function(value)
		{
			var value
			=	this.attr('searchInput')
			,	fields
			=	[
					{
						name: 'denominacion'
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
	,	addProveedor: function(prov)
		{
			if (this.attr('articulo.proveedores').indexOf(prov) == -1) {
				this.attr('articulo.proveedores').push(prov.attr('visible',true));
			} else {
				$.notify(
					{
						message:	'El Proveedor '+prov.attr('denominacion')+' ya fue agregado al articulo.' 
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
	,	removeProveedor: function(el)
		{
			this.attr('articulo.proveedores').splice(can.$(el).parents('tr').index(),1);
		}
	,	toggleAjuste: function(el)
		{
			if (!$(el).is(':checked')) {
				this.attr('articulo.ajuste','');
				$('[name="ajuste"]').val('')
			}

			$('[name="ajuste"]')
				.attr(
					'disabled'
				,	(!$(el).is(':checked'))
					?	'disabled'
					:	null
				);
		}
	,	cancelArticulo: function()
		{
			this.attr('articulo', new Articulos({}));
		}
	,	saveArticulo: function(el)
		{
			var $button
			=	$(el)
			,	self
			=	this;

			$button.button('loading');

			var	newMode
			=	self.attr('articulo').isNew();

			self.attr('articulo').save()
				.then(
					function(data)
					{
						$button.button('reset');

						if (newMode) {
							self.attr('articulo', new Articulos({}));
						} else {
							$(el).parents('.modal').modal('hide')
							self.attr('articulo.tempStock',data.stock);
							$('#ajuste-switch').click();
						}

						$.notify(
							{
								message:	'Artículo '+(newMode ? 'creado' : 'actualizado')+' correctamente.' 
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

						$('#nuevo-articulo-form').find('[name]').each(
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
						$('#nuevo-articulo-form').find('[name]').each(
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
	}
);

export default Component.extend({
	tag: 'aleph-stock-nuevo-articulo',
	viewModel: ViewModel,
	template
});