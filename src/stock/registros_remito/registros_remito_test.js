import QUnit from 'steal-qunit';
import { ViewModel } from './registros_remito';

// ViewModel unit tests
QUnit.module('aleph-frontend/stock/registros_remito');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the aleph-stock-registros-remito component');
});
