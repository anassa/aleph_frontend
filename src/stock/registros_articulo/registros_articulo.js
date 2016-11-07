import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './registros_articulo.less!';
import template from './registros_articulo.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'Registros Articulo'
    }
  }
});

export default Component.extend({
  tag: 'aleph-stock-registros-articulo',
  viewModel: ViewModel,
  template
});