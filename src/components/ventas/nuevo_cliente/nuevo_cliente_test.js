import QUnit from 'steal-qunit';
import { ViewModel } from './nuevo_cliente';

// ViewModel unit tests
QUnit.module('aleph-frontend/ventas/nuevo_cliente');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the aleph-ventas-nuevo-cliente component');
});
