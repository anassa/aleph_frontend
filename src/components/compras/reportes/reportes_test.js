import QUnit from 'steal-qunit';
import { ViewModel } from './reportes';

// ViewModel unit tests
QUnit.module('aleph-frontend/compras/reportes');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the aleph-compras-reportes component');
});
