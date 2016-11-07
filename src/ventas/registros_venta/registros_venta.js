import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './registros_venta.less!';
import template from './registros_venta.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'Registros Venta'
    }
  }
});

export default Component.extend({
  tag: 'aleph-ventas-registros-venta',
  viewModel: ViewModel,
  template
});