import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './registros_usuario.less!';
import template from './registros_usuario.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the aleph-admin-registros-usuario component'
    }
  }
});

export default Component.extend({
  tag: 'aleph-admin-registros-usuario',
  viewModel: ViewModel,
  template
});