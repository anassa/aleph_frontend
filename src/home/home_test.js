import QUnit from 'steal-qunit';
import { ViewModel } from './home';

// ViewModel unit tests
QUnit.module('aleph-frontend/home');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the aleph-home component');
});
