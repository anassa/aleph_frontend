import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './registros_oc.less!';
import template from './registros_oc.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
 		value: 'Registros Orden de Compra'
  	}
  }
});

export default Component.extend({
  tag: 'aleph-compras-registros-oc',
  viewModel: ViewModel,
  template
});