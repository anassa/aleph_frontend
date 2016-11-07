import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './registros_proveedor.less!';
import template from './registros_proveedor.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'Registros Proveedor'
    }
  }
});

export default Component.extend({
  tag: 'aleph-compras-registros-proveedor',
  viewModel: ViewModel,
  template
});