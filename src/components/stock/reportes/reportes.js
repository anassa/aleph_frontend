import Component from 'can-component';
import Map from 'can-map';
import 'can-map-define';
import './reportes.less!';
import template from './reportes.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the aleph-stock-reportes component'
    }
  }
});

export default Component.extend({
  tag: 'aleph-stock-reportes',
  viewModel: ViewModel,
  view: template
});