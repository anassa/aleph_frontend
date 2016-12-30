import QUnit from 'steal-qunit';
import { ViewModel } from './nuevo_remito';

// ViewModel unit tests
QUnit.module('aleph-frontend/stock/nuevo_remito');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the aleph-stock-nuevo-remito component');
});
