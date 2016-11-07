import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './nueva_oc.less!';
import template from './nueva_oc.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the aleph-compras-nueva-oc component'
    }
  }
});

export default Component.extend({
  tag: 'aleph-compras-nueva-oc',
  viewModel: ViewModel,
  template
});