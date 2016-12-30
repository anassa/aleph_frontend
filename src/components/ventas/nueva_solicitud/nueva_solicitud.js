import Component from 'can-component';
import Map from 'can-map';
import 'can-map-define';
import './nueva_solicitud.less!';
import template from './nueva_solicitud.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the aleph-ventas-nueva-solicitud component'
    }
  }
});

export default Component.extend({
  tag: 'aleph-ventas-nueva-solicitud',
  viewModel: ViewModel,
  view: template
});