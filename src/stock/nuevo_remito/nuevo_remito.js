import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './nuevo_remito.less!';
import template from './nuevo_remito.stache!';
import 'bootstrap-datepicker/js/bootstrap-datepicker.js'
import 'bootstrap-datepicker/js/locales/bootstrap-datepicker.es.js'
// Importamos el modelo ordenes de compra.
import OrdenesDeCompra from 'aleph-frontend/models/ordenesDeCompra';
// Traemos el modelo de remitos
import Remitos from 'aleph-frontend/models/remitos';

export const ViewModel = Map.extend({
  define: {
    // Traemos las ordenes de compras
    ordenesDeCompra:{
    	
      // Se traen todas las ordenes de compra de la DB.
  		value: function(){
  			// console.log(OrdenesDeCompra.getList())
  			return	OrdenesDeCompra.getList()
		  }

    }
    
    // Variable donde vamos a cargar la OC seleccionada.
    ,ordenDeCompraSelected:{
    	value: null
    }
    
    // No se para que voy a usar esta query, pero neri lo hace... XD
    ,query: {
		  value: function() {
  			var self = this;
  			var query =	new can.Map({ $skip: 0 });
  			query.bind( 'change' , function(){
  				
  				self.attr( 'ordenesDeCompra' ,
  					OrdenesDeCompra.getList(
  						query.serialize()
  					)
  				)

			  });

		    return query;
		  }
	  }

  }
  // ,calendario: function(e){
  //     // alert('ho')
  //     $('.date input').datepicker({language: 'es'});
  // }
  // Funcion para agregar una OC al remito
  ,addOrdenDeCompra: function(oc){
  		// Se carga en la variable orden de compra la seleccionada.
  		this.attr('ordenDeCompraSelected' , oc);
  } 

  // Funcion para cancelar el remito nuevo.
  ,cancelRemito: function(el){
  		this.attr('ordenDeCompraSelected' , null);
  }

  // funcion para crear un nuevo remito
  ,nuevoRemito: function(el){

  		// Esto se hace porque sino hay cosas que no funcionan
  		var esta = this
  		var thisordenDeCompra = this.attr('ordenDeCompraSelected')
  		
  		// Creamos el remito seteando los parametros, y lo guardamos a lo negro.
  		var nuevoRemito = new Remitos({
  			codigo: 5454
  			,codigoProv: 5454
  			,codigoOC: 54545
  			,articulos: 
  				this
  				.attr('ordenDeCompraSelected.articulos')
  				.serialize()
  		})
  		.save()

  		// Se ejecuta cuando finaliza el proceso de guardado.
  		.then(
  			
  			// Funcion success
  			function(data){

  				// Data contien el remito guardado
  				// Lo asociamos a nuestra Orden de compra
  				thisordenDeCompra.remitos.push(data)
  				// Modificamos atributos de la observacion
  				thisordenDeCompra.attr(
  					'observacion',
  					$('#observacion').val()
  				)

  				// La actualizamos
  				thisordenDeCompra.save()
  				
  				// Lanzamos una notificacion de que todo funciono bien.
  				$.notify({message:'Remito creado correctamente'},{ 
					type: 'success'
					,placement: {
						from: 'bottom',
						align: 'right'
					}
				})

  				// Se borra la OC actualmente seleccionada
  				esta.attr('ordenDeCompraSelected',null)
  				
  				// Se borra la descripcion
  				esta.attr('descripcion',null)

		  	}
		  	
		  	// funcion BARDO.
		  	, function(){
		  		
		  		// Lanzamos una notificacion de error, para que el man
		  		// se enoje con la vida.
  				$.notify({message:'No se pudo crear el remito'},{ 
					type: 'danger'
					,placement: {
						from: 'bottom',
						align: 'right'
					}
				});


		  	}
  		)
  		// Aca termina el then.
  		

  }

});

export default Component.extend({
  tag: 'aleph-stock-nuevo-remito',
  viewModel: ViewModel,
  events: {
    'inserted': function(el, ev){
      $('.date input').datepicker({language: 'es'});
    }
  }
  ,template
});