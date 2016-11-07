import QUnit from 'steal-qunit';
import { ViewModel } from './nuevo_proveedor';

// ViewModel unit tests
QUnit.module('aleph-frontend/compras/nuevo_proveedor');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the aleph-compras-nuevo-proveedor component');
});
