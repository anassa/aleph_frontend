import QUnit from 'steal-qunit';
import { ViewModel } from './registros_oc';

// ViewModel unit tests
QUnit.module('aleph-frontend/compras/registros_oc');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the aleph-compras-registros-oc component');
});
