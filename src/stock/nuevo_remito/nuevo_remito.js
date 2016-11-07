import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './nuevo_remito.less!';
import template from './nuevo_remito.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the aleph-stock-nuevo-remito component'
    }
  }
});

export default Component.extend({
  tag: 'aleph-stock-nuevo-remito',
  viewModel: ViewModel,
  template
});