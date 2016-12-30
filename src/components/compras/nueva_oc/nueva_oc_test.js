import QUnit from 'steal-qunit';
import { ViewModel } from './nueva_oc';

// ViewModel unit tests
QUnit.module('aleph-frontend/compras/nueva_oc');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the aleph-compras-nueva-oc component');
});
