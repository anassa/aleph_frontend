import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './nuevo_articulo.less!';
import template from './nuevo_articulo.stache!';

import UnidadesDeMedida from 'aleph-frontend/models/unidadesDeMedida';
import Articulos from 'aleph-frontend/models/articulos';

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
		,	errorMsg:
			{
				value:	null
			}
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