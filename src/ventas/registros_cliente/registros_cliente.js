import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './registros_cliente.less!';
import template from './registros_cliente.stache!';

var movida = [];
for (var i = 0; i <= 10; i++) {
	movida.push({
  		nombre: "Neri",
  		apellido: "Widis",
  		dni: "14496338",
  		domicilio: "Zarate 123",
  		etiquetas: "Unknow",
  		telefono: "424687",
  		mail: "neri.widis@gmai",
  		cuenta: "314314314314",
  		limiteCuenta: "500"
	})
}

export const ViewModel = Map.extend({
  define: {
	    message:{
	    	value: "Registros Cliente"
	    },
	    data: {
	  		value: movida      	
	    }
  }
});

export default Component.extend({
  tag: 'aleph-ventas-registros-cliente',
  viewModel: ViewModel,
  template
});