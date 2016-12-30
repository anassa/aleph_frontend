import Component from 'can-component';
import Map from 'can-map';
import 'can-map-define';
import './registros_solicitud_venta.less!';
import template from './registros_solicitud_venta.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'Registro solicitud venta (registro venta en curso)'
    }
  }
});

export default Component.extend({
  tag: 'aleph-ventas-registros-solicitud-venta',
  viewModel: ViewModel,
  view: template
});