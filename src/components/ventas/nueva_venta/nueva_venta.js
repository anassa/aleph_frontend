import Component from 'can-component';
import Map from 'can-define/map/map';
import './nueva_venta.less!';
import template from './nueva_venta.stache!';

import Ventas from 'aleph-frontend/models/ventas';
import Articulos from 'aleph-frontend/models/articulosVenta';
import FormasDePago from 'aleph-frontend/models/formasDePago';
import Tarjetas from 'aleph-frontend/models/tarjetas';

export const ViewModel = Map.extend(
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
							=	Articulos.getList(query.get());
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
							self.venta.articulos
								.map(
									function(art, i)
									{
										art.visible
										=	(i >= query.current.firstPage && i <= query.current.lastPage);
									}
								);
						}
					);

				return query;
			}
		}
	,	searchArticulo: function(value)
		{
			var value
			=	this.searchInput
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

			this.query.$or
			=	value.length
				?	createQuery(fields,value)
				:	undefined;
		}
	,	addArticulo: function(art)
		{
			if (this.venta.articulos.indexOf(art) == -1) {
				art.visible = true;
				art.cantidad = 1;
				this.venta.articulos.push(art);
			} else {
				$.notify(
					{
						message:	'El Articulo '+art.nombre+' ya fue agregado a la Venta.' 
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
			this.venta.articulos.splice($(el).parents('tr').index(),1);
		}
	,	cancelVenta: function()
		{
			this.venta =new Ventas({});
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

			if	(self.venta.formaPago) {
				
				if 	((self.venta.formaPago.codigo == "04") && !(self.venta.cliente)) {

					frontendValidationErrors.push('dni_cliente');

				}

			} else {
				
				frontendValidationErrors.push('formaDePago');

			}

			self.venta.articulos
				.each(
					function(a)
					{
						if (a.cantidad < 0 || a.cantidad > a.stock)
							frontendValidationErrors.push(a.codigo+'-cantidad');
					}
				);
			
			if (frontendValidationErrors.length == 0) {

				var	newMode
				=	self.venta.isNew();

				self.venta.save()
					.then(
						function(data)
						{
							$button.button('reset');

							if (newMode) {
								self.venta = new Ventas({});
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

							self.errorMsg = '';

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

							self.errorMsg = 'Datos incorrectos, verifique los datos ingresados.';

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

				self.errorMsg = 'Datos incorrectos, verifique los datos ingresados.';

				$button.button('reset');
			}
		}
	}
);

export default Component.extend(
	{
		tag: 'aleph-ventas-nueva-venta'
	,	viewModel: ViewModel
	,	view: template
	}
);