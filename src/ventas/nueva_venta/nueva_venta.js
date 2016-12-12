import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './nueva_venta.less!';
import template from './nueva_venta.stache!';

import Ventas from 'aleph-frontend/models/ventas';
import Articulos from 'aleph-frontend/models/articulosVenta';
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
	,	cancelVenta: function()
		{
			this.attr('venta', new Ventas({}));
		}
	,	saveVenta: function(el)
		{
			var frontendValidationErrors
			=	[]
			,	$button
			=	$(el)
			,	self
			=	this;
			
			$button.button('loading');

			if	(self.attr('venta.formaPago')) {
				
				if 	((self.attr('venta.formaPago.codigo') == "04") && !(self.attr('venta.cliente'))) {

					frontendValidationErrors.push('dni_cliente');

				}

			} else {
				
				frontendValidationErrors.push('formaDePago');

			}

			self.attr('venta.articulos')
				.each(
					function(a)
					{
						if (a.attr('cantidad') < 0 || a.attr('cantidad') > a.attr('stock'))
							frontendValidationErrors.push(a.attr('codigo')+'-cantidad');
					}
				);

			console.log(frontendValidationErrors)
			
			if (frontendValidationErrors.length == 0) {

				var	newMode
				=	self.attr('venta').isNew();

				self.attr('venta').save()
					.then(
						function(data)
						{
							$button.button('reset');

							if (newMode) {
								self.attr('venta', new Ventas({}));
							} else {
								$(el).parents('.modal').modal('hide')
								$('#ajuste-switch').click();
							}

							$.notify(
								{
									message:	'Venta '+(newMode ? 'creada' : 'actualizada')+' correctamente.' 
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

							$('#nueva-venta-form').find('[name]').each(
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
							$('#nueva-venta-form').find('[name]').each(
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
					);				
			} else {

				$('[name]')
					.each(
						function()
						{
							var	eIndex
							=	frontendValidationErrors.indexOf($(this).attr('name'))
							,	$element
							=	$(this).attr('name').split('-')[1] == 'cantidad'
								?	$(this).parent()
								:	$(this).parents('.form-group')

							$element
								.removeClass('has-error has-success')
								.addClass(
									(frontendValidationErrors[eIndex])
									?	'has-error'
									:	'has-success'
								)
						}
					);

				self.attr('errorMsg','Datos incorrectos, verifique los datos ingresados.');

				$button.button('reset');
			}
		}
	}
);

export default Component.extend({
	tag: 'aleph-ventas-nueva-venta',
	viewModel: ViewModel,
	template
});