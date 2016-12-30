import Component from 'can-component';
import Map from 'can-map';
import 'can-map-define';
import './nuevo_cliente.less!';
import template from './nuevo_cliente.stache!';

// Importamos los modelos y cosas raras
import Clientes from 'aleph-frontend/models/clientes';
import 'aleph-frontend/util/func.js';

// Array Y cosas raras para el tema de las etiquetas
window.Clientes = Clientes
// La posta de las etiquetas
const labels = ['label-default','label-primary','label-success','label-info','label-warning','label-danger'];

export const ViewModel = Map.extend({
	define:
	{
		cliente: {
			value:	Clientes
		}
	
		, errorMsg: {
			value:	null
		}
	}
	, toggleCuenta: function(el)
	{
			if (!$(el).is(':checked')) {
				this.attr('cliente.cuenta','');
				$('[name="tope"]').val('')
			}

			$('[name="cuenta"]')
				.attr(
					'disabled'
				,	(!$(el).is(':checked'))
					?	'disabled'
					:	null
				);

			$('[name="tope"]')
				.attr(
					'disabled'
				,	(!$(el).is(':checked'))
					?	'disabled'
					:	null
				);
	}
	,	checkEtiquetas: function(el)
		{
			this.attr(
				'cliente.etiquetas'
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
	,	cancelCliente: function()
		{
			// alert("cancelar cliente")
			this.attr('cliente', new Clientes({}));
		}
	,	saveCliente: function(el)
		{
			
			var $button
			=	$(el)
			,	self
			=	this;

			$button.button('loading');

			var	newMode
			=	self.attr('cliente').isNew();
			console.log("nuevo_cliente.js : saveCliente")
			self.attr('cliente').save()
				.then(
					function(data)
					{
						
						// Reseteamos el boton.
						$button.button('reset');
						// Si se actualiza un usuario, cerra la ventana modal.
						// Si no es nuevo.
						if (!newMode) {
							// 	// self.attr('cliente', new Cliente({}));
							// } else {
							$(el).parents('.modal').modal('hide')
							$('#cuenta-switch').click();
						
						}else{
							self.attr('cliente', new Clientes({}));
						}

						console.log("Voy a lanzar notificacion")
						// Lanzar una notificacion
						$.notify(
							{
								message:	'Cliente '+(newMode ? 'creado' : 'actualizado')+' correctamente.' 
							}
							,{
								type: 'success'
								, placement:
								{
									from: 'bottom',
									align: 'right'
								}
							}
						);

						$('#nuevo-cliente-form').find('[name]').each(
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

						$('#nuevo-cliente-form').find('[name]').each(
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
  tag: 'aleph-ventas-nuevo-cliente',
  viewModel: ViewModel,
  view: template
});