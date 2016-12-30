import Component from 'can-component';
import Map from 'can-map';
import 'can-map-define';
import './registros_solicitud.less!';
import template from './registros_solicitud.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'Registros Solicitud'
    }
  }
});

export default Component.extend({
  tag: 'aleph-ventas-registros-solicitud',
  viewModel: ViewModel,
  view: template
});