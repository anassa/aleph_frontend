import QUnit from 'steal-qunit';
import { ViewModel } from './registros_cliente';

// ViewModel unit tests
QUnit.module('aleph-frontend/ventas/registros_cliente');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the aleph-ventas-registros-cliente component');
});
