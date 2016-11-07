import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './nuevo_cliente.less!';
import template from './nuevo_cliente.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'Nuevo Cliente'
    }
  }
});

export default Component.extend({
  tag: 'aleph-ventas-nuevo-cliente',
  viewModel: ViewModel,
  template
});