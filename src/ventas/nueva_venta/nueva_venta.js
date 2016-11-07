import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './nueva_venta.less!';
import template from './nueva_venta.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the aleph-ventas-nueva-venta component'
    }
  }
});

export default Component.extend({
  tag: 'aleph-ventas-nueva-venta',
  viewModel: ViewModel,
  template
});