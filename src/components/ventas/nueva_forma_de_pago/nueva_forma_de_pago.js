import Component from 'can-component';
import Map from 'can-map';
import 'can-map-define';
import './nueva_forma_de_pago.less!';
import template from './nueva_forma_de_pago.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the aleph-ventas-nueva-forma-de-pagos component'
    }
  }
});

export default Component.extend({
  tag: 'aleph-ventas-nueva-forma-de-pago',
  viewModel: ViewModel,
  view: template
});