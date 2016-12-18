import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './nuevo_remito.less!';
import template from './nuevo_remito.stache!';

// Importamos el modelo ordenes de compra.
import OrdenesDeCompra from 'aleph-frontend/models/ordenesDeCompra';
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
    
    ,descripcion:{
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

  		// Creamos el remito seteando los parametros, y lo guardamos.
  		var remito = new Remitos({
  			codigo: 5454
  			,codigoProv: 5454
  			,descripcion: this.attr('descripcion')
  			,codigoOC: 54545
  			,articulos: this.attr('ordenDeCompraSelected.articulos').serialize()
  		})
  		.save()
  		.then(
  			function(data){
  				
  				// Lanzamos una notificacion.
  				$.notify({message:'Remito creado correctamente'},{ 
					type: 'success'
					,placement: {
						from: 'bottom',
						align: 'right'
					}
				})

				// Se borra la OC seleccionada. a lo cabeza.
  				this.attr('ordenDeCompraSelected',null)
  				this.attr('descripcion',null)
		  	}
		  	// Si hubo problemas al guardar...
		  	,function(){
		  		
		  		// Lanzamos una notificacion de error.
  				$.notify({message:'No se pudo crear el remito'},{ 
					type: 'danger'
					,placement: {
						from: 'bottom',
						align: 'right'
					}
				});

		  	}
  		)
  		
  		

  }

});

export default Component.extend({
  tag: 'aleph-stock-nuevo-remito',
  viewModel: ViewModel,
  template
});