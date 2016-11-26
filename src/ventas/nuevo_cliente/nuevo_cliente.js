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
		// Para ver si se setea la cuenta.
		, lockCuenta:{
			value: true
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

		// Vamos a controlar.... a lo negro...
		if(
			// Si el nombre fue seteado.
			self.attr('cliente').nombre
			&&
			// Y el apellido.
			self.attr('cliente').apellido
			&&
			// Y el dni... prque basicamente son campos obligatorios.
			self.attr('cliente').dni

		){
			Clientes
				// Traemos todos los clientes con el dni seteado en 
				// el formulario.
				.getList({ dni: self.attr('cliente').dni })
				.then(
					function(lista)
					{
						console.log("longitud de la lista")
						console.log(lista.length)
						// si la lista tiene longitud > 0 es porque ya existe un flaco...
						if(lista.length > 0)
						{

							console.log("Entra en el if")
							// Como todo anda mal Lanzar error.
							self.attr('errorMsg','Ya existe un cliente con el mismo número de DNI.');

						}else{
							
							// Sino... Es porque no hay ningun flaco registrado...
							// Podes crear el nuevo cliente.
							// Entonces lo guardamos.
							self.attr('cliente').save()
							
							// cuando guardaste, agarra y setea el mensaje que guardaste....
							self.attr('successMsg','Nuevo cliente creado')
						}
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

	// Hacer el cambio magico del botoncito de las cuentas
	, switchCuenta: function(el){
		
		/*No se para que mierda hago esto, pero
		neri lo hace, asi que ya fue ...*/
		var self = this
		
		// Capturamos el atributo global lock cuenta
		var lock = self.attr('lockCuenta')
		
		// Cambiamos el valor actual de lock cuenta (atributo global), por su valor opuesto.
		self.attr('lockCuenta', lock = !lock)
		
		// Cambiamos el atributo disabled de la movida.
		$("#limiteCuenta").prop('disabled', lock);
		
	}
	
	
});

export default Component.extend({
  tag: 'aleph-ventas-nuevo-cliente',
  viewModel: ViewModel,
  template
});