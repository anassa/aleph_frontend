import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './nuevo_cliente.less!';
import template from './nuevo_cliente.stache!';

// Importamos los modelos y cosas raras
import Clientes from 'aleph-frontend/models/clientes';

export const ViewModel = Map.extend({
	
	// Datos que retorna el js
	define: {
		message: {
	    	value: 'Nuevo Cliente'
	    }
	    // Cargamos en la vista una instancia de clientes.
	    , cliente:{
			value:	Clientes
		}
		// Se viene el Cimopu....
		, errorMsg: {
			value:	null
		}
		// Error para controlar ...
		, successMsg: {
			value:	null
		}
	}

	// Funcion para guardar los datos. Ejecutado como ($click)="saveCliente( %element )"
	, saveCliente: function(el){
		
		var $button = $(el) , self = this;

		// Basicamente cambia el formato del boton cuando ejecuto esto.
		$button.button('loading');
		
		// Cada vez que hacemos click se borran las movidas de error.
		self.attr('errorMsg',null);
		self.attr('successMsg',null);

		// Negrada multinacional.
		// Borrar los colores y cosas raras
		$( "[name=nombre], [name=apellido], [name=dni]")
		.parents('.form-group')
		.removeClass('has-error')

		// Vamos a controlar....
		if(
			// Si el nombr efue seteado
			self.attr('cliente').nombre
			&&
			// Y el apellido
			self.attr('cliente').apellido
			&&
			// Y el dni... prque son campos obligatorios
			self.attr('cliente').dni

		){
			// Si todo anda bien, guardar.
			self.attr('cliente').save()
			
			// cuando guardaste, agarra y setea el mensaje que guardaste....
			.then(
				function()
				{
					self.attr('successMsg','Nuevo cliente creado')
				}
			)

		}else{
			
			// Si no complete los mensajes... decirle al tipo, que todo anda mal
			// para que se enoje con la vida....
			$( "[name=nombre], [name=apellido], [name=dni]")
			.parents('.form-group')
			.addClass('has-error')

			// aca seteamos la variable con el error.
			self.attr('errorMsg','Datos incorrectos, verifique los datos ingresados.');
			
		}
		// Se resetea el boton.
		$button.button('reset');
	}
	
});

export default Component.extend({
  tag: 'aleph-ventas-nuevo-cliente',
  viewModel: ViewModel,
  template
});