import QUnit from 'steal-qunit';
import { ViewModel } from './nueva_venta';

// ViewModel unit tests
QUnit.module('aleph-frontend/ventas/nueva_venta');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the aleph-ventas-nueva-venta component');
});
