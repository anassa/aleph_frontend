import QUnit from 'steal-qunit';
import { ViewModel } from './nueva_solicitud';

// ViewModel unit tests
QUnit.module('aleph-frontend/ventas/nueva_solicitud');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the aleph-ventas-nueva-solicitud component');
});
