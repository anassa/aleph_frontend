import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './registros_remito.less!';
import template from './registros_remito.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the aleph-stock-registros-remito component'
    }
  }
});

export default Component.extend({
  tag: 'aleph-stock-registros-remito',
  viewModel: ViewModel,
  template
});