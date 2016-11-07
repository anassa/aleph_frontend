import QUnit from 'steal-qunit';
import { ViewModel } from './registros_proveedor';

// ViewModel unit tests
QUnit.module('aleph-frontend/compras/registros_proveedor');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the aleph-compras-registros-proveedor component');
});
