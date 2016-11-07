import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './nuevo_proveedor.less!';
import template from './nuevo_proveedor.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the aleph-compras-nuevo-proveedor component'
    }
  }
});

export default Component.extend({
  tag: 'aleph-compras-nuevo-proveedor',
  viewModel: ViewModel,
  template
});